import { useState, useEffect } from "react";

const SURAHS = [
  { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", ayahs: 7 },
  { number: 2, name: "Al-Baqarah", arabic: "البقرة", ayahs: 286 },
  { number: 36, name: "Ya-Sin", arabic: "يس", ayahs: 83 },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", ayahs: 78 },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", ayahs: 4 },
  { number: 113, name: "Al-Falaq", arabic: "الفلق", ayahs: 5 },
  { number: 114, name: "An-Nas", arabic: "الناس", ayahs: 6 },
];

const POS = {
  N:   { bg:"#1a3a2a", border:"#2ecc71", label:"Noun",     color:"#2ecc71" },
  V:   { bg:"#1a2a3a", border:"#3498db", label:"Verb",     color:"#3498db" },
  P:   { bg:"#2a1a3a", border:"#9b59b6", label:"Particle", color:"#9b59b6" },
  PRO: { bg:"#3a2a1a", border:"#e67e22", label:"Pronoun",  color:"#e67e22" },
  def: { bg:"#1a2530", border:"#607d8b", label:"Word",     color:"#607d8b" },
};
const getPos = p => { if(!p) return POS.def; const k=Object.keys(POS).find(k=>p.toUpperCase().startsWith(k)); return POS[k]||POS.def; };

export default function App() {
  const [surah, setSurah] = useState(SURAHS[0]);
  const [ayah, setAyah] = useState(1);
  const [words, setWords] = useState([]);
  const [fullText, setFullText] = useState("");
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => { fetchWords(); }, [surah, ayah]);

  async function fetchWords() {
    setLoading(true); setHovered(null);
    try {
      const res = await fetch(`https://api.quran.com/api/v4/verses/by_key/${surah.number}:${ayah}?word_fields=text_uthmani,transliteration&words=true&translations=131&fields=text_uthmani`);
      const d = await res.json();
      setWords(d.verse?.words?.filter(w=>w.char_type_name!=="end") || []);
      setFullText(d.verse?.text_uthmani || "");
    } catch { setWords([]); } finally { setLoading(false); }
  }

  const nums = Array.from({length:surah.ayahs},(_,i)=>i+1);

  return (
    <div style={{minHeight:"100vh",background:"#0d1b2a",fontFamily:"'Segoe UI',sans-serif",color:"#e0e8f0"}}>
      <div style={{background:"rgba(0,0,0,0.5)",borderBottom:"1px solid rgba(52,152,219,0.3)",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,background:"linear-gradient(135deg,#3498db,#1abc9c)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>📖</div>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:"#3498db"}}>QUL Word-by-Word Reader</div>
            <div style={{fontSize:11,color:"#607d8b"}}>Grammar & morphology from Quranic Universal Library · Tarteel</div>
          </div>
        </div>
        <a href="https://qul.tarteel.ai" target="_blank" rel="noreferrer" style={{fontSize:12,color:"#607d8b",textDecoration:"none",border:"1px solid rgba(96,125,139,0.3)",padding:"4px 10px",borderRadius:20}}>qul.tarteel.ai ↗</a>
      </div>
      <div style={{maxWidth:900,margin:"0 auto",padding:"32px 24px"}}>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:24,justifyContent:"center"}}>
          {Object.entries(POS).filter(([k])=>k!=="def").map(([k,v])=>(
            <div key={k} style={{display:"flex",alignItems:"center",gap:6,background:v.bg,border:`1px solid ${v.border}`,borderRadius:20,padding:"4px 12px"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:v.color}}/>
              <span style={{fontSize:12,color:v.color}}>{v.label}</span>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(52,152,219,0.2)",borderRadius:14,padding:20,marginBottom:24,display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div>
            <label style={{fontSize:11,color:"#607d8b",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:8}}>Surah</label>
            <select value={surah.number} onChange={e=>{setSurah(SURAHS.find(s=>s.number===parseInt(e.target.value)));setAyah(1);}} style={{width:"100%",background:"rgba(0,0,0,0.4)",border:"1px solid rgba(52,152,219,0.3)",borderRadius:8,padding:"10px 12px",color:"#e0e8f0",fontSize:14}}>
              {SURAHS.map(s=><option key={s.number} value={s.number}>{s.number}. {s.name} — {s.arabic}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:11,color:"#607d8b",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:8}}>Ayah</label>
            <select value={ayah} onChange={e=>setAyah(parseInt(e.target.value))} style={{width:"100%",background:"rgba(0,0,0,0.4)",border:"1px solid rgba(52,152,219,0.3)",borderRadius:8,padding:"10px 12px",color:"#e0e8f0",fontSize:14}}>
              {nums.map(n=><option key={n} value={n}>Ayah {n}</option>)}
            </select>
          </div>
        </div>
        {fullText && <div style={{textAlign:"center",fontSize:28,direction:"rtl",fontFamily:"'Amiri','Traditional Arabic',serif",lineHeight:2,color:"#f0e8d8",marginBottom:32,padding:"20px 24px",background:"rgba(255,255,255,0.03)",borderRadius:12,border:"1px solid rgba(255,255,255,0.06)"}}>{fullText}</div>}
        {loading ? <div style={{textAlign:"center",color:"#607d8b",padding:40}}>Loading words...</div> : (
          <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center",direction:"rtl"}}>
            {words.map((w,i)=>{
              const s=getPos(w.pos); const h=hovered===i;
              return <div key={i} onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}
                style={{background:h?s.border+"22":s.bg,border:`1px solid ${h?s.border:s.border+"66"}`,borderRadius:12,padding:"14px 18px",cursor:"pointer",transition:"all 0.2s",transform:h?"translateY(-4px)":"none",minWidth:80,textAlign:"center"}}>
                <div style={{fontSize:26,fontFamily:"'Amiri','Traditional Arabic',serif",color:"#f5f0e8",marginBottom:8,direction:"rtl"}}>{w.text_uthmani||w.text}</div>
                <div style={{fontSize:12,color:"#a0b0c0",marginBottom:4,direction:"ltr"}}>{w.transliteration?.text||""}</div>
                <div style={{fontSize:12,color:s.color,direction:"ltr"}}>{w.translation?.text||""}</div>
                {h&&w.pos&&<div style={{marginTop:8,fontSize:10,background:s.border+"22",borderRadius:8,padding:"3px 8px",color:s.color}}>{s.label}</div>}
              </div>;
            })}
          </div>
        )}
        <div style={{marginTop:32,padding:16,background:"rgba(52,152,219,0.05)",border:"1px solid rgba(52,152,219,0.15)",borderRadius:12,textAlign:"center"}}>
          <div style={{fontSize:12,color:"#607d8b"}}>Word-by-word data from <a href="https://qul.tarteel.ai" target="_blank" rel="noreferrer" style={{color:"#3498db",textDecoration:"none"}}>QUL by Tarteel</a></div>
        </div>
      </div>
      <link href="https://fonts.googleapis.com/css2?family=Amiri&display=swap" rel="stylesheet"/>
    </div>
  );
}