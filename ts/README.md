# Dedline TypeScript SDK



The TypeScript SDK for the Dedline API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/dedline-sdk/releases](https://github.com/voxgig-sdk/dedline-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { DedlineSDK } from '@voxgig-sdk/dedline'

const client = new DedlineSDK()
```

### 2. List deadlines

```ts
const result = await client.deadline.list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = DedlineSDK.test()

const result = await client.deadline.load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new DedlineSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.deadline

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new DedlineSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DEDLINE_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### DedlineSDK

#### Constructor

```ts
new DedlineSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Deadline(data?)` | `DeadlineEntity` | Create a Deadline entity instance. |
| `RegistrationFeature(data?)` | `RegistrationFeatureEntity` | Create a RegistrationFeature entity instance. |
| `Stat(data?)` | `StatEntity` | Create a Stat entity instance. |
| `State(data?)` | `StateEntity` | Create a State entity instance. |
| `tester(testopts?, sdkopts?)` | `DedlineSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `DedlineSDK.test(testopts?, sdkopts?)` | `DedlineSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DedlineSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Deadline

| Field | Description |
| --- | --- |
| `general` |  |
| `primary` |  |

Operations: list.

API path: `/upcoming.json`

#### RegistrationFeature

| Field | Description |
| --- | --- |

Operations: list.

API path: `/lastMinuteAccepted.json`

#### Stat

| Field | Description |
| --- | --- |
| `last_updated` |  |
| `online_registration_available` |  |
| `same_day_registration_available` |  |
| `total_state` |  |

Operations: load.

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

Operations: list, load.

API path: `/states.json`



## Entities


### Deadline

Create an instance: `const deadline = client.deadline`

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

```ts
const deadlines = await client.deadline.list()
```


### RegistrationFeature

Create an instance: `const registration_feature = client.registration_feature`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const registration_features = await client.registration_feature.list()
```


### Stat

Create an instance: `const stat = client.stat`

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

```ts
const stat = await client.stat.load({ id: 'stat_id' })
```


### State

Create an instance: `const state = client.state`

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

```ts
const state = await client.state.load({ id: 'state_id' })
```

#### Example: List

```ts
const states = await client.state.list()
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
dedline/
├── src/
│   ├── DedlineSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { DedlineSDK } from '@voxgig-sdk/dedline'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const deadline = client.deadline
await deadline.load({ id: "example_id" })

// deadline.data() now returns the loaded deadline data
// deadline.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
