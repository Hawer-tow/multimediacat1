function setup() {
  createCanvas(800, 500);

   initMagneticObjects();
}

function draw() {
   drawMagneticObjects();
}

function mousePressed() {
  magneticPulse(mouseX, mouseY);
}
