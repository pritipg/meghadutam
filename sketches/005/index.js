// Text
var font
var fontSize, fontSizeSlider

// Camera
var camXRotation, camXRotationSlider
var camYRotation, camYRotationSlider
var camZRotation, camZRotationSlider
var camZoom, camZoomSlider

// Torus
var torusRadius, torusRadiusSlider
var torusThickness, torusThicknessSlider
var torusCoil, torusCoilSlider
var torusSpeed, torusSpeedSlider

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

  // Torus transforms
  rotateY(frameCount * torusSpeed / 1000)

  var dtheta = 360 / (2 * PI * torusRadius / fontSize)
  var dphi = 360 / (inputLength * torusCoil)
  var dwave = 360 / (inputLength * torusCoil * waveCount)

  for (var i = 0; i < inputLength * torusCoil; i++) {
    var inputIndex = i % inputLength
    var coilIndex = floor(i / inputLength)

    var theta = -180 + i * dtheta
    var phi = -90 + i * dphi
  
    push()
      rotateZ(theta + sin(i * dwave + frameCount * (waveSpeed / 100)) * waveTheta)
      translate(torusRadius + sin(i * dwave + frameCount * (waveSpeed / 100)) * waveRadius, 0, 0)
      rotateY(phi+ sin(i * dwave + frameCount * (waveSpeed / 100)) * wavePhi)
      translate(0, 0, torusThickness/2)

      rotateZ(90)

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
  torusRadiusSlider = createSlider(0, 1000, 250)
  torusRadiusSlider.position(10, 202)
  torusRadiusSlider.style('width', '100px')
  torusThicknessSlider = createSlider(0, 1000, 250)
  torusThicknessSlider.position(10, 232)
  torusThicknessSlider.style('width', '100px')
  torusCoilSlider = createSlider(1, 20, 10)
  torusCoilSlider.position(10, 262)
  torusCoilSlider.style('width', '100px')
  torusSpeedSlider = createSlider(-3000, 3000, 1000)
  torusSpeedSlider.position(10, 292)
  torusSpeedSlider.style('width', '100px')

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

  // Sphere
  torusRadius = torusRadiusSlider.value()
  torusThickness = torusThicknessSlider.value()
  torusCoil = torusCoilSlider.value()
  torusSpeed = torusSpeedSlider.value()

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

  text(`TORUS RADIUS: ${torusRadius}`, 120, 210)
  text(`TORUS THICKNESS: ${torusThickness}`, 120, 240)
  text(`TORUS COIL: ${torusCoil}`, 120, 270)
  text(`TORUS SPEED: ${torusSpeed}`, 120, 300)

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