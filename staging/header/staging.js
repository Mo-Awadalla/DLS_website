const variants = new Set(["compact", "split", "three-zone"]);
const arrow = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8"/></svg>';
const menuIcon = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M1 4h16M1 9h16M1 14h16"/></svg>';
const closeIcon = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m3 3 12 12M15 3 3 15"/></svg>';
const escape = value => String(value).replace(/[&<>"']/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[character]);

async function preview() {
  const params = new URLSearchParams(location.search);
  const variant = variants.has(params.get("variant")) ? params.get("variant") : "compact";
  let surface = params.get("surface") === "venue" ? "venue" : "home";
  const response = await fetch("/event.json");
  if (!response.ok) throw new Error("Approved event data could not be loaded");
  const event = await response.json();
  document.body.className = `preview-page variant-${variant}`;
  document.title = `${variant} header preview — ${event.title}`;
  const registration = `<a class="nav-link registration" href="${escape(event.registrationUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Registration (opens in a new tab)">Registration${variant === "three-zone" ? "" : ` ${arrow}`}</a>`;
  const links = () => `<a class="nav-link" data-surface="home" href="/preview/?variant=${variant}&surface=home">Home</a><a class="nav-link" data-surface="venue" href="/preview/?variant=${variant}&surface=venue">Venue</a>`;
  document.querySelector("#preview-root").innerHTML = `<header class="preview-header"><div class="header-row"><a class="brand" data-surface="home" href="/preview/?variant=${variant}" aria-label="${escape(event.title)} home"><img src="/assets/nycem-logo-transparent.png" width="2500" height="834" alt="${escape(event.organization)}"></a><nav class="desktop-nav" aria-label="Main"><div class="nav-track glass"><span class="selection" aria-hidden="true"></span>${links()}${registration}</div></nav>${variant === "three-zone" ? registration.replace('class="nav-link registration"', 'class="nav-link registration registration-standalone"') : ""}<button class="menu-toggle glass" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav"><span class="menu-label">Menu</span><span class="menu-icon">${menuIcon}</span></button></div><nav id="mobile-nav" class="mobile-nav glass" aria-label="Mobile main" hidden><div class="nav-track"><span class="selection" aria-hidden="true"></span>${links()}${registration}</div></nav></header><div id="page-content"></div>`;
  const header = document.querySelector(".preview-header");
  const row = document.querySelector(".header-row");
  const toggle = document.querySelector(".menu-toggle");
  const mobile = document.querySelector("#mobile-nav");
  const tracks = [...document.querySelectorAll(".nav-track")];
  function selection(animate) {
    for (const track of tracks) {
      const current = track.querySelector('[aria-current="page"]');
      if (!current || !track.getBoundingClientRect().width || !current.getBoundingClientRect().width) continue;
      const bounds = track.getBoundingClientRect(), target = current.getBoundingClientRect();
      const left = target.left - bounds.left - track.clientLeft, top = target.top - bounds.top - track.clientTop;
      track.dataset.animate = String(animate);
      track.querySelector(".selection").style.clipPath = `inset(${top}px ${track.clientWidth-left-target.width}px ${track.clientHeight-top-target.height}px ${left}px round 24px)`;
    }
  }
  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.querySelector(".menu-label").textContent = open ? "Close" : "Menu";
    toggle.querySelector(".menu-icon").innerHTML = open ? closeIcon : menuIcon;
    mobile.hidden = !open;
    selection(false);
  }
  function render(animate = false) {
    document.body.dataset.surface = surface;
    document.querySelectorAll("a[data-surface]").forEach(link => {
      if (link.classList.contains("nav-link") && link.dataset.surface === surface) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    const content = document.querySelector("#page-content");
    if (surface === "home") content.innerHTML = `<section class="signal-hero"><img class="skyline" src="/assets/nyc-skyline.jpg" alt="" width="2000" height="1333"><div class="scrim"></div><div class="hero-content"><p class="event-name">${escape(event.title)}</p><h1>${escape(event.themeDisplay[0])}<br><span>${escape(event.themeDisplay[1])}</span></h1><p class="hero-tagline">${escape(event.tagline)}</p><dl class="event-facts"><div><dt>Date</dt><dd>${escape(event.date.label)}</dd></div><div><dt>Venue</dt><dd>${escape(event.venue.name)}</dd></div></dl><a class="button" href="${escape(event.registrationUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Register Here! (opens in a new tab)">Register Here!</a></div></section>`;
    else content.innerHTML = `<div class="venue-masthead"></div><section class="venue-content"><h1>Venue <span>&amp;</span> Travel</h1><h2>${escape(event.venue.name)}</h2><p>${escape(event.venue.address)}<br>${escape(event.venue.cityState)} ${escape(event.venue.zip)}</p><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.venue.name}, ${event.venue.address}, ${event.venue.cityState}`)}" target="_blank" rel="noopener noreferrer">Venue directions</a><h2>${escape(event.hotel.name)}</h2><a href="${escape(event.hotel.bookingUrl)}" target="_blank" rel="noopener noreferrer">Book your room</a></section>`;
    selection(animate);
  }
  document.addEventListener("click", event => {
    const link = event.target.closest("a[data-surface]");
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
    event.preventDefault();
    surface = link.dataset.surface;
    history.pushState(null, "", link.href);
    setOpen(false);
    render(event.detail > 0);
  });
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  header.addEventListener("keydown", event => {
    if (event.key === "Escape" && !mobile.hidden) { setOpen(false); toggle.focus(); }
  });
  mobile.querySelector(".registration").addEventListener("click", () => setOpen(false));
  window.addEventListener("popstate", () => { surface = new URLSearchParams(location.search).get("surface") === "venue" ? "venue" : "home"; setOpen(false); render(); });
  function layout() {
    const brand = document.querySelector(".brand").getBoundingClientRect().width;
    const nav = tracks[0].getBoundingClientRect().width;
    const action = document.querySelector(".registration-standalone");
    const required = variant === "three-zone" ? Math.max(brand, action.getBoundingClientRect().width) * 2 + nav + 48 : brand + nav + (variant === "compact" ? 40 : 24);
    const collapsed = innerWidth <= 680 || required > row.clientWidth;
    header.classList.toggle("collapsed", collapsed);
    if (!collapsed) setOpen(false);
    selection(false);
  }
  render();
  await document.fonts.ready;
  const observer = new ResizeObserver(layout);
  observer.observe(row);
  observer.observe(tracks[0]);
  layout();
  document.documentElement.dataset.previewReady = "true";
}

function board() {
  const board = document.querySelector("#board");
  let device = matchMedia("(max-width:680px)").matches ? "mobile" : "desktop";
  const hero = document.querySelector("#show-hero"), surface = document.querySelector("#surface");
  function size() {
    const width = device === "desktop" ? 1440 : 390;
    const height = hero.checked ? (device === "desktop" ? 590 : 560) : (device === "desktop" ? 104 : 88);
    board.dataset.device = device;
    document.querySelectorAll("[data-device]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.device === device)));
    document.querySelectorAll(".preview-shell").forEach(shell => {
      const scale = Math.min(1, shell.parentElement.clientWidth / width);
      const frame = shell.querySelector("iframe");
      shell.style.width = `${width * scale}px`;
      shell.style.height = `${height * scale}px`;
      frame.style.width = `${width}px`;
      frame.style.height = `${height}px`;
      frame.style.transform = `scale(${scale})`;
    });
  }
  document.querySelectorAll("[data-device]").forEach(button => button.addEventListener("click", () => { device = button.dataset.device; size(); }));
  hero.addEventListener("change", size);
  surface.addEventListener("change", () => {
    document.querySelectorAll(".option").forEach(option => {
      const url = `/preview/?variant=${option.dataset.variant}&surface=${surface.value}`;
      option.querySelector("iframe").src = url;
      option.querySelector(".inspect").href = url;
    });
  });
  const observer = new ResizeObserver(size);
  observer.observe(board);
  size();
  document.documentElement.dataset.boardReady = "true";
}

if (location.pathname === "/preview/") preview().catch(error => { document.querySelector("#preview-root").textContent = `${error.message}. Restart the staging server and refresh.`; });
else board();
