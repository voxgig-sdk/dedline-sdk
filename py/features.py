# Dedline SDK feature factory

from feature.base_feature import DedlineBaseFeature
from feature.test_feature import DedlineTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DedlineBaseFeature(),
        "test": lambda: DedlineTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
