const readline = require('../line-reader')

// Part One
const getTotalEncounteredTrees = async (right, down) => {
  const puzzleInputs = (await readline(`${__dirname}/puzzle-input.txt`))
  let totalEncounteredTrees = 0, currentPosition = 0;

  for(let i = 0; i < puzzleInputs.length; i += down) {
    if(puzzleInputs[i][currentPosition] === '#') {
      totalEncounteredTrees++
    }

    if(currentPosition + right >= puzzleInputs[0].length) {
      currentPosition = (currentPosition + right) % puzzleInputs[0].length
    } else {
      currentPosition += right
    }
  }

  return totalEncounteredTrees;
}

// Part two
const getOverallTrees = async (slopes) => {
  let mul = 1
  
  for(let slope of slopes) {
    mul *=  await getTotalEncounteredTrees(slope.right, slope.down)
  }

  return mul
}

(async () => {
  const overallTrees = await getOverallTrees([
    {right: 1, down: 1},
    {right: 3, down: 1}, 
    {right: 5, down: 1},
    {right: 7, down: 1},
    {right: 1, down: 2}
  ])
  
  console.log(overallTrees)
})()
