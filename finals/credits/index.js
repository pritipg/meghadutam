var font

var drops = []
var backgroundSound

function preload () {
  fontNorm = loadFont('../../assets/fonts/NotoSans-Regular.ttf')
  fontBold = loadFont('../../assets/fonts/NotoSans-Bold.ttf')
  fontItal = loadFont('../../assets/fonts/NotoSans-Italic.ttf')

  backgroundSound = loadSound('../../assets/sounds/background/s6-wheel.mp3')
}

function setup () {
  createCanvas(windowWidth, windowHeight)

  textAlign(CENTER, CENTER)

  smooth()
  angleMode(DEGREES)
  noCursor()

  noStroke()
  fill(30, 66, 74)

  for (var i = 0; i < 50; i++) {
    drops.push(new RainDrop())
  }

  backgroundSound.setVolume(1)
  backgroundSound.loop()
}

function draw() {
  background(182, 218, 244) 

  for (var i = 0; i < drops.length; i++) {
    drops[i].draw()
  }

  textAlign(CENTER, CENTER)
  textFont(fontBold)
  textSize(28)
  text('CREDITS', width * 0.5, height * 0.20)

  textAlign(LEFT, CENTER)
  textFont(fontBold)
  textSize(14)
  text('TRANSLATIONS', width * 0.5 - textWidth('TRANSLATIONS') - 40, height * 0.35)
  text('TYPEFACE', width * 0.5 - textWidth('TYPEFACE') - 40, height * 0.35 + 220)
  text('SOUNDTRACK', width * 0.5 - textWidth('SOUNDiTRACK') - 40, height * 0.35 + 290)

  textFont(fontItal)
  textSize(16)
  textLeading(24)
  text('Messenger Poems, Translated by James Mallinson, The Clay Sanskrit Library, 2006.', width * 0.5 + 40, height * 0.35, 360)
  text('Meghadūta or Cloud Messenger, Translated into English Verse by H H Wilson, Digitised by Google.', width * 0.5 + 40, height * 0.35 + 65, 360)
  text('The Complete Works of Kālidāsā, Volume One, Translated by Chandra Rajan, Sahitya Akademi, 1997.', width * 0.5 + 40, height * 0.35 + 130, 390)
  text('Noto Sans, By Google & Monotype.', width * 0.5 + 40, height * 0.35 + 220, 360)
  text('Thunder Strike, Soundbible. Recorded by Mike Koenig. Creative Commons, Attribution 3.0', width * 0.5 + 40, height * 0.35 + 290, 390)
  text('Singularity by Earth Songs. Cryo Chamber.', width * 0.5 + 40, height * 0.35 + 290 + 65, 390)
  text('Several sounds from freesound.org.\nCreative Commons, Attribution 0.', width * 0.5 + 40, height * 0.35 + 290 + 110, 380)
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
    window.location = '../title'
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
