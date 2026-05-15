<?php
declare(strict_types=1);

// Dedline SDK utility: feature_add

class DedlineFeatureAdd
{
    public static function call(DedlineContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
