# frozen_string_literal: true

# Typed models for the Dedline SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Deadline entity data model.
#
# @!attribute [rw] general
#   @return [Array, nil]
#
# @!attribute [rw] primary
#   @return [Array, nil]
Deadline = Struct.new(
  :general,
  :primary,
  keyword_init: true
)

# Match filter for Deadline#list (any subset of Deadline fields).
#
# @!attribute [rw] general
#   @return [Array, nil]
#
# @!attribute [rw] primary
#   @return [Array, nil]
DeadlineListMatch = Struct.new(
  :general,
  :primary,
  keyword_init: true
)

# RegistrationFeature entity data model.
class RegistrationFeature
end

# Match filter for RegistrationFeature#list (any subset of RegistrationFeature fields).
class RegistrationFeatureListMatch
end

# Stat entity data model.
#
# @!attribute [rw] last_updated
#   @return [String]
#
# @!attribute [rw] online_registration_available
#   @return [Integer]
#
# @!attribute [rw] same_day_registration_available
#   @return [Integer]
#
# @!attribute [rw] total_state
#   @return [Integer]
Stat = Struct.new(
  :last_updated,
  :online_registration_available,
  :same_day_registration_available,
  :total_state,
  keyword_init: true
)

# Match filter for Stat#load (any subset of Stat fields).
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] online_registration_available
#   @return [Integer, nil]
#
# @!attribute [rw] same_day_registration_available
#   @return [Integer, nil]
#
# @!attribute [rw] total_state
#   @return [Integer, nil]
StatLoadMatch = Struct.new(
  :last_updated,
  :online_registration_available,
  :same_day_registration_available,
  :total_state,
  keyword_init: true
)

# State entity data model.
#
# @!attribute [rw] deadline
#   @return [String]
#
# @!attribute [rw] emoji
#   @return [String]
#
# @!attribute [rw] general_election_date
#   @return [String]
#
# @!attribute [rw] label
#   @return [String]
#
# @!attribute [rw] last_minute_accepted
#   @return [Boolean]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] online_accepted
#   @return [Boolean]
#
# @!attribute [rw] primary_date
#   @return [String]
#
# @!attribute [rw] primary_deadline
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] value
#   @return [String]
State = Struct.new(
  :deadline,
  :emoji,
  :general_election_date,
  :label,
  :last_minute_accepted,
  :note,
  :online_accepted,
  :primary_date,
  :primary_deadline,
  :url,
  :value,
  keyword_init: true
)

# Request payload for State#load.
#
# @!attribute [rw] state_abbreviation
#   @return [String]
StateLoadMatch = Struct.new(
  :state_abbreviation,
  keyword_init: true
)

# Match filter for State#list (any subset of State fields).
#
# @!attribute [rw] deadline
#   @return [String, nil]
#
# @!attribute [rw] emoji
#   @return [String, nil]
#
# @!attribute [rw] general_election_date
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] last_minute_accepted
#   @return [Boolean, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] online_accepted
#   @return [Boolean, nil]
#
# @!attribute [rw] primary_date
#   @return [String, nil]
#
# @!attribute [rw] primary_deadline
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
StateListMatch = Struct.new(
  :deadline,
  :emoji,
  :general_election_date,
  :label,
  :last_minute_accepted,
  :note,
  :online_accepted,
  :primary_date,
  :primary_deadline,
  :url,
  :value,
  keyword_init: true
)

