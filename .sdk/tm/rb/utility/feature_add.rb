# Dedline SDK utility: feature_add
module DedlineUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
