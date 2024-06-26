// Text
var font
var fontSize, fontSizeSlider

// Camera
var camXRotation, camXRotationSlider
var camYRotation, camYRotationSlider
var camZRotation, camZRotationSlider
var camZoom, camZoomSlider

// Spiral
var spiralRadius, spiralRadiusSlider
var spiralCoils, spiralCoilsSlider
var spiralSpeed, spiralSpeedSlider

// WAVE
var waveCount, waveCountSlider
var waveSpeed, waveSpeedSlider
var waveLat, waveLatSlider
var waveLng, waveLngSlider
var waveRip, waveRipSlider
var waveRadius, waveRadiusSlider
var waveTheta, waveThetaSlider
var wavePhi, wavePhiSlider

// TWEAK
var tweakX, tweakXSlider
var tweakY, tweakYSlider
var tweakZ, tweakZSlider

// INPUT
var input
var inputLength

function preload() {
  font = loadFont("../../assets/fonts/NotoSans-Regular.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
 
  frameRate(30)
 
  textFont(font)
  angleMode(DEGREES)
  smooth()

  setupSliders()
}

function draw() {
  background(255)

  updateSliders()

  // Camera
  translate(0, 0, camZoom)
  rotateX(camXRotation)
  rotateY(camYRotation)
  rotateZ(camZRotation)

  // Text
  textSize(fontSize)
  textAlign(CENTER, CENTER)

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

    // PIKU LIKES THIS
    translate(0, 0, 50 * sin(radius * sin(theta) + frameCount * (waveSpeed / 100)))

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
    fill(0)
    text(input[inputIndex], 0, 0)

    // Back text
    translate(0, 0, -1)
    fill(235)
    text(input[inputIndex], 0, 0)
    pop()
  }
}

function setupSliders() {
  // Text
  fontSizeSlider = createSlider(10, 100, 24)
  fontSizeSlider.position(10, 12)
  fontSizeSlider.style('width', '100px')

  // Input
  inputField = select('#input-field')

  // Camera
  camXRotationSlider = createSlider(-180, 180, 15)
  camXRotationSlider.position(10, 62)
  camXRotationSlider.style('width', '100px')
  camYRotationSlider = createSlider(-180, 180, 0)
  camYRotationSlider.position(10, 92)
  camYRotationSlider.style('width', '100px')
  camZRotationSlider = createSlider(-180, 180, 0)
  camZRotationSlider.position(10, 122)
  camZRotationSlider.style('width', '100px')
  camZoomSlider = createSlider(-500, 500, 0)
  camZoomSlider.position(10, 152)
  camZoomSlider.style('width', '100px')

  // Spiral
  spiralRadiusSlider = createSlider(0, 1000, 50)
  spiralRadiusSlider.position(10, 202)
  spiralRadiusSlider.style('width', '100px')
  spiralCoilsSlider = createSlider(1, 10, 2)
  spiralCoilsSlider.position(10, 262)
  spiralCoilsSlider.style('width', '100px')
  spiralSpeedSlider = createSlider(-3000, 3000, 1000)
  spiralSpeedSlider.position(10, 292)
  spiralSpeedSlider.style('width', '100px')

  // Wave
  waveCountSlider = createSlider(1, 10, 2)
  waveCountSlider.position(10, 342)
  waveCountSlider.style('width', '100px')
  waveSpeedSlider = createSlider(0, 1000, 150)
  waveSpeedSlider.position(10, 372)
  waveSpeedSlider.style('width', '100px')
  waveLatSlider = createSlider(0, 200, 0)
  waveLatSlider.position(10, 402)
  waveLatSlider.style('width', '100px')
  waveLngSlider = createSlider(0, 200, 0)
  waveLngSlider.position(10, 432)
  waveLngSlider.style('width', '100px')
  waveRipSlider = createSlider(0, 100, 0)
  waveRipSlider.position(10, 462)
  waveRipSlider.style('width', '100px')
  waveRadiusSlider = createSlider(0, 200, 0)
  waveRadiusSlider.position(10, 492)
  waveRadiusSlider.style('width', '100px')
  waveThetaSlider = createSlider(0, 200, 0)
  waveThetaSlider.position(10, 522)
  waveThetaSlider.style('width', '100px')
  wavePhiSlider = createSlider(0, 200, 0)
  wavePhiSlider.position(10, 552)
  wavePhiSlider.style('width', '100px')

  // TWEAK
  tweakXSlider = createSlider(0, 90, 0)
  tweakXSlider.position(10, 602)
  tweakXSlider.style('width', '100px')
  tweakYSlider = createSlider(0, 90, 0)
  tweakYSlider.position(10, 632)
  tweakYSlider.style('width', '100px')
  tweakZSlider = createSlider(0, 90, 0)
  tweakZSlider.position(10, 662)
  tweakZSlider.style('width', '100px')
}

function updateSliders() {
  // Text
  fontSize = fontSizeSlider.value()

  // Input
  input = inputField.value()
  inputLength = input.length

  // Camera
  camXRotation = camXRotationSlider.value()
  camYRotation = camYRotationSlider.value()
  camZRotation = camZRotationSlider.value()
  camZoom = camZoomSlider.value()

  // Spiral
  spiralRadius = spiralRadiusSlider.value()
  spiralCoils = spiralCoilsSlider.value()
  spiralSpeed = spiralSpeedSlider.value()

  // Wave
  waveCount = waveCountSlider.value()
  waveSpeed = waveSpeedSlider.value()
  waveLat = waveLatSlider.value()
  waveLng = waveLngSlider.value()
  waveRip = waveRipSlider.value()
  waveRadius = waveRadiusSlider.value()
  waveTheta = waveThetaSlider.value()
  wavePhi = wavePhiSlider.value()

  // Tweak
  tweakX = tweakXSlider.value()
  tweakY = tweakYSlider.value()
  tweakZ = tweakZSlider.value()

  push()
  translate(-width/2, -height/2)
  fill(0)
  textSize(9)
  textAlign(LEFT, CENTER)

  text(`FONT SIZE: ${fontSize}`, 120, 20)

  text(`CAMERA X: ${camXRotation}`, 120, 70)
  text(`CAMERA Y: ${camYRotation}`, 120, 100)
  text(`CAMERA Z: ${camZRotation}`, 120, 130)
  text(`CAMERA ZOOM: ${camZoom}`, 120, 160)

  text(`SPIRAL RADIUS: ${spiralRadius}`, 120, 210)
  text(`SPIRAL COIL: ${spiralCoils}`, 120, 270)
  text(`SPIRAL SPEED: ${spiralSpeed}`, 120, 300)

  text(`WAVE COUNT: ${waveCount}`, 120, 350)
  text(`WAVE SPEED: ${waveSpeed}`, 120, 380)
  text(`WAVE LAT: ${waveLat}`, 120, 410)
  text(`WAVE LNG: ${waveLng}`, 120, 440)
  text(`WAVE RIP: ${waveRip}`, 120, 470)
  text(`WAVE RADIUS: ${waveRadius}`, 120, 500)
  text(`WAVE THETA: ${waveTheta}`, 120, 530)
  text(`WAVE PHI: ${wavePhi}`, 120, 560)

  text(`TWEAK X: ${tweakX}`, 120, 610)
  text(`TWEAK Y: ${tweakY}`, 120, 640)
  text(`TWEAK Z: ${tweakZ}`, 120, 670)
  pop()
}