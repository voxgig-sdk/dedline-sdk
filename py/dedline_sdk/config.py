# Dedline SDK configuration


def make_config():
    return {
        "main": {
            "name": "Dedline",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://dedline-api.netlify.app",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "deadline": {},
                "registration_feature": {},
                "stat": {},
                "state": {},
            },
        },
        "entity": {
      "deadline": {
        "fields": [
          {
            "active": True,
            "name": "general",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "primary",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 1,
          },
        ],
        "name": "deadline",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/upcoming.json",
                "parts": [
                  "upcoming.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/lastMinuteAccepted.json",
                "parts": [
                  "lastMinuteAccepted.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/onlineNotAccepted.json",
                "parts": [
                  "onlineNotAccepted.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "stat": {
        "fields": [
          {
            "active": True,
            "name": "lastUpdated",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "onlineRegistrationAvailable",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "sameDayRegistrationAvailable",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "totalStates",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 3,
          },
        ],
        "name": "stat",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/stats.json",
                "parts": [
                  "stats.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "state": {
        "fields": [
          {
            "active": True,
            "name": "deadline",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "emoji",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "generalElectionDate",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "label",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "lastMinuteAccepted",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "notes",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "onlineAccepted",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "primaryDate",
            "req": True,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "primaryDeadline",
            "req": True,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "url",
            "req": True,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "value",
            "req": True,
            "type": "`$STRING`",
            "index$": 10,
          },
        ],
        "name": "state",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/states.json",
                "parts": [
                  "states.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.states`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "ca",
                      "kind": "param",
                      "name": "state_abbreviation",
                      "orig": "state_abbreviation",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/states/{stateAbbreviation}.json",
                "parts": [
                  "states",
                  "{stateAbbreviation}.json",
                ],
                "select": {
                  "$action": "state_abbreviation",
                  "exist": [
                    "state_abbreviation",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "state",
            ],
          ],
        },
      },
    },
    }
