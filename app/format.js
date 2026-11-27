// Number formatting for NusaStat. Plain functions, no dependencies.
// Indonesian grouping (dot thousands, comma decimals) is done by hand so the
// site never depends on a runtime locale table.

export function groupThousands(n) {
  const s = String(Math.trunc(Math.abs(n)));
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += ".";
    out += s[i];
  }
  return (n < 0 ? "-" : "") + out;
}

export function decimals(n, places) {
  const fixed = Math.abs(n).toFixed(places);
  const parts = fixed.split(".");
  if (places === 0) return (n < 0 ? "-" : "") + groupThousands(Number(parts[0]));
  return (n < 0 ? "-" : "") + groupThousands(Number(parts[0])) + "," + parts[1];
}

export function formatValue(series, value) {
  switch (series.format) {
    case "people":
      return groupThousands(value) + " jiwa";
    case "usdB": {
      const b = value / 1e9;
      return "US$ " + decimals(b, 1).replace(",0", "") + " miliar";
    }
    case "usd":
      return "US$ " + decimals(value, 0);
    case "pct":
      return decimals(value, 2).replace(/,00$/, "") + "%";
    case "years":
      return decimals(value, 2).replace(/,00$/, "") + " tahun";
    case "per1000":
      return decimals(value, 1) + " per 1.000";
    default:
      return String(value);
  }
}

export function formatCompact(series, value) {
  switch (series.format) {
    case "people": {
      const m = value / 1e6;
      return decimals(m, 1) + " jt";
    }
    case "usdB":
      return "US$ " + decimals(value / 1e9, 0) + " M";
    case "usd":
      return "US$ " + groupThousands(value);
    case "pct":
      return decimals(value, 1) + "%";
    case "years":
      return decimals(value, 1) + " th";
    case "per1000":
      return decimals(value, 1);
    default:
      return String(value);
  }
}

export function formatRupiahThousand(v) {
  return "Rp " + groupThousands(v) + " ribu";
}

export function deltaText(from, to, format) {
  const d = to - from;
  const sign = d > 0 ? "+" : d < 0 ? "−" : "";
  const abs = Math.abs(d);
  if (format === "pct" || format === "years" || format === "per1000") {
    return sign + decimals(abs, 2).replace(/,00$/, "") + " poin";
  }
  if (format === "people") return sign + groupThousands(abs) + " jiwa";
  if (format === "usdB") return sign + "US$ " + decimals(abs / 1e9, 1) + " miliar";
  if (format === "usd") return sign + "US$ " + groupThousands(abs);
  return sign + String(abs);
}

export function pctChange(from, to) {
  if (!from) return null;
  return ((to - from) / Math.abs(from)) * 100;
}
