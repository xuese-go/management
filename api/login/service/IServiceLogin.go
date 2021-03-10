/**
https://www.bilibili.com/video/BV1U7411V78R?p=6
*/

package service

import (
	"github.com/jinzhu/gorm"
	"github.com/xuese-go/management/api/util/result"
	"github.com/xuese-go/management/dba"
	"log"
)

type StructLogin struct {
	gorm.Model
	Acc string
	Pwd string
	Ta  string
}

func init() {
	db := dba.GetDB()
	db.AutoMigrate(StructLogin{})
}

// 自定义表名
func (StructLogin) TableName() string {
	return "login_table_go"
}

func (l *StructLogin) Save() *result.Result {
	db := dba.GetDB()
	r := &result.Result{}

	model := StructLogin{}
	if err := db.Where("acc = ?", l.Acc).First(&model).Error; err != nil {
		return r.Err("")
	}

	if model.Acc != "" {
		return r.Err("账号重复")
	}

	if err := db.Create(&l).Error; err != nil {
		return r.Err("")
	}
	return r.Ok()
}
func (l *StructLogin) Remove() *result.Result {
	db := dba.GetDB()
	r := &result.Result{}
	//如果id没有值，则会删除整个库的数据，慎用
	//if err := db.Delete(&l).Error; err != nil {
	//	return err
	//}
	//软删除
	//if err := db.Where("id = ?", l.ID).Delete(StructLogin{}).Error; err != nil {
	//	return err
	//}
	//物理删除  Unscoped
	if err := db.Unscoped().Where("id = ?", l.ID).Delete(StructLogin{}).Error; err != nil {
		return r.Err("")
	}
	return r.Ok()
}
func (l *StructLogin) Update() *result.Result {
	db := dba.GetDB()
	r := &result.Result{}
	var model StructLogin
	db.First(&model)

	//不更新omit中指定的字段
	//db.Model(&model).Omit("pwd").Update(&l)
	//只更新指定字段，包括gorm.model中的字段也不更新
	//db.Model(&model).UpdateColumn("pwd","123456")
	//其它条件更新
	//if err := db.Update(l).Where("pwd = ?","123456").Error; err != nil {
	//	return &err
	//}

	//只更新select指定的字段
	if err := db.Model(&model).Select("pwd").Update(&l).Error; err != nil {
		log.Panicln(err)
		return r.Err("")
	}
	return r.Ok()
}
func (l *StructLogin) One() *result.Result {
	db := dba.GetDB()
	r := &result.Result{}
	var model StructLogin
	if err := db.Where("id = ?", l.ID).First(&model).Error; err != nil {
		return r.Err("")
	}
	return r.Ok().WidthData(model)
}
func (l *StructLogin) Page(pageNum int, pageSize int) *result.Result {
	db := dba.GetDB()
	r := &result.Result{}
	var models []StructLogin
	if err := db.Find(&models).Offset(pageNum*pageSize - 1).Limit(pageSize).Error; err != nil {
		return r.Err("")
	}
	return r.Ok().WidthData(models)
}
func (l *StructLogin) Login() *result.Result {
	db := dba.GetDB()
	r := &result.Result{}
	var model StructLogin
	if err := db.Where("acc = ?", l.Acc).First(&model).Error; err != nil {
		return r.Err("")
	}
	if l.Pwd == model.Pwd {
		return r.Ok()
	}
	return r.Err("账号密码错误")
}
