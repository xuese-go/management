package pages

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index/index.html", nil)
}

/**
页面统一跳转
*/
func Page(c *gin.Context) {
	a := c.Param("a")
	b := c.Param("b")
	path := fmt.Sprintf("%s/%s.html", a, b)
	c.HTML(http.StatusOK, path, nil)
}
