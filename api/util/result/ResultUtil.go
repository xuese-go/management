package result

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type Result struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

func (r *Result) Ok() *Result {
	return &Result{
		Code: http.StatusOK,
		Msg:  "成功",
		Data: nil,
	}
}

func (r *Result) Err(msg string) *Result {
	if msg == "" {
		msg = "失败"
	}
	return &Result{
		Code: http.StatusInternalServerError,
		Msg:  msg,
		Data: nil,
	}
}

func (r *Result) WidthData(data interface{}) *Result {
	return &Result{
		Code: r.Code,
		Msg:  r.Msg,
		Data: data,
	}
}

func (r *Result) Json(c *gin.Context) {
	c.JSON(http.StatusOK, r)
}
