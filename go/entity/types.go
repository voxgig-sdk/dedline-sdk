// Typed models for the Dedline SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Deadline is the typed data model for the deadline entity.
type Deadline struct {
	General *[]any `json:"general,omitempty"`
	Primary *[]any `json:"primary,omitempty"`
}

// DeadlineListMatch mirrors the deadline fields as an all-optional match
// filter (Go analog of Partial<Deadline>).
type DeadlineListMatch struct {
	General *[]any `json:"general,omitempty"`
	Primary *[]any `json:"primary,omitempty"`
}

// RegistrationFeature is the typed data model for the registration_feature entity.
type RegistrationFeature struct {
}

// RegistrationFeatureListMatch mirrors the registration_feature fields as an all-optional match
// filter (Go analog of Partial<RegistrationFeature>).
type RegistrationFeatureListMatch struct {
}

// Stat is the typed data model for the stat entity.
type Stat struct {
	LastUpdated string `json:"last_updated"`
	OnlineRegistrationAvailable int `json:"online_registration_available"`
	SameDayRegistrationAvailable int `json:"same_day_registration_available"`
	TotalState int `json:"total_state"`
}

// StatLoadMatch mirrors the stat fields as an all-optional match
// filter (Go analog of Partial<Stat>).
type StatLoadMatch struct {
	LastUpdated *string `json:"last_updated,omitempty"`
	OnlineRegistrationAvailable *int `json:"online_registration_available,omitempty"`
	SameDayRegistrationAvailable *int `json:"same_day_registration_available,omitempty"`
	TotalState *int `json:"total_state,omitempty"`
}

// State is the typed data model for the state entity.
type State struct {
	Deadline string `json:"deadline"`
	Emoji string `json:"emoji"`
	GeneralElectionDate string `json:"general_election_date"`
	Label string `json:"label"`
	LastMinuteAccepted bool `json:"last_minute_accepted"`
	Note *string `json:"note,omitempty"`
	OnlineAccepted bool `json:"online_accepted"`
	PrimaryDate string `json:"primary_date"`
	PrimaryDeadline string `json:"primary_deadline"`
	Url string `json:"url"`
	Value string `json:"value"`
}

// StateLoadMatch is the typed request payload for State.LoadTyped.
type StateLoadMatch struct {
	StateAbbreviation string `json:"state_abbreviation"`
}

// StateListMatch mirrors the state fields as an all-optional match
// filter (Go analog of Partial<State>).
type StateListMatch struct {
	Deadline *string `json:"deadline,omitempty"`
	Emoji *string `json:"emoji,omitempty"`
	GeneralElectionDate *string `json:"general_election_date,omitempty"`
	Label *string `json:"label,omitempty"`
	LastMinuteAccepted *bool `json:"last_minute_accepted,omitempty"`
	Note *string `json:"note,omitempty"`
	OnlineAccepted *bool `json:"online_accepted,omitempty"`
	PrimaryDate *string `json:"primary_date,omitempty"`
	PrimaryDeadline *string `json:"primary_deadline,omitempty"`
	Url *string `json:"url,omitempty"`
	Value *string `json:"value,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
