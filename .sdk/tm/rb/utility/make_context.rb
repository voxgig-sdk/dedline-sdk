# Dedline SDK utility: make_context
require_relative '../core/context'
module DedlineUtilities
  MakeContext = ->(ctxmap, basectx) {
    DedlineContext.new(ctxmap, basectx)
  }
end
