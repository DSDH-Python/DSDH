/* ===========================================================
   《信息系统分析与设计》配套数字教材 · 交互脚本
   功能：术语浮窗 / 进度跟踪 / 标记已读 / 导出PDF
   =========================================================== */
(function(){
  "use strict";

  /* ---------- 1. 进度跟踪（localStorage） ---------- */
  var TOTAL = 13;
  function key(ch){ return "dsdh_dt_ch" + ch + "_read"; }
  function isRead(ch){ return localStorage.getItem(key(ch)) === "1"; }
  function setRead(ch, v){ localStorage.setItem(key(ch), v ? "1" : "0"); }

  function renderIndexProgress(){
    var bar = document.getElementById("progress-fill");
    var txt = document.getElementById("progress-txt");
    if(!bar) return;
    var n = 0;
    for(var i=1;i<=TOTAL;i++){ if(isRead(i)) n++; }
    var pct = Math.round(n/TOTAL*100);
    bar.style.width = pct + "%";
    if(txt) txt.textContent = "已读 " + n + " / " + TOTAL + " 章（" + pct + "%）";
  }

  /* ---------- 2. 标记本章已读 ---------- */
  function wireMarkRead(){
    var btn = document.getElementById("markRead");
    if(!btn) return;
    var ch = btn.getAttribute("data-ch");
    function sync(){
      var dot = document.getElementById("readDot");
      if(isRead(ch)){
        btn.textContent = "✓ 已标记为已读";
        btn.classList.add("ghost");
        if(dot) dot.classList.add("on");
      }
    }
    sync();
    btn.addEventListener("click", function(){
      setRead(ch, !isRead(ch));
      sync();
      renderIndexProgress();
    });
  }

  /* ---------- 3. 术语浮窗 ---------- */
  function wireTerms(){
    var tip = document.getElementById("termtip");
    if(!tip) return;
    document.addEventListener("mouseover", function(e){
      var t = e.target.closest && e.target.closest(".term");
      if(!t) return;
      tip.textContent = t.getAttribute("data-def") || "";
      tip.style.display = "block";
      var r = t.getBoundingClientRect();
      var x = r.left, y = r.bottom + 8;
      tip.style.left = Math.max(8, x) + "px";
      tip.style.top = y + "px";
      if(y + tip.offsetHeight > window.innerHeight){
        tip.style.top = (r.top - tip.offsetHeight - 8) + "px";
      }
    });
    document.addEventListener("mouseout", function(e){
      var t = e.target.closest && e.target.closest(".term");
      if(t) tip.style.display = "none";
    });
  }

  /* ---------- 5. 导出 PDF（调用浏览器打印） ---------- */
  function wirePrint(){
    var b = document.getElementById("exportPdf");
    if(b) b.addEventListener("click", function(){ window.print(); });
  }

  document.addEventListener("DOMContentLoaded", function(){
    renderIndexProgress();
    wireMarkRead();
    wireTerms();
    wirePrint();
  });
})();


/* ---------- 6. 原版课件对照：内嵌轮播 + 灯箱（渐进增强） ---------- */
(function(){
  "use strict";

  var lb, lbImg, lbCount, lbPrev, lbNext, lbState = null;

  /* ---- 灯箱（沿用 #pptLightbox 全屏遮罩，增加前后翻页与页码） ---- */
  function ensureBox(){
    if(lb) return lb;
    lb = document.createElement("div");
    lb.id = "pptLightbox";
    lb.innerHTML =
      '<span class="lb-count"></span>' +
      '<button class="lb-nav lb-prev" type="button" aria-label="上一页">\u2039</button>' +
      '<img alt="放大查看">' +
      '<button class="lb-nav lb-next" type="button" aria-label="下一页">\u203a</button>';
    document.body.appendChild(lb);
    lbImg   = lb.querySelector("img");
    lbCount = lb.querySelector(".lb-count");
    lbPrev  = lb.querySelector(".lb-prev");
    lbNext  = lb.querySelector(".lb-next");
    lb.addEventListener("click", function(e){ if(e.target === lbPrev || e.target === lbNext) return; close(); });
    lbPrev.addEventListener("click", function(e){ e.stopPropagation(); nav(-1); });
    lbNext.addEventListener("click", function(e){ e.stopPropagation(); nav(1); });
    return lb;
  }
  function sync(){
    if(!lbState) return;
    var st = lbState.gallery.__ppt;
    lbImg.src = st.slides[lbState.index].getAttribute("src");
    lbCount.textContent = (lbState.index + 1) + " / " + st.total;
  }
  function openLightbox(gallery, index){
    ensureBox();
    lbState = {gallery:gallery, index:index};
    sync();
    lb.style.display = "flex";
  }
  function nav(d){
    if(!lbState) return;
    var st = lbState.gallery.__ppt;
    var n = lbState.index + d;
    if(n < 0 || n >= st.total) return;
    lbState.index = n;
    st.go(n);            /* 主图与灯箱同步 */
  }
  function close(){ lb.style.display = "none"; lbState = null; }
  window.__pptSyncLightbox = function(gallery, idx){
    if(lbState && lbState.gallery === gallery){ lbState.index = idx; sync(); }
  };
  document.addEventListener("keydown", function(e){
    if(!lbState) return;
    if(e.key === "ArrowLeft"){ nav(-1); }
    else if(e.key === "ArrowRight"){ nav(1); }
    else if(e.key === "Escape"){ close(); }
  });

  /* ---- 把每个 .ppt-gallery 就地升级为「单页大图 + 左右箭头」轮播 ---- */
  function buildCarousel(gallery){
    if(gallery.classList.contains("ppt-enhanced")) return;      /* 幂等 */
    var imgs = Array.prototype.slice.call(gallery.querySelectorAll("figure img"));
    if(imgs.length < 1) return;
    if(imgs.length === 1){ gallery.classList.add("ppt-single"); return; }  /* 单图：整宽显示 */
    gallery.classList.add("ppt-enhanced");

    var wrap = document.createElement("div");
    wrap.className = "ppt-carousel";
    wrap.tabIndex = 0;
    wrap.innerHTML =
      '<div class="ppt-stage">' +
        '<img class="ppt-current" alt="">' +
        '<button class="ppt-zoombtn" type="button">放大</button>' +
        '<span class="ppt-count"></span>' +
        '<button class="ppt-nav ppt-prev" type="button" aria-label="上一页">\u2039</button>' +
        '<button class="ppt-nav ppt-next" type="button" aria-label="下一页">\u203a</button>' +
      '</div>' +
      '<div class="ppt-bar">' +
        '<button class="ppt-first" type="button">\u00ab 首页</button>' +
        '<button class="ppt-previous" type="button">\u2039 上一页</button>' +
        '<input class="ppt-jump" type="number" min="1" value="1" aria-label="跳转到页码">' +
        '<span class="ppt-total"></span>' +
        '<button class="ppt-nextb" type="button">下一页 \u203a</button>' +
        '<button class="ppt-last" type="button">末页 \u00bb</button>' +
      '</div>';
    gallery.insertBefore(wrap, gallery.firstChild);

    var cur   = wrap.querySelector(".ppt-current");
    var count = wrap.querySelector(".ppt-count");
    var total = wrap.querySelector(".ppt-total");
    var jump  = wrap.querySelector(".ppt-jump");
    var N = imgs.length, idx = 0;
    total.textContent = "/ " + N;
    jump.max = N;

    var prevBtns = [wrap.querySelector(".ppt-prev"), wrap.querySelector(".ppt-previous"), wrap.querySelector(".ppt-first")];
    var nextBtns = [wrap.querySelector(".ppt-next"), wrap.querySelector(".ppt-nextb"), wrap.querySelector(".ppt-last")];

    function render(){
      cur.setAttribute("src", imgs[idx].getAttribute("src"));
      cur.setAttribute("alt", imgs[idx].getAttribute("alt") || "");
      count.textContent = (idx + 1) + " / " + N;
      jump.value = idx + 1;
      prevBtns.forEach(function(b){ b.disabled = (idx === 0); });
      nextBtns.forEach(function(b){ b.disabled = (idx === N - 1); });
      if(window.__pptSyncLightbox) window.__pptSyncLightbox(gallery, idx);
    }
    function go(n){ idx = Math.max(0, Math.min(N - 1, n)); render(); }
    gallery.__ppt = {go: go, total: N, slides: imgs};

    wrap.querySelector(".ppt-prev").addEventListener("click", function(e){ e.stopPropagation(); go(idx - 1); });
    wrap.querySelector(".ppt-previous").addEventListener("click", function(e){ e.stopPropagation(); go(idx - 1); });
    wrap.querySelector(".ppt-next").addEventListener("click", function(e){ e.stopPropagation(); go(idx + 1); });
    wrap.querySelector(".ppt-nextb").addEventListener("click", function(e){ e.stopPropagation(); go(idx + 1); });
    wrap.querySelector(".ppt-first").addEventListener("click", function(e){ e.stopPropagation(); go(0); });
    wrap.querySelector(".ppt-last").addEventListener("click", function(e){ e.stopPropagation(); go(N - 1); });
    jump.addEventListener("change", function(){ var v = parseInt(jump.value, 10); go(isNaN(v) ? idx : v - 1); });
    jump.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); var v = parseInt(jump.value, 10); go(isNaN(v) ? idx : v - 1); } });

    cur.addEventListener("click", function(){ openLightbox(gallery, idx); });
    wrap.querySelector(".ppt-zoombtn").addEventListener("click", function(e){ e.stopPropagation(); openLightbox(gallery, idx); });

    wrap.addEventListener("keydown", function(e){
      if(e.key === "ArrowLeft"){ e.preventDefault(); go(idx - 1); }
      else if(e.key === "ArrowRight"){ e.preventDefault(); go(idx + 1); }
    });

    var x0 = null;
    wrap.addEventListener("touchstart", function(e){ if(e.touches.length === 1) x0 = e.touches[0].clientX; }, {passive:true});
    wrap.addEventListener("touchend", function(e){
      if(x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if(Math.abs(dx) > 40){ go(dx < 0 ? idx + 1 : idx - 1); }
      x0 = null;
    }, {passive:true});

    render();
  }

  document.addEventListener("DOMContentLoaded", function(){
    var gs = document.querySelectorAll(".ppt-gallery, .pptgrid");
    for(var i = 0; i < gs.length; i++) buildCarousel(gs[i]);
  });
})();
