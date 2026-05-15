<?php
declare(strict_types=1);

// Dedline SDK utility: result_headers

class DedlineResultHeaders
{
    public static function call(DedlineContext $ctx): ?DedlineResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
