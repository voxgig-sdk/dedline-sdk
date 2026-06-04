# Dedline SDK

Look up US voter registration deadlines, primary and general election dates, and online registration availability for every state

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Dedline API

Dedline API is a static JSON API that publishes US voter-registration deadlines and related election dates for all fifty states and the District of Columbia. It is served as flat files from [dedline-api.netlify.app](https://dedline-api.netlify.app) and catalogued on [Free Public APIs](https://freepublicapis.com/dedline-api).

What you get from the API:

- Per-state objects containing the state's full name (`label`), two-letter abbreviation (`value`), and the official registration `url`.
- Registration cutoff dates: `deadline` (general election) and `primaryDeadline`, both in `YYYYMMDD` form.
- Election dates: `primaryDate` and `generalElectionDate`.
- Booleans for `onlineAccepted` (whether online voter registration is supported) and `lastMinuteAccepted` (same-day or grace-period registration).
- A `notes` field describing state-specific rules such as felony voting rights, preregistration age limits, and other quirks, plus an `emoji` identifier.
- Convenience endpoints returning the full list of states, the subset that allows same-day registration, and the subset without online registration.

The API requires no authentication. Responses are static JSON, so freshness depends on when the upstream data was last updated; CORS is reported as disabled by the Free Public APIs monitor, so browser callers may need a proxy.

## Try it

**TypeScript**
```bash
npm install dedline
```

**Python**
```bash
pip install dedline-sdk
```

**PHP**
```bash
composer require voxgig/dedline-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/dedline-sdk/go
```

**Ruby**
```bash
gem install dedline-sdk
```

**Lua**
```bash
luarocks install dedline-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { DedlineSDK } from 'dedline'

const client = new DedlineSDK({})

// List all deadlines
const deadlines = await client.Deadline().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o dedline-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "dedline": {
      "command": "/abs/path/to/dedline-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Deadline** | A registration cutoff date attached to a state, exposed via per-state JSON (for example `/AL.json`) with `deadline` and `primaryDeadline` fields in `YYYYMMDD` format. | `/upcoming.json` |
| **RegistrationFeature** | Boolean flags on each state object indicating capabilities such as `onlineAccepted` and `lastMinuteAccepted`; aggregated lists of states with or without these features are also published. | `/lastMinuteAccepted.json` |
| **Stat** | Aggregate views over the state dataset, such as the array of states that allow same-day registration and the array of states without online voter registration. | `/stats.json` |
| **State** | A US state or DC record with `label`, `value` (two-letter code), official registration `url`, election dates, deadline fields, `notes`, and an `emoji`; accessible individually by abbreviation (e.g. `/AL.json`) or as the full states array. | `/states.json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from dedline_sdk import DedlineSDK

client = DedlineSDK({})

# List all deadlines
deadlines, err = client.Deadline(None).list(None, None)
```

### PHP

```php
<?php
require_once 'dedline_sdk.php';

$client = new DedlineSDK([]);

// List all deadlines
[$deadlines, $err] = $client->Deadline(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/dedline-sdk/go"

client := sdk.NewDedlineSDK(map[string]any{})

// List all deadlines
deadlines, err := client.Deadline(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Dedline_sdk"

client = DedlineSDK.new({})

# List all deadlines
deadlines, err = client.Deadline(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("dedline_sdk")

local client = sdk.new({})

-- List all deadlines
local deadlines, err = client:Deadline(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = DedlineSDK.test()
const result = await client.Deadline().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = DedlineSDK.test(None, None)
result, err = client.Deadline(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = DedlineSDK::test(null, null);
[$result, $err] = $client->Deadline(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Deadline(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = DedlineSDK.test(nil, nil)
result, err = client.Deadline(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Deadline(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Dedline API

- Upstream: [https://dedline-api.netlify.app](https://dedline-api.netlify.app)
- API docs: [https://freepublicapis.com/dedline-api](https://freepublicapis.com/dedline-api)

- Listed as Open Source on the Free Public APIs catalogue.
- No formal licence text is published on the API homepage; consult the project's GitHub repository for the exact terms before redistribution.
- Data is sourced from publicly available state election authorities; verify against official state sources before relying on it for legal or civic-tech use.

---

Generated from the Dedline API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
