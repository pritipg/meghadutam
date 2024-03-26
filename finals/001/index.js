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
var camXRotation = -40 // Morph to -96
var camYRotation = -76
var camZRotation = -2
var camZoom = 200 // Morph to -89

// CYLINDER
var cylRadius = 100 // Morph to 200
var cylRowOffset = 59
var cylSpeed = -100 // Morph to 500
var cylRowCount = inputArray.length

// WAVE
var waveCount = 2
var waveSpeed = 153
var waveLat = 0 // Morph to 122
var waveLng = 0 // Morph to 79
var waveRip = 0 // Morph to 39

// TWEAK
var tweakX = 0 // Morph to 90
var tweakY = 0
var tweakZ = 0

// SOUNDS
var narrationSound, isNarrationPlaying = true
var backgroundSound, isBackgroundPlaying = false

function preload() {
  font = loadFont("../../assets/fonts/NotoSans-Regular.ttf")
  
  backgroundSound = loadSound("../../assets/sounds/background/s1-forest.mp3")
  narrationSound = loadSound("../../assets/sounds/narration/s1-narration.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  
  frameRate(30)

  textFont(font)
  textSize(fontSize)
  textAlign(CENTER, CENTER)

  smooth()
  angleMode(DEGREES)
  noCursor()

  backgroundSound.setVolume(1)
  narrationSound.setVolume(0.5)
  backgroundSound.loop()
  narrationSound.play(3)
}

function draw() {
  background(253, 185, 44)

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
      fill(31, 46, 12)
      text(input[inputIndex], 0, 0)
      
      // BACK TEXT
      fill(64, 102, 32)
      translate(0, 0, -1)
      text(input[inputIndex], 0, 0)
  
      pop()
    }
  }

  if (narrationSound.isPlaying()) {
    morphing()
  } else {
    interactions()
  }
}

function morphing() {
  if (frameCount < 100) return

  if (camZoom >= -90) {
    camZoom -= 1
  }

  if (camXRotation >= -96) {
    camXRotation -= 0.1
  }

  if (cylRadius <= 200) {
    cylRadius += 0.1
  }
  if (cylSpeed <= 500) {
    cylSpeed += 1
  }

  if (waveLat <= 122) {
    waveLat += 0.1
  }
  if (waveLng <= 79) {
    waveLng += 0.1
  }
  if (waveRip <= 39) {
    waveRip += 0.1
  }

  if (tweakX <= 90) {
    tweakX += 0.1
  }
}

function interactions() {
  if (keyIsDown(UP_ARROW)) {
    camXRotation += 1
  }
  if (keyIsDown(DOWN_ARROW)) {
    camXRotation -= 1
  }
  if (keyIsDown(LEFT_ARROW)) {
    cylRadius -= 3
  }
  if (keyIsDown(RIGHT_ARROW)) {
    cylRadius += 3
  }

  if (keyIsDown(32)) {
    window.location = '../002'
  }
}


function keyPressed() {
  if (keyCode === 70) {
    fullscreen(true)
  }
  if (keyCode === 83) {
    save(Date.now() + '.png')
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
