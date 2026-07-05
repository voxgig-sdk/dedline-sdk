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
---@field last_updated string
---@field online_registration_available number
---@field same_day_registration_available number
---@field total_state number

---@class StatLoadMatch
---@field last_updated? string
---@field online_registration_available? number
---@field same_day_registration_available? number
---@field total_state? number

---@class State
---@field deadline string
---@field emoji string
---@field general_election_date string
---@field label string
---@field last_minute_accepted boolean
---@field note? string
---@field online_accepted boolean
---@field primary_date string
---@field primary_deadline string
---@field url string
---@field value string

---@class StateLoadMatch
---@field state_abbreviation string

---@class StateListMatch
---@field deadline? string
---@field emoji? string
---@field general_election_date? string
---@field label? string
---@field last_minute_accepted? boolean
---@field note? string
---@field online_accepted? boolean
---@field primary_date? string
---@field primary_deadline? string
---@field url? string
---@field value? string

local M = {}

return M
