package dba

import (
	"github.com/xuese-go/management/api/login/service"
	"testing"
)

func TestGetDB(t *testing.T) {
	db := GetDB()
	db.AutoMigrate(&service.StructLogin{})
	defer db.Close()
}
