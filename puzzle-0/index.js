const readPuzzleInput = require('../line-reader')

const getMaxPuzzleForTwo = (inputs) => {
  let maxMul = 0;

  for(let pointerOne = 0; pointerOne < inputs.length - 1; pointerOne++) {
    for(let pointerTwo = pointerOne + 1; pointerTwo < inputs.length; pointerTwo++) {
        let inputA = parseInt(inputs[pointerOne])
        let inputB = parseInt(inputs[pointerTwo])

        if(inputA + inputB === 2020 && inputA * inputB > maxMul) {
          maxMul = inputA * inputB
        }
    }
  }

  return maxMul
}

const getMaxPuzzleForThree = (inputs) => {
  let maxMul = 0;

  for(let pointerOne = 0; pointerOne < inputs.length - 2; pointerOne++) {
    for(let pointerTwo = pointerOne + 1; pointerTwo < inputs.length - 1; pointerTwo++) { 
      for(let pointerThree = pointerTwo + 1; pointerThree < inputs.length - 1; pointerThree++) {  
        let inputA = parseInt(inputs[pointerOne])
        let inputB = parseInt(inputs[pointerTwo])
        let inputC = parseInt(inputs[pointerThree])

        if(inputA + inputB + inputC === 2020 && inputA * inputB * inputC > maxMul) {
          maxMul = inputA * inputB * inputC
        }
      }
    }
  }

  return maxMul
}

(async () => {
  const puzzleInputs = await readPuzzleInput(`${__dirname}/puzzle-input.txt`)
  console.log(getMaxPuzzleForTwo(puzzleInputs))
  console.log(getMaxPuzzleForThree(puzzleInputs))
})()