


// fetch('http://localhost:3000')
//     .then(res => {
//         return res.json()
//     })
//     .then(data => console.log(data))
//     .catch(error => console.log(`ERROR: ${error}`));

var TILE_SIZE = 32

function render () {
  display.fill('#000000ff')
  // display.drawRectangle(2, 2, 10, 10, '#00ff00ff')
  for (let i = 0; i < TILE_SIZE / 2; i++)
  {
    let x = i * TILE_SIZE
    console.log(x)
    display.drawCrop(x,0)
  }
  display.render()
}

function update () {
}


var height = TILE_SIZE * 9;
var width = TILE_SIZE * 16;

function resize () {
  display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, height / width);
  display.render()
}


var display = new Display(document.querySelector('canvas'))
var engine = new Engine(1000 / 30, render, update)

window.addEventListener('resize', resize)

resize()
engine.start()
