// TYPE
var typeSize = 24

// CYLINDER
var cylRadius = 140
var cylRowOffset = 0.62
var cylRotationRate = -3 // Morph from -3 to -15

// WAVE
var waveCount = 5
var waveSpeed = 10
var waveLat = 0 // Morph from 0 to 120
var waveLng = 0
var waveRip = 0

// TWEAK
var tweakX = 0
var tweakY = 0
var tweakZ = 0

// CAMERA
var camZoom = 100 // Morph from 100 to -1
var camXRotation = -80
var camYRotation = -90
var camZRotation = -50

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

// SOUNDS
var narrationSound, isNarrationPlaying = true
var backgroundSound, isBackgroundPlaying = false

function preload() {
  font = loadFont("../../assets/fonts/NotoSans-Regular.ttf")

  backgroundSound = loadSound("../../assets/sounds/background/s5-thunderstorm.mp3")
  narrationSound = loadSound("../../assets/sounds/narration/s5-narration.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  
  frameRate(30)
   
  textFont(font)
  textSize(typeSize)
  textAlign(CENTER, CENTER)

  smooth()
  noCursor()

  backgroundSound.setVolume(0.2)
  narrationSound.setVolume(0.8)
  backgroundSound.loop()
  narrationSound.play(3)
}

function draw() {
  background(45, 94, 141)

  // CAMERA
  translate(0, 0, camZoom)
  rotateX(radians(camXRotation))
  rotateY(radians(camYRotation))
  rotateZ(radians(camZRotation))

  var cylRowHeight = typeSize + 5
  
  // CYLINDER TRANSFORMS
  translate(0, -(cylRowCount - 1) * cylRowHeight / 2)
  rotateY(frameCount * (cylRotationRate / 1000))
 
  for (var i = 0; i < inputArray.length; i++) {
    var input = inputArray[i]
    var inputLength = input.length

    var pieSlice = 2 * PI / inputLength
    var cylWaveOffset = 2 * PI / inputLength * waveCount
  
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
        let zOffset = sin(inputIndex * cylWaveOffset + frameCount * (waveSpeed / 1000)) * waveLat
        translate(0, 0, zOffset)
      }
      if (waveLng != 0) {
        let zOffset = sin(rowIndex * cylWaveOffset + frameCount * (waveSpeed / 1000)) * waveLng
        translate(0, 0, zOffset);
  
        let preLng = sin(floor((i / inputLength) - 1) * cylWaveOffset + frameCount * (waveSpeed / 1000)) * waveLng
        let postLng = sin(floor((i / inputLength) + 1) * cylWaveOffset + frameCount * (waveSpeed / 1000)) * waveLng
        let xLngAdjust = atan2(cylRowHeight * 2, (preLng - postLng))
        rotateX(xLngAdjust - PI / 2);
      }
      if (waveRip!= 0) {
        var yOffset = sin(inputIndex * cylWaveOffset + frameCount * (waveSpeed / 1000)) * waveRip
        translate(0, yOffset, 0);
      }
      if (tweakX != 0) {
        rotateX(cos(inputIndex * cylWaveOffset + frameCount * (waveSpeed / 1000)) * -radians(tweakX))
      }
      if (tweakY != 0) {
        rotateY(cos(inputIndex * cylWaveOffset + frameCount * (waveSpeed / 1000)) * -radians(tweakY))
      }
      if (tweakZ != 0) {
        rotateZ(cos(inputIndex * cylWaveOffset + frameCount * (waveSpeed / 1000)) * radians(tweakZ))
      }
      
      // FRONT TEXT
      fill(225, 230, 232)
      text(input[inputIndex], 0, 0)
      
      // BACK TEXT
      fill(154, 169, 164)
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

  camXRotation += 0.1

  if (cylRotationRate >= -15) {
    cylRotationRate -= 0.02
  }

  if (waveLat <= 120) {
    waveLat += 0.2
  }

  if (camZoom >= -1) {
    camZoom -= 0.2
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
    cylRadius -= 1
  }
  if (keyIsDown(RIGHT_ARROW)) {
    cylRadius += 1
  }

  if (keyIsDown(32)) {
    window.location = '../006'
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
