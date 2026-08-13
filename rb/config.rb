# Dedline SDK configuration

module DedlineConfig
  def self.make_config
    {
      "main" => {
        "name" => "Dedline",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://dedline-api.netlify.app",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "deadline" => {},
          "registration_feature" => {},
          "stat" => {},
          "state" => {},
        },
      },
      "entity" => {
        "deadline" => {
          "fields" => [
            {
              "active" => true,
              "name" => "general",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "primary",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "deadline",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/upcoming.json",
                  "parts" => [
                    "upcoming.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "registration_feature" => {
          "fields" => [],
          "name" => "registration_feature",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/lastMinuteAccepted.json",
                  "parts" => [
                    "lastMinuteAccepted.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/onlineNotAccepted.json",
                  "parts" => [
                    "onlineNotAccepted.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "stat" => {
          "fields" => [
            {
              "active" => true,
              "name" => "lastUpdated",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "onlineRegistrationAvailable",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "sameDayRegistrationAvailable",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "totalStates",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 3,
            },
          ],
          "name" => "stat",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/stats.json",
                  "parts" => [
                    "stats.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "state" => {
          "fields" => [
            {
              "active" => true,
              "name" => "deadline",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "emoji",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "generalElectionDate",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "label",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "lastMinuteAccepted",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "notes",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "onlineAccepted",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "primaryDate",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "primaryDeadline",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "url",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "value",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 10,
            },
          ],
          "name" => "state",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/states.json",
                  "parts" => [
                    "states.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.states`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "ca",
                        "kind" => "param",
                        "name" => "state_abbreviation",
                        "orig" => "state_abbreviation",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/states/{stateAbbreviation}.json",
                  "parts" => [
                    "states",
                    "{stateAbbreviation}.json",
                  ],
                  "select" => {
                    "$action" => "state_abbreviation",
                    "exist" => [
                      "state_abbreviation",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "state",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    DedlineFeatures.make_feature(name)
  end
end
