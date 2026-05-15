package core

type DedlineError struct {
	IsDedlineError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewDedlineError(code string, msg string, ctx *Context) *DedlineError {
	return &DedlineError{
		IsDedlineError: true,
		Sdk:              "Dedline",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *DedlineError) Error() string {
	return e.Msg
}
