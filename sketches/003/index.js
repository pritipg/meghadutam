// Text
var font
var fontSize, fontSizeSlider

// Camera
var camXRotation, camXRotationSlider
var camYRotation, camYRotationSlider
var camZRotation, camZRotationSlider
var camZoom, camZoomSlider

// Sphere
var sphereRadius, sphereRadiusSlider
var sphereCoil, sphereCoilSlider
var sphereSpeed, sphereSpeedSlider

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

function preload() {
  font = loadFont('../../assets/fonts/NotoSans-Regular.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

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
      rotateY(theta + sin(i * dwave + frameCount * (waveSpeed / 100)) * waveTheta)
      rotateZ(phi + sin(i * dwave + frameCount * (waveSpeed / 100)) * wavePhi)

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

      textSize(map(abs(phi), 0, 90, fontSize, 1))

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

  // Sphere
  sphereRadiusSlider = createSlider(0, 1000, 250)
  sphereRadiusSlider.position(10, 202)
  sphereRadiusSlider.style('width', '100px')
  sphereCoilSlider = createSlider(1, 10, 5)
  sphereCoilSlider.position(10, 232)
  sphereCoilSlider.style('width', '100px')
  sphereSpeedSlider = createSlider(-3000, 3000, 500)
  sphereSpeedSlider.position(10, 262)
  sphereSpeedSlider.style('width', '100px')

  // Wave
  waveCountSlider = createSlider(1, 10, 2)
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
  waveRadiusSlider = createSlider(0, 200, 0)
  waveRadiusSlider.position(10, 462)
  waveRadiusSlider.style('width', '100px')
  waveThetaSlider = createSlider(0, 200, 0)
  waveThetaSlider.position(10, 492)
  waveThetaSlider.style('width', '100px')
  wavePhiSlider = createSlider(0, 200, 0)
  wavePhiSlider.position(10, 522)
  wavePhiSlider.style('width', '100px')

  // TWEAK
  tweakXSlider = createSlider(0, 90, 0)
  tweakXSlider.position(10, 572)
  tweakXSlider.style('width', '100px')
  tweakYSlider = createSlider(0, 90, 0)
  tweakYSlider.position(10, 602)
  tweakYSlider.style('width', '100px')
  tweakZSlider = createSlider(0, 90, 0)
  tweakZSlider.position(10, 632)
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

  // Sphere
  sphereRadius = sphereRadiusSlider.value()
  sphereCoil = sphereCoilSlider.value()
  sphereSpeed = sphereSpeedSlider.value()

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

  text(`SPHERE RADIUS: ${sphereRadius}`, 120, 210)
  text(`SPHERE COIL: ${sphereCoil}`, 120, 240)
  text(`SPHERE SPEED: ${sphereSpeed}`, 120, 270)

  text(`WAVE COUNT: ${waveCount}`, 120, 320)
  text(`WAVE SPEED: ${waveSpeed}`, 120, 350)
  text(`WAVE LAT: ${waveLat}`, 120, 380)
  text(`WAVE LNG: ${waveLng}`, 120, 410)
  text(`WAVE RIP: ${waveRip}`, 120, 440)
  text(`WAVE RADIUS: ${waveRadius}`, 120, 470)
  text(`WAVE THETA: ${waveTheta}`, 120, 500)
  text(`WAVE PHI: ${wavePhi}`, 120, 530)

  text(`TWEAK X: ${tweakX}`, 120, 580)
  text(`TWEAK Y: ${tweakY}`, 120, 610)
  text(`TWEAK Z: ${tweakZ}`, 120, 640)
  pop()
}