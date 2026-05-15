<?php
declare(strict_types=1);

// Dedline SDK utility: prepare_body

class DedlinePrepareBody
{
    public static function call(DedlineContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
