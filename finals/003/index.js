// Text
var font
var fontSize = 24

// Camera
var camXRotation = 78
var camYRotation = 0
var camZRotation = 0
var camZoom = 0

// Spiral
var spiralRadius = 135
var spiralCoils = 10
var spiralSpeed = 1000
var spiralWave = 0 // Morph to 50

// WAVE
var waveCount = 2
var waveSpeed = 1000
var waveLat = 39
var waveLng = 33
var waveRip = 8
var waveRadius = 33
var waveTheta = 8
var wavePhi = 0

// INPUT
var input = "tam kasyam cid bhavanaavalabhau suptaaparavatayam nıtva ratrim ciraavilasanat khinnaavidyutakalatrah drste surye punar api bhavan vahayed adhvaa sesam mandayante na khalu suahrdam abhyupetaa rthaakrtyah "
var inputLength = input.length

// SOUNDS
var narrationSound, isNarrationPlaying = true
var backgroundSound, isBackgroundPlaying = false

function preload() {
  font = loadFont("../../assets/fonts/NotoSans-Regular.ttf")

  backgroundSound = loadSound("../../assets/sounds/background/s2-wind.mp3")
  narrationSound = loadSound("../../assets/sounds/narration/s3-narration.wav")
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
  background(133, 175, 229)

  // Camera
  translate(0, 0, camZoom)
  rotateX(camXRotation)
  rotateY(camYRotation)
  rotateZ(camZRotation)

  // Spiral transforms
  rotateZ(frameCount * spiralSpeed / 1000)

  var radius = spiralRadius
  var theta = -90
  var dwave = 360 / (inputLength * spiralCoils * waveCount)

  for (var i = 0; i < inputLength * spiralCoils; i++) {
    var inputIndex = i % inputLength
    var coilIndex = floor(i / inputLength)

    theta += fontSize * (360 / (2 * PI * radius))
    radius += fontSize * (360 / (2 * PI * radius)) / (2 * PI)

    push()
    rotateZ(theta + sin(coilIndex * dwave + frameCount * (waveSpeed / 100)) * wavePhi)
    translate(radius + sin(coilIndex * dwave + frameCount * (waveSpeed / 100)) * waveRadius, 0, 0)
    rotateY(sin(coilIndex * dwave + frameCount * (waveSpeed / 100)) * waveTheta)
    rotateZ(90)

    translate(0, 0, spiralWave * sin(radius * sin(theta) + frameCount * (waveSpeed / 100)))

    // Letter transforms
    if (waveLat != 0) {
      var xOffset = sin(i * dwave + frameCount * (waveSpeed / 100)) * waveLat
      translate(xOffset, 0, 0)
    }
    if (waveLng != 0) {
      var zOffset = sin(i * dwave + frameCount * (waveSpeed / 100)) * waveLng
      translate(0, 0, zOffset);
    }
    if (waveRip!= 0) {
      var yOffset = sin(i * dwave + frameCount * (waveSpeed / 100)) * waveRip
      translate(0, yOffset, 0);
    }

    // Front text
    fill(13, 87, 90)
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

  if (spiralWave <= 50) {
    spiralWave += 0.5
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
    spiralWave -= 3
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spiralWave += 3
  }

  if (keyIsDown(32)) {
    window.location = '../004'
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
