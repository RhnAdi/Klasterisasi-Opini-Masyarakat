package handler

import (
	"github.com/RhnAdi/tweet_scraping/src/optimization"
	"github.com/RhnAdi/tweet_scraping/src/scraping"
	"github.com/RhnAdi/tweet_scraping/src/tf_idf"
)

type DataResponse struct {
	Scraping   []scraping.ScrapingInfo `json:"scraping"`
	IsStemming bool                    `json:"is_stemming"`
	Corpus     []string                `json:"corpus"`
	TFIDF      tf_idf.TFIDF            `json:"tfidf"`
	Clustering optimization.ElbowInfo  `json:"clustering"`
}

type Response struct {
	Status string `json:"status"`
	Data   DataResponse
}

type GenerateParams struct {
	Stemming bool     `json:"stemming"`
	Stopword []string `json:"stopword"`
}
