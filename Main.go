package main

import (
	"github.com/xuese-go/management/router"
)

func main() {
	r := &router.Router{
		Port: 9000,
	}
	r.Run()
}
