package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	twitterscraper "github.com/n0madic/twitter-scraper"
)

func combine() {
	folders := []string{
		"SekolahOnline",
		"SekolahOffline",
		"SekolahLuring",
		"PembelajaranOffline",
		"PembelajaranTatapMuka",
		"SekolahTatapMuka",
	}
	dataset := []twitterscraper.Tweet{}
	for _, str := range folders {
		path := fmt.Sprintf("./dataset/%s", str)
		files, err := ioutil.ReadDir(path)
		if err != nil {
			log.Fatal(err)
		}

		for _, f := range files {
			p := fmt.Sprintf("dataset/%s/%s", str, f.Name())
			fmt.Println(p)
			file, err := os.Open(p)
			if err != nil {
				log.Fatal(err)
			}
			defer file.Close()

			_, err = os.Create("dataset/" + str + ".json")
			if err != nil {
				panic(err)
			}

			scanner := bufio.NewScanner(file)
			// optionally, resize scanner's capacity for lines over 64K, see next example
			for scanner.Scan() {
				var res map[string]interface{}
				json.Unmarshal([]byte(scanner.Text()), &res)
				data := twitterscraper.Tweet{}
				data.Text = fmt.Sprintf("%v", res["tweet"])
				data.ID = fmt.Sprintf("%v", res["conversation_id"])
				data.Username = fmt.Sprintf("%v", res["username"])
				dataset = append(dataset, data)
			}

			if err := scanner.Err(); err != nil {
				log.Fatal(err)
			}

		}
		jsonString, _ := json.Marshal(dataset)
		ioutil.WriteFile("./dataset/"+str+".json", jsonString, os.ModePerm)
	}
}
