package login

import (
	"github.com/gin-gonic/gin"
	"github.com/xuese-go/management/api/util/result"
	"log"
)

/**
登录
*/
func Login(c *gin.Context) {
	r := &result.Result{}
	model := StructLogin{}
	err := c.ShouldBind(&model)

	if err != nil {
		r = r.Err("账号密码错误")
		c.JSON(r.Code, r.Msg)
		log.Panicln(err)
		return
	}

	r = model.Login()
	c.JSON(r.Code, r)

}
