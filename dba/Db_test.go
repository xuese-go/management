package dba

import (
	"github.com/xuese-go/management/api/login"
	"testing"
)

func TestGetDB(t *testing.T) {
	db := GetDB()
	db.AutoMigrate(&login.StructLogin{})
	defer db.Close()
}
