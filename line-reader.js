const fs = require('fs')
const readline = require('readline')
const { once } = require('events')

const readPuzzleInput = async (filePath) => {
  const puzzleInput = []
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  })

  rl.on('line', line => {
    puzzleInput.push(line.trim())
  })

  await once(rl, 'close')
  return puzzleInput
}

module.exports = readPuzzleInput