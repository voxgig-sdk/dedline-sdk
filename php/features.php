<?php
declare(strict_types=1);

// Dedline SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class DedlineFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new DedlineBaseFeature();
            case "test":
                return new DedlineTestFeature();
            default:
                return new DedlineBaseFeature();
        }
    }
}
