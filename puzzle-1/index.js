const readPuzzleInput = require('../line-reader')

const getValidPasswords = async () => {
  let validPasswords = 0
  const puzzleInputs = await readPuzzleInput(`${__dirname}/puzzle-input.txt`)
  
  for(let eachPuzzleInput of puzzleInputs) {
    let mappedEachPuzzleInput = parseInput(eachPuzzleInput)
    if(isPasswordValidBySledPolicy(mappedEachPuzzleInput)) {
      validPasswords++
    }
  }

  return validPasswords
}

const isPasswordValidByTobbogonPolicy = (mappedInput) => {
  if((mappedInput.password[mappedInput.lowerNum - 1] === mappedInput.letter) !==  (mappedInput.password[mappedInput.upperNum - 1] === mappedInput.letter)) {
    return true
  }
  
  return false
}

const isPasswordValidBySledPolicy = (mappedInput) => {
  let letterOccurence = 0
  for(let passwordLetter of mappedInput.password) {
    if(passwordLetter === mappedInput.letter) {
      letterOccurence++
    }
  }

  return letterOccurence >= mappedInput.lowerNum && letterOccurence <= mappedInput.upperNum
}

const parseInput = (input) => {
  // input -> 4-6 b: sdskldsldjb
  const [range, policyAlphabet, password] = input.split(' ')
  let [min, max] = range.split('-')
  min = parseInt(min)
  max = parseInt(max)
  
  if(isNaN(min)) {
    min = 0
  } 
  
  if(isNaN(max)) {
    max = Infinity
  }

  return {
    lowerNum: min,
    upperNum: max,
    password,
    letter: policyAlphabet[0].trim(),
  }
}

(async () => {
  const validPasswordsNum = await getValidPasswords()
  console.log(validPasswordsNum)
})()