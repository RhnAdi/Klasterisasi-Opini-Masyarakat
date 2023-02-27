package handler

import (
	"net/http"
	"sync"

	"github.com/RhnAdi/tweet_scraping/src/entity"
	"github.com/RhnAdi/tweet_scraping/src/optimization"
	"github.com/RhnAdi/tweet_scraping/src/praprocessing"
	"github.com/RhnAdi/tweet_scraping/src/scraping"
	"github.com/RhnAdi/tweet_scraping/src/tf_idf"
	"github.com/gin-gonic/gin"
)

// keyword scraping dataset
var scrapping_data []entity.ScrapingTweet = []entity.ScrapingTweet{
	{Filename: "Sekolah Offline", Tweet: "Sekolah Offline", Query: "since:2021-10-1 until:2022-04-1"},
	{Filename: "SekolahTatapMuka", Tweet: "Sekolah Tatap Muka", Query: "since:2021-10-1 until:2022-04-1"},
	{Filename: "SekolahLuring", Tweet: "Sekolah Luring", Query: "since:2021-10-1 until:2022-04-1"},
	{Filename: "PembelajaranOffline", Tweet: "Pembelajaran Offline", Query: "since:2021-10-1 until:2022-04-1"},
	{Filename: "PembelajaranTatapMuka", Tweet: "Pembelajaran Tatap Muka", Query: "since:2021-10-1 until:2022-04-1"},
}

// fungsi handler untuk meng-generate data baru
func NewGenerate(c *gin.Context) {
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

	// Tahap Scraping
	var wg sync.WaitGroup // initial waitgroup
	// membuat channel untuk menampung data scraping
	ch_scraping := make(chan scraping.ScrapingInfo, len(scrapping_data))
	wg.Add(len(scrapping_data)) // set waitgroup dengan panjang data scraping
	// looping scraping
	for _, data := range scrapping_data {
		// memanggil fungsi scraping
		go scraping.Scraping(data.Tweet, data.Query, data.Filename, ch_scraping, &wg)
	}
	wg.Wait()          // menunggu waitgroup
	close(ch_scraping) // menutup channel

	// menggabungkan dataset hasil scraping
	var err_list string = ""
	scraping_info := []scraping.ScrapingInfo{}
	for info := range ch_scraping {
		if info.Error != nil {
			err_list = info.Error.Error()
		}
		scraping_info = append(scraping_info, info)
	}

	if len(err_list) > 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err_list,
			"status":  "failed",
		})
		c.Abort()
		return
	}

	// Tahap Praproccesing
	ch := make(chan praprocessing.StemmingResponse, len(scrapping_data))
	var wg_preprocessesing sync.WaitGroup
	wg_preprocessesing.Add(len(scrapping_data))
	for _, data := range scraping_info {
		go praprocessing.Exec(data.Data, param.Stemming, param.Stopword, ch, &wg_preprocessesing)
	}
	wg_preprocessesing.Wait()
	close(ch)

	// Tahap TF_IDF
	corpus := []string{}
	corpus_len := 0

	for dataset := range ch {
		corpus = append(corpus, dataset.Data...)
		corpus_len += dataset.Count
	}

	initTFIDF := tf_idf.InitTFIDF(corpus)

	initTFIDF.Exec()

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
			Scraping:   scraping_info,
			Corpus:     corpus,
			IsStemming: false,
			TFIDF:      *initTFIDF,
			Clustering: opt,
		},
	})
}
