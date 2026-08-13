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

# Request payload for Deadline#list.
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

# Request payload for RegistrationFeature#list.
class RegistrationFeatureListMatch
end

# Stat entity data model.
#
# @!attribute [rw] lastUpdated
#   @return [String]
#
# @!attribute [rw] onlineRegistrationAvailable
#   @return [Integer]
#
# @!attribute [rw] sameDayRegistrationAvailable
#   @return [Integer]
#
# @!attribute [rw] totalStates
#   @return [Integer]
Stat = Struct.new(
  :lastUpdated,
  :onlineRegistrationAvailable,
  :sameDayRegistrationAvailable,
  :totalStates,
  keyword_init: true
)

# Request payload for Stat#load.
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] onlineRegistrationAvailable
#   @return [Integer, nil]
#
# @!attribute [rw] sameDayRegistrationAvailable
#   @return [Integer, nil]
#
# @!attribute [rw] totalStates
#   @return [Integer, nil]
StatLoadMatch = Struct.new(
  :lastUpdated,
  :onlineRegistrationAvailable,
  :sameDayRegistrationAvailable,
  :totalStates,
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
# @!attribute [rw] generalElectionDate
#   @return [String]
#
# @!attribute [rw] label
#   @return [String]
#
# @!attribute [rw] lastMinuteAccepted
#   @return [Boolean]
#
# @!attribute [rw] notes
#   @return [String, nil]
#
# @!attribute [rw] onlineAccepted
#   @return [Boolean]
#
# @!attribute [rw] primaryDate
#   @return [String]
#
# @!attribute [rw] primaryDeadline
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
  :generalElectionDate,
  :label,
  :lastMinuteAccepted,
  :notes,
  :onlineAccepted,
  :primaryDate,
  :primaryDeadline,
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

# Request payload for State#list.
#
# @!attribute [rw] deadline
#   @return [String, nil]
#
# @!attribute [rw] emoji
#   @return [String, nil]
#
# @!attribute [rw] generalElectionDate
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] lastMinuteAccepted
#   @return [Boolean, nil]
#
# @!attribute [rw] notes
#   @return [String, nil]
#
# @!attribute [rw] onlineAccepted
#   @return [Boolean, nil]
#
# @!attribute [rw] primaryDate
#   @return [String, nil]
#
# @!attribute [rw] primaryDeadline
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
  :generalElectionDate,
  :label,
  :lastMinuteAccepted,
  :notes,
  :onlineAccepted,
  :primaryDate,
  :primaryDeadline,
  :url,
  :value,
  keyword_init: true
)

