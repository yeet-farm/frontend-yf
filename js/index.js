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
let zoom = 1
let zoomIndex = 2
const ZOOMS = [0.25, 0.5, 1, 1.5, 1.75]
let scrollX = 0
let scrollY = 0

const FARM = new Array(NUM_COLS).fill(0).map(() => new Array(NUM_ROWS).fill(0))

function getCursorPosition (canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left - scrollX
  const y = event.clientY - rect.top - scrollY
  // console.log('x: ' + x + ' y: ' + y + ' canvas.w: ' + canvas.width + ' canvas.h: ' + canvas.height)
  const tileWidth = (canvas.width * zoom) / NUM_COLS
  const tileX = Math.floor(x / tileWidth)
  const tileY = Math.floor(y / tileWidth)
  // console.log('tileW: ' + tileWidth + ' tileX: ' + tileX + ' tileY: ' + tileY)
  return [tileX, tileY]
}

const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function (e) {
  const tile = getCursorPosition(canvas, e)
  FARM[tile[0]][tile[1]] = 1
})
const zoomPlus = document.querySelector('.zoom-plus')
zoomPlus.addEventListener('click', e => {
  zoomIndex = Math.min(4, zoomIndex + 1)
  zoom = ZOOMS[zoomIndex]
})
const zoomMinus = document.querySelector('.zoom-minus')
zoomMinus.addEventListener('click', e => {
  zoomIndex = Math.max(0, zoomIndex - 1)
  zoom = ZOOMS[zoomIndex]
})
const scrollRight = document.querySelector('.scroll-right')
scrollRight.addEventListener('click', e => {
  scrollX -= 100
})
const scrollDown = document.querySelector('.scroll-down')
scrollDown.addEventListener('click', e => {
  scrollY -= 100
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
