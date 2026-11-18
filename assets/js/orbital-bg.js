/*
  A deliberately lightweight, original ambient canvas field.  It gives the
  site a living technical backdrop without loading a graphics dependency.
*/
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function start() {
    if (document.querySelector('.orbital-bg')) return;

    var canvas = document.createElement('canvas');
    canvas.className = 'orbital-bg';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild);

    var context = canvas.getContext('2d');
    if (!context) return;

    var width = 0;
    var height = 0;
    var pixelRatio = 1;
    var points = [];
    var pointer = { x: -9999, y: -9999, active: false };
    var frame = null;
    var lastTime = performance.now();
    var paused = false;
    var connectionDistance = 156;

    function random(min, max) {
      return min + Math.random() * (max - min);
    }

    function createPoint() {
      return {
        x: random(0, width),
        y: random(0, height),
        vx: random(-0.12, 0.12),
        vy: random(-0.1, 0.1),
        size: random(0.65, 1.45),
        seed: Math.random() * Math.PI * 2
      };
    }

    function resize() {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      var targetCount = Math.max(52, Math.min(118, Math.round((width * height) / 17500)));
      while (points.length < targetCount) points.push(createPoint());
      if (points.length > targetCount) points.length = targetCount;
    }

    function update(delta, time) {
      var factor = Math.min(2.2, delta / 16.67);
      for (var index = 0; index < points.length; index++) {
        var point = points[index];
        var dx = point.x - pointer.x;
        var dy = point.y - pointer.y;
        var distanceSquared = dx * dx + dy * dy;

        if (pointer.active && distanceSquared < 28000 && distanceSquared > 0.5) {
          var distance = Math.sqrt(distanceSquared);
          var force = (1 - distance / 168) * 0.075;
          point.vx += (dx / distance) * force * factor;
          point.vy += (dy / distance) * force * factor;
        }

        point.vx += Math.sin(time * 0.00035 + point.seed) * 0.0018 * factor;
        point.vy += Math.cos(time * 0.00028 + point.seed) * 0.0018 * factor;
        point.vx *= 0.993;
        point.vy *= 0.993;
        point.x += point.vx * factor;
        point.y += point.vy * factor;

        if (point.x < -12) point.x = width + 12;
        if (point.x > width + 12) point.x = -12;
        if (point.y < -12) point.y = height + 12;
        if (point.y > height + 12) point.y = -12;
      }
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;

      for (var i = 0; i < points.length; i++) {
        var point = points[i];
        for (var j = i + 1; j < points.length; j++) {
          var other = points[j];
          var x = point.x - other.x;
          var y = point.y - other.y;
          var distanceSquared = x * x + y * y;
          if (distanceSquared > connectionDistance * connectionDistance) continue;

          var alpha = (1 - Math.sqrt(distanceSquared) / connectionDistance) * 0.09;
          context.strokeStyle = 'rgba(16, 17, 15, ' + alpha.toFixed(3) + ')';
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }

      for (var index = 0; index < points.length; index++) {
        var node = points[index];
        var distanceToPointer = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        var nearPointer = pointer.active && distanceToPointer < 150;
        var radius = node.size + (nearPointer ? (1 - distanceToPointer / 150) * 1.35 : 0);
        context.fillStyle = nearPointer ? 'rgba(8, 125, 92, 0.72)' : 'rgba(16, 17, 15, 0.23)';
        context.beginPath();
        context.arc(node.x, node.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      if (pointer.active) {
        var halo = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 170);
        halo.addColorStop(0, 'rgba(8, 125, 92, 0.08)');
        halo.addColorStop(1, 'rgba(8, 125, 92, 0)');
        context.fillStyle = halo;
        context.beginPath();
        context.arc(pointer.x, pointer.y, 170, 0, Math.PI * 2);
        context.fill();
      }
    }

    function render(time) {
      if (paused) return;
      var delta = Math.min(40, time - lastTime);
      lastTime = time;
      update(delta, time);
      draw();
      frame = window.requestAnimationFrame(render);
    }

    window.addEventListener('pointermove', function (event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }, { passive: true });

    window.addEventListener('pointerleave', function () {
      pointer.active = false;
    });

    window.addEventListener('blur', function () {
      pointer.active = false;
    });

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', function () {
      paused = document.hidden;
      if (!paused && !frame) {
        lastTime = performance.now();
        frame = window.requestAnimationFrame(render);
      }
      if (paused && frame) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    });

    resize();
    frame = window.requestAnimationFrame(render);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
