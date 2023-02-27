package clustering

import (
	"math"
	"math/rand"
	"reflect"
	"time"
)

// struct untuk K-MEANS
type KMeans struct {
	Dataset    [][]float64 `json:"dataset"`
	Kluster    int         `json:"cluster"`
	Centroids  [][]float64 `json:"centroids"`
	Distance   [][]float64 `json:"distance"`
	Group      [][]float64 `json:"group"`
	Membership [][]int     `json:"membership"`
	SSE        float64     `json:"sse"`
}

func (k *KMeans) Exec() {
	// membangkitkan centroid secara random
	if len(k.Centroids) < k.Kluster {
		if k.Kluster > len(k.Dataset) {
			panic("jumlah kluster tidak boleh lebih banyak dari jumlah dokumen.")
		}
		rand.Seed(time.Now().Unix())
		rand := rand.Perm(len(k.Dataset) - 1 + 1)
		random_cluster := rand[0 : k.Kluster-len(k.Centroids)]
		centroid := make([][]float64, k.Kluster)
		for i, cr := range random_cluster {
			centroid[i] = k.Dataset[cr]
		}
		k.Centroids = append(k.Centroids, centroid...)
	}

	// looping sampai distance tidak berubah dan centroid ke tengah
	for {
		var sse float64
		// Menghitung Encludian Distance dengan masing-masing centroid
		d := make([][]float64, len(k.Centroids))
		for idx_centroid, centroid := range k.Centroids {
			var summary []float64
			for _, raw := range k.Dataset {
				var row_distance float64
				for i := 0; i < len(centroid); i++ {
					distance := math.Pow(raw[i]-centroid[i], 2)
					row_distance += distance
				}
				row_distance = math.Sqrt(row_distance)
				summary = append(summary, row_distance)
			}
			d[idx_centroid] = summary
		}

		// cek jika distance tidak berubah maka hentikan looping
		if reflect.DeepEqual(k.Distance, d) {
			break
		}

		k.Distance = d

		// Mengelompokan data awal
		key_groups := make([][]int, k.Kluster)
		groups := make([][]float64, k.Kluster)
		docs := 0
		for {
			center := 0
			var curr_val float64 = k.Distance[0][docs]
			for i := 0; i < len(k.Distance); i++ {
				if k.Distance[i][docs] < curr_val {
					center = i
					curr_val = k.Distance[i][docs]
				}
			}
			sse += math.Pow(curr_val, 2)
			key_groups[center] = append(key_groups[center], docs)
			groups[center] = append(groups[center], curr_val)

			docs++
			if docs == len(k.Distance[0]) {
				break
			}
		}

		k.SSE = sse
		k.Group = groups
		k.Membership = key_groups

		// Menentukan Centroid Baru
		newCentroid := make([][]float64, k.Kluster)
		for i := 0; i < k.Kluster; i++ {
			new_centroid := make([]float64, len(k.Dataset[0]))
			key := 0
			for {
				var total float64
				count := 0

				for _, member := range key_groups[i] {
					total += k.Dataset[member][key]
					count++
				}

				mean := total / float64(count)
				new_centroid[key] = mean

				key++
				if key == len(k.Dataset[0]) {
					break
				}
			}
			newCentroid[i] = new_centroid
		}
		k.Centroids = newCentroid
	}
}
