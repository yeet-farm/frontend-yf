// fetch('http://localhost:3000')
//     .then(res => {
//         return res.json()
//     })
//     .then(data => console.log(data))
//     .catch(error => console.log(`ERROR: ${error}`));

// values higher than 341 cause my iOS safari to stop rendering
const TILE_SIZE = 256
const NUM_ROWS = 9
const NUM_COLS = 16
const HEIGHT = TILE_SIZE * NUM_ROWS
const WIDTH = TILE_SIZE * NUM_COLS

const FARM = new Array(NUM_COLS).fill(0).map(() => new Array(NUM_ROWS).fill(0))

function getCursorPositionScreen (canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const tileWidth = canvas.width / NUM_COLS
  const tileX = Math.floor(x / tileWidth)
  const tileY = Math.floor(y / tileWidth)
  return [tileX, tileY]
}

function getCursorPositionWorld (canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left - display.scrollX * display.ratio()
  const y = event.clientY - rect.top - display.scrollY * display.ratio()
  console.log('x: ' + x + ' y: ' + y + ' canvas.w: ' + canvas.width + ' canvas.h: ' + canvas.height + ' ratio: ' + display.ratio())
  const tileWidth = (canvas.width * display.zoom) / NUM_COLS
  const tileX = Math.floor(x / tileWidth)
  const tileY = Math.floor(y / tileWidth)
  display.drawRectangle(x, y, TILE_SIZE, TILE_SIZE, '#000000ff')
  console.log('tileW: ' + tileWidth + ' tileX: ' + tileX + ' tileY: ' + tileY)
  return [tileX, tileY]
}

const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function (e) {
  const screen = getCursorPositionScreen(canvas, e)
  if (display.uiClick(screen[0], screen[1])) {
    return
  }
  const world = getCursorPositionWorld(canvas, e)
  FARM[world[0]][world[1]] = 1
})

function render () {
  display.fill('#8a563cff')
  // display.drawRectangle(2, 2, 10, 10, '#00ff00ff')
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 1; y < NUM_ROWS; y++) {
      display.drawDirt(x * TILE_SIZE, y * TILE_SIZE)
    }
  }
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 1; y < NUM_ROWS; y++) {
      if (FARM[x][y] === 1) {
        display.drawCrop(x * TILE_SIZE, y * TILE_SIZE - (TILE_SIZE / 2))
      }
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
