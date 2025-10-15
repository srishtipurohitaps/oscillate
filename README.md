# Oscillatte: Waveform Art & Music Lab

Oscillatte is a web app where users can type musical notes, listen to their tune, watch animated waveforms, customize the visuals, and record their creation as a video. It’s a place to experiment with both art and music directly in your browser.

## Why I made this project

I made Oscillatte because I wanted to combine my love for web coding, digital music, and creative visualizations. Most online music tools are either too simple or too complicated, and few let you see your music as actual animated art. I wanted something open, interactive, and fun, where anyone can express themselves without special equipment or software.

## How I made it

I built Oscillatte with HTML, CSS, and JavaScript. The main features use:
- The Web Audio API (for generating sound)
- The Canvas API (for drawing waveforms and animations)
- The MediaRecorder API (to record both audio and visuals at once)
I designed the UI to be modern and playful, using the Montserrat font and a custom ocean background for a calming vibe.

## What I struggled with and what I learned

The hardest part was getting the audio and visual components to sync smoothly. Making the MediaRecorder output both what you see and what you hear into one file took some experimenting with streams and browser quirks. I also spent time adjusting layouts for mobile and desktop, and balancing all the controls so that the app feels usable but powerful.

I learned a lot about browser APIs, user experience, and how small details like colors and alignment really affect how people feel using a creative tool. Most of all, I learned that testing with real input and getting feedback early is crucial.

## How to use Oscillatte

1. Type out notes such as `C D E F G` in the input box.
2. Press "Submit" to play the notes and watch the art animate.
3. Adjust colors, waveform style, speed, and volume using the controls.
4. Hit "Start Recording" to save a video of both the art and music.
5. When you stop recording, a `.webm` file will automatically download.

Supported notes include C, D, E, F, G, A, B, plus sharps, flats, and octaves like C3 or A5. Use spaces to separate notes.
