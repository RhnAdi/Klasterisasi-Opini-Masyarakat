package scraping

import (
	"context"
	"sync"

	twitterscraper "github.com/n0madic/twitter-scraper"
)

var maxTweetsNbr int = 22000 // max tweet scraping

// membuat type untuk info scraping yang akan di dapat
type ScrapingInfo struct {
	Data         []*twitterscraper.Tweet `json:"data"`    // hasil scraping
	Keyword      string                  `json:"keyword"` // keyword searching
	Query        string                  `json:"query"`
	Count        int                     `json:"count"`          // jumlah tweet
	MaxTweetsNbr int                     `json:"max_tweets_nbr"` // max tweet scraping
	Error        error                   `json:"_"`              // error
}

// fungsi untuk scraping
func Scraping(tweet string, query string, filename string, ch chan ScrapingInfo, wg *sync.WaitGroup) {
	// initialisasi awal Scraping info
	res := ScrapingInfo{
		Data:         []*twitterscraper.Tweet{},
		Keyword:      tweet,
		Query:        query,
		Count:        0,
		MaxTweetsNbr: maxTweetsNbr,
	}

	scraper := twitterscraper.New() // initialisasi library twiiterscrapper

	var data []*twitterscraper.Tweet // menampung tweet ketika scraping
	count := 0                       // jumlah semua tweet

	// initialisasi rule untuk scraping
	scraper.WithReplies(true)
	scraper.SetSearchMode(twitterscraper.SearchTop)

	// tahap scraping
	for tweet := range scraper.SearchTweets(
		context.Background(),
		tweet+" "+query,
		maxTweetsNbr,
	) {
		if tweet.Error != nil {
			// jika error res.Error akan terisi dengan error dan tidak bernilai nil
			res.Error = tweet.Error
		}

		// menambah data tweet
		data = append(data, &tweet.Tweet)
		count++
	}

	res.Count = count
	res.Data = data
	ch <- res // memgisi channel dengan res yang bertipe scraping info
	wg.Done() // menyelesaikan wait group
}
