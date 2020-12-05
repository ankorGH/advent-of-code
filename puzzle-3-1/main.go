package main

import (
	"bufio"
	"io"
	"log"
	"os"
	"strings"
)

func main() {
	f, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	fileReader := bufio.NewReader(f)

	dataObj := make(map[string]string)

	validPassport := 0

	for {
		data, err := fileReader.ReadString('\n')
		if err != nil && err != io.EOF {
			log.Fatal(err)
			break
		}

		data = strings.TrimSpace(data)

		if len(data) == 0 {
			if isValid := checkValidity(dataObj); isValid {
				validPassport++
			}

			dataObj = make(map[string]string)
			continue
		}

		dataSplit := strings.Split(data, " ")
		for _, eachField := range dataSplit {
			ps := strings.Split(eachField, ":")
			dataObj[ps[0]] = ps[1]
		}

		if err == io.EOF {
			if isValid := checkValidity(dataObj); isValid {
				validPassport++
			}

			break
		}
	}
}

func checkValidity(data map[string]string) bool {
	var validFields = [...]string{"byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"}

	for _, field := range validFields {
		if _, ok := data[field]; !ok {
			return false
		}
	}

	return true
}
