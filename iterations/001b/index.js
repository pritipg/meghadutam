// TYPE
var typeSize = 24

// GRID
var gridRows = 4
var gridCols = 40
var gridTracking = -10
var gridLineSpace = 0

// WAVE
var waveSpeed = -1
var waveXOffset = 2.1
var waveYOffset = 20

// AMPLITUDE
var xWave = 200
var xWaveOffset = 0 // or Math.PI
var yWave = 100
var yWaveOffset = 0 // or Math.PI
var zWave = 0
var zWaveOffset = 0 // or Math.PI

// CAMERA
var camZoom = 1
var camRotationX = 0
var camRotationY = 0
var camRotationZ = 0

// INPUT
var input = "antarbaaspaz ciram anucaro raajaraajasyadadhyau meghaaloke bhavati sukhino py anyathaavrtti cetah kanthaazlesapranayini jane kim punar durasamsthe".toUpperCase()
var inputLength = input.length

// FONT
var font

var xWaver = 0, yWaver = 0, zWaver = 0

function preload() {
  font = loadFont("../../assets/fonts/NotoSans-Regular.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  
  smooth()

  textFont(font)
  textSize(typeSize)
  textAlign(CENTER, CENTER)  
}

function draw() {
  background(255)
  
  var xSpace = typeSize + gridTracking
  var ySpace = typeSize + gridLineSpace
  
  // CAMERA
  translate(0, 0, camZoom)
  rotateX(radians(camRotationX))
  rotateY(radians(camRotationY))
  rotateZ(radians(camRotationZ))

	if(inputLength >= gridCols) {
    translate(-gridCols * xSpace/2, -floor(inputLength/gridCols) * ySpace/2)
  } else {
    translate(-inpuLength * xSpace/2, -floor(inputLength/gridCols) * ySpace/2);
  }

  for (var i = 0; i < inputLength; i++) {
    if(zWave != 0) {
      zWaver = sinEngine(zWaveOffset, waveXOffset, i % gridCols, waveYOffset, floor(i/gridCols), waveSpeed, 1) * zWave
    }

    if(xWave != 0) {
      xWaver = map(sinEngine(xWaveOffset, waveXOffset, i % gridCols, waveYOffset, floor(i/gridCols), waveSpeed, 1), -1, 1, 0, xWave)
    }

    if(yWave != 0) {
      yWaver = sinEngine(yWaveOffset, waveXOffset, i % gridCols, waveYOffset, floor(i/gridCols), waveSpeed, 1) * yWave
    }

    push()
    
    translate((i % gridCols) * xSpace + xWaver, floor(i / gridCols) * ySpace + yWaver, zWaver)
    
    // FRONT TEXT
    fill(0)
    text(input[i], 0, 0)
    
    // BACK TEXT
		translate(0, 0, -1)
    fill(235)
    text(input[i], 0, 0)

    pop()
  }

  if (keyIsDown(LEFT_ARROW)) {
    xWave -= 1
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xWave += 1
  }
  if (keyIsDown(UP_ARROW)) {
    camRotationX -= 1
  }
  if (keyIsDown(DOWN_ARROW)) {
    camRotationX += 1
  }
}

function sinEngine(Offset, xLength, xCounter, yLength, yCounter, Speed, slopeN) {
  var sinus = sin((frameCount*Speed/100 + xCounter/xLength + yCounter/yLength + Offset))
  var sign = (sinus >= 0 ? 1: -1)
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN))
  return sinerSquare
}

function cosEngine(Offset, xLength, xCounter, yLength, yCounter, Speed, slopeN) {
  var cosus = cos((frameCount*Speed/100 + xCounter/xLength + yCounter/yLength + Offset))
  var sign = (cosus >= 0 ? 1: -1)
  var coserSquare = sign * (1-pow(1-abs(cosus),slopeN))
  return coserSquare
}