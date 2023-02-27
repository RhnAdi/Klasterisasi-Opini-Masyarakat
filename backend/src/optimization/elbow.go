package optimization

import (
	"errors"

	"github.com/RhnAdi/tweet_scraping/src/clustering"
)

// type struct untuk elbow info
type ElbowInfo struct {
	Kmeans    clustering.KMeans `json:"kmeans"`
	SSE       map[int]float64   `json:"sse"`
	Result    int               `json:"result"`
	Distance  map[int]float64   `json:"distance"`
	Iteration int               `json:"iteration"`
}

// fungsi untuk menghitung elbow dari sse
func Elbow(dataset [][]float64, iteration int) (ElbowInfo, error) {
	// cek jika iterasi tidak satu
	if iteration == 1 {
		return ElbowInfo{}, errors.New("iteration must > 1")
	}
	sse := map[int]float64{} // variabel untuk menampung sse
	// looping kmeans dan menyimpan sse
	centroid := [][]float64{}
	for i := 2; i < iteration; i++ {
		kmeans := clustering.KMeans{
			Dataset:   dataset,
			Kluster:   i,
			Centroids: centroid,
		}
		centroid = kmeans.Centroids
		kmeans.Exec()
		sse[i] = kmeans.SSE
	}

	var res int
	var long float64

	// menghitung jarak sse terbesar
	e := map[int]float64{}
	for docs, ss := range sse {
		if docs == 2 {
			e[2] = 0
			continue
		}
		distance := sse[docs-1] - ss
		if distance > long {
			res = docs
			long = distance
		}
		e[docs] = distance
	}

	k := clustering.KMeans{
		Dataset:   dataset,
		Kluster:   res,
		Centroids: centroid,
	}

	k.Exec()

	return ElbowInfo{
		Kmeans:    k,
		SSE:       sse,
		Iteration: iteration,
		Result:    res,
		Distance:  e,
	}, nil
}
