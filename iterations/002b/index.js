// Input
var input = "WITH LONG LOCKS DRAWN APART HOPE RE-ANIMATES HER DROOPING HEART STILL, AS THOUGH MOUNTED ON YOUR AIRY FLIGHT SHALL SHE BEHOLD YOU WITH DELIGHT "
var inputLength = input.length

// Text
var font
var fontSize = 30

// Camera
var camXRotation = -120
var camYRotation = -20
var camZRotation = -150
var camZoom = -230

// Sphere
var sphereRadius = 250
var sphereCoil = 4
var sphereSpeed = 100

// WAVE
var waveCount = 2
var waveSpeed = 100
var waveLat = 200
var waveLng = 60
var waveRip = 0
var waveRadius = 0
var waveTheta = 70
var wavePhi = 70

// TWEAK
var tweakX = 0
var tweakY = 0
var tweakZ = 0

function preload() {
  font = loadFont('../../assets/fonts/NotoSans-Regular.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

  frameRate(30)

  textFont(font)
  angleMode(DEGREES)
  smooth()
}

function draw() {
  background(255)

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
