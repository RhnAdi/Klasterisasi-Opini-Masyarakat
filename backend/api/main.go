package main

import (
	"github.com/RhnAdi/tweet_scraping/handler"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// inisialisasi router gin
	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders: []string{"Content-Type,access-control-allow-origin, access-control-allow-headers"},
	}))

	// define router untuk generate data baru
	r.POST("/new_data", handler.NewGenerate)

	// define router untuk data yang sudah ada
	r.POST("/existing_data", handler.ExistGenerate)

	// menjalankan server
	r.Run() // listen and serve on 0.0.0.0:8080
}
