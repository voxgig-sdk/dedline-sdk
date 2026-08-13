// Typed models for the Dedline SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/dedline-sdk/go/core"
)

// Deadline is the typed data model for the deadline entity.
type Deadline struct {
	General *[]any `json:"general,omitempty"`
	Primary *[]any `json:"primary,omitempty"`
}

// DeadlineListMatch is the typed request payload for Deadline.ListTyped.
type DeadlineListMatch struct {
	General *[]any `json:"general,omitempty"`
	Primary *[]any `json:"primary,omitempty"`
}

// RegistrationFeature is the typed data model for the registration_feature entity.
type RegistrationFeature struct {
}

// RegistrationFeatureListMatch is the typed request payload for RegistrationFeature.ListTyped.
type RegistrationFeatureListMatch struct {
}

// Stat is the typed data model for the stat entity.
type Stat struct {
	LastUpdated string `json:"lastUpdated"`
	OnlineRegistrationAvailable int `json:"onlineRegistrationAvailable"`
	SameDayRegistrationAvailable int `json:"sameDayRegistrationAvailable"`
	TotalStates int `json:"totalStates"`
}

// StatLoadMatch is the typed request payload for Stat.LoadTyped.
type StatLoadMatch struct {
	LastUpdated *string `json:"lastUpdated,omitempty"`
	OnlineRegistrationAvailable *int `json:"onlineRegistrationAvailable,omitempty"`
	SameDayRegistrationAvailable *int `json:"sameDayRegistrationAvailable,omitempty"`
	TotalStates *int `json:"totalStates,omitempty"`
}

// State is the typed data model for the state entity.
type State struct {
	Deadline string `json:"deadline"`
	Emoji string `json:"emoji"`
	GeneralElectionDate string `json:"generalElectionDate"`
	Label string `json:"label"`
	LastMinuteAccepted bool `json:"lastMinuteAccepted"`
	Notes *string `json:"notes,omitempty"`
	OnlineAccepted bool `json:"onlineAccepted"`
	PrimaryDate string `json:"primaryDate"`
	PrimaryDeadline string `json:"primaryDeadline"`
	Url string `json:"url"`
	Value string `json:"value"`
}

// StateLoadMatch is the typed request payload for State.LoadTyped.
type StateLoadMatch struct {
	StateAbbreviation string `json:"state_abbreviation"`
}

// StateListMatch is the typed request payload for State.ListTyped.
type StateListMatch struct {
	Deadline *string `json:"deadline,omitempty"`
	Emoji *string `json:"emoji,omitempty"`
	GeneralElectionDate *string `json:"generalElectionDate,omitempty"`
	Label *string `json:"label,omitempty"`
	LastMinuteAccepted *bool `json:"lastMinuteAccepted,omitempty"`
	Notes *string `json:"notes,omitempty"`
	OnlineAccepted *bool `json:"onlineAccepted,omitempty"`
	PrimaryDate *string `json:"primaryDate,omitempty"`
	PrimaryDeadline *string `json:"primaryDeadline,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
