// Typed models for the Dedline SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Deadline {
  general?: any[]
  primary?: any[]
}

export interface DeadlineListMatch {
  general?: any[]
  primary?: any[]
}

export interface RegistrationFeature {
}

export interface RegistrationFeatureListMatch {
}

export interface Stat {
  last_updated: string
  online_registration_available: number
  same_day_registration_available: number
  total_state: number
}

export interface StatLoadMatch {
  last_updated?: string
  online_registration_available?: number
  same_day_registration_available?: number
  total_state?: number
}

export interface State {
  deadline: string
  emoji: string
  general_election_date: string
  label: string
  last_minute_accepted: boolean
  note?: string
  online_accepted: boolean
  primary_date: string
  primary_deadline: string
  url: string
  value: string
}

export interface StateLoadMatch {
  state_abbreviation: string
}

export interface StateListMatch {
  deadline?: string
  emoji?: string
  general_election_date?: string
  label?: string
  last_minute_accepted?: boolean
  note?: string
  online_accepted?: boolean
  primary_date?: string
  primary_deadline?: string
  url?: string
  value?: string
}

