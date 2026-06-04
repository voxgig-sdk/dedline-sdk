
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
          "name": "general",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "primary",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "deadline",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/upcoming.json",
              "parts": [
                "upcoming.json"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
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
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/lastMinuteAccepted.json",
              "parts": [
                "lastMinuteAccepted.json"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            },
            {
              "method": "GET",
              "orig": "/onlineNotAccepted.json",
              "parts": [
                "onlineNotAccepted.json"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 1
            }
          ],
          "input": "data",
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
          "name": "last_updated",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "online_registration_available",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "same_day_registration_available",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "total_state",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "stat",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "method": "GET",
              "orig": "/stats.json",
              "parts": [
                "stats.json"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
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
          "name": "deadline",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "emoji",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "general_election_date",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "label",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "last_minute_accepted",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 4
        },
        {
          "name": "note",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "online_accepted",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 6
        },
        {
          "name": "primary_date",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        },
        {
          "name": "primary_deadline",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "value",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 10
        }
      ],
      "name": "state",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/states.json",
              "parts": [
                "states.json"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
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
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
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

