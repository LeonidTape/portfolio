/*
 * Эмодзи в стиле Apple и флаги языков.
 * Картинки берутся из библиотеки emoji-datasource-apple (jsDelivr).
 * Если картинка не загрузилась, эмодзи остаётся обычным текстом.
 */
(function () {
  var EMOJI_BASE = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.1.2/img/apple/64/';
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1, OPTION: 1, CODE: 1, PRE: 1, IMG: 1 };
  var EMOJI_RE = /(\p{Regional_Indicator}{2}|(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}\uFE0F)(?:\uFE0F|\p{Emoji_Modifier})*(?:\u200D(?:\p{Emoji_Presentation}|\p{Extended_Pictographic})(?:\uFE0F|\p{Emoji_Modifier})*)*)/gu;
  var FLAGS = { ru: '1f1f7-1f1fa', sr: '1f1f7-1f1f8', en: '1f1ec-1f1e7' };

  function codeOf(str) {
    return Array.from(str).map(function (c) { return c.codePointAt(0).toString(16); })
      .filter(function (h) { return h !== 'fe0f'; }).join('-');
  }

  function emojiImage(ch) {
    var img = document.createElement('img');
    img.className = 'emoji';
    img.alt = ch;
    img.draggable = false;
    img.src = EMOJI_BASE + codeOf(ch) + '.png';
    img.onerror = function () {
      // Не загрузилась картинка — возвращаем обычный текст, без повторных попыток
      var span = document.createElement('span');
      span.setAttribute('data-noemoji', '');
      span.textContent = ch;
      img.replaceWith(span);
    };
    return img;
  }

  function processTextNode(node) {
    var text = node.nodeValue;
    EMOJI_RE.lastIndex = 0;
    if (!EMOJI_RE.test(text)) return;
    EMOJI_RE.lastIndex = 0;
    var frag = document.createDocumentFragment();
    var last = 0, m;
    while ((m = EMOJI_RE.exec(text)) !== null) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      frag.appendChild(emojiImage(m[0]));
      last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  }

  function shouldSkip(el) {
    while (el && el.nodeType === 1) {
      if (SKIP[el.tagName] || el.hasAttribute('data-noemoji') || el.classList.contains('emoji')) return true;
      el = el.parentElement;
    }
    return false;
  }

  function processRoot(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) {
      var n = walker.currentNode;
      if (!shouldSkip(n.parentElement)) nodes.push(n);
    }
    nodes.forEach(processTextNode);
  }

  function addFlags() {
    document.querySelectorAll('.lang-btn[data-lang]').forEach(function (btn) {
      var code = FLAGS[btn.dataset.lang];
      if (!code || btn.querySelector('.flag')) return;
      var img = document.createElement('img');
      img.className = 'flag';
      img.alt = '';
      img.src = EMOJI_BASE + code + '.png';
      img.onerror = function () { img.remove(); };
      btn.insertBefore(img, btn.firstChild);
    });
  }

  var pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      pending = false;
      processRoot(document.body);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    addFlags();
    processRoot(document.body);
    new MutationObserver(function (mutations) {
      if (mutations.some(function (m) { return m.addedNodes.length || m.type === 'characterData'; })) schedule();
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  });
  document.addEventListener('languagechange', addFlags);
})();
