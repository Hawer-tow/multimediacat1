let song;
let vid;
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

  // Draw video in background
  image(vid, 0, 0, width, height);

  // Instructions
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
      vid.volume(5);
      videoPlaying = true;
    }
  }
}

function mousePressed() {
  if (!audioPlaying) {
    song.play();
    audioPlaying = true;
  }
  if (!videoPlaying) {
    vid.play();
    videoPlaying = true;
  }
}
