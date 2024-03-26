// Text
var font
var fontSize, fontSizeSlider

// INPUT
var inputArray = [
  "tasya sthitva katham api purah kautukaadhaanahetoh ",
  "antarbaaspaz ciram anucaro raajaraajasya dadhyau ",
  "meghaaloke bhavati sukhino 'py anyathaavrtti cetah ",
  "kanthaazlesapranayini jane kim punar durasamsthe "
]

// Camera
var camXRotation, camXRotationSlider
var camYRotation, camYRotationSlider
var camZRotation, camZRotationSlider
var camZoom, camZoomSlider

// CYLINDER
var cylRadius, cylRadiusSlider
var cylRowOffset, cylRowOffsetSlider
var cylSpeed, cylSpeedSlider
var cylRowCount = inputArray.length

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
  
  // CAMERA
  translate(0, 0, camZoom)
  rotateX(camXRotation)
  rotateY(camYRotation)
  rotateZ(camZRotation)

  // Text
  textSize(fontSize)
  textAlign(CENTER, CENTER)

  var cylRowHeight = fontSize + 5
  
  // CYLINDER TRANSFORMS
  translate(0, -(cylRowCount - 1) * cylRowHeight / 2)
  rotateY(frameCount * (cylSpeed / 1000))
 
  for (var i = 0; i < inputArray.length; i++) {
    var input = inputArray[i]
    var inputLength = input.length

    var pieSlice = 360 / inputLength
    var waveOffset = 360 / inputLength * waveCount
  
    for (var j = 0; j < inputLength; j++) {
      var rowIndex = i
      var inputIndex = j
    
      push()
      
      // ROW TRANSFORMS
      rotateY(rowIndex * cylRowOffset)
      translate(0, rowIndex * cylRowHeight)
      
      // RING TRANSFORMS
      rotateY(inputIndex * pieSlice)
      translate(0, 0, cylRadius)
      
      // LETTER TRANSFORMS
      if (waveLat != 0) {
        let zOffset = sin(inputIndex * waveOffset + frameCount * (waveSpeed / 100)) * waveLat
        translate(0, 0, zOffset)
      }
      if (waveLng != 0) {
        let zOffset = sin(rowIndex * waveOffset + frameCount * (waveSpeed / 100)) * waveLng
        translate(0, 0, zOffset);
  
        let preLng = sin(floor((i / inputLength) - 1) * waveOffset + frameCount * (waveSpeed / 100)) * waveLng
        let postLng = sin(floor((i / inputLength) + 1) * waveOffset + frameCount * (waveSpeed / 100)) * waveLng
        let xLngAdjust = atan2(cylRowHeight * 2, (preLng - postLng))
        rotateX(xLngAdjust - 90);
      }
      if (waveRip!= 0) {
        var yOffset = sin(inputIndex * waveOffset + frameCount * (waveSpeed / 100)) * waveRip
        translate(0, yOffset, 0);
      }
      if (tweakX != 0) {
        rotateX(cos(inputIndex * waveOffset + frameCount * (waveSpeed / 100)) * -tweakX)
      }
      if (tweakY != 0) {
        rotateY(cos(inputIndex * waveOffset + frameCount * (waveSpeed / 100)) * -tweakY)
      }
      if (tweakZ != 0) {
        rotateZ(cos(inputIndex * waveOffset + frameCount * (waveSpeed / 100)) * -tweakZ)
      }

      // FRONT TEXT
      fill(0)
      text(input[inputIndex], 0, 0)
      
      // BACK TEXT
      fill(235)
      translate(0, 0, -1)
      text(input[inputIndex], 0, 0)
  
      pop()
    }
  }
}

function setupSliders() {
  // Text
  fontSizeSlider = createSlider(10, 100, 24)
  fontSizeSlider.position(10, 12)
  fontSizeSlider.style('width', '100px')

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
  cylRadiusSlider = createSlider(0, 1000, 250)
  cylRadiusSlider.position(10, 202)
  cylRadiusSlider.style('width', '100px')
  cylRowOffsetSlider = createSlider(0, 180, 0)
  cylRowOffsetSlider.position(10, 232)
  cylRowOffsetSlider.style('width', '100px')
  cylSpeedSlider = createSlider(-3000, 3000, 500)
  cylSpeedSlider.position(10, 262)
  cylSpeedSlider.style('width', '100px')

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

  // Camera
  camXRotation = camXRotationSlider.value()
  camYRotation = camYRotationSlider.value()
  camZRotation = camZRotationSlider.value()
  camZoom = camZoomSlider.value()

  // Sphere
  cylRadius = cylRadiusSlider.value()
  cylRowOffset = cylRowOffsetSlider.value()
  cylSpeed = cylSpeedSlider.value()

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
  text(`CYLINDER ROW OFFSET: ${cylRowOffset}`, 120, 240)
  text(`CYLINDER SPEED: ${cylSpeed}`, 120, 270)

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