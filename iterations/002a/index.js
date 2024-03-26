// Input
var input = "WITH LONG LOCKS DRAWN APART HOPE RE-ANIMATES HER DROOPING HEART STILL, AS THOUGH MOUNTED ON YOUR AIRY FLIGHT SHALL SHE BEHOLD YOU WITH DELIGHT "
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
var waveRip = 10
var waveRadius = 180
var waveTheta = 40
var wavePhi = 40

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

  if ((sphereCoil >= sphereCoilMax && sphereCoilDelta > 0)
   || (sphereCoil <= sphereCoilMin && sphereCoilDelta < 0)) {
    sphereCoilDelta *= -1
  }
  sphereCoil += sphereCoilDelta

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
      fill(0)
      text(input[inputIndex], 0, 0)

      // Back text
      translate(0, 0, -1)
      fill(235)
      text(input[inputIndex], 0, 0)
    pop()
  }
}
