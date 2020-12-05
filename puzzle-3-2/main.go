package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	f, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	fileReader := bufio.NewReader(f)

	passportCredentials := make(map[string]string)
	validPassports := 0

	for {
		fileSnippet, err := fileReader.ReadString('\n')
		if err != nil && err != io.EOF {
			log.Fatal(err)
			break
		}

		fileSnippet = strings.TrimSpace(fileSnippet)
		mappedAttributes := strings.Split(fileSnippet, " ")

		for _, mappedAttribute := range mappedAttributes {
			if len(mappedAttribute) == 0 {
				if checkPassportValidity(passportCredentials) {
					validPassports++
				}

				passportCredentials = make(map[string]string)
				continue
			}

			singlePassportDetail := strings.Split(mappedAttribute, ":")
			passportCredentials[singlePassportDetail[0]] = singlePassportDetail[1]
		}

		if err == io.EOF {
			if checkPassportValidity(passportCredentials) {
				validPassports++
			}

			break
		}
	}

	fmt.Println(validPassports)
}

func checkPassportValidity(passport map[string]string) bool {
	// check byr
	if _, ok := passport["byr"]; !ok {
		return false
	}
	byrsVal, err := strconv.Atoi(passport["byr"])
	if err != nil {
		return false
	}
	if byrsVal < 1920 || byrsVal > 2002 {
		return false
	}

	// check iyr
	if _, ok := passport["iyr"]; !ok {
		return false
	}
	iyrsVal, err := strconv.Atoi(passport["iyr"])
	if err != nil {
		return false
	}
	if iyrsVal < 2010 || iyrsVal > 2020 {
		return false
	}

	// check eyr
	if _, ok := passport["eyr"]; !ok {
		return false
	}
	eyrsVal, err := strconv.Atoi(passport["eyr"])
	if err != nil {
		return false
	}
	if eyrsVal < 2020 || eyrsVal > 2030 {
		return false
	}

	// check hgt
	if matched, _ := regexp.MatchString(`((\b1(([5-8]{1}[0-9]{1})|(9[0-3]{1}))cm\b)|(\b(59)|(6[0-9]{1})|(7[0-6]))in\b)`, passport["hgt"]); !matched {
		return false
	}

	// check hcl
	if matched, _ := regexp.MatchString(`^#[0-9a-f]{6}`, passport["hcl"]); !matched {
		return false
	}

	// check ecl
	if matched, _ := regexp.MatchString(`\b(amb|blu|brn|gry|grn|hzl|oth)\b`, passport["ecl"]); !matched {
		return false
	}

	// check pid
	if matched, _ := regexp.MatchString(`\b[0-9]{9}\b`, passport["pid"]); !matched {
		return false
	}

	return true
}
