package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/xuese-go/management/api/login/handler"
	"github.com/xuese-go/management/pages"
	"github.com/xuese-go/management/router/middles"
)

type Router struct {
	ro *gin.Engine

	addr string

	Port int
}

func (r *Router) Run() {
	r.new()
	err := r.ro.Run(r.addr)
	if err != nil {
		fmt.Println("服务器启动错误")
	}

}

func (r *Router) new() {
	r.ro = gin.Default()

	//指定html位置
	r.ro.LoadHTMLGlob("html/**/*")

	//页面中间件
	r.ro.Use(middles.TokenMiddle)

	//加载路由
	_ = r.myRouters()

	//	绑定端口
	r.addr = fmt.Sprintf("%s:%d", "localhost", r.Port)
}

func (r *Router) myRouters() *gin.RouterGroup {

	rs := r.ro.Group("/")

	//页面分组
	rs.GET("/", pages.Index)
	page := rs.Group("/page")
	page.GET("/page/:a/:b", pages.Page)

	//api分组
	api := rs.Group("/api")
	loginRouter := api.Group("/login")
	loginRouter.POST("/login", handler.Login)

	return rs
}
