# Dedline SDK feature factory

from dedline_sdk.feature.base_feature import DedlineBaseFeature
from dedline_sdk.feature.ratelimit_feature import DedlineRatelimitFeature
from dedline_sdk.feature.retry_feature import DedlineRetryFeature
from dedline_sdk.feature.test_feature import DedlineTestFeature
from dedline_sdk.feature.timeout_feature import DedlineTimeoutFeature


_FEATURES = {
    "base": lambda: DedlineBaseFeature(),
    "ratelimit": lambda: DedlineRatelimitFeature(),
    "retry": lambda: DedlineRetryFeature(),
    "test": lambda: DedlineTestFeature(),
    "timeout": lambda: DedlineTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
