"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Dedline',
        slug: "dedline",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://dedline-api.netlify.app",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            deadline: {},
            registration_feature: {},
            stat: {},
            state: {},
        }
    };
    entity = {
        "deadline": {
            "fields": [
                {
                    "name": "general",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "primary",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "deadline",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/upcoming.json",
                            "segments": [
                                {
                                    "lit": "upcoming.json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "upcoming.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "registration_feature": {
            "fields": [],
            "name": "registration_feature",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/lastMinuteAccepted.json",
                            "segments": [
                                {
                                    "lit": "lastMinuteAccepted.json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "lastMinuteAccepted.json"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/onlineNotAccepted.json",
                            "segments": [
                                {
                                    "lit": "onlineNotAccepted.json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "onlineNotAccepted.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "stat": {
            "fields": [
                {
                    "format": "date",
                    "name": "lastUpdated",
                    "req": true,
                    "short": "Date when the data was last updated",
                    "type": "`$STRING`"
                },
                {
                    "name": "onlineRegistrationAvailable",
                    "req": true,
                    "short": "Number of states that offer online registration",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "sameDayRegistrationAvailable",
                    "req": true,
                    "short": "Number of states that allow same-day registration",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "totalStates",
                    "req": true,
                    "short": "Total number of states (including DC)",
                    "type": "`$INTEGER`"
                }
            ],
            "name": "stat",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/stats.json",
                            "segments": [
                                {
                                    "lit": "stats.json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "stats.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "state": {
            "fields": [
                {
                    "name": "deadline",
                    "req": true,
                    "short": "General election voter registration deadline in YYYYMMDD format",
                    "type": "`$STRING`"
                },
                {
                    "name": "emoji",
                    "req": true,
                    "short": "State-themed emoji",
                    "type": "`$STRING`"
                },
                {
                    "name": "generalElectionDate",
                    "req": true,
                    "short": "General election date in YYYYMMDD format",
                    "type": "`$STRING`"
                },
                {
                    "name": "label",
                    "req": true,
                    "short": "Full state name",
                    "type": "`$STRING`"
                },
                {
                    "name": "lastMinuteAccepted",
                    "req": true,
                    "short": "Whether voters can register on election day",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "notes",
                    "short": "Additional details about state registration",
                    "type": "`$STRING`"
                },
                {
                    "name": "onlineAccepted",
                    "req": true,
                    "short": "Whether voters can register online",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "primaryDate",
                    "req": true,
                    "short": "Primary election date in YYYYMMDD format",
                    "type": "`$STRING`"
                },
                {
                    "name": "primaryDeadline",
                    "req": true,
                    "short": "Primary election voter registration deadline in YYYYMMDD format",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "req": true,
                    "short": "Official state voter registration website",
                    "type": "`$STRING`"
                },
                {
                    "name": "value",
                    "req": true,
                    "short": "Two-letter state abbreviation",
                    "type": "`$STRING`"
                }
            ],
            "name": "state",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/states.json",
                            "segments": [
                                {
                                    "lit": "states.json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.states`"
                            },
                            "parts": [
                                "states.json"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "ca",
                                        "kind": "param",
                                        "name": "state_abbreviation",
                                        "orig": "state_abbreviation",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/states/{stateAbbreviation}.json",
                            "segments": [
                                {
                                    "lit": "states"
                                },
                                {
                                    "lit": "{stateAbbreviation}.json"
                                }
                            ],
                            "select": {
                                "$action": "state_abbreviation",
                                "exist": [
                                    "state_abbreviation"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "states",
                                "{stateAbbreviation}.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map