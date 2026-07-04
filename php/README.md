# Dedline PHP SDK



The PHP SDK for the Dedline API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/dedline-sdk/releases](https://github.com/voxgig-sdk/dedline-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'dedline_sdk.php';

$client = new DedlineSDK();
```

### 2. List deadline records

```php
try {
    // list() returns an array of Deadline records — iterate directly.
    $deadlines = $client->Deadline()->list();
    foreach ($deadlines as $item) {
        echo $item["id"] . " " . $item["name"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = DedlineSDK::test([
    "entity" => ["deadline" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$deadline = $client->Deadline()->load(["id" => "test01"]);
print_r($deadline);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new DedlineSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
DEDLINE_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### DedlineSDK

```php
require_once 'dedline_sdk.php';
$client = new DedlineSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = DedlineSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### DedlineSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Deadline` | `($data): DeadlineEntity` | Create a Deadline entity instance. |
| `RegistrationFeature` | `($data): RegistrationFeatureEntity` | Create a RegistrationFeature entity instance. |
| `Stat` | `($data): StatEntity` | Create a Stat entity instance. |
| `State` | `($data): StateEntity` | Create a State entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Deadline

| Field | Description |
| --- | --- |
| `general` |  |
| `primary` |  |

Operations: List.

API path: `/upcoming.json`

#### RegistrationFeature

| Field | Description |
| --- | --- |

Operations: List.

API path: `/lastMinuteAccepted.json`

#### Stat

| Field | Description |
| --- | --- |
| `last_updated` |  |
| `online_registration_available` |  |
| `same_day_registration_available` |  |
| `total_state` |  |

Operations: Load.

API path: `/stats.json`

#### State

| Field | Description |
| --- | --- |
| `deadline` |  |
| `emoji` |  |
| `general_election_date` |  |
| `label` |  |
| `last_minute_accepted` |  |
| `note` |  |
| `online_accepted` |  |
| `primary_date` |  |
| `primary_deadline` |  |
| `url` |  |
| `value` |  |

Operations: List, Load.

API path: `/states.json`



## Entities


### Deadline

Create an instance: `$deadline = $client->Deadline();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `general` | ``$ARRAY`` |  |
| `primary` | ``$ARRAY`` |  |

#### Example: List

```php
// list() returns an array of Deadline records (throws on error).
$deadlines = $client->Deadline()->list();
```


### RegistrationFeature

Create an instance: `$registration_feature = $client->RegistrationFeature();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of RegistrationFeature records (throws on error).
$registration_features = $client->RegistrationFeature()->list();
```


### Stat

Create an instance: `$stat = $client->Stat();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_updated` | ``$STRING`` |  |
| `online_registration_available` | ``$INTEGER`` |  |
| `same_day_registration_available` | ``$INTEGER`` |  |
| `total_state` | ``$INTEGER`` |  |

#### Example: Load

```php
// load() returns the bare Stat record (throws on error).
$stat = $client->Stat()->load(["id" => "stat_id"]);
```


### State

Create an instance: `$state = $client->State();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deadline` | ``$STRING`` |  |
| `emoji` | ``$STRING`` |  |
| `general_election_date` | ``$STRING`` |  |
| `label` | ``$STRING`` |  |
| `last_minute_accepted` | ``$BOOLEAN`` |  |
| `note` | ``$STRING`` |  |
| `online_accepted` | ``$BOOLEAN`` |  |
| `primary_date` | ``$STRING`` |  |
| `primary_deadline` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |
| `value` | ``$STRING`` |  |

#### Example: Load

```php
// load() returns the bare State record (throws on error).
$state = $client->State()->load(["id" => "state_id"]);
```

#### Example: List

```php
// list() returns an array of State records (throws on error).
$states = $client->State()->list();
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── dedline_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`dedline_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$deadline = $client->Deadline();
$deadline->load(["id" => "example_id"]);

// $deadline->dataGet() now returns the loaded deadline data
// $deadline->matchGet() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
