// Declare global variables
let song;
let vid;
let angle = 0;

function preload() {
  // Load a sound file 
  song = loadSound('assets/alex_warren_ordinary_lyrics_aac_44129.m4a');
  
 
  vid = createVideo('assets/4a7a49d9a8dbde8ae31a94ea856c3356[1].mp4');
  vid.hide(); 
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(20);

  vid.volume(0);  // mute so autoplay works
  vid.loop();     // keep looping
  vid.play();     // start playing right away
}

function draw() {
  background(220);

  // Display video in the background
  image(vid, 0, 0, width, height);

  // Animated rotating shape overlay
  push();
  translate(width/2, height/2);
  rotate(angle);
  fill(255, 100, 150, 150);
  rectMode(CENTER);
  rect(0, 0, 200, 200);
  pop();

  angle += 0.01;

  // Instructions
  fill(255);
  text("Press 'P' to Play/Pause Music | Press 'V' to Play/Pause Video", width/2, height - 30);
}

function keyPressed() {
  // Toggle music
  if (key === 'P') {
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.play();
    }
  }

  // Toggle video
  if (key === 'V') {
    if (vid.elt.paused) {
      vid.play();
    } else {
      vid.pause();
    }
  }
}
