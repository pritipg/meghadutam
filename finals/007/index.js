var font
var drops = []
var letters = 'meghaduta'.split('')

// SOUNDS
var narrationSound, isNarrationPlaying = true
var backgroundSound, isBackgroundPlaying = false

var waitCount = 0

function preload() {
  font = loadFont('../../assets/fonts/NotoSans-Regular.ttf')

  backgroundSound = loadSound('../../assets/sounds/background/s7-rain.mp3')
  narrationSound = loadSound('../../assets/sounds/narration/s7-narration.wav')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  
  textSize(24)
  textFont(font)
  textAlign(CENTER, CENTER)
  
  smooth()
  angleMode(DEGREES)
  noCursor()

  fill(79, 90, 102)
  noStroke()

  backgroundSound.setVolume(0.3)
  narrationSound.setVolume(0.9)
  backgroundSound.loop()
  narrationSound.play(3)

  for (var i = 0; i < 300; i++) {
    drops.push(new TextDrop())
  }
}

function draw() {
  background(168, 171, 178)
  
  for (var i = 0; i < drops.length; i++) {
    drops[i].draw()
  }

  if (!narrationSound.isPlaying()) {
    waitCount += 1

    if (waitCount > 400) {
      noLoop()
      window.location = '../credits'
    }
  }
}

class TextDrop {
  constructor() {
    this.setRandomValues()
  }

  setRandomValues() {
    this.x = random(0, width)
    this.y = random(-height, 0)
    this.yspeed = random(5, 10)

    this.char = random(letters)
    this.charSize = random(20, 24)

    this.r = 0
    this.rspeed = random(1, 3)
  }

  draw() {
    push()
      if (this.r === 0) {
        fill(79, 90, 102)
        noStroke()
        textSize(this.charSize)
        text(this.char, this.x, this.y)

        this.y += this.yspeed

        if (this.y > height * 0.60 && random() < 0.1) {
          this.r += 5
        }
      } else {
        stroke(79, 90, 102, 120)
        noFill()
        ellipse(this.x, this.y, this.r, this.r/3)

        this.r += this.rspeed

        if (this.r > 100 && random() < 0.1) {
          this.setRandomValues()
        }
      }
    pop()
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