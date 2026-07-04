# Typed models for the Dedline SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Deadline:
    general: Optional[list] = None
    primary: Optional[list] = None


@dataclass
class DeadlineListMatch:
    general: Optional[list] = None
    primary: Optional[list] = None


@dataclass
class RegistrationFeature:
    pass


@dataclass
class RegistrationFeatureListMatch:
    pass


@dataclass
class Stat:
    last_updated: str
    online_registration_available: int
    same_day_registration_available: int
    total_state: int


@dataclass
class StatLoadMatch:
    last_updated: Optional[str] = None
    online_registration_available: Optional[int] = None
    same_day_registration_available: Optional[int] = None
    total_state: Optional[int] = None


@dataclass
class State:
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
    note: Optional[str] = None


@dataclass
class StateLoadMatch:
    state_abbreviation: str


@dataclass
class StateListMatch:
    deadline: Optional[str] = None
    emoji: Optional[str] = None
    general_election_date: Optional[str] = None
    label: Optional[str] = None
    last_minute_accepted: Optional[bool] = None
    note: Optional[str] = None
    online_accepted: Optional[bool] = None
    primary_date: Optional[str] = None
    primary_deadline: Optional[str] = None
    url: Optional[str] = None
    value: Optional[str] = None

