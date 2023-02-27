package praprocessing

import (
	"fmt"
	"sync"

	twitterscraper "github.com/n0madic/twitter-scraper"
)

// fungsi untuk menjalankan tahap preprocessing
func Exec(dataset []*twitterscraper.Tweet, stemming bool, sw []string, ch chan StemmingResponse, wg *sync.WaitGroup) {
	defer wg.Done() // menyelesaikan wait group ketika kode berakhir

	// proses stemming (jika tidak ingin stemming masukkan stemming dengan false)
	res, err := Stemming(dataset, stemming, sw)
	if err != nil {
		fmt.Println(err)
	}

	ch <- res // memasukkan res ke channel
}
