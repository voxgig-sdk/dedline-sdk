package voxgigdedlinesdk

import (
	"github.com/voxgig-sdk/dedline-sdk/go/core"
	"github.com/voxgig-sdk/dedline-sdk/go/entity"
	"github.com/voxgig-sdk/dedline-sdk/go/feature"
	_ "github.com/voxgig-sdk/dedline-sdk/go/utility"
)

// Type aliases preserve external API.
type DedlineSDK = core.DedlineSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type DedlineEntity = core.DedlineEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type DedlineError = core.DedlineError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDeadlineEntityFunc = func(client *core.DedlineSDK, entopts map[string]any) core.DedlineEntity {
		return entity.NewDeadlineEntity(client, entopts)
	}
	core.NewRegistrationFeatureEntityFunc = func(client *core.DedlineSDK, entopts map[string]any) core.DedlineEntity {
		return entity.NewRegistrationFeatureEntity(client, entopts)
	}
	core.NewStatEntityFunc = func(client *core.DedlineSDK, entopts map[string]any) core.DedlineEntity {
		return entity.NewStatEntity(client, entopts)
	}
	core.NewStateEntityFunc = func(client *core.DedlineSDK, entopts map[string]any) core.DedlineEntity {
		return entity.NewStateEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewDedlineSDK = core.NewDedlineSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewDedlineSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *DedlineSDK  { return NewDedlineSDK(nil) }
func Test() *DedlineSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
