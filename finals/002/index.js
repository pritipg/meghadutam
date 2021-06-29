// Input
var input = "tam cavasyam divasagan anaa tataparam ekaapatnım aavyapannam aavihataagatir draksyasi bhratr ajayam asa abandhah kusumaasaadr sam prayaso hy angananam sadyah apataapran ayi hrdayam viprayoge run addhi "
var inputLength = input.length

// Text
var font
var fontSize = 24

// Camera
var camXRotation = -180
var camYRotation = 0
var camZRotation = -120
var camZoom = -300

// Sphere
var sphereRadius = 250
var sphereCoil = 1, sphereCoilDelta = 0.005, sphereCoilMin = 1, sphereCoilMax = 4
var sphereSpeed = 250

// WAVE
var waveCount = 2
var waveSpeed = 150
var waveLat = 0
var waveLng = 0
var waveRip = 0 //  Morph to 10
var waveRadius = 0 // Morph to 180
var waveTheta = 0 // Morph to 40
var wavePhi = 0 // Morphi to 40

// TWEAK
var tweakX = 0
var tweakY = 0
var tweakZ = 0

// SOUNDS
var narrationSound, isNarrationPlaying = true
var backgroundSound, isBackgroundPlaying = false

function preload() {
  font = loadFont('../../assets/fonts/NotoSans-Regular.ttf')

  backgroundSound = loadSound("../../assets/sounds/background/s2-wind.mp3")
  narrationSound = loadSound("../../assets/sounds/narration/s2-narration.wav")
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
  background(182, 218, 244)

  // Camera
  translate(0, 0, camZoom)
  rotateX(camXRotation)
  rotateY(camYRotation)
  rotateZ(camZRotation)

  // Sphere transforms
  rotateY(frameCount * sphereSpeed / 1000)

  var dtheta = 360 / (2 * PI * sphereRadius / fontSize)
  var dphi = 180 / (inputLength * sphereCoil)
  var dwave = 360 / (inputLength * sphereCoil * waveCount)

  for (var i = 0; i < inputLength * sphereCoil; i++) {
    var inputIndex = i % inputLength
    var coilIndex = floor(i / inputLength)

    var theta = -180 + i * dtheta
    var phi = -90 + i * dphi

    push()
      rotateZ(phi + sin(i * dwave + frameCount * (waveSpeed / 100)) * wavePhi)
      rotateY(theta + sin(i * dwave + frameCount * (waveSpeed / 100)) * waveTheta)

      translate(sphereRadius + sin(i * dwave + frameCount * (waveSpeed / 100)) * waveRadius, 0, 0)
      rotateY(90)

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
      fill(30, 66, 74)
      text(input[inputIndex], 0, 0)

      // Back text
      translate(0, 0, -1)
      fill(167, 173, 176)
      text(input[inputIndex], 0, 0)
    pop()
  }

  if (narrationSound.isPlaying()) {
    morphing()
  } else {
    interactions()
  }
}

function morphing() {
  if ((sphereCoil >= sphereCoilMax && sphereCoilDelta > 0)
   || (sphereCoil <= sphereCoilMin && sphereCoilDelta < 0)) {
    sphereCoilDelta *= -1
  }
  sphereCoil += sphereCoilDelta

  if (frameCount < 100) return

  if (waveRip <= 10) {
    waveRip += 0.1
  }
  if (waveRadius <= 180) {
    waveRadius += 0.5
  }
  if (waveTheta <= 40) {
    waveTheta += 0.1
  }
  if (wavePhi <= 40) {
    wavePhi += 0.1
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
    wavePhi -= 1
  }
  if (keyIsDown(RIGHT_ARROW)) {
    wavePhi += 1
  }

  if (keyIsDown(32)) {
    window.location = '../003'
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
