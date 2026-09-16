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
(0, node_test_1.describe)('StatEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DEDLINE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DEDLINE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DedlineSDK.test();
        const ent = testsdk.Stat();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DEDLINE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'stat.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date", "name": "lastUpdated", "req": true, "short": "Date when the data was last updated", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "onlineRegistrationAvailable", "req": true, "short": "Number of states that offer online registration", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "sameDayRegistrationAvailable", "req": true, "short": "Number of states that allow same-day registration", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "totalStates", "req": true, "short": "Total number of states (including DC)", "type": "`$INTEGER`", "index$": 3 }], "name": "stat", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /stats.json", "json": "{\"operationId\":\"getStatistics\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"lastUpdated\":\"2026-01-25\",\"onlineRegistrationAvailable\":41,\"sameDayRegistrationAvailable\":21,\"totalStates\":51},\"schema\":{\"properties\":{\"lastUpdated\":{\"description\":\"Date when the data was last updated\",\"example\":\"2026-01-25\",\"format\":\"date\",\"type\":\"string\"},\"onlineRegistrationAvailable\":{\"description\":\"Number of states that offer online registration\",\"example\":41,\"type\":\"integer\"},\"sameDayRegistrationAvailable\":{\"description\":\"Number of states that allow same-day registration\",\"example\":21,\"type\":\"integer\"},\"totalStates\":{\"description\":\"Total number of states (including DC)\",\"example\":51,\"type\":\"integer\"}},\"required\":[\"totalStates\",\"onlineRegistrationAvailable\",\"sameDayRegistrationAvailable\",\"lastUpdated\"],\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/stats.json", "segments": [{ "lit": "stats.json" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "stat", "name__orig": "stat", "Name": "Stat", "name_": "stat", "name-": "stat", "NAME": "STAT", "index$": 2 }, { "active": true, "entity": "stat", "key$": "BasicStatFlow", "kind": "basic", "name": "BasicStatFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "stat_ref01", "srcdatavar": "stat_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-stat_ref01" } }], "index$": 0 }] }, 'Stat');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let stat_ref01_data = Object.values(setup.data.existing.stat)[0];
        // LOAD
        const stat_ref01_ent = client.Stat();
        const stat_ref01_match_dt0 = {};
        const stat_ref01_data_dt0 = (await stat_ref01_ent.load(stat_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != stat_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/stat/StatTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DedlineSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['stat01', 'stat02', 'stat03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DEDLINE_TEST_STAT_ENTID': idmap,
        'DEDLINE_TEST_LIVE': 'FALSE',
        'DEDLINE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DEDLINE_TEST_STAT_ENTID'];
    const live = 'TRUE' === env.DEDLINE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DEDLINE_TEST_STAT_ENTID'];
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
//# sourceMappingURL=StatEntity.test.js.map