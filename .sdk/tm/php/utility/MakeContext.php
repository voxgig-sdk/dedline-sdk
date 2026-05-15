<?php
declare(strict_types=1);

// Dedline SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DedlineMakeContext
{
    public static function call(array $ctxmap, ?DedlineContext $basectx): DedlineContext
    {
        return new DedlineContext($ctxmap, $basectx);
    }
}
