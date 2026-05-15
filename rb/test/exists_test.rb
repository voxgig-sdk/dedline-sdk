# Dedline SDK exists test

require "minitest/autorun"
require_relative "../Dedline_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = DedlineSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
