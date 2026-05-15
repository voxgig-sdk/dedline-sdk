
import { Context } from './Context'


class DedlineError extends Error {

  isDedlineError = true

  sdk = 'Dedline'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  DedlineError
}

