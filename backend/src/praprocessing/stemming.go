package praprocessing

import (
	"github.com/RadhiFadlillah/go-sastrawi"
	twitterscraper "github.com/n0madic/twitter-scraper"
)

// membuat type stemming response
type StemmingResponse struct {
	Data  []string // berisi text tweet hasil stemming
	Count int      // jumlah text tweet hasil stemming
}

// fungsi untuk melakukan tahap stemming menggunakan library sastrawi
func Stemming(dataset []*twitterscraper.Tweet, stemming bool, sw []string) (StemmingResponse, error) {
	var res StemmingResponse                   // inisialisasi stemming reponse
	stopword := sastrawi.DefaultStopword()     // inisialisasi stopword
	dictionary := sastrawi.DefaultDictionary() // inisialisasi dictionary
	stemmer := sastrawi.NewStemmer(dictionary) // inisialisasi stemmer

	stopword.Add(sw...)

	// me-looping file-file scraping untuk di stemming
	for _, tweet := range dataset {

		var tweet_stamming string // variabel berisi tweet hasil stemming

		// membersihkan text tweet dan melakukan tokenizing
		// kemudian me-looping nya
		for _, word := range sastrawi.Tokenize(Clean(tweet.Text)) {
			// melakukan stopword
			if stopword.Contains(word) {
				continue
			}

			// melakukan stemming sesuai parameter boolean
			if stemming {
				tweet_stamming = tweet_stamming + " " + stemmer.Stem(word)
			} else {
				tweet_stamming = tweet_stamming + " " + word
			}

		}
		res.Data = append(res.Data, tweet_stamming) // menambah text hasil stemming
		res.Count++                                 // menambah jumlah data
	}

	return res, nil
}
