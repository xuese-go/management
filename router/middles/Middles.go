package middles

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

//token拦截
func TokenMiddle(c *gin.Context) {

	p := "/page"
	path := c.Request.URL.Path

	if path == "/" {
		c.Next()
		return
	}

	if strings.HasPrefix(path, p) {
		c.Next()
		return
	}

	token := c.Request.Header.Get("auth")
	if token == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":  "登录超时，请从新登录",
			"data": "logout",
		})
		c.Abort()
	}

}
