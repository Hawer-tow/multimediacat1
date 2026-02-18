let magnets = [];
let magnetCount = 80;
let song;
let vid;
let videoPlaying = false;
let audioPlaying = false;
let canvas;

function preload() {
  // Load audio
  song = loadSound('assets/alex_warren_ordinary_lyrics_aac_44129.m4a');

  // Load video
  vid = createVideo('assets/4a7a49d9a8dbde8ae31a94ea856c3356[1].mp4');
}

function setup() {
  // Create canvas
  canvas = createCanvas(800, 600);

  // Attach both to the container <main>
  vid.parent("container");
  canvas.parent("container");

  // Style video so it sits above canvas
  vid.size(800, 450);   // adjust height as needed
  vid.volume(0);
  vid.loop();
  vid.play();
  videoPlaying = true;

  initMagneticObjects();
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(220);
  drawMagneticObjects();

  // Instructions
  fill(0);
  text("Press 'P' to Play/Pause Music | Press 'V' to Play/Pause Video", width / 2, height - 30);
}

function keyPressed() {
  // Toggle audio
  if (key === 'P' || key === 'p') {
    if (audioPlaying) {
      song.pause();
      audioPlaying = false;
    } else {
      song.play();
      audioPlaying = true;
    }
  }

  // Toggle video
  if (key === 'V' || key === 'v') {
    if (videoPlaying) {
      vid.pause();
      videoPlaying = false;
    } else {
      vid.play();
      vid.volume(1); // unmute when resuming
      videoPlaying = true;
    }
  }
}

// Unlock audio/video on first click (browser requirement)
function mousePressed() {
  magneticPulse(mouseX, mouseY);
  if (!audioPlaying) {
    song.play();
    audioPlaying = true;
  }
  if (!videoPlaying) {
    vid.play();
    vid.volume(1); // unmute on click
    videoPlaying = true;
  }
}

function initMagneticObjects() {
  magnets = [];
  for (let i = 0; i < magnetCount; i++) {
    magnets.push(new MagnetParticle(random(width), random(height)));
  }
}

function drawMagneticObjects() {
  background(10, 12, 20, 35);

  if (mouseIsPressed) {
    noFill();
    stroke(180, 220, 255, 70);
    strokeWeight(2);
    circle(mouseX, mouseY, 140);
    circle(mouseX, mouseY, 220);
  }

  for (let p of magnets) {
    p.update();
    p.display();
  }
}

function magneticPulse(mx, my) {
  for (let p of magnets) {
    p.pulse(mx, my);
  }
}

class MagnetParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.3, 1.2));
    this.acc = createVector(0, 0);
    this.baseSize = random(3, 7);
    this.size = this.baseSize;
    this.hueShift = random(0, 30);
  }

  update() {
    this.acc.set(0, 0);

    if (mouseIsPressed) {
      let target = createVector(mouseX, mouseY);
      let dir = p5.Vector.sub(target, this.pos);
      let d = constrain(dir.mag(), 25, 300);
      dir.normalize();

      let strength = 2.6 / (d * 0.03);
      dir.mult(strength);

      this.acc.add(dir);
      this.size = lerp(this.size, this.baseSize * 1.6, 0.08);
    } else {
      let noiseAngle =
        noise(this.pos.x * 0.003, this.pos.y * 0.003, frameCount * 0.003) *
        TWO_PI * 2;

      let wander = p5.Vector.fromAngle(noiseAngle).mult(0.06);
      this.acc.add(wander);
      this.size = lerp(this.size, this.baseSize, 0.08);
    }

    this.vel.add(this.acc);
    this.vel.limit(4.2);
    this.pos.add(this.vel);

    if (this.pos.x < -10) this.pos.x = width + 10;
    if (this.pos.x > width + 10) this.pos.x = -10;
    if (this.pos.y < -10) this.pos.y = height + 10;
    if (this.pos.y > height + 10) this.pos.y = -10;
  }

  pulse(mx, my) {
    let fromClick = p5.Vector.sub(this.pos, createVector(mx, my));
    let d = constrain(fromClick.mag(), 20, 300);
    fromClick.normalize();

    let kick = 6.5 / (d * 0.02);
    fromClick.mult(kick);
    this.vel.add(fromClick);
  }

  display() {
    noStroke();
    fill(120 + this.hueShift, 200, 255, 18);
    circle(this.pos.x, this.pos.y, this.size * 5);

    fill(160 + this.hueShift, 220, 255, 35);
    circle(this.pos.x, this.pos.y, this.size * 2.6);

    fill(230, 245, 255, 200);
    circle(this.pos.x, this.pos.y, this.size);
  }
}
