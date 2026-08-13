# Dedline SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

DedlineUtility.registrar = ->(u) {
  u.clean = DedlineUtilities::Clean
  u.done = DedlineUtilities::Done
  u.make_error = DedlineUtilities::MakeError
  u.feature_add = DedlineUtilities::FeatureAdd
  u.feature_hook = DedlineUtilities::FeatureHook
  u.feature_init = DedlineUtilities::FeatureInit
  u.fetcher = DedlineUtilities::Fetcher
  u.make_fetch_def = DedlineUtilities::MakeFetchDef
  u.make_context = DedlineUtilities::MakeContext
  u.make_options = DedlineUtilities::MakeOptions
  u.make_request = DedlineUtilities::MakeRequest
  u.make_response = DedlineUtilities::MakeResponse
  u.make_result = DedlineUtilities::MakeResult
  u.make_point = DedlineUtilities::MakePoint
  u.make_spec = DedlineUtilities::MakeSpec
  u.make_url = DedlineUtilities::MakeUrl
  u.param = DedlineUtilities::Param
  u.prepare_auth = DedlineUtilities::PrepareAuth
  u.prepare_body = DedlineUtilities::PrepareBody
  u.prepare_headers = DedlineUtilities::PrepareHeaders
  u.prepare_method = DedlineUtilities::PrepareMethod
  u.prepare_params = DedlineUtilities::PrepareParams
  u.prepare_path = DedlineUtilities::PreparePath
  u.prepare_query = DedlineUtilities::PrepareQuery
  u.graphql_body = DedlineUtilities::GraphqlBody
  u.graphql_errors = DedlineUtilities::GraphqlErrors
  u.result_basic = DedlineUtilities::ResultBasic
  u.result_body = DedlineUtilities::ResultBody
  u.result_headers = DedlineUtilities::ResultHeaders
  u.transform_request = DedlineUtilities::TransformRequest
  u.transform_response = DedlineUtilities::TransformResponse
}
