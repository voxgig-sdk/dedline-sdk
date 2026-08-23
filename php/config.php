<?php
declare(strict_types=1);

// Dedline SDK configuration

class DedlineConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Dedline",
                "slug" => "dedline",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://dedline-api.netlify.app",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "deadline" => [],
                    "registration_feature" => [],
                    "stat" => [],
                    "state" => [],
                ],
            ],
            "entity" => [
        'deadline' => [
          'fields' => [
            [
              'name' => 'general',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'primary',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'deadline',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/upcoming.json',
                  'parts' => [
                    'upcoming.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'registration_feature' => [
          'fields' => [],
          'name' => 'registration_feature',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lastMinuteAccepted.json',
                  'parts' => [
                    'lastMinuteAccepted.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/onlineNotAccepted.json',
                  'parts' => [
                    'onlineNotAccepted.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'stat' => [
          'fields' => [
            [
              'name' => 'lastUpdated',
              'req' => true,
              'short' => 'Date when the data was last updated',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'onlineRegistrationAvailable',
              'req' => true,
              'short' => 'Number of states that offer online registration',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'sameDayRegistrationAvailable',
              'req' => true,
              'short' => 'Number of states that allow same-day registration',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'totalStates',
              'req' => true,
              'short' => 'Total number of states (including DC)',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'stat',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/stats.json',
                  'parts' => [
                    'stats.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'state' => [
          'fields' => [
            [
              'name' => 'deadline',
              'req' => true,
              'short' => 'General election voter registration deadline in YYYYMMDD format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'emoji',
              'req' => true,
              'short' => 'State-themed emoji',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'generalElectionDate',
              'req' => true,
              'short' => 'General election date in YYYYMMDD format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'label',
              'req' => true,
              'short' => 'Full state name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastMinuteAccepted',
              'req' => true,
              'short' => 'Whether voters can register on election day',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'notes',
              'short' => 'Additional details about state registration',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'onlineAccepted',
              'req' => true,
              'short' => 'Whether voters can register online',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'primaryDate',
              'req' => true,
              'short' => 'Primary election date in YYYYMMDD format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'primaryDeadline',
              'req' => true,
              'short' => 'Primary election voter registration deadline in YYYYMMDD format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'req' => true,
              'short' => 'Official state voter registration website',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
              'req' => true,
              'short' => 'Two-letter state abbreviation',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'state',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/states.json',
                  'parts' => [
                    'states.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.states`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'ca',
                        'kind' => 'param',
                        'name' => 'state_abbreviation',
                        'orig' => 'state_abbreviation',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/states/{stateAbbreviation}.json',
                  'parts' => [
                    'states',
                    '{stateAbbreviation}.json',
                  ],
                  'select' => [
                    '$action' => 'state_abbreviation',
                    'exist' => [
                      'state_abbreviation',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'state',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return DedlineFeatures::make_feature($name);
    }
}
