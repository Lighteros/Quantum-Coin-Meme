/* ==========================================================================
   QUANTUM COIN - main.js (no build step, no dependencies)
   ========================================================================== */
(() => {
  const S = window.SITE || {};
  const $ = (q, el = document) => el.querySelector(q);
  const $$ = (q, el = document) => [...el.querySelectorAll(q)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = matchMedia("(hover: none)").matches;
  const isPlaceholder = (v) => !v || /\{\{.*\}\}/.test(v);
  const esc = (s) => String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const bind = {
    description: S.description, aboutLong: S.aboutLong, chainName: S.chainName,
    dexName: S.dexName, contract: isPlaceholder(S.contract) ? "Coming soon" : S.contract,
  };
  $$("[data-bind]").forEach((el) => {
    const v = bind[el.dataset.bind];
    if (v) el.textContent = v;
    else if (el.dataset.bind === "aboutLong") el.remove();
  });
  $$("[data-link]").forEach((el) => {
    const url = (S.links || {})[el.dataset.link];
    if (url && !isPlaceholder(url)) { el.href = url; el.hidden = false; }
    else if (el.dataset.link === "telegram" || el.dataset.link === "x") {
      if (!url) el.hidden = true;
    }
  });
  if (S.icons) {
    $$(".chain-icon").forEach((el) => (el.dataset.svg = S.icons.chain));
    $$(".dex-icon").forEach((el) => (el.dataset.svg = S.icons.dex));
  }
  const yr = $("[data-year]"); if (yr) yr.textContent = new Date().getFullYear();
  if (S.slots) Object.entries(S.slots).forEach(([k, src]) => {
    if (src) $$(`[data-slot="${k}"]`).forEach((img) => (img.src = src));
  });

  const stats = $("[data-stats]");
  if (stats && S.stats) {
    stats.innerHTML = S.stats.map((s) => `<div class="stat"><b>${esc(s.value)}</b><small>${esc(s.label)}</small></div>`).join("");
  }

  const tpl = (t) => String(t || "").replaceAll("{symbol}", S.symbol).replaceAll("{name}", S.name);
  const steps = $("[data-steps]");
  if (steps && S.steps) {
    steps.innerHTML = S.steps.map((st, i) => `
      <article class="step reveal tilt-soft" data-delay="${i * 120}">
        <div class="step-media">${st.img ? `<img src="${st.img}" alt="" loading="lazy" width="1280" height="720">` : ""}<span class="step-num">0${i + 1}</span></div>
        <span class="step-icon">${st.icon ? `<span class="svg-icon" data-svg="${st.icon}" data-mono></span>` : ""}</span>
        <div class="step-body"><h3>${esc(tpl(st.title))}</h3><p>${esc(tpl(st.text))}</p></div>
      </article>`).join("");
  }

  const partners = $("[data-partners]");
  if (partners) {
    const list = S.partners || [S.icons && S.icons.chain, S.icons && S.icons.dex, "assets/icons/dexscreener.svg", S.icons && S.icons.wallet].filter(Boolean);
    partners.innerHTML = list.map((p) => `<span class="svg-icon" data-svg="${p}" data-mono></span>`).join("");
  }

  const mq = $("[data-marquee]");
  if (mq) {
    const words = (S.marquee || [S.name, "$" + S.symbol]).filter((w) => !isPlaceholder(w));
    const run = Array(6).fill(words).flat().map((w) => `<span>${esc(w)}</span>`).join("");
    mq.innerHTML = run + run;
  }

  const gal = $("[data-gallery]");
  const items = (S.gallery || []).map((g) => (typeof g === "string" ? { src: g } : g));
  if (gal && items.length) {
    gal.innerHTML = items.map((it, i) => `
      <figure class="g-item reveal tilt-soft" data-delay="${(i % 4) * 90}" data-idx="${i}">
        <img src="${it.src}" alt="${esc(it.caption || S.name)}" loading="lazy" width="1280" height="720">
        <figcaption><b>${esc(it.caption || "")}</b>${it.text ? `<small>${esc(it.text)}</small>` : ""}</figcaption>
      </figure>`).join("");
  }

  const lb = $("#lightbox"), lbImg = $("#lb-img"), lbCap = $("#lb-cap"), lbClose = $("#lb-close");
  const openLb = (i) => {
    const it = items[i]; if (!it || !lb) return;
    lbImg.src = it.src;
    lbCap.innerHTML = it.caption ? `<b>${esc(it.caption)}</b>${it.text ? `<small>${esc(it.text)}</small>` : ""}` : "";
    lb.hidden = false; document.body.style.overflow = "hidden";
  };
  const closeLb = () => { if (!lb) return; lb.hidden = true; document.body.style.overflow = ""; };
  $$(".g-item").forEach((el) => el.addEventListener("click", () => openLb(+el.dataset.idx)));
  lbClose && lbClose.addEventListener("click", closeLb);
  lb && lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

  const fl = $(".hero-floaters");
  if (fl && S.floaters && S.floaters.length) {
    const spots = [[5, 16], [86, 12], [8, 70], [82, 68], [48, 6], [52, 88]];
    fl.innerHTML = S.floaters.map((f, i) => {
      const it = typeof f === "string" ? { src: f } : f;
      const [x, y] = spots[i % spots.length];
      return `<img class="floater ${it.cls || ""}" src="${it.src}" alt="" style="left:${x}%;top:${y}%;animation:float ${6 + (i % 4)}s ease-in-out ${-i * 1.2}s infinite" data-parallax="${0.06 + (i % 3) * 0.04}">`;
    }).join("");
  }

  const ifr = $("#dexscreener-embed");
  const pending = $("#chart-pending");
  if (ifr && S.dexscreenerEmbed && !isPlaceholder(S.dexscreenerEmbed)) {
    if (pending) pending.hidden = true;
    ifr.hidden = false;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { ifr.src = S.dexscreenerEmbed; io.disconnect(); }
    }, { rootMargin: "400px" });
    io.observe(ifr);
  }

  const svgCache = {};
  async function inlineSvgs(root = document) {
    for (const el of $$("[data-svg]", root)) {
      const src = el.dataset.svg; if (!src || el.dataset.done) continue;
      try {
        svgCache[src] = svgCache[src] || fetch(src).then((r) => r.text());
        let txt = await svgCache[src];
        txt = txt.replace(/<\?xml[^>]*>/, "").replace(/<title>.*?<\/title>/s, "");
        if (el.hasAttribute("data-mono") && !/metamask/i.test(src)) {
          txt = txt.split(/(<mask[\s\S]*?<\/mask>)/).map((part) => part.startsWith("<mask") ? part :
            part.replace(/(fill|stroke|stop-color|flood-color)="(?!none)[^"]*"/g, '$1="currentColor"')
                .replace(/(fill|stroke|stop-color):\s*(?!none)[^;"]+/g, "$1:currentColor")).join("")
            .replace(/<svg(?![^>]*\sfill=)/, '<svg fill="currentColor"');
        }
        const uid = "s" + Math.random().toString(36).slice(2, 7);
        txt = txt.replace(/id="([^"]+)"/g, `id="${uid}-$1"`)
                .replace(/url\(#([^)]+)\)/g, `url(#${uid}-$1)`)
                .replace(/href="#([^"]+)"/g, `href="#${uid}-$1"`);
        el.innerHTML = txt; el.dataset.done = 1;
      } catch (e) { /* ignore */ }
    }
  }
  inlineSvgs();

  const toast = $("#toast");
  const showToast = (m) => {
    if (!toast) return;
    toast.textContent = m; toast.classList.add("show");
    clearTimeout(showToast.t); showToast.t = setTimeout(() => toast.classList.remove("show"), 1800);
  };
  $$("[data-copy-ca]").forEach((box) => {
    const btn = $(".ca-copy", box);
    const ca = bind.contract;
    btn && btn.addEventListener("click", async () => {
      if (ca === "Coming soon") return showToast("Contract coming soon");
      try { await navigator.clipboard.writeText(ca); }
      catch {
        const t = document.createElement("textarea"); t.value = ca; document.body.appendChild(t); t.select();
        document.execCommand("copy"); t.remove();
      }
      btn.textContent = "Copied"; showToast("Contract address copied");
      setTimeout(() => (btn.textContent = "Copy"), 1600);
    });
  });

  const nav = $("#nav"), links = $("#nav-links"), tog = $("#nav-toggle");
  tog && tog.addEventListener("click", () => links.classList.toggle("open"));
  $$("#nav-links a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));

  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const d = +e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add("in"), d);
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  const observeReveals = () => $$(".reveal:not(.in)").forEach((el) => revealIO.observe(el));
  observeReveals();

  const prog = $(".scroll-progress");
  let ticking = false;
  function onScroll() {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav && nav.classList.toggle("scrolled", y > 20);
    if (prog) prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    if (!reduced) $$("[data-parallax]").forEach((el) => { el.style.translate = `0 ${y * +el.dataset.parallax}px`; });
    ticking = false;
  }
  addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  function attachTilt(root = document) {
    if (touch || reduced) return;
    $$(".tilt, .tilt-soft", root).forEach((el) => {
      if (el.dataset.tilt) return; el.dataset.tilt = 1;
      const max = el.classList.contains("tilt-soft") ? 5 : 14;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg) scale(1.02)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
    $$(".magnetic", root).forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }
  attachTilt();
  observeReveals();

  const glow = $(".cursor-glow");
  if (glow && !touch) addEventListener("pointermove", (e) => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }, { passive: true });

  const cv = $("#fx-canvas");
  if (cv && !reduced) {
    const ctx = cv.getContext("2d");
    const cfg = Object.assign({ count: 70, shape: "dot", linkDistance: 120, speed: 0.35 }, S.particles || {});
    const css = getComputedStyle(document.documentElement);
    const colors = ["--primary", "--accent", "--accent-2", "--gold"].map((v) => css.getPropertyValue(v).trim()).filter(Boolean);
    let W, H, DPR, P = [];
    const mouse = { x: -9999, y: -9999 };
    function resize() {
      DPR = Math.min(devicePixelRatio || 1, 2); W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
      const n = Math.round(cfg.count * Math.min(1, innerWidth / 1200) + 20);
      P = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * cfg.speed * DPR, vy: (Math.random() - 0.5) * cfg.speed * DPR,
        r: (Math.random() * 2 + 0.6) * DPR, c: colors[(Math.random() * colors.length) | 0], a: Math.random() * Math.PI * 2
      }));
    }
    function star(x, y, r) {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const rr = i % 2 ? r : r * 2.4, a = (i * Math.PI) / 5 - Math.PI / 2;
        ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
      }
      ctx.closePath(); ctx.fill();
    }
    function tick() {
      ctx.clearRect(0, 0, W, H);
      const ld = cfg.linkDistance * DPR;
      for (const p of P) {
        const dx = p.x - mouse.x * DPR, dy = p.y - mouse.y * DPR, d2 = dx * dx + dy * dy;
        if (d2 < 14400 * DPR) { const f = 0.6 / Math.sqrt(d2 + 1); p.vx += dx * f * 0.05; p.vy += dy * f * 0.05; }
        p.vx *= 0.99; p.vy *= 0.99; p.x += p.vx + Math.sin((p.a += 0.01)) * 0.1; p.y += p.vy;
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.05;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.fillStyle = p.c; ctx.globalAlpha = 0.85;
        if (cfg.shape === "star") star(p.x, p.y, p.r); else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }
      }
      if (ld > 0) {
        ctx.lineWidth = DPR * 0.6;
        for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
          const a = P[i], b = P[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < ld) { ctx.globalAlpha = (1 - d / ld) * 0.22; ctx.strokeStyle = a.c; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    }
    addEventListener("resize", resize);
    addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    resize(); tick();
  }
})();
