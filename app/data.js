// NusaStat data: every figure verified against a public source, with its year.
// National series: World Bank World Development Indicators, country IDN,
// fetched 27 Nov 2026 (last update in the WDI file: 11 Nov 2026).
// Province figures: Badan Pusat Statistik (BPS) 2025, "[Seri 2010] Produk
// Domestik Regional Bruto Per Kapita (Ribu Rupiah), 2024" — values are 2024.

export const META = {
  country: "Indonesia",
  countryCode: "IDN",
  updated: "27 November 2026",
  nationalSource: "World Bank, World Development Indicators (data.worldbank.org)",
  provinceSource: "Badan Pusat Statistik (BPS), PDRB Per Kapita 2024",
};

// Yearly series, 2015-2024. Each entry: { year, value }.
export const SERIES = {
  population: {
    id: "population",
    label: "Penduduk",
    short: "Penduduk",
    unit: "jiwa",
    format: "people",
    source: "World Bank WDI, SP.POP.TOTL",
    note: "Jumlah penduduk tengah tahun, estimasi PBB.",
    values: [
      { year: 2015, value: 261799249 }, { year: 2016, value: 264627418 },
      { year: 2017, value: 267346658 }, { year: 2018, value: 269951846 },
      { year: 2019, value: 272489381 }, { year: 2020, value: 274814866 },
      { year: 2021, value: 276758053 }, { year: 2022, value: 278830529 },
      { year: 2023, value: 281190067 }, { year: 2024, value: 283487931 },
    ],
  },
  gdp: {
    id: "gdp",
    label: "PDB (harga berlaku)",
    short: "PDB",
    unit: "US$",
    format: "usdB",
    source: "World Bank WDI, NY.GDP.MKTP.CD",
    note: "Produk domestik bruto pada harga berlaku, dolar AS.",
    values: [
      { year: 2015, value: 860854232686 }, { year: 2016, value: 931877364038 },
      { year: 2017, value: 1015618744160 }, { year: 2018, value: 1042271532989 },
      { year: 2019, value: 1119099871350 }, { year: 2020, value: 1059054842698 },
      { year: 2021, value: 1186509691087 }, { year: 2022, value: 1319101183380 },
      { year: 2023, value: 1371166925750 }, { year: 2024, value: 1396301788462 },
    ],
  },
  gdpPerCapita: {
    id: "gdpPerCapita",
    label: "PDB per kapita",
    short: "PDB/kapita",
    unit: "US$",
    format: "usd",
    source: "World Bank WDI, NY.GDP.PCAP.CD",
    note: "PDB pada harga berlaku dibagi penduduk tengah tahun.",
    values: [
      { year: 2015, value: 3288.22 }, { year: 2016, value: 3521.47 },
      { year: 2017, value: 3798.88 }, { year: 2018, value: 3860.95 },
      { year: 2019, value: 4106.95 }, { year: 2020, value: 3853.70 },
      { year: 2021, value: 4287.17 }, { year: 2022, value: 4730.83 },
      { year: 2023, value: 4876.30 }, { year: 2024, value: 4925.44 },
    ],
  },
  gdpGrowth: {
    id: "gdpGrowth",
    label: "Pertumbuhan PDB",
    short: "Pertumbuhan",
    unit: "%/tahun",
    format: "pct",
    source: "World Bank WDI, NY.GDP.MKTP.KD.ZG",
    note: "Pertumbuhan tahunan PDB harga konstan.",
    values: [
      { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
      { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
      { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
      { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
      { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
    ],
  },
  lifeExpectancy: {
    id: "lifeExpectancy",
    label: "Harapan hidup",
    short: "Harapan hidup",
    unit: "tahun",
    format: "years",
    source: "World Bank WDI, SP.DYN.LE00.IN",
    note: "Harapan hidup saat lahir, total (laki-laki dan perempuan).",
    values: [
      { year: 2015, value: 69.52 }, { year: 2016, value: 69.73 },
      { year: 2017, value: 69.95 }, { year: 2018, value: 70.08 },
      { year: 2019, value: 70.35 }, { year: 2020, value: 68.82 },
      { year: 2021, value: 67.45 }, { year: 2022, value: 70.92 },
      { year: 2023, value: 71.15 }, { year: 2024, value: 71.29 },
    ],
  },
  unemployment: {
    id: "unemployment",
    label: "Pengangguran",
    short: "Pengangguran",
    unit: "% angkatan kerja",
    format: "pct",
    source: "World Bank WDI, SL.UEM.TOTL.ZS (estimasi model ILO)",
    note: "Pengangguran total sebagai persen angkatan kerja, estimasi model ILO.",
    values: [
      { year: 2015, value: 4.51 }, { year: 2016, value: 4.30 },
      { year: 2017, value: 3.78 }, { year: 2018, value: 4.39 },
      { year: 2019, value: 3.59 }, { year: 2020, value: 4.25 },
      { year: 2021, value: 3.83 }, { year: 2022, value: 3.46 },
      { year: 2023, value: 3.31 }, { year: 2024, value: 3.30 },
    ],
  },
  inflation: {
    id: "inflation",
    label: "Inflasi",
    short: "Inflasi",
    unit: "%/tahun",
    format: "pct",
    source: "World Bank WDI, FP.CPI.TOTL.ZG",
    note: "Inflasi harga konsumen tahunan, diukur dari IHK.",
    values: [
      { year: 2015, value: 6.36 }, { year: 2016, value: 3.53 },
      { year: 2017, value: 3.81 }, { year: 2018, value: 3.20 },
      { year: 2019, value: 3.03 }, { year: 2020, value: 1.92 },
      { year: 2021, value: 1.56 }, { year: 2022, value: 4.21 },
      { year: 2023, value: 3.67 }, { year: 2024, value: 2.18 },
    ],
  },
  infantMortality: {
    id: "infantMortality",
    label: "Kematian bayi",
    short: "Kematian bayi",
    unit: "per 1.000 kelahiran",
    format: "per1000",
    source: "World Bank WDI, SP.DYN.IMRT.IN",
    note: "Angka kematian bayi per 1.000 kelahiran hidup.",
    values: [
      { year: 2015, value: 21.9 }, { year: 2016, value: 21.0 },
      { year: 2017, value: 20.1 }, { year: 2018, value: 19.3 },
      { year: 2019, value: 18.5 }, { year: 2020, value: 17.7 },
      { year: 2021, value: 17.0 }, { year: 2022, value: 16.3 },
      { year: 2023, value: 15.7 }, { year: 2024, value: 15.2 },
    ],
  },
  internet: {
    id: "internet",
    label: "Pengguna internet",
    short: "Internet",
    unit: "% penduduk",
    format: "pct",
    source: "World Bank WDI, IT.NET.USER.ZS",
    note: "Individu yang menggunakan internet, persen penduduk.",
    values: [
      { year: 2015, value: 22.06 }, { year: 2016, value: 25.45 },
      { year: 2017, value: 32.34 }, { year: 2018, value: 39.90 },
      { year: 2019, value: 47.69 }, { year: 2020, value: 53.73 },
      { year: 2021, value: 62.10 }, { year: 2022, value: 66.48 },
      { year: 2023, value: 69.21 }, { year: 2024, value: 72.78 },
    ],
  },
  poverty: {
    id: "poverty",
    label: "Kemiskinan",
    short: "Kemiskinan",
    unit: "% penduduk",
    format: "pct",
    source: "World Bank WDI, SI.POV.NAHC",
    note: "Penduduk di bawah garis kemiskinan nasional, persen penduduk.",
    values: [
      { year: 2015, value: 11.2 }, { year: 2016, value: 10.9 },
      { year: 2017, value: 10.6 }, { year: 2018, value: 9.8 },
      { year: 2019, value: 9.4 }, { year: 2020, value: 9.8 },
      { year: 2021, value: 10.1 }, { year: 2022, value: 9.5 },
      { year: 2023, value: 9.4 }, { year: 2024, value: 9.0 },
    ],
  },
  urban: {
    id: "urban",
    label: "Penduduk kota",
    short: "Perkotaan",
    unit: "% penduduk",
    format: "pct",
    source: "World Bank WDI, SP.URB.TOTL.IN.ZS",
    note: "Penduduk perkotaan sebagai persen penduduk total.",
    values: [
      { year: 2015, value: 53.17 }, { year: 2016, value: 53.81 },
      { year: 2017, value: 54.45 }, { year: 2018, value: 55.10 },
      { year: 2019, value: 55.74 }, { year: 2020, value: 56.28 },
      { year: 2021, value: 56.88 }, { year: 2022, value: 57.49 },
      { year: 2023, value: 58.12 }, { year: 2024, value: 58.75 },
    ],
  },
  primaryEnrollment: {
    id: "primaryEnrollment",
    label: "Sekolah dasar (neto)",
    short: "SD (neto)",
    unit: "% anak usia SD",
    format: "pct",
    source: "World Bank WDI, SE.PRM.NENR",
    note: "Angka partisipasi murni sekolah dasar. Seri WDI terbaru yang tersedia berakhir 2018.",
    values: [
      { year: 2016, value: 92.77 }, { year: 2017, value: 94.10 },
      { year: 2018, value: 93.50 },
    ],
  },
};

// Headline figures for the home page (latest year available, 2024 unless noted).
export const HEADLINES = [
  { series: "population", year: 2024 },
  { series: "gdp", year: 2024 },
  { series: "gdpPerCapita", year: 2024 },
  { series: "gdpGrowth", year: 2024 },
  { series: "lifeExpectancy", year: 2024 },
  { series: "unemployment", year: 2024 },
  { series: "inflation", year: 2024 },
  { series: "poverty", year: 2024 },
];

// Provinces by GRP per capita, 2024 (BPS). grp is thousand rupiah per person.
// usd is the nominal US$ figure BPS publishes alongside it.
export const PROVINCES = [
  { name: "DKI Jakarta", island: "Jawa", grp: 367687, usd: 22317 },
  { name: "Kalimantan Timur", island: "Kalimantan", grp: 208331, usd: 12647 },
  { name: "Kalimantan Utara", island: "Kalimantan", grp: 208210, usd: 12643 },
  { name: "Riau", island: "Sumatra", grp: 176385, usd: 10716 },
  { name: "Kepulauan Riau", island: "Sumatra", grp: 172459, usd: 10469 },
  { name: "Papua Barat", island: "Papua", grp: 139213, usd: 8459 },
  { name: "Sulawesi Tengah", island: "Sulawesi", grp: 131643, usd: 7990 },
  { name: "Papua Tengah", island: "Papua", grp: 107566, usd: 6530 },
  { name: "Maluku Utara", island: "Maluku", grp: 97262, usd: 5907 },
  { name: "Jambi", island: "Sumatra", grp: 92786, usd: 5632 },
  { name: "Kalimantan Tengah", island: "Kalimantan", grp: 84730, usd: 5143 },
  { name: "Papua", island: "Papua", grp: 84305, usd: 5120 },
  { name: "Jawa Timur", island: "Jawa", grp: 80856, usd: 4907 },
  { name: "Sumatera Selatan", island: "Sumatra", grp: 80663, usd: 4896 },
  { name: "Sulawesi Selatan", island: "Sulawesi", grp: 78748, usd: 4779 },
  { name: "Sumatera Utara", island: "Sumatra", grp: 78310, usd: 4753 },
  { name: "Kep. Bangka Belitung", island: "Sumatra", grp: 75323, usd: 4574 },
  { name: "Sulawesi Utara", island: "Sulawesi", grp: 75235, usd: 4567 },
  { name: "Banten", island: "Jawa", grp: 74673, usd: 4532 },
  { name: "Bali", island: "Bali & Nusa Tenggara", grp: 72658, usd: 4410 },
  { name: "Sulawesi Tenggara", island: "Sulawesi", grp: 72031, usd: 4375 },
  { name: "Kalimantan Selatan", island: "Kalimantan", grp: 70577, usd: 4284 },
  { name: "Papua Selatan", island: "Papua", grp: 64928, usd: 3945 },
  { name: "Papua Barat Daya", island: "Papua", grp: 61624, usd: 3743 },
  { name: "Jawa Barat", island: "Jawa", grp: 59865, usd: 3633 },
  { name: "Sumatera Barat", island: "Sumatra", grp: 59549, usd: 3614 },
  { name: "Kalimantan Barat", island: "Kalimantan", grp: 56984, usd: 3458 },
  { name: "DI Yogyakarta", island: "Jawa", grp: 55039, usd: 3341 },
  { name: "Lampung", island: "Sumatra", grp: 55009, usd: 3339 },
  { name: "Bengkulu", island: "Sumatra", grp: 52305, usd: 3174 },
  { name: "Jawa Tengah", island: "Jawa", grp: 50824, usd: 3084 },
  { name: "Gorontalo", island: "Sulawesi", grp: 47477, usd: 2882 },
  { name: "Sulawesi Barat", island: "Sulawesi", grp: 46654, usd: 2832 },
  { name: "Aceh", island: "Sumatra", grp: 45770, usd: 2778 },
  { name: "Nusa Tenggara Barat", island: "Bali & Nusa Tenggara", grp: 33667, usd: 2043 },
  { name: "Maluku", island: "Maluku", grp: 33652, usd: 2043 },
  { name: "Nusa Tenggara Timur", island: "Bali & Nusa Tenggara", grp: 25837, usd: 1568 },
  { name: "Papua Pegunungan", island: "Papua", grp: 19111, usd: 1161 },
];

export const NATIONAL_GRP = { grp: 78617, usd: 4956, year: 2024 };

export const ISLANDS = [
  "Semua", "Jawa", "Sumatra", "Kalimantan", "Sulawesi",
  "Maluku", "Papua", "Bali & Nusa Tenggara",
];

export function latest(seriesId) {
  const s = SERIES[seriesId];
  return s.values[s.values.length - 1];
}

export function changeSince(seriesId, fromYear) {
  const s = SERIES[seriesId];
  const a = s.values.find((v) => v.year === fromYear);
  const b = latest(seriesId);
  if (!a || !b) return null;
  return { from: a.value, to: b.value, delta: b.value - a.value };
}
