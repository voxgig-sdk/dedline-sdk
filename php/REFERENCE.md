# Dedline PHP SDK Reference

Complete API reference for the Dedline PHP SDK.


## DedlineSDK

### Constructor

```php
require_once __DIR__ . '/dedline_sdk.php';

$client = new DedlineSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DedlineSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = DedlineSDK::test();
```


### Instance Methods

#### `Deadline($data = null)`

Create a new `DeadlineEntity` instance. Pass `null` for no initial data.

#### `RegistrationFeature($data = null)`

Create a new `RegistrationFeatureEntity` instance. Pass `null` for no initial data.

#### `Stat($data = null)`

Create a new `StatEntity` instance. Pass `null` for no initial data.

#### `State($data = null)`

Create a new `StateEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): DedlineUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## DeadlineEntity

```php
$deadline = $client->Deadline();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `general` | `array` | No |  |
| `primary` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Deadline()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeadlineEntity`

Create a new `DeadlineEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RegistrationFeatureEntity

```php
$registration_feature = $client->RegistrationFeature();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->RegistrationFeature()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RegistrationFeatureEntity`

Create a new `RegistrationFeatureEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StatEntity

```php
$stat = $client->Stat();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_updated` | `string` | Yes |  |
| `online_registration_available` | `int` | Yes |  |
| `same_day_registration_available` | `int` | Yes |  |
| `total_state` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Stat()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StatEntity`

Create a new `StatEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StateEntity

```php
$state = $client->State();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deadline` | `string` | Yes |  |
| `emoji` | `string` | Yes |  |
| `general_election_date` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `last_minute_accepted` | `bool` | Yes |  |
| `note` | `string` | No |  |
| `online_accepted` | `bool` | Yes |  |
| `primary_date` | `string` | Yes |  |
| `primary_deadline` | `string` | Yes |  |
| `url` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->State()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->State()->load(["state_abbreviation" => "state_abbreviation"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StateEntity`

Create a new `StateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new DedlineSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

