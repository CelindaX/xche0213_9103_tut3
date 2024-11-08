# xche0213_9103_tut3_project


*Statement 1: I have approved completing the whole project by myself, including Group Task and Individual Task.*

 ## Project Overview

My aim was to honor the symbolism of Picasso’s dove by creating a digital artwork that captures its simplicity and strength, while enhancing it with modern interactive and dynamic elements. Using audio-driven animation, 3D modeling, and real-time interaction, this project transforms the traditional static artwork into an immersive experience.

 ## Features

- **Interactive 3D Model:** The dove’s form is rendered as a 3D model, providing depth and a more engaging visual experience.
- **Audio-Driven Animation:** The animation is driven by real-time audio input, with the dove’s movements synchronized to audio frequency changes.
- **Mouse Interactivity:** Users can interact with the artwork by moving their mouse, affecting the dove’s appearance and animations in real-time.
- **Background Texture:** A realistic paper-like background is generated using Perlin noise, adding texture to the digital canvas.


 ## Instructions for Interaction

**1. Mouse Movement:** Hovering the mouse over the screen subtly affects the appearance of the dove’s contours during the automatic drawing phase.
**2. Clicking:** During the automatic drawing process, mouse clicks on the screen can disturb the position of certain points of the pigeon, making the outline of the pigeon more flexible.
**3. Audio Synchronization:** Once loaded, the animation synchronizes to any ambient or played audio, especially when sound is actively playing on your device.
**4. Post-Drawing Interaction:** After the automatic drawing completes, you can click and drag to add custom drawn lines onto the canvas.
**5. 3D effect:** After the automatic drawing is finished, pressing the F key will jump to the 3D dove

 ## Partial Animation Method
 
 #### Audio-Driven Animation

I chose to use audio input to drive the dove’s movement. Audio frequencies are mapped to the points in the dove’s outline, causing slight oscillations that create a “fluttering” effect, giving life to the dove. By using `p5.FFT` in p5.js, real-time frequency analysis transforms audio energy into visual movement, where:
- High frequencies cause rapid, jittery movement.
- Low frequencies contribute to smooth, floating effects.

 #### Unique Visual Properties

- **Color Variation:** Based on audio frequency, slight color shifts are applied to the dove’s outline to create a pulsing effect.
- **Oscillating Position:** The dove model’s vertical position gently oscillates in response to bass frequencies, adding to the feeling of flight.

 ## Inspiration

1. The project's dove outline is drawn in a step-by-step manner, from dots to a complete dove image. The **hand-painted art** of drawing stroke by stroke brings the viewer a classic and mysterious step-by-step rendering effect while allowing the viewer to experience the gradual moulding process of the dove image. The design is inspired by [Petros Vrellis' dynamic painting "Starry Night"](https://www.instagram.com/p/BY36f3EjWLu/?hl=en), in which each dot and line gradually generates a complete pattern, giving new life to the classic painting.

2. The design of the project dove is based on a **clicking action** that causes the dove's silhouette dots to be slightly perturbed, and dragging the mouse allows the viewer to **participate in the doodling of the painting, along with sound effects.** This was inspired by the Doodle Guide, an experimental project by [Google Arts & Culture](https://artsandculture.google.com/experiment/doodle-guide/FQFug-9023UsLw), an interactive experience. Combining AI audio and visual experiments that allow users to intuitively explore the real-time feedback of doodles, the project demonstrates how classic art can be adapted through interactive technology. Making the user not just a viewer but a participant in the art-making process. Through step-by-step instructions and real-time feedback, art creation becomes accessible to everyone.

3. The **3D effects** in the later stages of the project are achieved by loading and rendering 3D dove models, which are animated by the doves in three dimensions with sound effects to bring the doves to life. The design is inspired by modern digital sculpture and 3D kinetic art. [Refik Anadol's work](https://www.instagram.com/p/C_DfdXjJoau/) features a data-driven life force that transforms abstract drawings into 3D visualizations and immersive experiences that change according to music and other factors.

 ## Technical Explanation

- **Dove Class:** The `Dove` class manages the drawing of the dove’s outline and handles the JSON data containing the dove’s points.
- **Audio Analysis:** The `p5.FFT` function analyzes real-time audio, returning a frequency spectrum that is mapped to point positions in the dove outline. The jitter effect is calculated based on frequency bands.
- **3D Model:** The 3D model is loaded with `three.js` and animated to simulate flapping using an `AnimationMixer`.
- **Mouse Interaction:** Mouse events are used to add interactivity. During the automatic drawing, mouse clicks perturb points slightly. Once complete, dragging leaves trails on the canvas.

## Code and Techniques Outside of the Course Material

- **`svgpathtools` Library:** Used in Python to convert SVG path data of the dove’s outline into JSON points. This was essential for rendering the outline accurately in `p5.js`.
- **`three.js`:** Employed to load and animate a 3D model of the dove, allowing for a dynamic, depth-enhanced visual. Using `three.js` brought a new level of depth to the work, even though it required substantial research outside the course.

*Statement 2: Any additional code or techniques used from online sources are referenced directly in the code comments.* 

For example:
// Code for FFT analysis based on p5.js documentation (https://p5js.org/reference//p5.FFT)
// Maps audio spectrum values to points on the dove outline
let spectrum = fft.analyze();


-----------------------------------------------------

 #### References
- Google Arts & Culture. (2024)：[Doodle Guide. Google Arts & Culture](https://artsandculture.google.com/experiment/doodle-guide/FQFug-9023UsLw)
- pvrellis. (2020). Petros Vrellis on Instagram: [“Starry night animation (2012)](https://www.instagram.com/p/BY36f3EjWLu/?hl=en)
- p5.js Documentation: [p5.js Reference](https://p5js.org/reference/)
- refikanadol. (2020). Refik Anadol on Instagram: [“Dear friends, We are constantly researching new aesthetics and concepts using Generative AI. This latest experiment uses our eight-year-long Machine Hallucinations research archive to create new AI Data Paintings. Our Large Nature Model is trained to dream of all the flowers of Amazonia! After our successful exhibition at Serpentine Galleries in London, next — See you in Futura Seoul to experience LNM art works with visual, sound and scent!](https://www.instagram.com/p/C_DfdXjJoau/)
- three.js Documentation: [three.js](https://threejs.org/docs/)
- svgpathtools Library: Used to convert SVG path data into JSON format for use in p5.js ([svgpathtools GitHub](https://github.com/mathandy/svgpathtools))
