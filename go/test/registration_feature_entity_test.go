package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/dedline-sdk/go"
	"github.com/voxgig-sdk/dedline-sdk/go/core"

	vs "github.com/voxgig-sdk/dedline-sdk/go/utility/struct"
)

func TestRegistrationFeatureEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RegistrationFeature(nil)
		if ent == nil {
			t.Fatal("expected non-nil RegistrationFeatureEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := registration_featureBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "registration_feature." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set DEDLINE_TEST_REGISTRATION_FEATURE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		registrationFeatureRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.registration_feature", setup.data)))
		var registrationFeatureRef01Data map[string]any
		if len(registrationFeatureRef01DataRaw) > 0 {
			registrationFeatureRef01Data = core.ToMapAny(registrationFeatureRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = registrationFeatureRef01Data

		// LIST
		registrationFeatureRef01Ent := client.RegistrationFeature(nil)
		registrationFeatureRef01Match := map[string]any{}

		registrationFeatureRef01ListResult, err := registrationFeatureRef01Ent.List(registrationFeatureRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, registrationFeatureRef01ListOk := registrationFeatureRef01ListResult.([]any)
		if !registrationFeatureRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", registrationFeatureRef01ListResult)
		}

	})
}

func registration_featureBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "registration_feature", "RegistrationFeatureTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read registration_feature test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse registration_feature test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"registration_feature01", "registration_feature02", "registration_feature03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("DEDLINE_TEST_REGISTRATION_FEATURE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DEDLINE_TEST_REGISTRATION_FEATURE_ENTID": idmap,
		"DEDLINE_TEST_LIVE":      "FALSE",
		"DEDLINE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["DEDLINE_TEST_REGISTRATION_FEATURE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["DEDLINE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewDedlineSDK(core.ToMapAny(mergedOpts))
	}

	live := env["DEDLINE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["DEDLINE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
