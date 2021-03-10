package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/xuese-go/management/api/login/service"
	"github.com/xuese-go/management/api/util/result"
)

/**
登录
*/
func Login(c *gin.Context) {
	r := &result.Result{}
	model := &service.StructLogin{}
	err := c.BindJSON(&model)

	if err != nil {
		r = r.Err("账号密码错误")
		c.JSON(r.Code, r)
		return
	}

	r = model.Login()
	c.JSON(r.Code, r)

}
