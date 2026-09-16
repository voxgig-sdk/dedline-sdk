# Dedline SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module DedlineFeatures
  def self.make_feature(name)
    case name
    when "base"
      DedlineBaseFeature.new
    when "ratelimit"
      DedlineRatelimitFeature.new
    when "retry"
      DedlineRetryFeature.new
    when "test"
      DedlineTestFeature.new
    when "timeout"
      DedlineTimeoutFeature.new
    else
      DedlineBaseFeature.new
    end
  end
end
