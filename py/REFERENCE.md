# Dedline Python SDK Reference

Complete API reference for the Dedline Python SDK.


## DedlineSDK

### Constructor

```python
from dedline_sdk import DedlineSDK

client = DedlineSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DedlineSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = DedlineSDK.test()
```


### Instance Methods

#### `Deadline(data=None)`

Create a new `DeadlineEntity` instance. Pass `None` for no initial data.

#### `RegistrationFeature(data=None)`

Create a new `RegistrationFeatureEntity` instance. Pass `None` for no initial data.

#### `Stat(data=None)`

Create a new `StatEntity` instance. Pass `None` for no initial data.

#### `State(data=None)`

Create a new `StateEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## DeadlineEntity

```python
deadline = client.Deadline()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `general` | `list` | No |  |
| `primary` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Deadline().list()
for deadline in results:
    print(deadline)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeadlineEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegistrationFeatureEntity

```python
registration_feature = client.RegistrationFeature()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.RegistrationFeature().list()
for registration_feature in results:
    print(registration_feature)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegistrationFeatureEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StatEntity

```python
stat = client.Stat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_updated` | `str` | Yes |  |
| `online_registration_available` | `int` | Yes |  |
| `same_day_registration_available` | `int` | Yes |  |
| `total_state` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Stat().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StateEntity

```python
state = client.State()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deadline` | `str` | Yes |  |
| `emoji` | `str` | Yes |  |
| `general_election_date` | `str` | Yes |  |
| `label` | `str` | Yes |  |
| `last_minute_accepted` | `bool` | Yes |  |
| `note` | `str` | No |  |
| `online_accepted` | `bool` | Yes |  |
| `primary_date` | `str` | Yes |  |
| `primary_deadline` | `str` | Yes |  |
| `url` | `str` | Yes |  |
| `value` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.State().list()
for state in results:
    print(state)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.State().load({"state_abbreviation": "state_abbreviation"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = DedlineSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

