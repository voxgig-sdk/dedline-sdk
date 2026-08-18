# Dedline SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "general",
            "type": "`$ARRAY`",
          },
          {
            "name": "primary",
            "type": "`$ARRAY`",
          },
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
                "parts": [
                  "upcoming.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
              },
              {
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "stat": {
        "fields": [
          {
            "name": "lastUpdated",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "onlineRegistrationAvailable",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "sameDayRegistrationAvailable",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "totalStates",
            "req": True,
            "type": "`$INTEGER`",
          },
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
                "parts": [
                  "stats.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "state": {
        "fields": [
          {
            "name": "deadline",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "emoji",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "generalElectionDate",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "label",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "lastMinuteAccepted",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "notes",
            "type": "`$STRING`",
          },
          {
            "name": "onlineAccepted",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "primaryDate",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "primaryDeadline",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "value",
            "req": True,
            "type": "`$STRING`",
          },
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
                "parts": [
                  "states.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.states`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
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
              },
            ],
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
