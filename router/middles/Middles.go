package middles

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

//token拦截
func TokenMiddle(c *gin.Context) {

	p := "/page"
	p1 := "/static"
	p2 := "/favicon"
	p3 := "/api/login"
	path := c.Request.URL.Path

	if path == "/" {
		c.Next()
		return
	}

	if strings.HasPrefix(path, p) || strings.HasPrefix(path, p1) || strings.HasPrefix(path, p2) || strings.HasPrefix(path, p3) {
		c.Next()
		return
	}

	token := c.Request.Header.Get("auth")
	if token == "" {
		c.JSON(http.StatusInternalServerError, "登录超时，请从新登录")
		c.Abort()
	}

}
