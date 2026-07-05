# Dedline TypeScript SDK



The TypeScript SDK for the Dedline API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Deadline()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

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

### 2. List deadline records

`list()` resolves to an array of Deadline objects — iterate it directly:

```ts
const deadlines = await client.Deadline().list()

for (const deadline of deadlines) {
  console.log(deadline)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const deadlines = await client.Deadline().list()
  console.log(deadlines)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
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

if (result instanceof Error) {
  throw result
}
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

const deadline = await client.Deadline().list()
// deadline is a bare entity populated with mock response data
console.log(deadline)
```

You can also use the instance method:

```ts
const client = new DedlineSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Deadline()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
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
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DedlineSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

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

Create an instance: `const deadline = client.Deadline()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `general` | `any[]` |  |
| `primary` | `any[]` |  |

#### Example: List

```ts
const deadlines = await client.Deadline().list()
```


### RegistrationFeature

Create an instance: `const registration_feature = client.RegistrationFeature()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const registration_features = await client.RegistrationFeature().list()
```


### Stat

Create an instance: `const stat = client.Stat()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_updated` | `string` |  |
| `online_registration_available` | `number` |  |
| `same_day_registration_available` | `number` |  |
| `total_state` | `number` |  |

#### Example: Load

```ts
const stat = await client.Stat().load()
```


### State

Create an instance: `const state = client.State()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deadline` | `string` |  |
| `emoji` | `string` |  |
| `general_election_date` | `string` |  |
| `label` | `string` |  |
| `last_minute_accepted` | `boolean` |  |
| `note` | `string` |  |
| `online_accepted` | `boolean` |  |
| `primary_date` | `string` |  |
| `primary_deadline` | `string` |  |
| `url` | `string` |  |
| `value` | `string` |  |

#### Example: Load

```ts
const state = await client.State().load()
```

#### Example: List

```ts
const states = await client.State().list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const deadline = client.Deadline()
await deadline.list()

// deadline.data() now returns the deadline data from the last `list`
// deadline.match() returns the last match criteria
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
