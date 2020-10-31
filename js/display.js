// Frank Poth 03/09/2018

/* This class hasn't changed much since part 1. All it does now is resize the canvas
a bit differently and draw rectangles to the buffer. */

const Display = function (canvas) {
  this.buffer = document.createElement('canvas').getContext('2d')
  this.buffer.canvas.height = HEIGHT
  this.buffer.canvas.width = WIDTH
  this.context = canvas.getContext('2d')
  this.dirtTexture = new Image()
  this.cropTexture = new Image()
  this.dirtTexture.src = 'img/dirt.svg'
  this.cropTexture.src = 'img/crop.svg'
  this.zoom = 1
  this.zoomIndex = 2
  this.ZOOMS = [0.25, 0.5, 1, 1.5, 1.75]
  this.scrollX = 0
  this.scrollY = 0
  this.uiElements = [
    { x: NUM_COLS - 3, y: 1, name: 'left' },
    { x: NUM_COLS - 1, y: 1, name: 'right' },
    { x: NUM_COLS - 3, y: 2, name: 'zoom plus' },
    { x: NUM_COLS - 1, y: 2, name: 'zoom minus' }
  ]

  this.drawRectangle = function (x, y, width, height, color) {
    this.buffer.fillStyle = color
    this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height)
  }

  this.drawDirt = function (x, y) {
    this.buffer.drawImage(this.dirtTexture, x, y, TILE_SIZE, TILE_SIZE)
  }

  this.drawCrop = function (x, y) {
    this.buffer.drawImage(this.cropTexture, x, y, TILE_SIZE, TILE_SIZE)
  }

  this.zoomPlus = function () {
    this.zoomIndex = Math.min(4, this.zoomIndex + 1)
    this.zoom = this.ZOOMS[this.zoomIndex]
  }

  this.zoomMinus = function () {
    this.zoomIndex = Math.max(0, this.zoomIndex - 1)
    this.zoom = this.ZOOMS[this.zoomIndex]
  }

  this.scrollRight = function () {
    this.scrollX -= 100
  }

  this.scrollLeft = function () {
    this.scrollX += 100
  }

  this.scrollDown = function () {
    this.scrollY -= 100
  }

  this.uiClick = function (x, y) {
    for (let i = 0; i < this.uiElements.length; i++) {
      if (this.uiElements[i].x === x && this.uiElements[i].y === y) {
        if (this.uiElements[i].name === 'right') {
          this.scrollRight()
          return 1
        } else if (this.uiElements[i].name === 'left') {
          this.scrollLeft()
          return 1
        } else if (this.uiElements[i].name === 'zoom plus') {
          this.zoomPlus()
          return 1
        } else if (this.uiElements[i].name === 'zoom minus') {
          this.zoomMinus()
          return 1
        }
      }
    }
    return 0
  }

  this.drawUI = function () {
    for (let i = 0; i < this.uiElements.length; i++) {
      const element = this.uiElements[i]
      const x = TILE_SIZE * element.x - this.scrollX * (this.buffer.canvas.width / this.context.canvas.width)
      this.drawRectangle(x, TILE_SIZE * element.y, TILE_SIZE / this.zoom, TILE_SIZE / this.zoom, '#000000ff')
    }
  }

  this.fill = function (color) {
    this.buffer.fillStyle = color
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height)
  }

  this.render = function () {
    this.context.fillStyle = '#8a563cff'
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    this.drawUI()
    this.context.drawImage(this.buffer.canvas, 0, 0, WIDTH, HEIGHT, this.scrollX, this.scrollY, this.context.canvas.width * this.zoom, this.context.canvas.height * this.zoom)
  }

  this.resize = function (width, height, heightWidthRatio) {
    if (height / width > heightWidthRatio) {
      this.context.canvas.height = width * heightWidthRatio
      this.context.canvas.width = width
    } else {
      this.context.canvas.height = height
      this.context.canvas.width = height / heightWidthRatio
    }
    this.context.imageSmoothingEnabled = false
  }
}

Display.prototype = {
  constructor: Display
}
