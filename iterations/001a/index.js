// Text
var font
var fontSize = 24

// INPUT
var inputArray = [
  "tasya sthitva katham api purah kautukaadhaanahetoh ",
  "antarbaaspaz ciram anucaro raajaraajasya dadhyau ",
  "meghaaloke bhavati sukhino 'py anyathaavrtti cetah ",
  "kanthaazlesapranayini jane kim punar durasamsthe "
]

// Camera
var camXRotation = 61
var camYRotation = -76
var camZRotation = -2
var camZoom = -89

// CYLINDER
var cylRadius = 108
var cylRowOffset = 59
var cylSpeed = 1224
var cylRowCount = inputArray.length

// WAVE
var waveCount = 2
var waveSpeed = 153
var waveLat = 122
var waveLng = 79
var waveRip = 21

// TWEAK
var tweakX = 90
var tweakY = 0
var tweakZ = 0

function preload() {
  font = loadFont("../../assets/fonts/NotoSans-Regular.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  
  textFont(font)
  textSize(fontSize)
  textAlign(CENTER, CENTER)

  smooth()
  angleMode(DEGREES)
}

function draw() {
  background(255)

  // CAMERA
  translate(0, 0, camZoom)
  rotateX(camXRotation)
  rotateY(camYRotation)
  rotateZ(camZRotation)

  var cylRowHeight = fontSize + 5
  
  // CYLINDER TRANSFORMS
  translate(0, -(cylRowCount - 1) * cylRowHeight / 2)
  rotateY(frameCount * (cylSpeed / 1000))
 
  for (var i = 0; i < inputArray.length; i++) {
    var input = inputArray[i]
    var inputLength = input.length

    var pieSlice = 360 / inputLength
    var waveOffset = 360 / inputLength * waveCount
  
    for (var j = 0; j < inputLength; j++) {
      var rowIndex = i
      var inputIndex = j
    
      push()
      
      // ROW TRANSFORMS
      rotateY(rowIndex * cylRowOffset)
      translate(0, rowIndex * cylRowHeight)
      
      // RING TRANSFORMS
      rotateY(inputIndex * pieSlice)
      translate(0, 0, cylRadius)
      
      // LETTER TRANSFORMS
      if (waveLat != 0) {
        let zOffset = sin(inputIndex * waveOffset + frameCount * (waveSpeed / 100)) * waveLat
        translate(0, 0, zOffset)
      }
      if (waveLng != 0) {
        let zOffset = sin(rowIndex * waveOffset + frameCount * (waveSpeed / 100)) * waveLng
        translate(0, 0, zOffset);
  
        let preLng = sin(floor((i / inputLength) - 1) * waveOffset + frameCount * (waveSpeed / 100)) * waveLng
        let postLng = sin(floor((i / inputLength) + 1) * waveOffset + frameCount * (waveSpeed / 100)) * waveLng
        let xLngAdjust = atan2(cylRowHeight * 2, (preLng - postLng))
        rotateX(xLngAdjust - 90);
      }
      if (waveRip!= 0) {
        var yOffset = sin(inputIndex * waveOffset + frameCount * (waveSpeed / 100)) * waveRip
        translate(0, yOffset, 0);
      }
      if (tweakX != 0) {
        rotateX(cos(inputIndex * waveOffset + frameCount * (waveSpeed / 100)) * -tweakX)
      }
      if (tweakY != 0) {
        rotateY(cos(inputIndex * waveOffset + frameCount * (waveSpeed / 100)) * -tweakY)
      }
      if (tweakZ != 0) {
        rotateZ(cos(inputIndex * waveOffset + frameCount * (waveSpeed / 100)) * -tweakZ)
      }

      // FRONT TEXT
      fill(0)
      text(input[inputIndex], 0, 0)
      
      // BACK TEXT
      fill(235)
      translate(0, 0, -1)
      text(input[inputIndex], 0, 0)
  
      pop()
    }
  }
}
