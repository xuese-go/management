package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/xuese-go/management/api/acc"
	"github.com/xuese-go/management/api/login"
	"github.com/xuese-go/management/pages"
	"github.com/xuese-go/management/router/middles"
	"time"
)

type Router struct {
	ro   *gin.Engine
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

	//静态文件
	r.ro.Static("/static", "./static")
	r.ro.StaticFile("/favicon.ico", "./static/favicon.ico")

	//指定html位置
	r.ro.LoadHTMLGlob("html/**/*")

	//日志
	log(r.ro)
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
	page.GET("/:a/:b", pages.Page)

	//api分组
	api := rs.Group("/api")

	loginRouter := api.Group("/login")
	loginRouter.POST("/login", login.Login)

	accRouter := api.Group("/acc")
	accRouter.POST("/acc/:pageNum/:pageSize", acc.Page)
	accRouter.POST("/acc", acc.Save)
	accRouter.DELETE("/acc/:id", acc.Delete)
	accRouter.PUT("/acc/:id", acc.ResetPwd)

	return rs
}

func log(router *gin.Engine) {

	// LoggerWithFormatter 中间件会将日志写入 gin.DefaultWriter
	// By default gin.DefaultWriter = os.Stdout
	router.Use(gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {

		// 你的自定义格式
		return fmt.Sprintf("%s - [%s] \"%s %s %s %d %s \"%s\" %s\"\n",
			param.ClientIP,
			param.TimeStamp.Format(time.RFC1123),
			param.Method,
			param.Path,
			param.Request.Proto,
			param.StatusCode,
			param.Latency,
			param.Request.UserAgent(),
			param.ErrorMessage,
		)
	}))
	router.Use(gin.Recovery())
}
