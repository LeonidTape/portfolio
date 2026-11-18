/* Рисует процедурную сцену «Fuji Dawn Lake» фоном подвала. */
import { meta, default as create } from "./fuji.js";

const foot = document.querySelector(".site-foot");
if (foot) {
  const canvas = document.createElement("canvas");
  canvas.className = "foot-scene";
  canvas.setAttribute("aria-hidden", "true");
  foot.insertBefore(canvas, foot.firstChild);
  const ctx = canvas.getContext("2d");
  const scene = create();
  const { cols, rows, fps, palette } = meta;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const size = () => {
    const w = foot.clientWidth, h = foot.clientHeight;
    canvas.width = w; canvas.height = h;
  };

  const draw = (t) => {
    const frame = scene(t);
    const text = frame.text.split("\n"), color = frame.color.split("\n");
    const cw = canvas.width / cols, ch = canvas.height / rows;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${Math.ceil(ch * 1.05)}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    let last = "";
    for (let y = 0; y < rows; y++) {
      const tr = text[y], cr = color[y];
      for (let x = 0; x < cols; x++) {
        const key = cr[x];
        if (key !== last) { ctx.fillStyle = palette[key] || "#000"; last = key; }
        ctx.fillText(tr[x], x * cw + cw / 2, (y + 1) * ch);
      }
    }
  };

  size();
  window.addEventListener("resize", size);
  if (reduce) {
    draw(0);
  } else {
    const start = performance.now();
    let lastTick = -1;
    const loop = (now) => {
      const tick = Math.floor(((now - start) / 1000) * fps);
      if (tick !== lastTick) { lastTick = tick; draw(tick); }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
