# Dedline SDK configuration

module DedlineConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Dedline",
        "slug" => "dedline",
        "version" => "0.0.1",
        "target" => "rb",
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
              "name" => "general",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "primary",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "deadline",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
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
                },
              ],
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
                },
                {
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "stat" => {
          "fields" => [
            {
              "name" => "lastUpdated",
              "req" => true,
              "short" => "Date when the data was last updated",
              "type" => "`$STRING`",
            },
            {
              "name" => "onlineRegistrationAvailable",
              "req" => true,
              "short" => "Number of states that offer online registration",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "sameDayRegistrationAvailable",
              "req" => true,
              "short" => "Number of states that allow same-day registration",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "totalStates",
              "req" => true,
              "short" => "Total number of states (including DC)",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "stat",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "state" => {
          "fields" => [
            {
              "name" => "deadline",
              "req" => true,
              "short" => "General election voter registration deadline in YYYYMMDD format",
              "type" => "`$STRING`",
            },
            {
              "name" => "emoji",
              "req" => true,
              "short" => "State-themed emoji",
              "type" => "`$STRING`",
            },
            {
              "name" => "generalElectionDate",
              "req" => true,
              "short" => "General election date in YYYYMMDD format",
              "type" => "`$STRING`",
            },
            {
              "name" => "label",
              "req" => true,
              "short" => "Full state name",
              "type" => "`$STRING`",
            },
            {
              "name" => "lastMinuteAccepted",
              "req" => true,
              "short" => "Whether voters can register on election day",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "notes",
              "short" => "Additional details about state registration",
              "type" => "`$STRING`",
            },
            {
              "name" => "onlineAccepted",
              "req" => true,
              "short" => "Whether voters can register online",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "primaryDate",
              "req" => true,
              "short" => "Primary election date in YYYYMMDD format",
              "type" => "`$STRING`",
            },
            {
              "name" => "primaryDeadline",
              "req" => true,
              "short" => "Primary election voter registration deadline in YYYYMMDD format",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "req" => true,
              "short" => "Official state voter registration website",
              "type" => "`$STRING`",
            },
            {
              "name" => "value",
              "req" => true,
              "short" => "Two-letter state abbreviation",
              "type" => "`$STRING`",
            },
          ],
          "name" => "state",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
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
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "ca",
                        "kind" => "param",
                        "name" => "state_abbreviation",
                        "orig" => "state_abbreviation",
                        "reqd" => true,
                        "type" => "`$STRING`",
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
                },
              ],
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
