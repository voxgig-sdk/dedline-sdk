-- Typed models for the Dedline SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Deadline
---@field general? table
---@field primary? table

---@class DeadlineListMatch
---@field general? table
---@field primary? table

---@class RegistrationFeature

---@class RegistrationFeatureListMatch

---@class Stat
---@field lastUpdated string
---@field onlineRegistrationAvailable number
---@field sameDayRegistrationAvailable number
---@field totalStates number

---@class StatLoadMatch
---@field lastUpdated? string
---@field onlineRegistrationAvailable? number
---@field sameDayRegistrationAvailable? number
---@field totalStates? number

---@class State
---@field deadline string
---@field emoji string
---@field generalElectionDate string
---@field label string
---@field lastMinuteAccepted boolean
---@field notes? string
---@field onlineAccepted boolean
---@field primaryDate string
---@field primaryDeadline string
---@field url string
---@field value string

---@class StateLoadMatch
---@field state_abbreviation string

---@class StateListMatch
---@field deadline? string
---@field emoji? string
---@field generalElectionDate? string
---@field label? string
---@field lastMinuteAccepted? boolean
---@field notes? string
---@field onlineAccepted? boolean
---@field primaryDate? string
---@field primaryDeadline? string
---@field url? string
---@field value? string

local M = {}

return M
