const imagePaths = [
  "assets/Lem Boss/L1.png",
  "assets/Lem Boss/L2.png",
  "assets/Lem Boss/L3.png",
  "assets/Lem Boss/L4.png",
  "assets/Lem Boss/L5.png",
  "assets/Lem Boss/L6.png",
  "assets/Lem Boss/L7.png",
  "assets/Lem Boss/L7b.png",
  "assets/Lem Boss/L8.png"
];

const images = [];
let loaded = 0;
const canvas = document.getElementById("walker-canvas");
const ctx = canvas.getContext("2d");

const spriteWidth = 200;
const spriteHeight = 400;
const walkSpeed = 2; // Trager
const loopX = 0; // Stop helemaal links

let frame = 0;
let x = canvas.width; // Start helemaal rechts, zodat het mannetje volledig binnen het canvas komt
let phase = "walk-in";

function preloadImages(paths, callback) {
  let count = 0;
  paths.forEach((path, i) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      images[i] = img;
      count++;
      if (count === paths.length) callback();
    };
    img.onerror = () => {
      images[i] = null;
      count++;
      if (count === paths.length) callback();
    };
  });
}

let frameDelay = 0;
const maxFrameDelay = 40; // Nog tragere frames

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw current frame
  if (images[frame]) {
    // Zorg dat het mannetje niet wordt afgesneden rechts
    const drawX = Math.min(x, canvas.width - spriteWidth);
    ctx.drawImage(images[frame], drawX, 0, spriteWidth, spriteHeight);
  }

  // Animation logic
  if (phase === "walk-in") {
    // Zorg dat het mannetje niet wordt afgesneden
    x = Math.max(x - walkSpeed, loopX);
    if (frameDelay >= maxFrameDelay) {
      frame = (frame + 1) % images.length;
      frameDelay = 0;
    } else {
      frameDelay++;
    }
    if (x <= loopX) {
      phase = "loop";
      x = loopX;
    }
  } else if (phase === "loop") {
    // Fixeer x zodat breedte niet verandert
    x = loopX;
    if (frameDelay >= maxFrameDelay) {
      frame = (frame + 1) % images.length;
      frameDelay = 0;
    } else {
      frameDelay++;
    }
  }

  requestAnimationFrame(animate);
}

preloadImages(imagePaths, animate);
