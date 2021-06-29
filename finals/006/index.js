// Input
var input = "nanvatmanam bahuviganayan natmanan avalambe tat kalyan itvam api sutaram magamah kataratvam kasy atyantam sukham upanatam duh kham ekaa ntato va nıcair gacchaty upari ca dasa cakraanemiakramena "
var inputLength = input.length

// Text
var font
var fontSize = 24

// Camera
var camXRotation = 0
var camYRotation = 15
var camZRotation = 180
var camZoom = -360

// Torus
var torusRadius = 630
var torusThickness = 1000
var torusCoil = 10
var torusSpeed = 3000

// WAVE
var waveCount = 2
var waveSpeed = 150
var waveLat = 0
var waveLng = 200
var waveRip = 0
var waveRadius = 0
var waveTheta = 0
var wavePhi = 0

// TWEAK
var tweakX = 45
var tweakY = 0
var tweakZ = 90

// SOUNDS
var narrationSound, isNarrationPlaying = true
var backgroundSound, isBackgroundPlaying = false

function preload() {
  font = loadFont('../../assets/fonts/NotoSans-Regular.ttf')
  
  backgroundSound = loadSound('../../assets/sounds/background/s6-wheel.mp3')
  narrationSound = loadSound('../../assets/sounds/narration/s6-narration.wav')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

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
  background(123, 71, 103)

  // Camera
  translate(0, 0, camZoom)
  rotateX(camXRotation)
  rotateY(camYRotation)
  rotateZ(camZRotation)

  // Text

  // Torus transforms
  rotateY(frameCount * torusSpeed / 1000)

  var dtheta = 5 + 360 / (2 * PI * torusRadius / fontSize)
  var dphi = 360 / (inputLength * torusCoil)
  var dwave = 360 / (inputLength * torusCoil * waveCount)

  for (var i = 0; i < inputLength * torusCoil; i++) {
    var inputIndex = i % inputLength
    var coilIndex = floor(i / inputLength)

    var theta = -180 + i * dtheta
    var phi = -90 + i * dphi
  
    push()
      rotateZ(phi+ sin(i * dwave + frameCount * (waveSpeed / 100)) * wavePhi)
      translate(torusRadius + sin(i * dwave + frameCount * (waveSpeed / 100)) * waveRadius, 0, 0)
      rotateY(theta + sin(i * dwave + frameCount * (waveSpeed / 100)) * waveTheta)
      translate(0, 0, torusThickness/2)

      // Letter transforms
      if (waveLat != 0) {
        var zOffset = sin(i * dwave + frameCount * (waveSpeed / 100)) * waveLat
        translate(0, 0, zOffset)
      }
      if (waveLng != 0) {
        var zOffset = sin(coilIndex * dwave + frameCount * (waveSpeed / 100)) * waveLng
        translate(0, 0, zOffset);
      }
      if (waveRip!= 0) {
        var yOffset = sin(i * dwave + frameCount * (waveSpeed / 100)) * waveRip
        translate(0, yOffset, 0);
      }
      if (tweakX != 0) {
        rotateX(cos(i * dwave + frameCount * (waveSpeed / 100)) * -tweakX)
      }
      if (tweakY != 0) {
        rotateY(cos(i * dwave + frameCount * (waveSpeed / 100)) * -tweakY)
      }
      if (tweakZ != 0) {
        rotateZ(cos(i * dwave + frameCount * (waveSpeed / 1000)) * -tweakZ)
      }

      // Front text
      fill(252, 164, 83)
      text(input[inputIndex], 0, 0)
    pop()
  }

  if (!narrationSound.isPlaying()) {
    interactions()
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
    torusRadius -= 3
  }
  if (keyIsDown(RIGHT_ARROW)) {
    torusRadius += 3
  }

  if (keyIsDown(32)) {
    window.location = '../007'
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