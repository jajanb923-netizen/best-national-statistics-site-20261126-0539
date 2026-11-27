// Router and controls for NusaStat. Hash routes, no framework.
// State lives in one object; every control re-renders the current route.

import { ROUTES } from "./views.js";

const state = { homeSeries: "population", range: "all", q: "", island: "Semua", sort: "grp-desc" };
const app = document.getElementById("app");
const navLinks = Array.prototype.slice.call(document.querySelectorAll(".navlink"));

function route() {
  const hash = location.hash || "#/";
  const path = hash.slice(1) || "/";
  const render = ROUTES[path] || ROUTES["/"];
  app.innerHTML = render(state);
  for (const a of navLinks) {
    const href = a.getAttribute("href");
    if (href === "#" + path || (path === "/" && href === "#/")) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  }
  window.scrollTo(0, 0);
  const q = document.getElementById("reg-q");
  if (q) {
    q.addEventListener("input", () => { state.q = q.value; rerenderTable(); });
    q.addEventListener("keydown", (e) => { if (e.key === "Enter") e.preventDefault(); });
  }
}

// Re-render only the regions table body + count, keeping the search focus.
function rerenderTable() {
  const html = ROUTES["/daerah"](state);
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const next = tmp.querySelector(".tablewrap");
  const count = tmp.querySelector(".count");
  const cur = app.querySelector(".tablewrap");
  const curCount = app.querySelector(".count");
  if (next && cur) cur.replaceWith(next);
  if (count && curCount) curCount.replaceWith(count);
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-action]");
  if (!t) return;
  const action = t.getAttribute("data-action");
  const id = t.getAttribute("data-id");
  if (action === "home-series") { state.homeSeries = id; route(); }
  if (action === "home-range" || action === "eco-range" || action === "pop-range") { state.range = id; route(); }
  if (action === "reg-sort") {
    state.sort = state.sort === id ? id.replace("-desc", "-asc") : id;
    route();
    const q = document.getElementById("reg-q");
    if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); }
  }
  if (action === "menu") {
    const nav = document.getElementById("nav");
    const open = nav.classList.toggle("open");
    t.setAttribute("aria-expanded", open ? "true" : "false");
  }
});

document.addEventListener("change", (e) => {
  const t = e.target.closest("[data-action]");
  if (!t) return;
  if (t.getAttribute("data-action") === "reg-island") { state.island = t.value; route(); }
});

document.querySelectorAll(".navlink").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("open");
  });
});

window.addEventListener("hashchange", route);
route();
