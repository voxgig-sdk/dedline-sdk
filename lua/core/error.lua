-- Dedline SDK error

local DedlineError = {}
DedlineError.__index = DedlineError


function DedlineError.new(code, msg, ctx)
  local self = setmetatable({}, DedlineError)
  self.is_sdk_error = true
  self.sdk = "Dedline"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function DedlineError:error()
  return self.msg
end


function DedlineError:__tostring()
  return self.msg
end


return DedlineError
