let points = [];
let drawIndex = 0;
let drawingComplete = false;
let offsetX, offsetY;

function preload() {
  // Load the data points in the JSON file
  const data = loadJSON("pigeon_contours.json", (result) => {
    console.log("JSON Data loaded successfully:", result);
    points = result;
  }, () => {
    console.error("JSON Data loading failure");
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundTexture();
  offsetX = width / 2 - 450;
  offsetY = height / 2 - 300;
  console.log("Canvas Size:", windowWidth, windowHeight);
}

function draw() {
  if (points.length > 0 && drawIndex < points.length) {
    // Accelerated drawing: Drawing multiple points per frame
    for (let i = 0; i < 10 && drawIndex < points.length; i++) {
      let pt = points[drawIndex];
      if (pt) {
        // Calculate the actual drawn position of the pigeon
        let xPos = pt.x + offsetX;
        let yPos = pt.y + offsetY;

        // Position the olive branch area precisely to the top right corner of the red box and the outside of the right border
        if ((xPos > width / 2 + 50 && yPos < height / 2 - 50) || 
            (xPos > width / 2 + 50 && yPos > height / 2 - 50 && yPos < height / 2 + 50)) {
          stroke(34, 139, 34); // green
        } else {
          stroke(50); // black
        }

        strokeWeight(2);
        point(xPos, yPos);
      }
      drawIndex++;
    }
  } else if (!drawingComplete) {
    // Use a white overlay effect with lower transparency
    noStroke();
    fill(255, 5); // Low transparency white overlay
    ellipse(width / 2, height / 2, frameCount * 3, frameCount * 3); // diffusion range
    if (frameCount * 3 > width * 1.5) {
      drawingComplete = true; // Stop when the spread is large enough
    }
  }
}

function mouseDragged() {
  // Affects pigeon shape while dragging
  for (let i = 0; i < points.length; i++) {
    let d = dist(mouseX, mouseY, points[i].x + offsetX, points[i].y + offsetY);
    if (d < 50) { // If the mouse is near a point, change its position
      points[i].x += random(-2, 2); // Randomly offset the point position
      points[i].y += random(-2, 2);
    }
  }
}

function mousePressed() {
  // The morphing effect when the mouse clicks
  for (let i = 0; i < points.length; i++) {
    let d = dist(mouseX, mouseY, points[i].x + offsetX, points[i].y + offsetY);
    if (d < 50) { // If the mouse is close to a point, add a more pronounced offset
      points[i].x += random(-5, 5); // Make the point position more significantly offset
      points[i].y += random(-5, 5);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  backgroundTexture();
  drawIndex = 0;
  drawingComplete = false;
  offsetX = width / 2 - 450;
  offsetY = height / 2 - 300;
}

// Use Perlin noise to generate background textures
function backgroundTexture() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let noiseValue = noise(x * 0.02, y * 0.02) * 50 + 180;
      set(x, y, color(noiseValue, noiseValue * 0.95, noiseValue * 0.85));
    }
  }
  updatePixels();
}
