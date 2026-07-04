<?php
declare(strict_types=1);

// Typed models for the Dedline SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Deadline entity data model. */
class Deadline
{
    public ?array $general = null;
    public ?array $primary = null;
}

/** Match filter for Deadline#list (any subset of Deadline fields). */
class DeadlineListMatch
{
    public ?array $general = null;
    public ?array $primary = null;
}

/** RegistrationFeature entity data model. */
class RegistrationFeature
{
}

/** Match filter for RegistrationFeature#list (any subset of RegistrationFeature fields). */
class RegistrationFeatureListMatch
{
}

/** Stat entity data model. */
class Stat
{
    public string $last_updated;
    public int $online_registration_available;
    public int $same_day_registration_available;
    public int $total_state;
}

/** Match filter for Stat#load (any subset of Stat fields). */
class StatLoadMatch
{
    public ?string $last_updated = null;
    public ?int $online_registration_available = null;
    public ?int $same_day_registration_available = null;
    public ?int $total_state = null;
}

/** State entity data model. */
class State
{
    public string $deadline;
    public string $emoji;
    public string $general_election_date;
    public string $label;
    public bool $last_minute_accepted;
    public ?string $note = null;
    public bool $online_accepted;
    public string $primary_date;
    public string $primary_deadline;
    public string $url;
    public string $value;
}

/** Request payload for State#load. */
class StateLoadMatch
{
    public string $state_abbreviation;
}

/** Match filter for State#list (any subset of State fields). */
class StateListMatch
{
    public ?string $deadline = null;
    public ?string $emoji = null;
    public ?string $general_election_date = null;
    public ?string $label = null;
    public ?bool $last_minute_accepted = null;
    public ?string $note = null;
    public ?bool $online_accepted = null;
    public ?string $primary_date = null;
    public ?string $primary_deadline = null;
    public ?string $url = null;
    public ?string $value = null;
}

