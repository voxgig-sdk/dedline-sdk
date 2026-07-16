<?php
declare(strict_types=1);

// Dedline SDK base feature

class DedlineBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(DedlineContext $ctx, array $options): void {}
    public function PostConstruct(DedlineContext $ctx): void {}
    public function PostConstructEntity(DedlineContext $ctx): void {}
    public function SetData(DedlineContext $ctx): void {}
    public function GetData(DedlineContext $ctx): void {}
    public function GetMatch(DedlineContext $ctx): void {}
    public function SetMatch(DedlineContext $ctx): void {}
    public function PrePoint(DedlineContext $ctx): void {}
    public function PreSpec(DedlineContext $ctx): void {}
    public function PreRequest(DedlineContext $ctx): void {}
    public function PreResponse(DedlineContext $ctx): void {}
    public function PreResult(DedlineContext $ctx): void {}
    public function PreDone(DedlineContext $ctx): void {}
    public function PreUnexpected(DedlineContext $ctx): void {}
}
