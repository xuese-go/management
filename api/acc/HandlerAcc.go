package acc

import (
	"github.com/gin-gonic/gin"
	"github.com/xuese-go/management/api/login"
	"github.com/xuese-go/management/api/util/result"
	"strconv"
)

/**
分页
*/
func Page(c *gin.Context) {

	r := &result.Result{}
	model := login.StructLogin{}
	if err := c.ShouldBind(&model); err != nil {
		r = r.Err("参数有误")
	} else {
		if pageNum, err := strconv.Atoi(c.Param("pageNum")); err != nil {
			r = r.Err("分页参数有误")
		} else {
			if pageSize, err := strconv.Atoi(c.Param("pageSize")); err != nil {
				r = r.Err("分页参数有误")
			} else {
				r = model.Page(pageNum, pageSize)
			}
		}
	}
	r.Json(c)
}

func Save(c *gin.Context) {

	r := &result.Result{}
	model := login.StructLogin{}
	if err := c.ShouldBind(&model); err != nil {
		r = r.Err("参数有误")
	} else {
		r = model.Save()
	}
	r.Json(c)
}

func Delete(c *gin.Context) {

	r := &result.Result{}
	model := login.StructLogin{}
	id := c.Param("id")
	if d, err := strconv.Atoi(id); err != nil {
		r = r.Err("参数有误")
	} else {
		model.ID = uint(d)
		r = model.Remove()
	}
	r.Json(c)
}

func ResetPwd(c *gin.Context) {

	r := &result.Result{}
	model := login.StructLogin{}
	id := c.Param("id")
	if d, err := strconv.Atoi(id); err != nil {
		r = r.Err("参数有误")
	} else {
		model.ID = uint(d)
		model.Pwd = "123456"
		r = model.Update()
	}
	r.Json(c)
}
