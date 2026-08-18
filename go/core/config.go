package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Dedline",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://dedline-api.netlify.app",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"deadline": map[string]any{},
				"registration_feature": map[string]any{},
				"stat": map[string]any{},
				"state": map[string]any{},
			},
		},
		"entity": map[string]any{
			"deadline": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "general",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "primary",
						"type": "`$ARRAY`",
					},
				},
				"name": "deadline",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/upcoming.json",
								"parts": []any{
									"upcoming.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"registration_feature": map[string]any{
				"fields": []any{},
				"name": "registration_feature",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/lastMinuteAccepted.json",
								"parts": []any{
									"lastMinuteAccepted.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/onlineNotAccepted.json",
								"parts": []any{
									"onlineNotAccepted.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"stat": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "lastUpdated",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "onlineRegistrationAvailable",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "sameDayRegistrationAvailable",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "totalStates",
						"req": true,
						"type": "`$INTEGER`",
					},
				},
				"name": "stat",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/stats.json",
								"parts": []any{
									"stats.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"state": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deadline",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "emoji",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "generalElectionDate",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "label",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastMinuteAccepted",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "notes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "onlineAccepted",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "primaryDate",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primaryDeadline",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "state",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/states.json",
								"parts": []any{
									"states.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.states`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "ca",
											"kind": "param",
											"name": "state_abbreviation",
											"orig": "state_abbreviation",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/states/{stateAbbreviation}.json",
								"parts": []any{
									"states",
									"{stateAbbreviation}.json",
								},
								"select": map[string]any{
									"$action": "state_abbreviation",
									"exist": []any{
										"state_abbreviation",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"state",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
