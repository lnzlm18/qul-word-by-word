import { useState, useEffect } from "react";

const SURAHS = [
  {number:1,name:"Al-Fatihah",ar:"الفاتحة",ayahs:7},{number:2,name:"Al-Baqarah",ar:"البقرة",ayahs:286},{number:3,name:"Ali 'Imran",ar:"آل عمران",ayahs:200},{number:4,name:"An-Nisa",ar:"النساء",ayahs:176},{number:5,name:"Al-Ma'idah",ar:"المائدة",ayahs:120},{number:6,name:"Al-An'am",ar:"الأنعام",ayahs:165},{number:7,name:"Al-A'raf",ar:"الأعراف",ayahs:206},{number:8,name:"Al-Anfal",ar:"الأنفال",ayahs:75},{number:9,name:"At-Tawbah",ar:"التوبة",ayahs:129},{number:10,name:"Yunus",ar:"يونس",ayahs:109},{number:11,name:"Hud",ar:"هود",ayahs:123},{number:12,name:"Yusuf",ar:"يوسف",ayahs:111},{number:13,name:"Ar-Ra'd",ar:"الرعد",ayahs:43},{number:14,name:"Ibrahim",ar:"إبراهيم",ayahs:52},{number:15,name:"Al-Hijr",ar:"الحجر",ayahs:99},{number:16,name:"An-Nahl",ar:"النحل",ayahs:128},{number:17,name:"Al-Isra",ar:"الإسراء",ayahs:111},{number:18,name:"Al-Kahf",ar:"الكهف",ayahs:110},{number:19,name:"Maryam",ar:"مريم",ayahs:98},{number:20,name:"Ta-Ha",ar:"طه",ayahs:135},{number:21,name:"Al-Anbiya",ar:"الأنبياء",ayahs:112},{number:22,name:"Al-Hajj",ar:"الحج",ayahs:78},{number:23,name:"Al-Mu'minun",ar:"المؤمنون",ayahs:118},{number:24,name:"An-Nur",ar:"النور",ayahs:64},{number:25,name:"Al-Furqan",ar:"الفرقان",ayahs:77},{number:26,name:"Ash-Shu'ara",ar:"الشعراء",ayahs:227},{number:27,name:"An-Naml",ar:"النمل",ayahs:93},{number:28,name:"Al-Qasas",ar:"القصص",ayahs:88},{number:29,name:"Al-Ankabut",ar:"العنكبوت",ayahs:69},{number:30,name:"Ar-Rum",ar:"الروم",ayahs:60},{number:31,name:"Luqman",ar:"لقمان",ayahs:34},{number:32,name:"As-Sajdah",ar:"السجدة",ayahs:30},{number:33,name:"Al-Ahzab",ar:"الأحزاب",ayahs:73},{number:34,name:"Saba",ar:"سبأ",ayahs:54},{number:35,name:"Fatir",ar:"فاطر",ayahs:45},{number:36,name:"Ya-Sin",ar:"يس",ayahs:83},{number:37,name:"As-Saffat",ar:"الصافات",ayahs:182},{number:38,name:"Sad",ar:"ص",ayahs:88},{number:39,name:"Az-Zumar",ar:"الزمر",ayahs:75},{number:40,name:"Ghafir",ar:"غافر",ayahs:85},{number:41,name:"Fussilat",ar:"فصلت",ayahs:54},{number:42,name:"Ash-Shura",ar:"الشورى",ayahs:53},{number:43,name:"Az-Zukhruf",ar:"الزخرف",ayahs:89},{number:44,name:"Ad-Dukhan",ar:"الدخان",ayahs:59},{number:45,name:"Al-Jathiyah",ar:"الجاثية",ayahs:37},{number:46,name:"Al-Ahqaf",ar:"الأحقاف",ayahs:35},{number:47,name:"Muhammad",ar:"محمد",ayahs:38},{number:48,name:"Al-Fath",ar:"الفتح",ayahs:29},{number:49,name:"Al-Hujurat",ar:"الحجرات",ayahs:18},{number:50,name:"Qaf",ar:"ق",ayahs:45},{number:51,name:"Adh-Dhariyat",ar:"الذاريات",ayahs:60},{number:52,name:"At-Tur",ar:"الطور",ayahs:49},{number:53,name:"An-Najm",ar:"النجم",ayahs:62},{number:54,name:"Al-Qamar",ar:"القمر",ayahs:55},{number:55,name:"Ar-Rahman",ar:"الرحمن",ayahs:78},{number:56,name:"Al-Waqi'ah",ar:"الواقعة",ayahs:96},{number:57,name:"Al-Hadid",ar:"الحديد",ayahs:29},{number:58,name:"Al-Mujadila",ar:"المجادلة",ayahs:22},{number:59,name:"Al-Hashr",ar:"الحشر",ayahs:24},{number:60,name:"Al-Mumtahanah",ar:"الممتحنة",ayahs:13},{number:61,name:"As-Saf",ar:"الصف",ayahs:14},{number:62,name:"Al-Jumu'ah",ar:"الجمعة",ayahs:11},{number:63,name:"Al-Munafiqun",ar:"المنافقون",ayahs:11},{number:64,name:"At-Taghabun",ar:"التغابن",ayahs:18},{number:65,name:"At-Talaq",ar:"الطلاق",ayahs:12},{number:66,name:"At-Tahrim",ar:"التحريم",ayahs:12},{number:67,name:"Al-Mulk",ar:"الملك",ayahs:30},{number:68,name:"Al-Qalam",ar:"القلم",ayahs:52},{number:69,name:"Al-Haqqah",ar:"الحاقة",ayahs:52},{number:70,name:"Al-Ma'arij",ar:"المعارج",ayahs:44},{number:71,name:"Nuh",ar:"نوح",ayahs:28},{number:72,name:"Al-Jinn",ar:"الجن",ayahs:28},{number:73,name:"Al-Muzzammil",ar:"المزمل",ayahs:20},{number:74,name:"Al-Muddaththir",ar:"المدثر",ayahs:56},{number:75,name:"Al-Qiyamah",ar:"القيامة",ayahs:40},{number:76,name:"Al-Insan",ar:"الإنسان",ayahs:31},{number:77,name:"Al-Mursalat",ar:"المرسلات",ayahs:50},{number:78,name:"An-Naba",ar:"النبأ",ayahs:40},{number:79,name:"An-Nazi'at",ar:"النازعات",ayahs:46},{number:80,name:"Abasa",ar:"عبس",ayahs:42},{number:81,name:"At-Takwir",ar:"التكوير",ayahs:29},{number:82,name:"Al-Infitar",ar:"الانفطار",ayahs:19},{number:83,name:"Al-Mutaffifin",ar:"المطففين",ayahs:36},{number:84,name:"Al-Inshiqaq",ar:"الانشقاق",ayahs:25},{number:85,name:"Al-Buruj",ar:"البروج",ayahs:22},{number:86,name:"At-Tariq",ar:"الطارق",ayahs:17},{number:87,name:"Al-A'la",ar:"الأعلى",ayahs:19},{number:88,name:"Al-Ghashiyah",ar:"الغاشية",ayahs:26},{number:89,name:"Al-Fajr",ar:"الفجر",ayahs:30},{number:90,name:"Al-Balad",ar:"البلد",ayahs:20},{number:91,name:"Ash-Shams",ar:"الشمس",ayahs:15},{number:92,name:"Al-Layl",ar:"الليل",ayahs:21},{number:93,name:"Ad-Duha",ar:"الضحى",ayahs:11},{number:94,name:"Ash-Sharh",ar:"الشرح",ayahs:8},{number:95,name:"At-Tin",ar:"التين",ayahs:8},{number:96,name:"Al-Alaq",ar:"العلق",ayahs:19},{number:97,name:"Al-Qadr",ar:"القدر",ayahs:5},{number:98,name:"Al-Bayyinah",ar:"البينة",ayahs:8},{number:99,name:"Az-Zalzalah",ar:"الزلزلة",ayahs:8},{number:100,name:"Al-Adiyat",ar:"العاديات",ayahs:11},{number:101,name:"Al-Qari'ah",ar:"القارعة",ayahs:11},{number:102,name:"At-Takathur",ar:"التكاثر",ayahs:8},{number:103,name:"Al-Asr",ar:"العصر",ayahs:3},{number:104,name:"Al-Humazah",ar:"الهمزة",ayahs:9},{number:105,name:"Al-Fil",ar:"الفيل",ayahs:5},{number:106,name:"Quraysh",ar:"قريش",ayahs:4},{number:107,name:"Al-Ma'un",ar:"الماعون",ayahs:7},{number:108,name:"Al-Kawthar",ar:"الكوثر",ayahs:3},{number:109,name:"Al-Kafirun",ar:"الكافرون",ayahs:6},{number:110,name:"An-Nasr",ar:"النصر",ayahs:3},{number:111,name:"Al-Masad",ar:"المسد",ayahs:5},{number:112,name:"Al-Ikhlas",ar:"الإخلاص",ayahs:4},{number:113,name:"Al-Falaq",ar:"الفلق",ayahs:5},{number:114,name:"An-Nas",ar:"الناس",ayahs:6}
];

const POS_COLORS = {
  noun:        { color: "#27ae60", bg: "rgba(39,174,96,0.1)",    border: "rgba(39,174,96,0.3)",    label: "Noun" },
  verb:        { color: "#3498db", bg: "rgba(52,152,219,0.1)",   border: "rgba(52,152,219,0.3)",   label: "Verb" },
  particle:    { color: "#9b59b6", bg: "rgba(155,89,182,0.1)",   border: "rgba(155,89,182,0.3)",   label: "Particle" },
  pronoun:     { color: "#e67e22", bg: "rgba(230,126,34,0.1)",   border: "rgba(230,126,34,0.3)",   label: "Pronoun" },
  default:     { color: "#607d8b", bg: "rgba(96,125,139,0.1)",   border: "rgba(96,125,139,0.3)",   label: "Other" },
};

function getPOS(word) {
  const t = (word.char_type_name || "").toLowerCase();
  if (t.includes("noun") || t === "n") return POS_COLORS.noun;
  if (t.includes("verb") || t === "v") return POS_COLORS.verb;
  if (t.includes("particle") || t === "p") return POS_COLORS.particle;
  if (t.includes("pronoun") || t === "pro") return POS_COLORS.pronoun;
  return POS_COLORS.default;
}

export default function App() {
  const [selectedSurah, setSelectedSurah] = useState(SURAHS[0]);
  const [selectedAyah, setSelectedAyah] = useState(1);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [ayahText, setAyahText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => { fetchWords(); }, [selectedSurah, selectedAyah]);

  async function fetchWords() {
    setLoading(true);
    setHoveredWord(null);
    try {
      const res = await fetch(
        `https://api.quran.com/api/v4/verses/by_key/${selectedSurah.number}:${selectedAyah}?words=true&word_fields=text_uthmani,transliteration,translation&word_translation_language=en&fields=text_uthmani`
      );
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data = await res.json();
      console.log("API response:", JSON.stringify(data.verse?.words?.[0], null, 2));
      const verseWords = data.verse?.words || [];
      setWords(verseWords);
      setAyahText(data.verse?.text_uthmani || "");
    } catch (e) {
      console.error("Fetch error:", e);
      setWords([]);
    } finally {
      setLoading(false);
    }
  }

  const ayahNumbers = Array.from({ length: selectedSurah.ayahs }, (_, i) => i + 1);
  const displayWords = words.filter(w => w.char_type_name !== "end");
  const hovered = hoveredWord !== null ? displayWords[hoveredWord] : null;

  const S = {
    select: { width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(52,152,219,0.3)", borderRadius: 8, padding: "10px 12px", color: "#e0e8f0", fontSize: 14 },
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d1b2a", fontFamily: "'Segoe UI', sans-serif", color: "#e0e8f0" }}>
      {/* Header */}
      <div style={{ background: "rgba(0,0,0,0.5)", borderBottom: "1px solid rgba(52,152,219,0.3)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #3498db, #1abc9c)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📖</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#3498db" }}>QUL Word-by-Word Reader</div>
            <div style={{ fontSize: 11, color: "#607d8b" }}>Grammar & morphology from Quranic Universal Library · Tarteel</div>
          </div>
        </div>
        <a href="https://qul.tarteel.ai" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#607d8b", textDecoration: "none", border: "1px solid rgba(96,125,139,0.3)", padding: "4px 10px", borderRadius: 20 }}>qul.tarteel.ai ↗</a>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>

        {/* Legend */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24, justifyContent: "center" }}>
          {Object.entries(POS_COLORS).filter(([k]) => k !== "default").map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, background: v.bg, border: `1px solid ${v.border}`, borderRadius: 20, padding: "4px 12px" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: v.color }} />
              <span style={{ fontSize: 12, color: v.color }}>{v.label}</span>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(52,152,219,0.2)", borderRadius: 14, padding: 20, marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, color: "#607d8b", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Surah</label>
            <select value={selectedSurah.number}
              onChange={e => { setSelectedSurah(SURAHS.find(s => s.number === parseInt(e.target.value))); setSelectedAyah(1); }}
              style={S.select}>
              {SURAHS.map(s => (
                <option key={s.number} value={s.number}>{s.number}. {s.name} — {s.ar}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#607d8b", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Ayah</label>
            <select value={selectedAyah} onChange={e => setSelectedAyah(parseInt(e.target.value))} style={S.select}>
              {ayahNumbers.map(n => <option key={n} value={n}>Ayah {n}</option>)}
            </select>
          </div>
        </div>

        {/* Full ayah text */}
        {ayahText && (
          <div style={{ textAlign: "center", fontSize: 28, fontFamily: "serif", direction: "rtl", lineHeight: 2, marginBottom: 24, padding: "16px 24px", background: "rgba(52,152,219,0.06)", borderRadius: 12, border: "1px solid rgba(52,152,219,0.15)" }}>
            {ayahText}
          </div>
        )}

        {/* Word cards */}
        {loading ? (
          <div style={{ textAlign: "center", color: "#607d8b", padding: 40 }}>Loading...</div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, direction: "rtl", justifyContent: "center", marginBottom: 24 }}>
            {displayWords.map((word, i) => {
              const style = getPOS(word);
              const isHovered = hoveredWord === i;
              return (
                <div key={i}
                  onMouseEnter={() => setHoveredWord(i)}
                  onMouseLeave={() => setHoveredWord(null)}
                  style={{ direction: "ltr", textAlign: "center", padding: "10px 14px", borderRadius: 10, border: `1px solid ${isHovered ? style.color : style.border}`, background: isHovered ? style.color + "22" : style.bg, cursor: "pointer", minWidth: 80, transition: "all 0.15s" }}>
                  <div style={{ fontFamily: "serif", fontSize: 22, direction: "rtl", color: "#e0e8f0", marginBottom: 4 }}>{word.text_uthmani}</div>
                  <div style={{ fontSize: 11, color: style.color, marginBottom: 2 }}>{word.transliteration?.text}</div>
                  <div style={{ fontSize: 11, color: "#607d8b" }}>{word.translation?.text}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Hover detail panel */}
        {hovered && (
          <div style={{ background: "rgba(52,152,219,0.08)", border: "1px solid rgba(52,152,219,0.2)", borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, textAlign: "center" }}>
              {[["Arabic", hovered.text_uthmani], ["Transliteration", hovered.transliteration?.text], ["Translation", hovered.translation?.text]].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, color: "#607d8b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: label === "Arabic" ? 24 : 16, fontFamily: label === "Arabic" ? "serif" : "inherit", color: "#e0e8f0", direction: label === "Arabic" ? "rtl" : "ltr" }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", fontSize: 12, color: "#607d8b" }}>
          Word-by-word data from <a href="https://qul.tarteel.ai" target="_blank" rel="noreferrer" style={{ color: "#3498db" }}>QUL by Tarteel</a>
        </div>
      </div>
    </div>
  );
}