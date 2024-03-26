// Text
var font
var fontSize, fontSizeSlider

// Input
var input, inputField
var inputLength

// Camera
var camXRotation, camXRotationSlider
var camYRotation, camYRotationSlider
var camZRotation, camZRotationSlider
var camZoom, camZoomSlider

// Cylinder
var cylRadius, cylRadiusSlider
var cylHeight, cylHeightSlider
var cylRotation, cylRotationSlider

// WAVE
var waveCount, waveCountSlider
var waveSpeed, waveSpeedSlider
var waveLat, waveLatSlider
var waveLng, waveLngSlider
var waveRip, waveRipSlider

// TWEAK
var tweakX, tweakXSlider
var tweakY, tweakYSlider
var tweakZ, tweakZSlider

function preload() {
  font = loadFont('../../assets/fonts/NotoSans-Regular.ttf')
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

  var dTheta = 360 / (2 * PI * cylRadius / fontSize)
  var dHeight = cylHeight / inputLength
  var dWave = 360 / (inputLength * waveCount)

  // Cylinder transforms
  translate(0, cylHeight/2, 0)
  rotateY(frameCount * cylRotation / 1000)

  for (var i = 0; i < inputLength; i++) {
    push()

    translate(0, -i * dHeight, 0)
    rotateY(i * dTheta)
    translate(cylRadius, 0, 0)

    rotateY(90)
    
    // Letter transforms
    if (waveLat != 0) {
      var zOffset = sin(i * dWave + frameCount * (waveSpeed / 100)) * waveLat
      translate(0, 0, zOffset)
    }
    if (waveLng != 0) {
      var rowIndex = i % (360 / dTheta)
      var zOffset = sin(rowIndex * dWave + frameCount * (waveSpeed / 100)) * waveLng
      translate(0, 0, zOffset);
    }
    if (waveRip!= 0) {
      var yOffset = sin(i * dWave + frameCount * (waveSpeed / 100)) * waveRip
      translate(0, yOffset, 0);
    }
    if (tweakX != 0) {
      rotateX(cos(i * dWave + frameCount * (waveSpeed / 100)) * -tweakX)
    }
    if (tweakY != 0) {
      rotateY(cos(i * dWave + frameCount * (waveSpeed / 100)) * -tweakY)
    }
    if (tweakZ != 0) {
      rotateZ(cos(i * dWave + frameCount * (waveSpeed / 1000)) * -tweakZ)
    }
    
    // Front text
    fill(0)
    text(input[i], 0, 0)

    // Back text
    translate(0, 0, -1)
    fill(235)
    text(input[i], 0, 0)
  
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

  // Cylinder
  cylRadiusSlider = createSlider(0, 1000, 100)
  cylRadiusSlider.position(10, 202)
  cylRadiusSlider.style('width', '100px')
  cylHeightSlider = createSlider(0, 1000, 400)
  cylHeightSlider.position(10, 232)
  cylHeightSlider.style('width', '100px')
  cylRotationSlider = createSlider(-1000, 1000, 500)
  cylRotationSlider.position(10, 262)
  cylRotationSlider.style('width', '100px')

  // Wave
  waveCountSlider = createSlider(0, 10, 2)
  waveCountSlider.position(10, 312)
  waveCountSlider.style('width', '100px')
  waveSpeedSlider = createSlider(0, 1000, 150)
  waveSpeedSlider.position(10, 342)
  waveSpeedSlider.style('width', '100px')
  waveLatSlider = createSlider(0, 200, 0)
  waveLatSlider.position(10, 372)
  waveLatSlider.style('width', '100px')
  waveLngSlider = createSlider(0, 200, 0)
  waveLngSlider.position(10, 402)
  waveLngSlider.style('width', '100px')
  waveRipSlider = createSlider(0, 100, 0)
  waveRipSlider.position(10, 432)
  waveRipSlider.style('width', '100px')

  // TWEAK
  tweakXSlider = createSlider(0, 90, 0)
  tweakXSlider.position(10, 482)
  tweakXSlider.style('width', '100px')
  tweakYSlider = createSlider(0, 90, 0)
  tweakYSlider.position(10, 512)
  tweakYSlider.style('width', '100px')
  tweakZSlider = createSlider(0, 90, 0)
  tweakZSlider.position(10, 542)
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

  // Cylinder
  cylRadius = cylRadiusSlider.value()
  cylHeight = cylHeightSlider.value()
  cylRotation = cylRotationSlider.value()

  // Wave
  waveCount = waveCountSlider.value()
  waveSpeed = waveSpeedSlider.value()
  waveLat = waveLatSlider.value()
  waveLng = waveLngSlider.value()
  waveRip = waveRipSlider.value()

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

  text(`CYLINDER RADIUS: ${cylRadius}`, 120, 210)
  text(`CYLINDER HEIGHT: ${cylHeight}`, 120, 240)
  text(`CYLINDER ROTATION: ${cylRotation}`, 120, 270)

  text(`WAVE COUNT: ${waveCount}`, 120, 320)
  text(`WAVE SPEED: ${waveSpeed}`, 120, 350)
  text(`WAVE LAT: ${waveLat}`, 120, 380)
  text(`WAVE LNG: ${waveLng}`, 120, 410)
  text(`WAVE RIP: ${waveRip}`, 120, 440)

  text(`TWEAK X: ${tweakX}`, 120, 490)
  text(`TWEAK Y: ${tweakY}`, 120, 520)
  text(`TWEAK Z: ${tweakZ}`, 120, 550)
  pop()
}