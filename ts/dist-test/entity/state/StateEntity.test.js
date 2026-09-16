"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('StateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DEDLINE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DEDLINE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DedlineSDK.test();
        const ent = testsdk.State();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DEDLINE_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'state.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "deadline", "req": true, "short": "General election voter registration deadline in YYYYMMDD format", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "emoji", "req": true, "short": "State-themed emoji", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "generalElectionDate", "req": true, "short": "General election date in YYYYMMDD format", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "label", "req": true, "short": "Full state name", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "lastMinuteAccepted", "req": true, "short": "Whether voters can register on election day", "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "name": "notes", "req": false, "short": "Additional details about state registration", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "onlineAccepted", "req": true, "short": "Whether voters can register online", "type": "`$BOOLEAN`", "index$": 6 }, { "active": true, "name": "primaryDate", "req": true, "short": "Primary election date in YYYYMMDD format", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "primaryDeadline", "req": true, "short": "Primary election voter registration deadline in YYYYMMDD format", "type": "`$STRING`", "index$": 8 }, { "active": true, "format": "uri", "name": "url", "req": true, "short": "Official state voter registration website", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "value", "req": true, "short": "Two-letter state abbreviation", "type": "`$STRING`", "index$": 10 }], "name": "state", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /states.json", "json": "{\"operationId\":\"getAllStates\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"states\":[{\"deadline\":\"20261019\",\"emoji\":\"🌴🌴🌴🌴🌴\",\"generalElectionDate\":\"20261103\",\"label\":\"California\",\"lastMinuteAccepted\":true,\"notes\":\"In California, those convicted of felonies can register and vote after serving their sentence.\",\"onlineAccepted\":true,\"primaryDate\":\"20260602\",\"primaryDeadline\":\"20260518\",\"url\":\"https://www.sos.ca.gov/elections/voter-registration/\",\"value\":\"CA\"}]},\"schema\":{\"properties\":{\"states\":{\"items\":{\"properties\":{\"deadline\":{\"description\":\"General election voter registration deadline in YYYYMMDD format\",\"example\":\"20261019\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"emoji\":{\"description\":\"State-themed emoji\",\"example\":\"🌴🌴🌴🌴🌴\",\"type\":\"string\"},\"generalElectionDate\":{\"description\":\"General election date in YYYYMMDD format\",\"example\":\"20261103\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"label\":{\"description\":\"Full state name\",\"example\":\"California\",\"type\":\"string\"},\"lastMinuteAccepted\":{\"description\":\"Whether voters can register on election day\",\"example\":true,\"type\":\"boolean\"},\"notes\":{\"description\":\"Additional details about state registration\",\"example\":\"In California, those convicted of felonies can register and vote after serving their sentence.\",\"type\":\"string\"},\"onlineAccepted\":{\"description\":\"Whether voters can register online\",\"example\":true,\"type\":\"boolean\"},\"primaryDate\":{\"description\":\"Primary election date in YYYYMMDD format\",\"example\":\"20260602\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"primaryDeadline\":{\"description\":\"Primary election voter registration deadline in YYYYMMDD format\",\"example\":\"20260518\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"url\":{\"description\":\"Official state voter registration website\",\"example\":\"https://www.sos.ca.gov/elections/voter-registration/\",\"format\":\"uri\",\"type\":\"string\"},\"value\":{\"description\":\"Two-letter state abbreviation\",\"example\":\"CA\",\"type\":\"string\"}},\"required\":[\"label\",\"value\",\"deadline\",\"primaryDeadline\",\"primaryDate\",\"generalElectionDate\",\"url\",\"onlineAccepted\",\"lastMinuteAccepted\",\"emoji\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/states.json", "segments": [{ "lit": "states.json" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.states`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "ca", "kind": "param", "name": "state_abbreviation", "orig": "state_abbreviation", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /states/{stateAbbreviation}.json", "json": "{\"operationId\":\"getStateByAbbreviation\",\"parameters\":[{\"description\":\"Two-letter state abbreviation (e.g., CA, NY, TX). Case-insensitive.\",\"in\":\"path\",\"name\":\"stateAbbreviation\",\"required\":true,\"schema\":{\"example\":\"ca\",\"pattern\":\"^[A-Za-z]{2}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"deadline\":\"20261024\",\"emoji\":\"🗽🗽🗽🗽🗽\",\"generalElectionDate\":\"20261103\",\"label\":\"New York\",\"lastMinuteAccepted\":false,\"notes\":\"In New York, those with felony convictions get their voting rights restored after serving their sentence!\",\"onlineAccepted\":true,\"primaryDate\":\"20260623\",\"primaryDeadline\":\"20260528\",\"url\":\"https://www.ny.gov/services/register-vote\",\"value\":\"NY\"},\"schema\":{\"properties\":{\"deadline\":{\"description\":\"General election voter registration deadline in YYYYMMDD format\",\"example\":\"20261019\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"emoji\":{\"description\":\"State-themed emoji\",\"example\":\"🌴🌴🌴🌴🌴\",\"type\":\"string\"},\"generalElectionDate\":{\"description\":\"General election date in YYYYMMDD format\",\"example\":\"20261103\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"label\":{\"description\":\"Full state name\",\"example\":\"California\",\"type\":\"string\"},\"lastMinuteAccepted\":{\"description\":\"Whether voters can register on election day\",\"example\":true,\"type\":\"boolean\"},\"notes\":{\"description\":\"Additional details about state registration\",\"example\":\"In California, those convicted of felonies can register and vote after serving their sentence.\",\"type\":\"string\"},\"onlineAccepted\":{\"description\":\"Whether voters can register online\",\"example\":true,\"type\":\"boolean\"},\"primaryDate\":{\"description\":\"Primary election date in YYYYMMDD format\",\"example\":\"20260602\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"primaryDeadline\":{\"description\":\"Primary election voter registration deadline in YYYYMMDD format\",\"example\":\"20260518\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"url\":{\"description\":\"Official state voter registration website\",\"example\":\"https://www.sos.ca.gov/elections/voter-registration/\",\"format\":\"uri\",\"type\":\"string\"},\"value\":{\"description\":\"Two-letter state abbreviation\",\"example\":\"CA\",\"type\":\"string\"}},\"required\":[\"label\",\"value\",\"deadline\",\"primaryDeadline\",\"primaryDate\",\"generalElectionDate\",\"url\",\"onlineAccepted\",\"lastMinuteAccepted\",\"emoji\"],\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"State not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/states/{stateAbbreviation}.json", "segments": [{ "lit": "states" }, { "lit": "{stateAbbreviation}.json" }], "select": { "$action": "state_abbreviation", "exist": ["state_abbreviation"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "state", "name__orig": "state", "Name": "State", "name_": "state", "name-": "state", "NAME": "STATE", "index$": 3 }, { "active": true, "entity": "state", "key$": "BasicStateFlow", "kind": "basic", "name": "BasicStateFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "state_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "state_ref01", "srcdatavar": "state_ref01_data", "suffix": "_dt0" }, "match": { "state_abbreviation": "state_abbreviation01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-state_ref01" } }], "index$": 1 }] }, 'State');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let state_ref01_data = Object.values(setup.data.existing.state)[0];
        // LIST
        const state_ref01_ent = client.State();
        const state_ref01_match = {};
        const state_ref01_list = (await state_ref01_ent.list(state_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/state/StateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DedlineSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['state01', 'state02', 'state03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DEDLINE_TEST_STATE_ENTID': idmap,
        'DEDLINE_TEST_LIVE': 'FALSE',
        'DEDLINE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DEDLINE_TEST_STATE_ENTID'];
    const live = 'TRUE' === env.DEDLINE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DEDLINE_TEST_STATE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DedlineSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.DEDLINE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=StateEntity.test.js.map