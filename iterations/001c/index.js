// TYPE
var typeSize = 24

// CYLINDER
var cylRadius = 100
var cylRowOffset = 0
var cylRotationRate = -30

// WAVE
var cylWaveCount = 3
var cylWaveSpeed = 5
var cylWaveLat = 3 // 124
var cylWaveLng = 80 // 58
var cylWaveRip = 5 // 10

// TWEAK
var xRotTweak = 0
var yRotTweak = 0
var zRotTweak = 0 // 80

// CAMERA
var camZoom = 1
var camRotationX = 15
var camRotationY = 0
var camRotationZ = 0

// INPUT
var inputArray = [
  "tasya sthitva katham api purah kautukaadhaanahetoh ",
  "antarbaaspaz ciram anucaro raajaraajasya dadhyau ",
  "meghaaloke bhavati sukhino 'py anyathaavrtti cetah ",
  "kanthaazlesapranayini jane kim punar durasamsthe "
]
var cylRowCount = inputArray.length

// FONT
var font

function preload() {
  font = loadFont("../../assets/fonts/NotoSans-Regular.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

  frameRate(30)
 
  smooth()

  textFont(font)
  textSize(typeSize)
  textAlign(CENTER, CENTER)  
}

function draw() {
  background(255)
  
  // CAMERA
  translate(0, 0, camZoom)
  rotateX(radians(camRotationX))
  rotateY(radians(camRotationY))
  rotateZ(radians(camRotationZ))

  var cylRowHeight = typeSize + 5
  
  // CYLINDER TRANSFORMS
  translate(0, -(cylRowCount - 1) * cylRowHeight / 2)
  rotateY(frameCount * (cylRotationRate / 1000))
 
  for (var i = 0; i < inputArray.length; i++) {
    var input = inputArray[i]
    var inputLength = input.length

    var pieSlice = 2 * PI / inputLength
    var cylWaveOffset = 2 * PI / inputLength * cylWaveCount
  
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
      if (cylWaveLat != 0) {
        let zOffset = sin(inputIndex * cylWaveOffset + frameCount * (cylWaveSpeed / 1000)) * cylWaveLat
        translate(0, 0, zOffset)
      }
      if (cylWaveLng != 0) {
        let zOffset = sin(rowIndex * cylWaveOffset + frameCount * (cylWaveSpeed / 1000)) * cylWaveLng
        translate(0, 0, zOffset);
  
        let preLng = sin(floor((i / inputLength) - 1) * cylWaveOffset + frameCount * (cylWaveSpeed / 1000)) * cylWaveLng
        let postLng = sin(floor((i / inputLength) + 1) * cylWaveOffset + frameCount * (cylWaveSpeed / 1000)) * cylWaveLng
        let xLngAdjust = atan2(cylRowHeight * 2, (preLng - postLng))
        rotateX(xLngAdjust - PI / 2);
      }
      if (cylWaveRip!= 0) {
        var yOffset = sin(inputIndex * cylWaveOffset + frameCount * (cylWaveSpeed / 1000)) * cylWaveRip
        translate(0, yOffset, 0);
      }
      if (xRotTweak != 0) {
        rotateX(cos(inputIndex * cylWaveOffset + frameCount * (cylWaveSpeed / 1000)) * -radians(xRotTweak))
      }
      if (yRotTweak != 0) {
        rotateY(cos(inputIndex * cylWaveOffset + frameCount * (cylWaveSpeed / 1000)) * -radians(yRotTweak))
      }
      if (zRotTweak != 0) {
        rotateZ(cos(inputIndex * cylWaveOffset + frameCount * (cylWaveSpeed / 1000)) * radians(zRotTweak))
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

  if (keyIsDown(LEFT_ARROW)) {
    cylRadius -= 1
  }
  if (keyIsDown(RIGHT_ARROW)) {
    cylRadius += 1
  }
  if (keyIsDown(UP_ARROW)) {
    camRotationX -= 1
  }
  if (keyIsDown(DOWN_ARROW)) {
    camRotationX += 1
  }
}