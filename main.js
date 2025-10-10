const input = document.getElementById('input');
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
const oscillator = audioCtx.createOscillator();
notenames = new Map();
notenames.set("C", 261.6);
notenames.set("D", 293.7);
notenames.set("E", 329.6);
notenames.set("F", 349.2);
notenames.set("G", 392.0);
notenames.set("A", 440);
notenames.set("B", 493.9);
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine";
oscillator.start();
gainNode.gain.value = 0;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var amplitude = 40;
var interval = null;
var counter = 0;
var x = 0;
var y = height / 2;
var freq = 0;
var pitch = 0;

function frequency(notePitch) {
    pitch = notePitch;
    gainNode.gain.setValueAtTime(100, audioCtx.currentTime);
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 1);
    freq = pitch / 10000;
}

function handle() {
    audioCtx.resume();
    gainNode.gain.value = 0;
    var usernotes = String(input.value);
    var noteFreq = notenames.get(usernotes);
    frequency(noteFreq);
    drawWave();
}

function drawWave() {
    ctx.clearRect(0, 0, width, height);
    x = 0;
    y = height / 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    counter = 0;
    if (interval) { clearInterval(interval); }
    interval = setInterval(line, 20);
}

function line() {
    if (counter > 50) {
        clearInterval(interval);
        ctx.stroke();
        return;
    }
    y = height / 2 + (amplitude * Math.sin(x * 2 * Math.PI * freq));
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
    counter++;
}
