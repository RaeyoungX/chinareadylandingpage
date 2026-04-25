"use client";

import { useState, useCallback } from "react";
import { trackEvent } from "@/lib/analytics";

// ── Data ──────────────────────────────────────────────────────────────────────

const LAST_VERIFIED = "April 2026";

const ALL_COUNTRIES = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Chad","Chile","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Guatemala","Guinea","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","San Marino","Saudi Arabia","Senegal","Serbia","Sierra Leone","Singapore","Slovakia","Slovenia","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

const ELIGIBLE_240 = ["Albania","Argentina","Australia","Austria","Belarus","Belgium","Bosnia and Herzegovina","Brazil","Brunei","Bulgaria","Canada","Chile","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland","Indonesia","Ireland","Italy","Japan","Latvia","Lithuania","Luxembourg","Malta","Mexico","Monaco","Montenegro","Netherlands","New Zealand","North Macedonia","Norway","Poland","Portugal","Qatar","Romania","Russia","Serbia","Singapore","Slovakia","Slovenia","South Korea","Spain","Sweden","Switzerland","Ukraine","United Arab Emirates","United Kingdom","United States"];

const VISA_FREE_30 = new Set(["Albania","Andorra","Argentina","Australia","Austria","Belgium","Bosnia and Herzegovina","Brazil","Brunei","Bulgaria","Canada","Chile","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland","Ireland","Italy","Japan","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Monaco","Montenegro","Netherlands","New Zealand","North Macedonia","Norway","Oman","Peru","Poland","Portugal","Romania","San Marino","Serbia","Slovakia","Slovenia","South Korea","Spain","Sweden","Switzerland","United Arab Emirates","United Kingdom","Uruguay"]);

const RESTRICTED = new Set(["Tibet","Xinjiang","Inner Mongolia","Ningxia","Qinghai","Gansu","Jilin"]);

const PORTS = [
  {city:"Beijing (PEK / PKX)",province:"Beijing"},{city:"Tianjin (TSN)",province:"Tianjin"},
  {city:"Shijiazhuang (SJW)",province:"Hebei"},{city:"Qinhuangdao (BPE)",province:"Hebei"},
  {city:"Shanghai (PVG / SHA)",province:"Shanghai"},{city:"Nanjing (NKG)",province:"Jiangsu"},
  {city:"Suzhou",province:"Jiangsu"},{city:"Wuxi (WUX)",province:"Jiangsu"},
  {city:"Yangzhou-Taizhou (YTY)",province:"Jiangsu"},{city:"Lianyungang",province:"Jiangsu"},
  {city:"Hangzhou (HGH)",province:"Zhejiang"},{city:"Ningbo (NGB)",province:"Zhejiang"},
  {city:"Wenzhou (WNZ)",province:"Zhejiang"},{city:"Yiwu (YIW)",province:"Zhejiang"},
  {city:"Zhoushan (HSN)",province:"Zhejiang"},{city:"Guangzhou (CAN)",province:"Guangdong"},
  {city:"Shenzhen (SZX)",province:"Guangdong"},{city:"Zhuhai",province:"Guangdong"},
  {city:"Jieyang / Shantou (SWA)",province:"Guangdong"},{city:"HK West Kowloon Rail",province:"Guangdong"},
  {city:"HK-Zhuhai-Macao Bridge",province:"Guangdong"},{city:"Chengdu (CTU / TFU)",province:"Sichuan"},
  {city:"Chongqing (CKG)",province:"Chongqing"},{city:"Xi'an (XIY)",province:"Shaanxi"},
  {city:"Kunming (KMG)",province:"Yunnan"},{city:"Lijiang (LJG)",province:"Yunnan"},
  {city:"Xishuangbanna (JHG)",province:"Yunnan"},{city:"Mohan Railway (Yunnan)",province:"Yunnan"},
  {city:"Xiamen (XMN)",province:"Fujian"},{city:"Fuzhou (FOC)",province:"Fujian"},
  {city:"Quanzhou (JJN)",province:"Fujian"},{city:"Wuyishan (WUS)",province:"Fujian"},
  {city:"Qingdao (TAO)",province:"Shandong"},{city:"Jinan (TNA)",province:"Shandong"},
  {city:"Yantai (YNT)",province:"Shandong"},{city:"Weihai (WEH)",province:"Shandong"},
  {city:"Dalian (DLC)",province:"Liaoning"},{city:"Shenyang (SHE)",province:"Liaoning"},
  {city:"Harbin (HRB)",province:"Heilongjiang"},{city:"Wuhan (WUH)",province:"Hubei"},
  {city:"Changsha (CSX)",province:"Hunan"},{city:"Zhangjiajie (DYG)",province:"Hunan"},
  {city:"Zhengzhou (CGO)",province:"Henan"},{city:"Hefei (HFE)",province:"Anhui"},
  {city:"Huangshan (TXN)",province:"Anhui"},{city:"Nanchang (KHN)",province:"Jiangxi"},
  {city:"Jingdezhen (JDZ)",province:"Jiangxi"},{city:"Nanning (NNG)",province:"Guangxi"},
  {city:"Guilin (KWL)",province:"Guangxi"},{city:"Beihai (BHY)",province:"Guangxi"},
  {city:"Guiyang (KWE)",province:"Guizhou"},{city:"Haikou (HAK)",province:"Hainan"},
  {city:"Sanya (SYX)",province:"Hainan"},{city:"Taiyuan (TYN)",province:"Shanxi (Taiyuan/Datong only)"},
  {city:"Datong",province:"Shanxi (Taiyuan/Datong only)"},{city:"Lhasa (LXA)",province:"Tibet"},
  {city:"Urumqi (URC)",province:"Xinjiang"},{city:"Hohhot (HET)",province:"Inner Mongolia"},
  {city:"Yinchuan (INC)",province:"Ningxia"},{city:"Xining (XNN)",province:"Qinghai"},
  {city:"Lanzhou (LHW)",province:"Gansu"},{city:"Changchun (CGQ)",province:"Jilin"},
  {city:"Other / I'll specify",province:"__other__"},
];

const SAME_REGION: Record<string, string[]> = {
  "united states":["united states","usa","u.s.","u.s.a.","america","us","united states of america"],
  "united kingdom":["united kingdom","uk","britain","england","scotland","wales","great britain","u.k."],
  "hong kong":["hong kong","hk","hkg","hong kong sar"],
  "macau":["macau","macao","macao sar","macau sar"],
  "taiwan":["taiwan","taipei","tpe","chinese taipei","roc","republic of china"],
  "china":["china","prc","mainland china","mainland","people's republic of china"],
  "south korea":["south korea","korea","republic of korea","rok","s. korea","s korea"],
  "japan":["japan","jp","nippon","nihon"],
  "uae":["uae","united arab emirates","dubai","abu dhabi","u.a.e."],
  "czech republic":["czech republic","czechia","czech"],
  "russia":["russia","russian federation","rf"],
  "germany":["germany","deutschland","de"],
  "netherlands":["netherlands","holland","the netherlands","nl"],
  "north macedonia":["north macedonia","macedonia","fyrom"],
  "bosnia and herzegovina":["bosnia and herzegovina","bosnia","bih","bosnia herzegovina"],
  "ireland":["ireland","republic of ireland","eire"],
  "new zealand":["new zealand","nz","aotearoa"],
  "australia":["australia","au","oz"],
  "canada":["canada","ca"],
  "brazil":["brazil","br","brasil"],
  "argentina":["argentina","ar"],
  "singapore":["singapore","sg"],
};

// ── Logic helpers ─────────────────────────────────────────────────────────────

function norm(s: string) { return (s || "").trim().toLowerCase().replace(/\s+/g, " "); }

function sameRegion(a: string, b: string) {
  a = norm(a); b = norm(b);
  if (!a || !b) return false;
  if (a === b) return true;
  for (const k in SAME_REGION) {
    const list = SAME_REGION[k];
    if (list.includes(a) && list.includes(b)) return true;
  }
  return false;
}

function isRestricted(province: string) {
  for (const r of RESTRICTED) { if (province.startsWith(r)) return true; }
  return false;
}

// ── Types ─────────────────────────────────────────────────────────────────────

type StopRegion = "china" | "hk" | "macau" | "taiwan" | "other";

interface Stop {
  id: string;
  region: StopRegion;
  cityIdx: number;
  country: string;
  immigration: boolean;
  nights: number;
}

interface Check { status: "pass" | "fail" | "warn"; label: string; note: string; }
interface EntryResult { pass: boolean; checks: Check[]; }
interface Entry {
  cities: string[]; provinces: string[]; entryPort: string; exitPort: string;
  totalNights: number;
  from: { key: string; label: string } | null;
  to: { key: string; label: string } | null;
}

let _id = 0;
function uid() { return String(++_id); }

function stopLabel(s: Stop): { label: string; key: string; province: string | null } {
  if (s.region === "china") {
    const p = PORTS[s.cityIdx]; return { label: p.city, key: "china", province: p.province };
  }
  if (s.region === "hk") return { label: "Hong Kong", key: "hong kong", province: null };
  if (s.region === "macau") return { label: "Macau", key: "macau", province: null };
  if (s.region === "taiwan") return { label: "Taiwan", key: "taiwan", province: null };
  const t = s.country.trim() || "(unspecified)";
  return { label: t, key: norm(t), province: null };
}

function findEntries(stops: Stop[]): Entry[] {
  const entries: Entry[] = [];
  let i = 0;
  while (i < stops.length) {
    if (stops[i].region === "china" && stops[i].immigration) {
      const start = i;
      while (i < stops.length && stops[i].region === "china" && stops[i].immigration) i++;
      const end = i - 1;
      const slice = stops.slice(start, end + 1);
      entries.push({
        cities: slice.map(s => stopLabel(s).label),
        provinces: slice.map(s => stopLabel(s).province ?? ""),
        entryPort: stopLabel(stops[start]).label,
        exitPort: stopLabel(stops[end]).label,
        totalNights: slice.reduce((a, s) => a + s.nights, 0),
        from: start > 0 ? { key: stopLabel(stops[start - 1]).key, label: stopLabel(stops[start - 1]).label } : null,
        to: end < stops.length - 1 ? { key: stopLabel(stops[end + 1]).key, label: stopLabel(stops[end + 1]).label } : null,
      });
    } else { i++; }
  }
  return entries;
}

function validateEntry(entry: Entry): EntryResult {
  const checks: Check[] = [];
  let pass = true;

  if (!entry.from || !entry.to) {
    const which = !entry.from ? "before China (origin)" : "after China (destination)";
    checks.push({ status: "fail", label: "Transit framing", note: `No stop ${which}. China cannot be the start or end of your trip — 240-hour transit needs a real third region on both sides.` });
    pass = false;
  } else if (sameRegion(entry.from.key, entry.to.key)) {
    checks.push({ status: "fail", label: "Third-region rule", note: `${entry.from.label} → China → ${entry.to.label}: same region. The places you fly from and to must differ. HK, Macau and Taiwan each count as their own region. Note: airside connections still count — even if you don't clear immigration, the airport's country counts as your "from" or "to".` });
    pass = false;
  } else {
    checks.push({ status: "pass", label: "Third-region rule", note: `${entry.from.label} → China → ${entry.to.label}` });
  }

  if (entry.totalNights > 10) {
    checks.push({ status: "fail", label: "10-day limit", note: `${entry.totalNights} nights exceeds the 240-hour cap.` });
    pass = false;
  } else {
    checks.push({ status: "pass", label: "10-day limit", note: `${entry.totalNights} nights within the 240-hour cap. The clock starts at 00:00 the day after arrival.` });
  }

  const restrictedStops: { city: string; province: string }[] = [];
  const otherStops: string[] = [];
  entry.provinces.forEach((p, idx) => {
    if (p === "__other__") otherStops.push(entry.cities[idx]);
    else if (isRestricted(p)) restrictedStops.push({ city: entry.cities[idx], province: p });
  });

  if (restrictedStops.length > 0) {
    const list = restrictedStops.map(r => `${r.city} (${r.province})`).join(", ");
    checks.push({ status: "fail", label: "Restricted region", note: `${list} ${restrictedStops.length === 1 ? "is" : "are"} not covered by 240-hour transit. Tibet, Xinjiang, Inner Mongolia, Ningxia, Qinghai, Gansu, and Jilin require a tourism visa. Tibet additionally requires a Tibet Travel Permit through an authorized agency.` });
    pass = false;
  } else if (otherStops.length > 0) {
    checks.push({ status: "warn", label: "Designated port", note: `${otherStops.join(", ")}: not on this checker's confirmed port list. Only specific cities within eligible provinces qualify. Verify with the National Immigration Administration before booking.` });
    pass = false;
  } else {
    const portInfo = entry.entryPort === entry.exitPort
      ? `Enter and exit via ${entry.entryPort}.`
      : `Enter via ${entry.entryPort}, exit via ${entry.exitPort}. Cross-province travel between any of the 24 eligible regions is allowed under the 2024 policy update.`;
    checks.push({ status: "pass", label: "Designated port and area", note: portInfo });
  }

  return { pass, checks };
}

// ── Examples ──────────────────────────────────────────────────────────────────

function findIdx(name: string) { return PORTS.findIndex(p => p.city.startsWith(name)); }

const EXAMPLES: Record<string, { nat: string; stops: Partial<Stop>[] }> = {
  single: { nat: "United States", stops: [
    { region: "other", country: "United States" },
    { region: "china", cityIdx: findIdx("Shanghai"), nights: 3 },
    { region: "china", cityIdx: findIdx("Chengdu"), nights: 3 },
    { region: "china", cityIdx: findIdx("Beijing"), nights: 3 },
    { region: "hk" },
    { region: "other", country: "United States" },
  ]},
  multi: { nat: "United Kingdom", stops: [
    { region: "other", country: "United Kingdom" },
    { region: "china", cityIdx: findIdx("Beijing"), nights: 3 },
    { region: "other", country: "South Korea", nights: 2 },
    { region: "china", cityIdx: findIdx("Shanghai"), nights: 4 },
    { region: "hk" },
    { region: "other", country: "United Kingdom" },
  ]},
  airside: { nat: "United States", stops: [
    { region: "hk" },
    { region: "china", cityIdx: findIdx("Guangzhou"), nights: 5 },
    { region: "hk", immigration: false },
    { region: "other", country: "Canada" },
  ]},
  tibet: { nat: "United States", stops: [
    { region: "other", country: "United States" },
    { region: "china", cityIdx: findIdx("Beijing"), nights: 3 },
    { region: "china", cityIdx: findIdx("Lhasa"), nights: 4 },
    { region: "other", country: "Nepal" },
    { region: "other", country: "United States" },
  ]},
};

function makeStops(data: Partial<Stop>[]): Stop[] {
  return data.map(d => ({
    id: uid(),
    region: d.region ?? "other",
    cityIdx: d.cityIdx ?? 0,
    country: d.country ?? "",
    immigration: d.immigration !== false,
    nights: d.nights ?? 0,
  }));
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Pill({ status }: { status: "pass" | "fail" | "warn" }) {
  const styles = {
    pass: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    fail: "bg-red-50 text-red-600 ring-1 ring-red-100",
    warn: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  };
  const labels = { pass: "Pass", fail: "Fail", warn: "Check" };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0 ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function StopCard({
  stop, index, total, isLast,
  onChange, onRemove,
}: {
  stop: Stop; index: number; total: number; isLast: boolean;
  onChange: (s: Stop) => void;
  onRemove: () => void;
}) {
  const selectClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition appearance-none";

  const dotColor = stop.region === "china"
    ? "bg-sky-500 ring-sky-100"
    : stop.region === "hk" || stop.region === "macau" || stop.region === "taiwan"
    ? "bg-violet-400 ring-violet-100"
    : "bg-slate-300 ring-slate-100";

  const groupedPorts = (() => {
    const groups: Record<string, typeof PORTS> = {};
    PORTS.forEach(p => { if (!groups[p.province]) groups[p.province] = []; groups[p.province].push(p); });
    return groups;
  })();

  return (
    <div className="flex gap-4">
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div className={`mt-3 h-3 w-3 rounded-full ring-4 shrink-0 ${dotColor}`} />
        {!isLast && <div className="mt-1 w-px flex-1 bg-slate-200" />}
      </div>

      {/* Card */}
      <div className={`flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] mb-3`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stop {index + 1}</span>
          {total > 2 && (
            <button onClick={onRemove} className="text-xs text-slate-400 hover:text-red-400 transition-colors">
              Remove
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Location type</label>
            <select
              className={selectClass}
              value={stop.region}
              onChange={e => onChange({ ...stop, region: e.target.value as StopRegion })}
            >
              <option value="other">Other country</option>
              <option value="china">Mainland China</option>
              <option value="hk">Hong Kong</option>
              <option value="macau">Macau</option>
              <option value="taiwan">Taiwan</option>
            </select>
          </div>

          {stop.region === "china" ? (
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">City / port</label>
              <select
                className={selectClass}
                value={stop.cityIdx}
                onChange={e => onChange({ ...stop, cityIdx: Number(e.target.value) })}
              >
                {Object.entries(groupedPorts).map(([province, ports]) => (
                  <optgroup key={province} label={isRestricted(province) ? `${province} — restricted` : province}>
                    {ports.map(p => {
                      const idx = PORTS.indexOf(p);
                      return <option key={idx} value={idx}>{p.city}</option>;
                    })}
                  </optgroup>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Country</label>
              {stop.region === "other" ? (
                <select
                  className={selectClass}
                  value={stop.country}
                  onChange={e => onChange({ ...stop, country: e.target.value })}
                >
                  <option value="">Select country...</option>
                  {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : (
                <div className={`${selectClass} bg-slate-50 text-slate-400 cursor-default`}>
                  {stop.region === "hk" ? "Hong Kong" : stop.region === "macau" ? "Macau" : "Taiwan"}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-slate-50">
          <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={stop.immigration}
              onChange={e => onChange({ ...stop, immigration: e.target.checked })}
              className="w-3.5 h-3.5 accent-slate-900"
            />
            Clear immigration
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-500 ml-auto">
            Nights:
            <input
              type="number"
              min={0} max={30} step={1}
              value={stop.nights}
              onChange={e => onChange({ ...stop, nights: Math.max(0, Number(e.target.value)) })}
              className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-center text-slate-900 focus:outline-none focus:border-slate-400 transition"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TransitChecker() {
  const [nationality, setNationality] = useState("");
  const [stops, setStops] = useState<Stop[]>(() => makeStops([
    { region: "other", country: "United States", nights: 0 },
    { region: "china", cityIdx: findIdx("Shanghai"), nights: 6 },
    { region: "hk", nights: 0 },
  ]));
  const [result, setResult] = useState<React.ReactNode>(null);

  const updateStop = useCallback((id: string, updated: Stop) => {
    setStops(prev => prev.map(s => s.id === id ? updated : s));
  }, []);

  const removeStop = useCallback((id: string) => {
    setStops(prev => prev.filter(s => s.id !== id));
  }, []);

  const addStop = () => setStops(prev => [...prev, { id: uid(), region: "other", cityIdx: 0, country: "", immigration: true, nights: 0 }]);

  const loadExample = (key: string) => {
    const ex = EXAMPLES[key];
    setNationality(ex.nat);
    setStops(makeStops(ex.stops));
    setResult(null);
  };

  const runCheck = () => {
    if (!nationality) {
      setResult(<p className="text-sm text-slate-400">Please select your nationality first.</p>);
      return;
    }
    trackEvent("transit_check", { nationality, stop_count: stops.length });

    const disclaimer = (
      <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 mb-5 text-xs text-amber-800 leading-relaxed">
        <strong className="font-semibold">Planning aid only — not legal advice.</strong> Policy reflected: {LAST_VERIFIED}. China&apos;s immigration rules change frequently. Verify against{" "}
        <a href="https://en.nia.gov.cn" target="_blank" rel="noopener noreferrer" className="underline">en.nia.gov.cn</a>{" "}
        within 7 days of your trip and confirm with your airline. Border officers retain final discretion.
      </div>
    );

    if (nationality === "__other") {
      setResult(<>
        {disclaimer}
        <div className="rounded-xl bg-red-50 border border-red-100 p-5">
          <p className="text-xs font-semibold text-red-600 mb-1">Verdict</p>
          <p className="text-lg font-semibold text-red-700">Not eligible — nationality</p>
          <p className="text-sm text-red-600 mt-1.5">Your country is not on the 55-country list. You&apos;ll need a tourism visa (L visa) regardless of routing.</p>
        </div>
      </>);
      return;
    }

    const entries = findEntries(stops);

    if (entries.length === 0) {
      const hasChinaStop = stops.some(s => s.region === "china");
      setResult(<>
        {disclaimer}
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-5 text-sm text-slate-600">
          {hasChinaStop
            ? "Your itinerary includes mainland China stops, but none are marked as immigration entries. If those are airside transits, no visa policy is needed."
            : "No mainland China entries detected. Add a Mainland China stop to validate."}
        </div>
      </>);
      return;
    }

    const results = entries.map(validateEntry);
    const allPass = results.every(r => r.pass);
    trackEvent("transit_result", { verdict: allPass ? "pass" : "fail", nationality, entry_count: entries.length });

    const verdictEl = (
      <div className={`rounded-xl p-5 mb-5 ${allPass ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"}`}>
        <p className={`text-xs font-semibold mb-1 ${allPass ? "text-emerald-600" : "text-red-600"}`}>Overall verdict</p>
        <p className={`text-lg font-semibold ${allPass ? "text-emerald-700" : "text-red-700"}`}>
          {allPass
            ? `Eligible — ${entries.length} China entr${entries.length === 1 ? "y" : "ies"} validated`
            : "Not eligible as configured"}
        </p>
      </div>
    );

    const entryEls = entries.map((entry, i) => {
      const r = results[i];
      const cityList = entry.cities.length > 1 ? entry.cities.join(" → ") : entry.cities[0];
      return (
        <div key={i} className="rounded-xl border border-slate-100 overflow-hidden mb-3">
          <div className={`flex items-center justify-between px-4 py-3 ${r.pass ? "bg-emerald-50" : "bg-red-50/60"}`}>
            <p className={`text-xs font-semibold ${r.pass ? "text-emerald-700" : "text-red-600"}`}>
              China entry {i + 1} · {cityList}
            </p>
            <Pill status={r.pass ? "pass" : "fail"} />
          </div>
          <div className="p-4 flex flex-col gap-3 divide-y divide-slate-50">
            {r.checks.map((c, j) => (
              <div key={j} className={`flex gap-3 items-start ${j > 0 ? "pt-3" : ""}`}>
                <Pill status={c.status} />
                <div>
                  <p className="text-sm font-medium text-slate-800 mb-0.5">{c.label}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });

    let recommendation = "";
    if (allPass && VISA_FREE_30.has(nationality)) {
      recommendation = `As a ${nationality} citizen you also qualify for the simpler 30-day visa-free policy — no onward third-region ticket needed, allows multiple entries, up to 30 days. Unless you specifically need transit framing, it's the better choice.`;
    } else if (allPass) {
      recommendation = "All China entries pass. For each: print your onward ticket (confirmed date and seat), bring a passport with 6+ months validity, and use the dedicated 240-hour transit lane at the border.";
    } else if (VISA_FREE_30.has(nationality)) {
      const hasRestricted = results.some(r => r.checks.some(c => c.label === "Restricted region" && c.status === "fail"));
      recommendation = hasRestricted
        ? `${nationality} citizens qualify for 30-day visa-free entry, but that policy also doesn't cover Tibet, Xinjiang, etc. without additional permits. For Tibet you specifically need a Tibet Travel Permit through an authorized agency.`
        : `Even though 240-hour transit doesn't fit your current routing, ${nationality} citizens qualify for 30-day visa-free entry — that likely solves the problem entirely.`;
    } else {
      recommendation = "Apply for a regular tourism visa (L visa) at a Chinese consulate before traveling. You can also restructure the failing entries (add a real third region or remove restricted-area stops) and re-check.";
    }

    const extraNote = allPass
      ? "Reminder: if you're staying anywhere other than a hotel (Airbnb, friend's home, etc.), you or your host must register at the local police station within 24 hours of arrival. Hotels handle this automatically."
      : null;

    const recommendationEl = (
      <div className="rounded-xl bg-slate-50 border border-slate-100 p-5">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Recommendation</p>
        <p className="text-sm text-slate-700 leading-relaxed">{recommendation}</p>
        {extraNote && <p className="text-xs text-slate-500 leading-relaxed mt-3">{extraNote}</p>}
      </div>
    );

    setResult(<>{disclaimer}{verdictEl}{entryEls}{recommendationEl}</>);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">

      {/* Nationality card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)] mb-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Passport nationality
        </label>
        <select
          value={nationality}
          onChange={e => setNationality(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition appearance-none"
        >
          <option value="">Select your country...</option>
          {ELIGIBLE_240.map(c => <option key={c} value={c}>{c}</option>)}
          <option value="__other">Other (not on the 55-country list)</option>
        </select>
      </div>

      {/* Examples */}
      <div className="mb-6">
        <p className="text-xs text-slate-400 mb-2">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "single", label: "US · 3 cities" },
            { key: "multi", label: "UK · 2 entries via Seoul" },
            { key: "airside", label: "HK airside trap" },
            { key: "tibet", label: "Beijing + Lhasa" },
          ].map(ex => (
            <button
              key={ex.key}
              onClick={() => loadExample(ex.key)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 hover:border-slate-300 hover:text-slate-800 transition"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)] mb-4">
        <div className="flex items-center justify-between mb-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Itinerary</label>
          <button
            onClick={addStop}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 hover:border-slate-300 hover:text-slate-800 transition"
          >
            + Add stop
          </button>
        </div>

        <div className="rounded-xl bg-sky-50 border border-sky-100 px-4 py-3 mb-4">
          <p className="text-xs text-sky-700 leading-relaxed">
            <strong className="font-semibold">Include every stop</strong>, even airside connections where you don&apos;t clear immigration — the airport country still counts as your departure or arrival point.
          </p>
        </div>

        <div>
          {stops.map((stop, i) => (
            <StopCard
              key={stop.id}
              stop={stop}
              index={i}
              total={stops.length}
              isLast={i === stops.length - 1}
              onChange={updated => updateStop(stop.id, updated)}
              onRemove={() => removeStop(stop.id)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={runCheck}
        className="w-full rounded-2xl bg-slate-950 text-white py-3.5 text-sm font-semibold hover:bg-slate-800 transition active:scale-[0.99] shadow-[0_4px_14px_rgba(15,23,42,0.18)]"
      >
        Check trip →
      </button>

      {/* Results */}
      {result && (
        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
          {result}
        </div>
      )}
    </div>
  );
}
