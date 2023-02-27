package handler

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"sync"

	"github.com/RhnAdi/tweet_scraping/src/optimization"
	"github.com/RhnAdi/tweet_scraping/src/praprocessing"
	"github.com/RhnAdi/tweet_scraping/src/scraping"
	"github.com/RhnAdi/tweet_scraping/src/tf_idf"
	"github.com/gin-gonic/gin"
	twitterscraper "github.com/n0madic/twitter-scraper"
)

type ExistScraping struct {
	Title string
	File  string
}

func ExistGenerate(c *gin.Context) {
	// binding body parameter
	param := GenerateParams{}
	err := c.ShouldBind(&param)
	// cek error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"status":  "failed",
		})
		c.Abort()
		return
	}

	// Open File Dataset
	file_dataset := []ExistScraping{
		{"Pembelajaran Offline", "PembelajaranOffline.json"},
		{"Pembelajaran Tatap Muka", "PembelajaranTatapMuka.json"},
		{"Sekolah Luring", "SekolahLuring.json"},
		{"Sekolah Tatap Muka", "SekolahTatapMuka.json"},
		{"Sekolah Offline", "SekolahOffline.json"},
	}

	dataset := []*twitterscraper.Tweet{}      // menampung dataset
	res_scraping := []scraping.ScrapingInfo{} // menampung response untuk scraping
	wg_scraping := sync.WaitGroup{}           // initial waitgroup untuk scraping
	wg_scraping.Add(len(file_dataset))        // menambahkan counter waitgroup untuk scraping

	// membuka file dataset
	for _, file := range file_dataset {
		go func(filename string, title string) {
			content, err := ioutil.ReadFile("./dataset/" + filename)
			if err != nil {
				fmt.Println("Error when opening file: ", err)
			}

			var payload []*twitterscraper.Tweet
			err = json.Unmarshal(content, &payload)
			if err != nil {
				fmt.Println("Error during Unmarshal(): ", err)
			}
			res := scraping.ScrapingInfo{
				Keyword:      title,
				Count:        len(payload),
				Data:         payload,
				MaxTweetsNbr: 0,
				Error:        err,
			}
			res_scraping = append(res_scraping, res)

			r := 0 // menampung angka random untuk index awal dataset yang akan digunakan
			// me-random angka
			for {
				r = rand.Intn(res.Count-0) + 0
				if r+200 < res.Count {
					break
				}
			}
			// menambahkan dataset
			dataset = append(dataset, payload[r:r+199]...)
			defer wg_scraping.Done()
		}(file.File, file.Title)
	}
	wg_scraping.Wait()

	// Tahap Praproccesing
	ch := make(chan praprocessing.StemmingResponse)
	var wg_preprocessesing sync.WaitGroup
	wg_preprocessesing.Add(1)
	// eksekusi tahap preprocessing
	go praprocessing.Exec(dataset, param.Stemming, param.Stopword, ch, &wg_preprocessesing)
	defer close(ch)

	// Tahap TF_IDF
	corpus := praprocessing.StemmingResponse{}
	corpus = <-ch
	initTFIDF := tf_idf.InitTFIDF(corpus.Data)
	// eksekusi tahap TFIDF
	initTFIDF.Exec()

	// Tahap Optimization dan Clustering
	opt, err := optimization.Elbow(initTFIDF.Result, 11)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "failed",
			"message": err.Error(),
		})
		c.Abort()
		return
	}

	c.JSON(200, Response{
		Status: "success",
		Data: DataResponse{
			Scraping:   res_scraping,
			Corpus:     corpus.Data,
			IsStemming: false,
			TFIDF:      *initTFIDF,
			Clustering: opt,
		},
	})
}
