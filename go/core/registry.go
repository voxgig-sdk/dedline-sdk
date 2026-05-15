package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewDeadlineEntityFunc func(client *DedlineSDK, entopts map[string]any) DedlineEntity

var NewRegistrationFeatureEntityFunc func(client *DedlineSDK, entopts map[string]any) DedlineEntity

var NewStatEntityFunc func(client *DedlineSDK, entopts map[string]any) DedlineEntity

var NewStateEntityFunc func(client *DedlineSDK, entopts map[string]any) DedlineEntity

