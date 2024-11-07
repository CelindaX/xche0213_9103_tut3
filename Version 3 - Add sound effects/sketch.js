let points = []; // Array to hold points for drawing the pigeon
let drawIndex = 0; // Index to keep track of current drawing point
let drawingComplete = false; // Flag to indicate when drawing is complete
let offsetX, offsetY; // Offset for centering the pigeon
let penSound, clickSound; // Sound variables for drawing and click interactions

function preload() {
  // Load JSON data for pigeon points
  const data = loadJSON("pigeon_contours.json", (result) => {
    console.log("JSON data loaded successfully:", result);
    points = result;
  }, () => {
    console.error("Failed to load JSON data");
  });

  // Load sound files
  penSound = loadSound("libraries/pen.mp3");
  clickSound = loadSound("libraries/click.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundTexture(); // Generate background texture
  offsetX = width / 2 - 450; // Calculate horizontal offset for centering
  offsetY = height / 2 - 300; // Calculate vertical offset for centering
  console.log("Canvas dimensions:", windowWidth, windowHeight);
}

function draw() {
  if (points.length > 0 && drawIndex < points.length) {
    // Accelerate drawing by rendering multiple points per frame
    for (let i = 0; i < 10 && drawIndex < points.length; i++) {
      let pt = points[drawIndex]; // Get current point
      if (pt) {
        let xPos = pt.x + offsetX; // Apply horizontal offset
        let yPos = pt.y + offsetY; // Apply vertical offset

        // Set green color for the olive branch area
        if ((xPos > width / 2 + 50 && yPos < height / 2 - 50) || 
            (xPos > width / 2 + 50 && yPos > height / 2 - 50 && yPos < height / 2 + 50)) {
          stroke(34, 139, 34); // Green color for olive branch
        } else {
          stroke(50); // Black color for other areas
        }

        strokeWeight(2); // Set stroke weight for drawing
        point(xPos, yPos); // Draw the point

        // Play the drawing sound effect if not already playing
        if (!penSound.isPlaying()) {
          penSound.play();
        }
      }
      drawIndex++;
    }
  } else if (!drawingComplete) {
    // White fading effect expanding from center
    noStroke();
    fill(255, 5); // Low opacity white fill for gradual fading effect
    ellipse(width / 2, height / 2, frameCount * 3, frameCount * 3); // Expand radius with frame count
    if (frameCount * 3 > width * 1.5) {
      drawingComplete = true; // Stop expanding when radius exceeds canvas size
      penSound.stop(); // Stop drawing sound when drawing is complete
    }
  } else {
    // Stop pen sound if no new points are being drawn
    if (penSound.isPlaying()) {
      penSound.stop();
    }
  }
}

function mouseDragged() {
  // Modify points around mouse position to create interaction effect
  for (let i = 0; i < points.length; i++) {
    let d = dist(mouseX, mouseY, points[i].x + offsetX, points[i].y + offsetY);
    if (d < 50) { // If mouse is close to a point, slightly adjust its position
      points[i].x += random(-2, 2);
      points[i].y += random(-2, 2);
    }
  }
}

function mousePressed() {
  // Further adjust points around mouse position for a more noticeable effect
  for (let i = 0; i < points.length; i++) {
    let d = dist(mouseX, mouseY, points[i].x + offsetX, points[i].y + offsetY);
    if (d < 50) { // If mouse is close to a point, apply a larger offset
      points[i].x += random(-5, 5);
      points[i].y += random(-5, 5);
    }
  }
  clickSound.play(); // Play click sound effect on mouse press
}

function windowResized() {
  // Adjust canvas size and reset offsets on window resize
  resizeCanvas(windowWidth, windowHeight);
  backgroundTexture(); // Redraw background texture
  drawIndex = 0; // Reset drawing index
  drawingComplete = false; // Reset drawing completion flag
  offsetX = width / 2 - 450; // Recalculate horizontal offset
  offsetY = height / 2 - 300; // Recalculate vertical offset
}

// Generate Perlin noise texture for the background
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
