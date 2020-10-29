// fetch('http://localhost:3000')
//     .then(res => {
//         return res.json()
//     })
//     .then(data => console.log(data))
//     .catch(error => console.log(`ERROR: ${error}`));

const TILE_SIZE = 512
const NUM_ROWS = 9
const NUM_COLS = 16
const HEIGHT = TILE_SIZE * NUM_ROWS
const WIDTH = TILE_SIZE * NUM_COLS

function render () {
  display.fill('#000000ff')
  // display.drawRectangle(2, 2, 10, 10, '#00ff00ff')
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_COLS; y++) {
      display.drawCrop(x * TILE_SIZE, y * TILE_SIZE)
    }
  }
  display.render()
}

function update () {
}

function resize () {
  display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, HEIGHT / WIDTH)
  display.render()
}

const display = new Display(document.querySelector('canvas'))
const engine = new Engine(1000 / 30, render, update)

window.addEventListener('resize', resize)

resize()
engine.start()
