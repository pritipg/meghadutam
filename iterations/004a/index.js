// Input
var input = "lightened by tasks like these, the day proceeds but much I dread, a bitter night succeeds her slight form, consumed by ceaseless pain skews like the moon, hastening to its wane disturbed by tears by those pallid cheeks burn with visions of her dearer half’s return "
var inputLength = input.length

// Text
var font
var fontSize = 24

// Camera
var camXRotation = 15
var camYRotation = 0
var camZRotation = -100
var camZoom = -90

// Torus
var torusRadius = 250
var torusThickness = 50
var torusCoil = 2
var torusSpeed = 1000

// WAVE
var waveCount = 2
var waveSpeed = 150
var waveLat = 50
var waveLng = 50
var waveRip = 0
var waveRadius = 0
var waveTheta = 125
var wavePhi = 80

// TWEAK
var tweakX = 0
var tweakY = 0
var tweakZ = 0

function preload() {
  font = loadFont('../../assets/fonts/NotoSans-Regular.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

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
      fill(0)
      text(input[inputIndex], 0, 0)

      // Back text
      translate(0, 0, -1)
      fill(235)
      text(input[inputIndex], 0, 0)
    pop()
  }
}
