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
(0, node_test_1.describe)('DeadlineEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DEDLINE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DEDLINE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DedlineSDK.test();
        const ent = testsdk.Deadline();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DEDLINE_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'deadline.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "general", "req": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "primary", "req": false, "type": "`$ARRAY`", "index$": 1 }], "name": "deadline", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /upcoming.json", "json": "{\"operationId\":\"getUpcomingDeadlines\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"general\":[],\"primary\":[{\"daysUntil\":8,\"deadline\":\"20260202\",\"label\":\"Texas\",\"state\":\"TX\"}]},\"schema\":{\"properties\":{\"general\":{\"items\":{\"properties\":{\"daysUntil\":{\"description\":\"Number of days until the deadline\",\"example\":8,\"type\":\"integer\"},\"deadline\":{\"description\":\"Registration deadline in YYYYMMDD format\",\"example\":\"20260202\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"label\":{\"description\":\"Full state name\",\"example\":\"Texas\",\"type\":\"string\"},\"state\":{\"description\":\"Two-letter state abbreviation\",\"example\":\"TX\",\"type\":\"string\"}},\"required\":[\"state\",\"label\",\"deadline\",\"daysUntil\"],\"type\":\"object\"},\"type\":\"array\"},\"primary\":{\"items\":{\"properties\":{\"daysUntil\":{\"description\":\"Number of days until the deadline\",\"example\":8,\"type\":\"integer\"},\"deadline\":{\"description\":\"Registration deadline in YYYYMMDD format\",\"example\":\"20260202\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"},\"label\":{\"description\":\"Full state name\",\"example\":\"Texas\",\"type\":\"string\"},\"state\":{\"description\":\"Two-letter state abbreviation\",\"example\":\"TX\",\"type\":\"string\"}},\"required\":[\"state\",\"label\",\"deadline\",\"daysUntil\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/upcoming.json", "segments": [{ "lit": "upcoming.json" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "deadline", "name__orig": "deadline", "Name": "Deadline", "name_": "deadline", "name-": "deadline", "NAME": "DEADLINE", "index$": 0 }, { "active": true, "entity": "deadline", "key$": "BasicDeadlineFlow", "kind": "basic", "name": "BasicDeadlineFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "deadline_ref01" } }], "index$": 0 }] }, 'Deadline');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let deadline_ref01_data = Object.values(setup.data.existing.deadline)[0];
        // LIST
        const deadline_ref01_ent = client.Deadline();
        const deadline_ref01_match = {};
        const deadline_ref01_list = (await deadline_ref01_ent.list(deadline_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/deadline/DeadlineTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DedlineSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['deadline01', 'deadline02', 'deadline03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DEDLINE_TEST_DEADLINE_ENTID': idmap,
        'DEDLINE_TEST_LIVE': 'FALSE',
        'DEDLINE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DEDLINE_TEST_DEADLINE_ENTID'];
    const live = 'TRUE' === env.DEDLINE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DEDLINE_TEST_DEADLINE_ENTID'];
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
//# sourceMappingURL=DeadlineEntity.test.js.map