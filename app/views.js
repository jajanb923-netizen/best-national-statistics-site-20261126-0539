// Page renderers for NusaStat. Each function returns an HTML string for #app.
// All figures come from data.js (World Bank WDI + BPS), each shown with its
// source and year so a visitor can check it.

import { SERIES, HEADLINES, PROVINCES, NATIONAL_GRP, ISLANDS, latest, changeSince } from "./data.js";
import { formatValue, formatCompact, formatRupiahThousand, deltaText, pctChange } from "./format.js";
import { lineChart, barChart, rankBars } from "./charts.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sourceLine(series) {
  return '<p class="src">Sumber: ' + esc(series.source) + ' · ' + esc(series.values[0].year) + '–' + esc(latest(series.id).year) + '</p>';
}

function headlineCard(h) {
  const s = SERIES[h.series];
  const v = s.values.find((x) => x.year === h.year);
  const ch = changeSince(h.series, 2015);
  const pct = ch ? pctChange(ch.from, ch.to) : null;
  const dir = ch && ch.delta > 0 ? "naik" : ch && ch.delta < 0 ? "turun" : "tetap";
  return '<article class="card stat"><h3>' + esc(s.label) + '</h3>'
    + '<p class="bignum">' + esc(formatValue(s, v.value)) + '</p>'
    + '<p class="meta">' + h.year + ' · ' + dir + ' ' + esc(deltaText(ch.from, ch.to, s.format))
    + (pct !== null ? ' (' + (pct >= 0 ? '+' : '') + pct.toFixed(1).replace(".", ",") + '% sejak 2015)' : '') + '</p>'
    + '<p class="src">' + esc(s.source) + '</p></article>';
}

function chartPanel(title, chartHtml, series, extra) {
  return '<section class="panel"><div class="panel-head"><h2>' + esc(title) + '</h2>'
    + (extra || '') + '</div>' + chartHtml + sourceLine(series) + '</section>';
}

export function renderHome(state) {
  const seriesId = state.homeSeries || "population";
  const range = state.range || "all";
  const s = SERIES[seriesId];
  let values = s.values;
  if (range === "recent") values = s.values.filter((v) => v.year >= 2020);
  const tabs = ["population", "gdp", "gdpGrowth"].map((id) =>
    '<button class="tab' + (id === seriesId ? ' on' : '') + '" data-action="home-series" data-id="' + id + '">' + esc(SERIES[id].short) + '</button>').join("");
  const rangeBtns = '<span class="seg"><button class="tab' + (range === "all" ? ' on' : '') + '" data-action="home-range" data-id="all">2015–2024</button>'
    + '<button class="tab' + (range === "recent" ? ' on' : '') + '" data-action="home-range" data-id="recent">2020–2024</button></span>';
  const top5 = PROVINCES.slice(0, 5).map((p) => ({ name: p.name, value: p.grp }));
  const cards = HEADLINES.map(headlineCard).join("");
  return '<section class="hero"><p class="kicker">Statistik Indonesia · Data resmi, bisa dicek</p>'
    + '<h1>Indonesia dalam angka, 2015–2024</h1>'
    + '<p class="lede">Penduduk, ekonomi, kesehatan, dan daerah — angka terbaru dari Bank Dunia dan Badan Pusat Statistik, lengkap dengan sumber dan tahunnya. Cari angka yang Anda butuhkan, lalu lihat trennya.</p>'
    + '<p class="hero-cta"><a class="btn" href="#/ekonomi">Lihat ekonomi</a> <a class="btn ghost" href="#/daerah">Bandingkan provinsi</a></p></section>'
    + '<section class="grid">' + cards + '</section>'
    + chartPanel("Tren: " + s.label, '<div class="tabs">' + tabs + ' ' + rangeBtns + '</div>' + lineChart(values, s), s)
    + '<section class="split"><div class="panel"><h2>PDRB per kapita tertinggi, 2024</h2>'
    + rankBars(top5, PROVINCES[0].grp, (v) => formatRupiahThousand(v))
    + '<p class="src">Sumber: ' + esc("Badan Pusat Statistik (BPS), PDRB Per Kapita 2024") + ' · <a href="#/daerah">Lihat 38 provinsi</a></p></div>'
    + '<div class="panel"><h2>Yang berubah dalam 10 tahun</h2><ul class="facts">'
    + '<li><strong>+21,7 juta jiwa</strong> — penduduk 261,8 juta (2015) menjadi 283,5 juta (2024).</li>'
    + '<li><strong>PDB naik 62%</strong> — US$ 861 miliar (2015) menjadi US$ 1.396 miliar (2024).</li>'
    + '<li><strong>Internet meroket</strong> — dari 22% penduduk (2015) menjadi 73% (2024).</li>'
    + '<li><strong>Kemiskinan turun</strong> — dari 11,2% (2015) menjadi 9,0% (2024).</li>'
    + '<li><strong>Kota membesar</strong> — penduduk perkotaan 53% (2015) menjadi 59% (2024).</li>'
    + '</ul><p class="src">Sumber: World Bank WDI, dihitung dari seri 2015–2024.</p></div></section>';
}

export function renderEconomy(state) {
  const range = state.range || "all";
  const filt = (arr) => (range === "recent" ? arr.filter((v) => v.year >= 2020) : arr);
  const rangeBtns = '<span class="seg"><button class="tab' + (range === "all" ? ' on' : '') + '" data-action="eco-range" data-id="all">2015–2024</button>'
    + '<button class="tab' + (range === "recent" ? ' on' : '') + '" data-action="eco-range" data-id="recent">2020–2024</button></span>';
  const gdp = SERIES.gdp, growth = SERIES.gdpGrowth, pc = SERIES.gdpPerCapita;
  const inf = SERIES.inflation, un = SERIES.unemployment;
  return '<section class="pagehead"><p class="kicker">Ekonomi</p><h1>Ekonomi Indonesia</h1>'
    + '<p class="lede">PDB US$ 1.396 miliar pada 2024 — ekonomi terbesar di Asia Tenggara — tumbuh 5,03% setahun. Inflasi 2,18%, pengangguran 3,30%.</p></section>'
    + chartPanel("PDB (harga berlaku)", rangeBtns + lineChart(filt(gdp.values), gdp), gdp)
    + '<section class="grid">' + [ "gdp", "gdpPerCapita", "gdpGrowth", "inflation", "unemployment" ].map((id) =>
      headlineCard({ series: id, year: 2024 })).join("") + '</section>'
    + chartPanel("Pertumbuhan PDB tahunan", barChart(filt(growth.values), growth), growth)
    + '<section class="split">'
    + chartPanel("PDB per kapita", lineChart(filt(pc.values), pc), pc)
    + chartPanel("Inflasi dan pengangguran", lineChart(filt(inf.values), inf) + '<h3 class="sub">Pengangguran (% angkatan kerja)</h3>' + lineChart(filt(un.values), un), inf)
    + '</section>'
    + '<section class="panel"><h2>Cara membaca angka ini</h2><ul class="facts">'
    + '<li>PDB 2020 turun (−2,07%) karena pandemi COVID-19, lalu pulih 3,70% (2021) dan 5,31% (2022).</li>'
    + '<li>PDB per kapita naik dari US$ 3.288 (2015) menjadi US$ 4.925 (2024).</li>'
    + '<li>Inflasi 2022 melonjak ke 4,21% lalu kembali ke 2,18% pada 2024.</li>'
    + '<li>Pengangguran terendah satu dekade: 3,30% pada 2024.</li>'
    + '</ul><p class="src">Sumber: World Bank WDI (NY.GDP.MKTP.CD, NY.GDP.MKTP.KD.ZG, NY.GDP.PCAP.CD, FP.CPI.TOTL.ZG, SL.UEM.TOTL.ZS).</p></section>';
}

export function renderPopulation(state) {
  const range = state.range || "all";
  const filt = (arr) => (range === "recent" ? arr.filter((v) => v.year >= 2020) : arr);
  const rangeBtns = '<span class="seg"><button class="tab' + (range === "all" ? ' on' : '') + '" data-action="pop-range" data-id="all">2015–2024</button>'
    + '<button class="tab' + (range === "recent" ? ' on' : '') + '" data-action="pop-range" data-id="recent">2020–2024</button></span>';
  const pop = SERIES.population, urb = SERIES.urban, le = SERIES.lifeExpectancy;
  const im = SERIES.infantMortality, net = SERIES.internet, pov = SERIES.poverty;
  return '<section class="pagehead"><p class="kicker">Penduduk &amp; Kesejahteraan</p><h1>283,5 juta penduduk</h1>'
    + '<p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia. Harapan hidup 71,3 tahun, kematian bayi turun ke 15,2 per 1.000 kelahiran, dan 73% penduduk memakai internet.</p></section>'
    + '<section class="grid">' + [ "population", "lifeExpectancy", "infantMortality", "urban", "internet", "poverty" ].map((id) =>
      headlineCard({ series: id, year: 2024 })).join("") + '</section>'
    + chartPanel("Jumlah penduduk", rangeBtns + lineChart(filt(pop.values), pop), pop)
    + '<section class="split">'
    + chartPanel("Harapan hidup (tahun)", lineChart(filt(le.values), le), le)
    + chartPanel("Kematian bayi (per 1.000 kelahiran)", lineChart(filt(im.values), im), im)
    + '</section><section class="split">'
    + chartPanel("Penduduk perkotaan (% penduduk)", lineChart(filt(urb.values), urb), urb)
    + chartPanel("Pengguna internet (% penduduk)", lineChart(filt(net.values), net), net)
    + '</section>'
    + '<section class="panel"><h2>Cara membaca angka ini</h2><ul class="facts">'
    + '<li>Harapan hidup sempat turun pada 2020–2021 (68,8 lalu 67,5 tahun) saat pandemi, lalu pulih ke 71,3 tahun pada 2024.</li>'
    + '<li>Kematian bayi turun hampir sepertiga dalam sepuluh tahun: 21,9 (2015) menjadi 15,2 (2024).</li>'
    + '<li>Kemiskinan (garis kemiskinan nasional) turun dari 11,2% (2015) menjadi 9,0% (2024).</li>'
    + '<li>Partisipasi murni sekolah dasar 93,5% (2018, data WDI terbaru yang tersedia).</li>'
    + '</ul><p class="src">Sumber: World Bank WDI (SP.POP.TOTL, SP.DYN.LE00.IN, SP.DYN.IMRT.IN, SP.URB.TOTL.IN.ZS, IT.NET.USER.ZS, SI.POV.NAHC, SE.PRM.NENR).</p></section>';
}

export function renderRegions(state) {
  const q = (state.q || "").toLowerCase();
  const island = state.island || "Semua";
  const sort = state.sort || "grp-desc";
  let rows = PROVINCES.slice();
  if (island !== "Semua") rows = rows.filter((p) => p.island === island);
  if (q) rows = rows.filter((p) => p.name.toLowerCase().includes(q));
  rows.sort((a, b) => {
    if (sort === "name-asc") return a.name.localeCompare(b.name, "id");
    if (sort === "name-desc") return b.name.localeCompare(a.name, "id");
    if (sort === "grp-asc") return a.grp - b.grp;
    return b.grp - a.grp;
  });
  const opts = ISLANDS.map((i) => '<option value="' + esc(i) + '"' + (i === island ? ' selected' : '') + '>' + esc(i) + '</option>').join("");
  const th = (label, key) => '<th><button class="thbtn" data-action="reg-sort" data-id="' + key + '">' + esc(label) + (sort === key ? " ↓" : sort === key.replace("-desc", "-asc") ? " ↑" : "") + '</button></th>';
  const body = rows.map((p, i) => '<tr><td>' + (i + 1) + '</td><td>' + esc(p.name) + '</td><td>' + esc(p.island) + '</td>'
    + '<td class="num">' + formatRupiahThousand(p.grp) + '</td><td class="num">US$ ' + formatCompact({ format: "usd" }, p.usd).replace("US$ ", "") + '</td></tr>').join("");
  const top10 = PROVINCES.slice(0, 10).map((p) => ({ name: p.name, value: p.grp }));
  return '<section class="pagehead"><p class="kicker">Daerah</p><h1>PDRB per kapita provinsi, 2024</h1>'
    + '<p class="lede">Jakarta tertinggi (Rp 367.687 ribu per orang), Papua Pegunungan terendah (Rp 19.111 ribu). Rata-rata nasional: Rp 78.617 ribu (US$ 4.956). Ketik nama provinsi untuk mencari, atau saring menurut kepulauan.</p></section>'
    + '<section class="panel"><h2>10 provinsi teratas</h2>'
    + rankBars(top10, PROVINCES[0].grp, (v) => formatRupiahThousand(v))
    + '<p class="src">Sumber: Badan Pusat Statistik (BPS), PDRB Per Kapita 2024</p></section>'
    + '<section class="panel"><div class="controls"><label>Cari <input id="reg-q" type="search" placeholder="Nama provinsi…" value="' + esc(state.q || "") + '" data-action="reg-q"></label>'
    + '<label>Kepulauan <select data-action="reg-island">' + opts + '</select></label>'
    + '<p class="count">' + rows.length + ' dari 38 provinsi</p></div>'
    + '<div class="tablewrap"><table><thead><tr><th>#</th>' + th("Provinsi", "name-desc") + '<th>Kepulauan</th>' + th("PDRB per kapita", "grp-desc") + '<th>US$</th></tr></thead><tbody>'
    + (body || '<tr><td colspan="5">Tidak ada provinsi yang cocok. Coba kata kunci lain.</td></tr>')
    + '</tbody></table></div>'
    + '<p class="src">Sumber: Badan Pusat Statistik (BPS), “[Seri 2010] Produk Domestik Regional Bruto Per Kapita (Ribu Rupiah), 2024”, 2025. PDRB per kapita = PDRB harga berlaku dibagi penduduk tengah tahun.</p></section>';
}

export function renderMethods() {
  const rows = Object.values(SERIES).map((s) => {
    const l = latest(s.id);
    return '<tr><td>' + esc(s.label) + '</td><td>' + esc(formatValue(s, l.value)) + ' (' + l.year + ')</td><td>' + esc(s.source) + '</td><td>' + esc(s.note) + '</td></tr>';
  }).join("");
  return '<section class="pagehead"><p class="kicker">Metodologi &amp; Sumber</p><h1>Dari mana angka-angka ini?</h1>'
    + '<p class="lede">Setiap angka di situs ini bisa dilacak ke sumbernya. Seri nasional berasal dari World Bank World Development Indicators (diambil 27 November 2026); angka provinsi dari Badan Pusat Statistik. Tidak ada angka yang dikarang.</p></section>'
    + '<section class="panel"><h2>Indikator nasional</h2><div class="tablewrap"><table><thead><tr><th>Indikator</th><th>Nilai terbaru</th><th>Sumber (kode WDI)</th><th>Catatan</th></tr></thead><tbody>'
    + rows + '</tbody></table></div></section>'
    + '<section class="panel"><h2>Angka provinsi</h2><p>PDRB per kapita 2024 untuk 38 provinsi: Badan Pusat Statistik (BPS), “[Seri 2010] Produk Domestik Regional Bruto Per Kapita (Ribu Rupiah), 2024”, diterbitkan 2025. Nilai dalam ribu rupiah per orang, beserta padanan dolar AS nominal yang diterbitkan BPS. Rata-rata nasional 2024: Rp 78.617 ribu (US$ 4.956).</p>'
    + '<h2>Yang tidak ada di sini</h2><p>Angka yang sumbernya tidak bisa diverifikasi tidak kami tampilkan. Seri partisipasi sekolah dasar berhenti di 2018 karena itu data terbaru yang tersedia di WDI saat pengambilan. Situs ini tidak memakai pelacak, tidak memuat apa pun dari server lain, dan seluruh grafik digambar dari data di atas — bukan dari gambar luar.</p>'
    + '<h2>Cara mengutip</h2><p>Contoh: “Penduduk Indonesia 283,5 juta jiwa pada 2024 (World Bank WDI, SP.POP.TOTL, diakses 27 Nov 2026).”</p></section>';
}

export const ROUTES = {
  "/": renderHome,
  "/ekonomi": renderEconomy,
  "/penduduk": renderPopulation,
  "/daerah": renderRegions,
  "/metodologi": renderMethods,
};
