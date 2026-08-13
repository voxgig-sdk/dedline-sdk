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

/** Request payload for Deadline#list. */
class DeadlineListMatch
{
    public ?array $general = null;
    public ?array $primary = null;
}

/** RegistrationFeature entity data model. */
class RegistrationFeature
{
}

/** Request payload for RegistrationFeature#list. */
class RegistrationFeatureListMatch
{
}

/** Stat entity data model. */
class Stat
{
    public string $lastUpdated;
    public int $onlineRegistrationAvailable;
    public int $sameDayRegistrationAvailable;
    public int $totalStates;
}

/** Request payload for Stat#load. */
class StatLoadMatch
{
    public ?string $lastUpdated = null;
    public ?int $onlineRegistrationAvailable = null;
    public ?int $sameDayRegistrationAvailable = null;
    public ?int $totalStates = null;
}

/** State entity data model. */
class State
{
    public string $deadline;
    public string $emoji;
    public string $generalElectionDate;
    public string $label;
    public bool $lastMinuteAccepted;
    public ?string $notes = null;
    public bool $onlineAccepted;
    public string $primaryDate;
    public string $primaryDeadline;
    public string $url;
    public string $value;
}

/** Request payload for State#load. */
class StateLoadMatch
{
    public string $state_abbreviation;
}

/** Request payload for State#list. */
class StateListMatch
{
    public ?string $deadline = null;
    public ?string $emoji = null;
    public ?string $generalElectionDate = null;
    public ?string $label = null;
    public ?bool $lastMinuteAccepted = null;
    public ?string $notes = null;
    public ?bool $onlineAccepted = null;
    public ?string $primaryDate = null;
    public ?string $primaryDeadline = null;
    public ?string $url = null;
    public ?string $value = null;
}

