// Input
var input = "nisasvasen adharaakisalayaa klesina viksipantım suddhaasnanat parusam alakam nunam aagan daalambam nıta ratrih ksana iva maya saardham icchaaratair ya tam ev osn air virahaasayanesv asrubhir yapayantım "
var inputLength = input.length

// Text
var font
var fontSize = 24

// Camera
var camXRotation = -180
var camYRotation = 0
var camZRotation = -180
var camZoom = -225

// Torus
var torusRadius = 250
var torusThickness = 180
var torusCoil = 6
var torusSpeed = 3000

// WAVE
var waveCount = 2
var waveSpeed = 150
var waveLat = 0 // Morph to 100
var waveLng = 0
var waveRip = 0
var waveRadius = 0 // Morph to 100
var waveTheta = 0
var wavePhi = 0 // Morph to 200

// SOUNDS
var narrationSound, isNarrationPlaying = true
var backgroundSound, isBackgroundPlaying = false

function preload() {
  font = loadFont('../../assets/fonts/NotoSans-Regular.ttf')

  backgroundSound = loadSound('../../assets/sounds/background/s4-waves.mp3')
  narrationSound = loadSound('../../assets/sounds/narration/s4-narration.wav')
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

  backgroundSound.setVolume(0.2)
  narrationSound.setVolume(0.5)
  backgroundSound.loop()
  narrationSound.play(3)
}

function draw() {
  background(4, 59, 68)

  // Camera
  translate(0, 0, camZoom)
  rotateX(camXRotation)
  rotateY(camYRotation)
  rotateZ(camZRotation)

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

    // Front text
    fill(104, 164, 171)
    text(input[inputIndex], 0, 0)

    // Back text
    translate(0, 0, -1)
    fill(196, 222, 229)
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
  if (frameCount < 100) return

  if (waveLat <= 100) {
    waveLat += 1
  }
  if (waveRadius <= 100) {
    waveRadius += 1
  }
  if (wavePhi <= 200) {
    wavePhi += 1
  }
}

function interactions() {
  if (keyIsDown(UP_ARROW)) {
    camXRotation += 3
  }
  if (keyIsDown(DOWN_ARROW)) {
    camXRotation -= 3
  }
  if (keyIsDown(LEFT_ARROW)) {
    torusRadius -= 5
  }
  if (keyIsDown(RIGHT_ARROW)) {
    torusRadius += 5
  }

  if (keyIsDown(32)) {
    window.location = '../005'
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
