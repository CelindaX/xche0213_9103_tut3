let points = [];
let drawIndex = 0;

function preload() {
  // Load the data points in the JSON file and log
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
  console.log("Canvas Size:", windowWidth, windowHeight);
}

function draw() {
  // If the JSON data is loaded successfully and the points array is not empty, start drawing
  if (points.length > 0) {
    // Check the point you are currently drawing
    console.log("Drawing point index:", drawIndex, "location:", points[drawIndex]);

    if (drawIndex < points.length) {
      let pt = points[drawIndex];
      if (pt) {
        // Center the position of the dove
        let offsetX = width / 2 - 450;
        let offsetY = height / 2 - 300;

        stroke(50);
        strokeWeight(2);
        point(pt.x + offsetX, pt.y + offsetY);
      }
      drawIndex++;
    }
  } else {
    console.warn("points Array is empty or failed to load data.");
  }

  // Add a simple test outline to ensure that the drawing functions properly
  stroke(255, 0, 0); // Red test profile
  strokeWeight(1);
  noFill();
  beginShape();
  vertex(width / 2 - 50, height / 2 - 50);
  vertex(width / 2 + 50, height / 2 - 50);
  vertex(width / 2 + 50, height / 2 + 50);
  vertex(width / 2 - 50, height / 2 + 50);
  endShape(CLOSE);
}

function windowResized() {
  // Resize canvas
  resizeCanvas(windowWidth, windowHeight);
  backgroundTexture();
  drawIndex = 0; // Reset drawing progress
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
