
const canvas = document.getElementById("myCanvas");

canvas.width = 1024;
canvas.height = 1024;
const h = new Hydra({
  canvas,
  makeGlobal: false,
  detectAudio: false,
  enableStreamCapture: false,
}).synth;

var r = 0.3;
var g = 1;
var b = 1;
var k = 4;
var mod = 0;
var mod2 = 0;
var osc2 = 1;

h.osc(30, 0.05, 1.4)
  .rotate(0, 0.5)
  .mult(h.osc(10, 0.1).modulate(h.osc(30).rotate(0, -0.15), 1))
  .add(
    h.shape(4, 0.2, 1).color(
      () => r,
      () => g,
      () => b,
      0.5
    )
  )
  .modulate(
    h.osc(6, 0, 1.5)
      .brightness(-0.5)
      .modulate(h.noise(() => mod2).sub(h.gradient()), 1),
    () => mod
  )
  .modulate(h.osc(21, 0.25, () => mod2))
  .modulateScale(h.osc(() => osc2))
  .modulateKaleid(h.osc(5), () => k)
  .out(h.o0);

