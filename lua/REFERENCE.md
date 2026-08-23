# Dedline Lua SDK Reference

Complete API reference for the Dedline Lua SDK.


## DedlineSDK

### Constructor

```lua
local sdk = require("dedline_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Deadline(data)`

Create a new `Deadline` entity instance. Pass `nil` for no initial data.

#### `RegistrationFeature(data)`

Create a new `RegistrationFeature` entity instance. Pass `nil` for no initial data.

#### `Stat(data)`

Create a new `Stat` entity instance. Pass `nil` for no initial data.

#### `State(data)`

Create a new `State` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## DeadlineEntity

```lua
local deadline = client:Deadline(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `general` | `table` | No |  |
| `primary` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Deadline():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeadlineEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RegistrationFeatureEntity

```lua
local registration_feature = client:RegistrationFeature(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:RegistrationFeature():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegistrationFeatureEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StatEntity

```lua
local stat = client:Stat(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `lastUpdated` | `string` | Yes | Date when the data was last updated |
| `onlineRegistrationAvailable` | `number` | Yes | Number of states that offer online registration |
| `sameDayRegistrationAvailable` | `number` | Yes | Number of states that allow same-day registration |
| `totalStates` | `number` | Yes | Total number of states (including DC) |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Stat():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StateEntity

```lua
local state = client:State(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deadline` | `string` | Yes | General election voter registration deadline in YYYYMMDD format |
| `emoji` | `string` | Yes | State-themed emoji |
| `generalElectionDate` | `string` | Yes | General election date in YYYYMMDD format |
| `label` | `string` | Yes | Full state name |
| `lastMinuteAccepted` | `boolean` | Yes | Whether voters can register on election day |
| `notes` | `string` | No | Additional details about state registration |
| `onlineAccepted` | `boolean` | Yes | Whether voters can register online |
| `primaryDate` | `string` | Yes | Primary election date in YYYYMMDD format |
| `primaryDeadline` | `string` | Yes | Primary election voter registration deadline in YYYYMMDD format |
| `url` | `string` | Yes | Official state voter registration website |
| `value` | `string` | Yes | Two-letter state abbreviation |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:State():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:State():load({ state_abbreviation = "state_abbreviation" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

