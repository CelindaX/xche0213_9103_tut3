let points = []; // Array to hold points for drawing the pigeon
let userDrawnPaths = []; // Array to store separate paths drawn by the user
let currentUserPath = []; // Temporary array to store current user path
let drawIndex = 0; // Index to keep track of current drawing point
let drawingComplete = false; // Flag to indicate when auto-drawing is complete
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
   // Display instruction before drawing starts
   if (!drawingComplete && drawIndex === 0) {
    fill(0); // Set text color to black
    textSize(24); // Set text size
    textAlign(CENTER, CENTER); // Center the text
    text("Click on the screen to disturb the pigeon's position", width / 2, offsetY ); // Display message above pigeon
  }
  // Draw original pigeon points if auto-drawing is in progress
  if (points.length > 0 && drawIndex < points.length) {
    for (let i = 0; i < 10 && drawIndex < points.length; i++) {
      let pt = points[drawIndex];
      if (pt) {
        let xPos = pt.x + offsetX;
        let yPos = pt.y + offsetY;

        // Set green color for the olive branch area
        if ((xPos > width / 2 + 50 && yPos < height / 2 - 50) || 
            (xPos > width / 2 + 50 && yPos > height / 2 - 50 && yPos < height / 2 + 50)) {
          stroke(34, 139, 34); // Green color for olive branch
        } else {
          stroke(50); // Black color for other areas
        }

        strokeWeight(2);
        point(xPos, yPos);

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
    ellipse(width / 2, height / 2, frameCount * 3, frameCount * 3);
    if (frameCount * 3 > width * 1.5) {
      drawingComplete = true;
      penSound.stop(); // Stop drawing sound when drawing is complete
    }
  }

  // Draw user-drawn paths only if auto-drawing is complete
  if (drawingComplete) {
    stroke(50); // Set stroke color for user-drawn points
    strokeWeight(2);
    noFill();
    for (let path of userDrawnPaths) {
      beginShape();
      for (let pt of path) {
        vertex(pt.x, pt.y);
      }
      endShape();
    }

  // Display message to guide the user
  fill(0); // Set text color to black
  textSize(24); // Set text size
  textAlign(CENTER, CENTER); // Center the text
  text("After painting, drag the mouse to leave lines on the canvas or press F to jump to 3D", width / 2, offsetY + 600 + 50); // Display message
  }
}

// Detect key presses for page jump after drawing is complete
function keyPressed() {
  if (drawingComplete && (key === 'f' || key === 'F')) { // Check if 'F' or 'f' is pressed
    window.location.href = "fly.html"; // Redirect to fly.html
  }
}

function mouseDragged() {
  // Only allow user drawing if auto-drawing is complete
  if (drawingComplete) {
    // Add new point to currentUserPath for drawing line segments
    currentUserPath.push(createVector(mouseX, mouseY));

    // Play the drawing sound if not already playing
    if (!penSound.isPlaying()) {
      penSound.play();
    }
  }
}

function mousePressed() {
  // Allow interaction with original pigeon points during auto-drawing
  if (!drawingComplete) {
    for (let i = 0; i < points.length; i++) {
      let d = dist(mouseX, mouseY, points[i].x + offsetX, points[i].y + offsetY);
      if (d < 50) { // Apply slight random offset if close to a point
        points[i].x += random(-5, 5);
        points[i].y += random(-5, 5);
      }
    }
    clickSound.play(); // Play click sound effect on mouse press
  }
}

function mouseReleased() {
  // Stop the drawing sound when mouse is released
  if (penSound.isPlaying()) {
    penSound.stop();
  }

  // Save the current path as a separate path after mouse release
  if (drawingComplete && currentUserPath.length > 0) {
    userDrawnPaths.push([...currentUserPath]); // Save current path
    currentUserPath = []; // Reset current path
  }
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
