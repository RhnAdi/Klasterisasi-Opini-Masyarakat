package praprocessing

import (
	"log"
	"regexp"
	"strings"
)

func Clean(str string) string {
	url, _ := regexp.Compile(`^https?:\/\/\S*`)
	re, err := regexp.Compile(`[^\w]`)
	if err != nil {
		log.Fatal(err)
	}
	str = url.ReplaceAllString(str, " ")
	str = re.ReplaceAllString(str, " ")
	return strings.ToLower(str)
}
