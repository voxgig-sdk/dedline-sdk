# Typed models for the Dedline SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Deadline(TypedDict, total=False):
    general: list
    primary: list


class DeadlineListMatch(TypedDict, total=False):
    general: list
    primary: list


class RegistrationFeature(TypedDict):
    pass


class RegistrationFeatureListMatch(TypedDict):
    pass


class Stat(TypedDict):
    last_updated: str
    online_registration_available: int
    same_day_registration_available: int
    total_state: int


class StatLoadMatch(TypedDict, total=False):
    last_updated: str
    online_registration_available: int
    same_day_registration_available: int
    total_state: int


class StateRequired(TypedDict):
    deadline: str
    emoji: str
    general_election_date: str
    label: str
    last_minute_accepted: bool
    online_accepted: bool
    primary_date: str
    primary_deadline: str
    url: str
    value: str


class State(StateRequired, total=False):
    note: str


class StateLoadMatch(TypedDict):
    state_abbreviation: str


class StateListMatch(TypedDict, total=False):
    deadline: str
    emoji: str
    general_election_date: str
    label: str
    last_minute_accepted: bool
    note: str
    online_accepted: bool
    primary_date: str
    primary_deadline: str
    url: str
    value: str
