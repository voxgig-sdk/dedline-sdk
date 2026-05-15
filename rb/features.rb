# Dedline SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module DedlineFeatures
  def self.make_feature(name)
    case name
    when "base"
      DedlineBaseFeature.new
    when "test"
      DedlineTestFeature.new
    else
      DedlineBaseFeature.new
    end
  end
end
