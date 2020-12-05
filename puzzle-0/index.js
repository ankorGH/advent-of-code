const readPuzzleInput = require('../line-reader')

//  O(n^3)
const getMaxPuzzle = async () => {
  const puzzleInputs = await readPuzzleInput(`${__dirname}/puzzle-input.txt`)
  let maxMul = 0;

  for(let firstNum of puzzleInputs) {
    for(let secondNum of puzzleInputs) {
      for(let thirdNum of puzzleInputs) {
        if( firstNum + secondNum + thirdNum === 2020 && firstNum * secondNum * thirdNum > maxMul) {
          maxMul = firstNum * secondNum * thirdNum
        }
      }
    }
  }

  return maxMul
}

(async () => {
  console.log(await getMaxPuzzle())
})()