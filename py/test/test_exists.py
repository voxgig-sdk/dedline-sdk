# Dedline SDK exists test

import pytest
from dedline_sdk import DedlineSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DedlineSDK.test(None, None)
        assert testsdk is not None
