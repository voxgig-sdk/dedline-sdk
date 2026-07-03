
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://dedline-api.netlify.app',

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      deadline: {
      },

      registration_feature: {
      },

      stat: {
      },

      state: {
      },

    }
  }


  entity = {
    "deadline": {
      "fields": [
        {
          "active": true,
          "name": "general",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "primary",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 1
        }
      ],
      "name": "deadline",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/upcoming.json",
              "parts": [
                "upcoming.json"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
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
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/lastMinuteAccepted.json",
              "parts": [
                "lastMinuteAccepted.json"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/onlineNotAccepted.json",
              "parts": [
                "onlineNotAccepted.json"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 1
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "stat": {
      "fields": [
        {
          "active": true,
          "name": "last_updated",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "online_registration_available",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "same_day_registration_available",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "total_state",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 3
        }
      ],
      "name": "stat",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/stats.json",
              "parts": [
                "stats.json"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "state": {
      "fields": [
        {
          "active": true,
          "name": "deadline",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "emoji",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "general_election_date",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "label",
          "req": true,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "last_minute_accepted",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 4
        },
        {
          "active": true,
          "name": "note",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "online_accepted",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 6
        },
        {
          "active": true,
          "name": "primary_date",
          "req": true,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "primary_deadline",
          "req": true,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "url",
          "req": true,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "value",
          "req": true,
          "type": "`$STRING`",
          "index$": 10
        }
      ],
      "name": "state",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/states.json",
              "parts": [
                "states.json"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "ca",
                    "kind": "param",
                    "name": "state_abbreviation",
                    "orig": "state_abbreviation",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/states/{stateAbbreviation}.json",
              "parts": [
                "states",
                "{stateAbbreviation}.json"
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
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "state"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

