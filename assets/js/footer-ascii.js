/* Большая надпись в подвале: рисуется символами и «дышит». */
(function () {
  var mark = document.querySelector('.sf-mark');
  if (!mark) return;
  var text = (mark.textContent || '').trim();
  if (!text) return;

  var RAMP = ' .:-=+*#%@';
  var COLS = 120;
  var W = 1000, H = 300;
  var canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext('2d');

  function build() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#000';
    ctx.font = '800 200px Arial, Helvetica, sans-serif';
    ctx.textBaseline = 'middle';
    var m = ctx.measureText(text);
    var x = (W - m.width) / 2;
    ctx.fillText(text, x, H / 2);

    var data = ctx.getImageData(0, 0, W, H).data;
    var cellW = W / COLS;
    var cellH = cellW * 2;
    var rows = Math.floor(H / cellH);
    var lines = [];
    for (var r = 0; r < rows; r++) {
      var line = '';
      for (var c = 0; c < COLS; c++) {
        var sum = 0, n = 0;
        var x0 = Math.floor(c * cellW), y0 = Math.floor(r * cellH);
        for (var yy = y0; yy < y0 + cellH && yy < H; yy += 2) {
          for (var xx = x0; xx < x0 + cellW && xx < W; xx += 2) {
            sum += data[(yy * W + xx) * 4 + 3];
            n++;
          }
        }
        var a = n ? sum / n / 255 : 0;
        line += RAMP.charAt(Math.min(RAMP.length - 1, Math.round(a * (RAMP.length - 1))));
      }
      lines.push(line.replace(/\s+$/, ''));
    }
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

    mark.setAttribute('aria-label', text);
    mark.innerHTML = '<pre class="sf-ascii" aria-hidden="true"></pre>';
    var pre = mark.firstChild;
    pre.textContent = lines.join('\n');
    var cw = mark.clientWidth;
    if (cw) pre.style.fontSize = (cw / (COLS * 0.6)).toFixed(2) + 'px';
  }

  var timer = null;
  function schedule() { clearTimeout(timer); timer = setTimeout(build, 120); }

  var go = function () { build(); window.addEventListener('resize', schedule); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
})();
