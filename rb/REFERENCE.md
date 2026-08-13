# Dedline Ruby SDK Reference

Complete API reference for the Dedline Ruby SDK.


## DedlineSDK

### Constructor

```ruby
require_relative 'Dedline_sdk'

client = DedlineSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DedlineSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = DedlineSDK.test
```


### Instance Methods

#### `Deadline(data = nil)`

Create a new `Deadline` entity instance. Pass `nil` for no initial data.

#### `RegistrationFeature(data = nil)`

Create a new `RegistrationFeature` entity instance. Pass `nil` for no initial data.

#### `Stat(data = nil)`

Create a new `Stat` entity instance. Pass `nil` for no initial data.

#### `State(data = nil)`

Create a new `State` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## DeadlineEntity

```ruby
deadline = client.Deadline
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `general` | `Array` | No |  |
| `primary` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Deadline.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeadlineEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegistrationFeatureEntity

```ruby
registration_feature = client.RegistrationFeature
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.RegistrationFeature.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegistrationFeatureEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StatEntity

```ruby
stat = client.Stat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lastUpdated` | `String` | Yes |  |
| `onlineRegistrationAvailable` | `Integer` | Yes |  |
| `sameDayRegistrationAvailable` | `Integer` | Yes |  |
| `totalStates` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Stat.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StatEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StateEntity

```ruby
state = client.State
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deadline` | `String` | Yes |  |
| `emoji` | `String` | Yes |  |
| `generalElectionDate` | `String` | Yes |  |
| `label` | `String` | Yes |  |
| `lastMinuteAccepted` | `Boolean` | Yes |  |
| `notes` | `String` | No |  |
| `onlineAccepted` | `Boolean` | Yes |  |
| `primaryDate` | `String` | Yes |  |
| `primaryDeadline` | `String` | Yes |  |
| `url` | `String` | Yes |  |
| `value` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.State.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.State.load({ "state_abbreviation" => "state_abbreviation" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = DedlineSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

