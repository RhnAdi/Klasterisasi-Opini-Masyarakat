package tf_idf

import (
	"math"
	"strings"
)

// membuat struct yang berisi informasi TFIDF
type TFIDF struct {
	Dataset    []string       `json:"dataset"`    // dataset
	Words      map[string]int `json:"words"`      // daftar kata
	Sentence   map[int]string `json:"sentence"`   // urutan kata
	ListWords  map[string]int `json:"list_words"` // jumlah kata
	WeightTf   [][]int        `json:"weight_tf"`  // bobot TF
	Df         []int          `json:"df"`         // DF
	Tokenizing [][]string     `json:"tokenizing"` // tokenizing
	TotalTerm  []int          `json:"total_term"` // total Term
	Result     [][]float64    `json:"result"`     // hasil TFIDF
}

func (tfidf *TFIDF) Exec() {
	// Initializing
	i := 0
	// tahap tokenizing word
	tokenizing := make([][]string, len(tfidf.Dataset))
	for docs, str := range tfidf.Dataset {
		spliter := strings.Split(str, " ") // split tiap document dengan space
		tokenizing[docs] = spliter         // mengisi tokenizing dari tiap document
		// tahap meng-inisialisasikan tiap kata sesuai urutan, daftar dan jumlah kata
		for _, word := range spliter {
			if word == "" {
				continue
			}
			_, ok := tfidf.ListWords[word]
			if !ok {
				tfidf.Words[word] = i
				tfidf.Sentence[i] = word
				i++
				tfidf.ListWords[word] = 1
			} else {
				tfidf.ListWords[word] += 1
			}
		}
	}

	tfidf.Tokenizing = tokenizing // set tokenizing

	tfidf.WeightTF() // memanggil fungsi menghitung bobot TF
	// menghitung total term
	total_term := make([]int, len(tfidf.Dataset))

	for i, v := range tfidf.WeightTf {
		for _, s := range v {
			if s == 0 {
				continue
			} else {
				total_term[i] += s
			}
		}
	}

	tfidf.TotalTerm = total_term

	// menghitungTFIDF
	tfidf.calculate()
}

// fungsi untuk menghitung bobot TF
func (tfidf *TFIDF) WeightTF() {
	weight_records := make([][]int, len(tfidf.Dataset)) // untuk menampung semua weight record
	// looping tiap dataset
	for docs, str := range tfidf.Dataset {
		weight_record := make([]int, len(tfidf.ListWords)) // untuk menampung tiap weight record
		spliter := strings.Split(str, " ")                 // split tiap record dataset
		// looping kata tiap split record dataset
		for _, word := range spliter {
			if word == "" {
				continue
			}
			v := tfidf.Words[word]
			weight_record[v] += 1 // menambah jumlah tiap kata
		}
		weight_records[docs] = weight_record
	}
	tfidf.WeightTf = weight_records
}

// fungsi menghitung TFIDF
func (tfidf *TFIDF) calculate() {
	// menghitung DF
	df := make([]int, len(tfidf.Words)) //
	for word := range tfidf.ListWords {
		for _, weight := range tfidf.WeightTf {
			if weight[tfidf.Words[word]] != 0 {
				df[tfidf.Words[word]] += 1
			}
		}
	}
	tfidf.Df = df

	// menghitung IDF
	idf := make([]float64, len(tfidf.Words))
	for word, df := range tfidf.Df {
		record_idf := math.Log10(float64(len(tfidf.Dataset)) / float64(df))
		idf[word] = record_idf
	}

	// menghitung TF
	tf := make([][]float64, len(tfidf.Dataset))
	for docs := range tfidf.Dataset {
		record_tfidf := make([]float64, len(tfidf.Words))
		for _, i := range tfidf.Words {
			record_tfidf[i] = float64(tfidf.WeightTf[docs][i]) / float64(tfidf.TotalTerm[docs])
		}
		tf[docs] = record_tfidf
	}

	// menghitung TFIDF
	result := make([][]float64, len(tfidf.Dataset))
	for j := range tfidf.Dataset {
		record_tfidf := make([]float64, len(tfidf.Words))
		for _, i := range tfidf.Words {
			record_tfidf[i] = tf[j][i] * idf[i]
		}
		result[j] = record_tfidf
	}
	tfidf.Result = result
}

// fungsi untuk inisialisasi TFIDF
func InitTFIDF(corpus []string) *TFIDF {
	return &TFIDF{
		Dataset:   corpus,
		Words:     make(map[string]int),
		ListWords: make(map[string]int),
		Sentence:  make(map[int]string),
	}
}
