let magnets = [];
let magnetCount = 80;

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
