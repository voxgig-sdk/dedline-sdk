# Dedline SDK feature factory

from dedline_sdk.feature.base_feature import DedlineBaseFeature
from dedline_sdk.feature.test_feature import DedlineTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DedlineBaseFeature(),
        "test": lambda: DedlineTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
