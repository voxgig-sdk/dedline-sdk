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
            "auth": {
                "prefix": "Bearer",
            },
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
            "name": "last_updated",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "online_registration_available",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "same_day_registration_available",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "total_state",
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
            "name": "general_election_date",
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
            "name": "last_minute_accepted",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "note",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "online_accepted",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "primary_date",
            "req": True,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "primary_deadline",
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
                "method": "GET",
                "orig": "/states.json",
                "parts": [
                  "states.json",
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
                    },
                  ],
                },
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
