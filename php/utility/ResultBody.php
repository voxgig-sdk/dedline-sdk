<?php
declare(strict_types=1);

// Dedline SDK utility: result_body

class DedlineResultBody
{
    public static function call(DedlineContext $ctx): ?DedlineResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
