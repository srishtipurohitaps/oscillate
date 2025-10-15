const input = document.getElementById('input');
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
const oscillator = audioCtx.createOscillator();
const color_picker = document.getElementById("color");
const color_picker2 = document.getElementById("color2");
const vol_slider = document.getElementById('vol-slider');
const thickness_slider = document.getElementById('thickness-slider');
const wave_select = document.getElementById('wave-select');
const speed_slider = document.getElementById('speed-slider');

let notenames = new Map();
notenames.set("C", 261.6);
notenames.set("C#", 277.2);
notenames.set("Db", 277.2);
notenames.set("D", 293.7);
notenames.set("D#", 311.1);
notenames.set("Eb", 311.1);
notenames.set("E", 329.6);
notenames.set("F", 349.2);
notenames.set("F#", 370.0);
notenames.set("Gb", 370.0);
notenames.set("G", 392.0);
notenames.set("G#", 415.3);
notenames.set("Ab", 415.3);
notenames.set("A", 440);
notenames.set("A#", 466.2);
notenames.set("Bb", 466.2);
notenames.set("B", 493.9);
notenames.set("C5", 523.3);
notenames.set("C#5", 554.4);
notenames.set("Db5", 554.4);
notenames.set("D5", 587.3);
notenames.set("D#5", 622.3);
notenames.set("Eb5", 622.3);
notenames.set("E5", 659.3);
notenames.set("F5", 698.5);
notenames.set("F#5", 740.0);
notenames.set("Gb5", 740.0);
notenames.set("G5", 784.0);
notenames.set("G#5", 830.6);
notenames.set("Ab5", 830.6);
notenames.set("A5", 880.0);
notenames.set("A#5", 932.3);
notenames.set("Bb5", 932.3);
notenames.set("B5", 987.8);
notenames.set("C3", 130.8);
notenames.set("D3", 146.8);
notenames.set("E3", 164.8);
notenames.set("F3", 174.6);
notenames.set("G3", 196.0);
notenames.set("A3", 220.0);
notenames.set("B3", 246.9);

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = wave_select.value;
oscillator.start();
gainNode.gain.value = 0;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var interval = null;
var repeat = null;
var counter = 0;
var x = 0;
var y = height / 2;
var freq = 0;
var pitch = 0;
var noteslist = [];
var length = 0;
var timepernote = 0;
var reset = false;
var setting = null;

wave_select.addEventListener('change', function() {
    oscillator.type = wave_select.value;
});

function frequency(notePitch) {
    pitch = notePitch;
    gainNode.gain.setValueAtTime(vol_slider.value / 100, audioCtx.currentTime);
    if (setting) clearInterval(setting);
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
    setting = setInterval(() => {gainNode.gain.value = vol_slider.value / 100}, 1);
    freq = pitch / 10000;
    setTimeout(() => {
        clearInterval(setting);
        gainNode.gain.value = 0;
    }, timepernote - 100);
}

function handle() {
    audioCtx.resume();
    gainNode.gain.value = 0;
    reset = true;
    var userinput = String(input.value).toUpperCase().trim();
    noteslist = [];
    if (userinput.includes(" ")) {
        var usernotes = userinput.split(/\s+/);
        for (let i = 0; i < usernotes.length; i++) {
            if (notenames.has(usernotes[i])) {
                noteslist.push(notenames.get(usernotes[i]));
            }
        }
    } else {
        for (let i = 0; i < userinput.length; i++) {
            if (notenames.has(userinput.charAt(i))) {
                noteslist.push(notenames.get(userinput.charAt(i)));
            }
        }
    }
    length = noteslist.length;
    timepernote = (length > 0) ? (6000 / length / speed_slider.value) : 1000;
    if (repeat) clearInterval(repeat);
    let j = 0;
    repeat = setInterval(() => {
        if (j < noteslist.length) {
            frequency(noteslist[j]);
            drawWave();
            j++;
        } else {
            clearInterval(repeat);
        }
    }, timepernote);
    if (noteslist.length > 0) {
        frequency(noteslist[0]);
        drawWave();
        j = 1;
    }
}

function drawWave() {
    const bgColor = document.getElementById('bg-color').value;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    if (interval) clearInterval(interval);
    if (reset) {
        x = 0;
        y = height / 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    counter = 0;
    interval = setInterval(line, 20);
    reset = false;
}

function line() {
    if (counter > (timepernote / 20)) {
        clearInterval(interval);
        ctx.stroke();
        return;
    }
    var direction = document.getElementById("gradient-direction").value;
    var gradient;
    if (direction === "horizontal")
        gradient = ctx.createLinearGradient(0, 0, width, 0);
    else if (direction === "vertical")
        gradient = ctx.createLinearGradient(0, 0, 0, height);
    else
        gradient = ctx.createLinearGradient(0, 0, width, height);
    const randomColor = document.getElementById('random-color').checked;
    if (randomColor) {
        gradient.addColorStop(0, '#' + Math.floor(Math.random()*16777215).toString(16));
        gradient.addColorStop(1, '#' + Math.floor(Math.random()*16777215).toString(16));
    } else {
        gradient.addColorStop(0, color_picker.value);
        gradient.addColorStop(1, color_picker2.value);
    }
    ctx.strokeStyle = gradient;
    ctx.lineWidth = thickness_slider.value;
    y = height / 2 + (vol_slider.value / 100) * 40 * Math.sin(x * 2 * Math.PI * freq * (0.5 * length));
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
    counter++;
}
