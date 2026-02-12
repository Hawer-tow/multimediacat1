let song;
let vid;
let angle = 0;
let videoPlaying = false;
let audioPlaying = false;

function preload() {
  song = loadSound('assets/alex_warren_ordinary_lyrics_aac_44129.m4a');
  vid = createVideo('assets/4a7a49d9a8dbde8ae31a94ea856c3356[1].mp4');
  vid.hide();
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(20);

  vid.volume(0);   // mute so autoplay works
  vid.loop();
  vid.play();
  videoPlaying = true;
}

function draw() {
  background(220);

  image(vid, 0, 0, width, height);
/*
  push();
  translate(width / 2, height / 2);
  rotate(angle);
  fill(255, 100, 150, 150);
  rectMode(CENTER);
  rect(0, 0, 200, 200);
  pop();

  angle += 0.01;
*/
  fill(0);
  text("Press 'P' to Play/Pause Music | Press 'V' to Play/Pause Video", width / 2, height - 30);
}

function keyPressed() {
  if (key.toLowerCase() === 'p') {
    if (audioPlaying) {
      song.pause();
      audioPlaying = false;
    } else {
      song.play();
      audioPlaying = true;
    }
  }

  if (key.toLowerCase() === 'v') {
    if (videoPlaying) {
      vid.pause();
      videoPlaying = false;
    } else {
      vid.play();
      videoPlaying = true;
    }
  }
}

function mousePressed() {
  // unlock audio/video on first click
  if (!audioPlaying) {
    song.play();
    audioPlaying = true;
  }
  if (!videoPlaying) {
    vid.play();
    videoPlaying = true;
  }
}
