var font

var title = 'meghadūtam'
var titleSize = 156
var titleWidth

var subtitle = 'a reimagination by priti pandurangan'
var subtitleSize = 24
var subtitleWidth

var instruction = 'Press SPACE to play and F for fullscreen. In each of the verse sections, use the arrow keys to interact once the narration is complete.'
var instructionSize = 16
var instructionWidth

var drops = []

var raindropSound

function preload () {
  font = loadFont('../../assets/fonts/NotoSans-Regular.ttf')
  raindropSound = loadSound('../../assets/sounds/raindrop.wav')
}

function setup () {
  createCanvas(windowWidth, windowHeight)

  textFont(font)

  smooth()
  angleMode(DEGREES)
  noCursor()

  noStroke()
  fill(0)

  textSize(titleSize)
  titleWidth = textWidth(title)

  textSize(subtitleSize)
  subtitleWidth = textWidth(subtitle)

  textSize(instructionSize)
  instructionWidth = textWidth(instruction)

  for (var i = 0; i < 50; i++) {
    drops.push(new RainDrop())
  }

  raindropSound.setVolume(0.5)
  raindropSound.playMode('sustain')
  raindropSound.loop()
}

function draw() {
  background(182, 218, 244) 

  for (var i = 0; i < drops.length; i++) {
    drops[i].draw()
  }

  fill(123, 71, 103)
  textSize(subtitleSize)
  text(subtitle, width - subtitleWidth - (width - titleWidth)/2 - 12, height * 0.85)

  fill(30, 66, 74)
  textSize(instructionSize)
  text(instruction, (width - instructionWidth)/2, height * 0.95)

  translate(width/2, height/2)
  textSize(24)
  fill(30, 66, 74)
  text("kalidasa's", 10-titleWidth/2, -150)
  textSize(titleSize)
  var x = -titleWidth/2
  for (var i = 0; i < title.length; i++) {
    fill(30, 66, 74)
    text(title[i], x, sin(i * 25 + frameCount * 2) * 20)
    x += textWidth(title[i])
  }
}

class RainDrop {
  constructor() {
    this.setRandomValues()
  }

  setRandomValues() {
    this.x = random(0, width)
    this.y = random(0, height * 0.25)
    this.yspeed = random(5, 20)
    this.l = random(10, 100)
    this.r = 0
    this.rspeed = random(1, 5)
  }

  draw() {
    push()
      stroke(123, 71, 103, 40)
      noFill()
      if (this.r === 0) {
        line(this.x, this.y - this.l, this.x, this.y)
        this.y += this.yspeed
        if (this.y > height * 0.75 && random() < 0.05) {
          this.r += 5
        }
      } else {
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
  if (keyIsDown(32)) {
    window.location = '../001'
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
