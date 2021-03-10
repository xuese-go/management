package dba

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"sync"
)

var db *gorm.DB
var one sync.Once

type dbStruct struct {
	dbType string
	addr   string
}

func init() {
	var err error
	one.Do(func() {
		db, err = open()
	})
	if err != nil {
		panic(err)
	}
}
func open() (*gorm.DB, error) {
	d := &dbStruct{
		addr:   "root:root@tcp(localhost:3306)/management?charset=utf8&parseTime=True&loc=Local",
		dbType: "mysql",
	}
	db, err := gorm.Open(d.dbType, d.addr)
	//正常运行不应该放开此行，否则会报 sql:database is closed
	//defer db.Close()

	if err != nil {
		return nil, err
	}

	// 自动迁移
	//db.AutoMigrate(&login.StructLogin{})

	return db, nil
}

func GetDB() *gorm.DB {
	//开启debug，输出sql
	db = db.Debug()
	return db
}
