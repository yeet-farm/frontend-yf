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

  this.fill = function (color) {
    this.buffer.fillStyle = color
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height)
  }

  this.render = function () {
    this.context.fillStyle = '#8a563cff'
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    this.context.drawImage(this.buffer.canvas, 0, 0, WIDTH, HEIGHT, scrollX, scrollY, this.context.canvas.width * zoom, this.context.canvas.height * zoom)
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
