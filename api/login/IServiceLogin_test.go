package login

import (
	"fmt"
	"github.com/xuese-go/management/api/util/md5"
	"log"
	"net/http"
	"testing"
)

func TestStructLogin_Save(t *testing.T) {
	model := &StructLogin{
		Acc: "123456@qq.com",
		Pwd: "123456",
	}
	pwd := md5.Enc(model.Pwd, model.Acc)
	model.Pwd = pwd
	err := model.Save()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("成功")
	//defer dba.GetDB().Close()
}

func TestStructLogin_Login(t *testing.T) {
	model := &StructLogin{
		Acc: "123456",
		Pwd: "123456",
	}
	if r := model.Login(); r.Code != http.StatusOK {
		log.Println(r)
		return
	}
	log.Println("登录成功")
}

func TestStructLogin_Page(t *testing.T) {
	model := &StructLogin{}
	r := model.Page(0, 10)
	fmt.Println(r)
}
