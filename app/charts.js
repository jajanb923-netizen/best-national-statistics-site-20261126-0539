// Hand-rolled SVG charts for NusaStat. No libraries: one line chart and one
// bar chart, both drawn as plain SVG strings so the first load stays small.

import { formatCompact } from "./format.js";

function niceTicks(min, max, count) {
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  const step0 = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const norm = step0 / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step * 0.5; v += step) ticks.push(v);
  return { ticks, lo, hi };
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Line chart. values: [{year, value}], series carries label/format for ticks.
export function lineChart(values, series, opts) {
  const o = opts || {};
  const w = o.width || 640;
  const h = o.height || 260;
  const padL = 92, padR = 14, padT = 14, padB = 30;
  const iw = w - padL - padR, ih = h - padT - padB;
  const vals = values.map((v) => v.value);
  let min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
  if (min > 0 && min > max * 0.55) min = max * 0.55;
  if (min < 0 && max > 0) { /* keep zero line */ } else if (min >= 0) { min = Math.min(min, max * 0.9); }
  const t = niceTicks(min, max, 4);
  min = t.lo; max = t.hi;
  const x = (i) => padL + (iw * i) / (values.length - 1 || 1);
  const y = (v) => padT + ih - ((v - min) / (max - min || 1)) * ih;
  let grid = "";
  for (const tv of t.ticks) {
    const gy = y(tv);
    grid += '<line x1="' + padL + '" y1="' + gy.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + gy.toFixed(1) + '" class="grid"/>';
    grid += '<text x="' + (padL - 8) + '" y="' + (gy + 4).toFixed(1) + '" class="tick" text-anchor="end">' + esc(formatCompact(series, tv)) + '</text>';
  }
  let labels = "";
  values.forEach((v, i) => {
    if (i % 2 === 0 || i === values.length - 1) {
      labels += '<text x="' + x(i).toFixed(1) + '" y="' + (h - 8) + '" class="tick" text-anchor="middle">' + v.year + '</text>';
    }
  });
  const pts = values.map((v, i) => x(i).toFixed(1) + "," + y(v.value).toFixed(1)).join(" ");
  const area = padL + "," + (padT + ih) + " " + pts + " " + (w - padR) + "," + (padT + ih);
  const last = values[values.length - 1];
  const dots = values.map((v, i) =>
    '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v.value).toFixed(1) + '" r="3.2" class="dot"><title>' + v.year + ": " + esc(formatCompact(series, v.value)) + '</title></circle>').join("");
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Grafik ' + esc(series.label) + ' 2015-2024">'
    + grid + '<polygon points="' + area + '" class="area"/>'
    + '<polyline points="' + pts + '" class="line" fill="none"/>'
    + dots + labels
    + '<text x="' + x(values.length - 1).toFixed(1) + '" y="' + Math.max(15, y(last.value) - 10).toFixed(1) + '" class="lastval" text-anchor="end">' + esc(formatCompact(series, last.value)) + '</text>'
    + '</svg>';
}

// Bar chart. values: [{year, value}]. Negative bars grow downward from zero.
export function barChart(values, series, opts) {
  const o = opts || {};
  const w = o.width || 640;
  const h = o.height || 260;
  const padL = 92, padR = 14, padT = 14, padB = 30;
  const iw = w - padL - padR, ih = h - padT - padB;
  const vals = values.map((v) => v.value);
  let min = Math.min(0, Math.min.apply(null, vals));
  let max = Math.max(0, Math.max.apply(null, vals));
  if (max === min) max = min + 1;
  const t = niceTicks(min, max, 4);
  min = t.lo; max = t.hi;
  const y = (v) => padT + ih - ((v - min) / (max - min || 1)) * ih;
  const slot = iw / values.length;
  const bw = Math.min(46, slot * 0.62);
  let grid = "";
  for (const tv of t.ticks) {
    const gy = y(tv);
    grid += '<line x1="' + padL + '" y1="' + gy.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + gy.toFixed(1) + '" class="grid"/>';
    grid += '<text x="' + (padL - 8) + '" y="' + (gy + 4).toFixed(1) + '" class="tick" text-anchor="end">' + esc(formatCompact(series, tv)) + '</text>';
  }
  let bars = "", labels = "";
  values.forEach((v, i) => {
    const cx = padL + slot * i + slot / 2;
    const y0 = y(0), yv = y(v.value);
    const top = Math.min(y0, yv), ht = Math.abs(y0 - yv);
    const cls = v.value < 0 ? "bar neg" : "bar";
    bars += '<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(ht, 1.5).toFixed(1) + '" class="' + cls + '"><title>' + v.year + ": " + esc(formatCompact(series, v.value)) + '</title></rect>';
    labels += '<text x="' + cx.toFixed(1) + '" y="' + (h - 8) + '" class="tick" text-anchor="middle">' + v.year + '</text>';
  });
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Grafik batang ' + esc(series.label) + ' 2015-2024">'
    + grid + bars + labels + '</svg>';
}

// Horizontal bar list for rankings (province GRP per capita, top N).
export function rankBars(rows, maxValue, formatFn) {
  let out = '<ol class="rankbars">';
  for (const r of rows) {
    const pct = Math.max(2, (r.value / maxValue) * 100);
    out += '<li><span class="rb-name">' + esc(r.name) + '</span>'
      + '<span class="rb-track"><span class="rb-fill" style="width:' + pct.toFixed(1) + '%"></span></span>'
      + '<span class="rb-val">' + esc(formatFn(r.value)) + '</span></li>';
  }
  return out + '</ol>';
}
