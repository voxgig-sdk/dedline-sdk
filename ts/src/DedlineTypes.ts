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
  lastUpdated: string
  onlineRegistrationAvailable: number
  sameDayRegistrationAvailable: number
  totalStates: number
}

export interface StatLoadMatch {
  lastUpdated?: string
  onlineRegistrationAvailable?: number
  sameDayRegistrationAvailable?: number
  totalStates?: number
}

export interface State {
  deadline: string
  emoji: string
  generalElectionDate: string
  label: string
  lastMinuteAccepted: boolean
  notes?: string
  onlineAccepted: boolean
  primaryDate: string
  primaryDeadline: string
  url: string
  value: string
}

export interface StateLoadMatch {
  state_abbreviation: string

  // Selects a custom action instead of the plain load:
  //   'state_abbreviation'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface StateListMatch {
  deadline?: string
  emoji?: string
  generalElectionDate?: string
  label?: string
  lastMinuteAccepted?: boolean
  notes?: string
  onlineAccepted?: boolean
  primaryDate?: string
  primaryDeadline?: string
  url?: string
  value?: string
}

