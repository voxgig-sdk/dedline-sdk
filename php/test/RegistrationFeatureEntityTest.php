<?php
declare(strict_types=1);

// RegistrationFeature entity test

require_once __DIR__ . '/../dedline_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class RegistrationFeatureEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = DedlineSDK::test(null, null);
        $ent = $testsdk->RegistrationFeature(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = registration_feature_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "registration_feature." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set DEDLINE_TEST_REGISTRATION_FEATURE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $registration_feature_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.registration_feature")));
        $registration_feature_ref01_data = null;
        if (count($registration_feature_ref01_data_raw) > 0) {
            $registration_feature_ref01_data = Helpers::to_map($registration_feature_ref01_data_raw[0][1]);
        }

        // LIST
        $registration_feature_ref01_ent = $client->RegistrationFeature(null);
        $registration_feature_ref01_match = [];

        $registration_feature_ref01_list_result = $registration_feature_ref01_ent->list($registration_feature_ref01_match, null);
        $this->assertIsArray($registration_feature_ref01_list_result);

    }
}

function registration_feature_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/registration_feature/RegistrationFeatureTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = DedlineSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["registration_feature01", "registration_feature02", "registration_feature03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("DEDLINE_TEST_REGISTRATION_FEATURE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "DEDLINE_TEST_REGISTRATION_FEATURE_ENTID" => $idmap,
        "DEDLINE_TEST_LIVE" => "FALSE",
        "DEDLINE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["DEDLINE_TEST_REGISTRATION_FEATURE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["DEDLINE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new DedlineSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["DEDLINE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["DEDLINE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
