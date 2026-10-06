import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles, Server, Store, User, ShoppingBag, ArrowLeft,
  MousePointerClick, Database, Globe, Sliders,
} from "lucide-react";

const DARK = "#3368A0";
const MID = "#66A3BF";
const SOFT = "#C8DFDB";
const SKIN = "#F2C9A5";
const HAIR = "#1F3F63";

const STEPS = [
  { id: "all", label: "شوف الدورة كاملة" },
  { id: "platform", label: "١. السيرفر والنظام" },
  { id: "merchant", label: "٢. لوحة تحكم التاجر" },
  { id: "store", label: "٣. متجرك الخاص" },
  { id: "client", label: "٤. الزبون والطلب" },
];

const CARDS = [
  { id: "platform", icon: Server, title: "١. النظام السحابي الذكي", text: "بيفصل بيانات كل تاجر لوحده، وبيضمن إن موقعك يفضل شغال سريع ومن غير أي أعطال." },
  { id: "merchant", icon: User, title: "٢. التاجر (حضرتك)", text: "بتسجل حسابك وتضيف بضاعتك وتختار ألوانك وشعارك بسهولة من الموبايل أو الكمبيوتر." },
  { id: "store", icon: Store, title: "٣. متجرك المنفصل تماماً", text: "بيظهر فوراً متجر خاص بيك وباسمك، كأنه مبرمج ليك مخصوص ومحدش بيعرف المنصة المشغلة." },
  { id: "client", icon: ShoppingBag, title: "٤. زبونك والطلب السريع", text: "الزبون بيدخل يختار حاجته ويدفع بأمان، وفلوس الطلب بتوصلك أنت مباشرة." },
];

/* نص عربي في SVG */
const T = ({ x, y, size = 11, fill = "#555", weight = "normal", mono, children }) => (
  <text
    x={x} y={y} textAnchor="middle" fill={fill} fontSize={size} fontWeight={weight}
    fontFamily={mono ? "monospace" : "inherit"}
    style={{ direction: "rtl", unicodeBidi: "plaintext" }}
  >
    {children}
  </text>
);

/* ============ الرسومات ============ */

// المنصة: سحابة + سيرفرات
const PlatformArt = () => (
  <g>
    <path
      d="M 40 70 Q 20 70 22 50 Q 24 32 44 34 Q 50 8 80 10 Q 108 12 112 38 Q 140 36 140 56 Q 140 70 124 70 Z"
      fill="#fff" stroke={DARK} strokeWidth="2.5" strokeLinejoin="round"
    />
    {/* درع الحماية */}
    <path d="M 81 22 L 96 28 L 96 44 Q 96 54 81 60 Q 66 54 66 44 L 66 28 Z" fill={SOFT} stroke={DARK} strokeWidth="2" />
    <path d="M 74 41 L 79 46 L 89 34" fill="none" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="85" y1="70" x2="85" y2="84" stroke={DARK} strokeWidth="2" strokeDasharray="3 3" />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(0 ${84 + i * 28})`}>
        <rect x="45" y="0" width="80" height="22" rx="6" fill="#fff" stroke={DARK} strokeWidth="2" />
        <circle cx="58" cy="11" r="3.5" fill={i === 1 ? MID : DARK} />
        <circle cx="70" cy="11" r="3.5" fill={SOFT} stroke={DARK} strokeWidth="1" />
        <line x1="86" y1="8" x2="114" y2="8" stroke={SOFT} strokeWidth="3" strokeLinecap="round" />
        <line x1="86" y1="15" x2="104" y2="15" stroke={SOFT} strokeWidth="3" strokeLinecap="round" />
      </g>
    ))}
  </g>
);

// المتجر: واجهة محل بمظلة
const StoreArt = () => (
  <g>
    <rect x="40" y="0" width="100" height="20" rx="5" fill="#fff" stroke={MID} strokeWidth="2" />
    <T x="90" y="14" size="10" fill={DARK} weight="bold" mono>store1</T>
    <rect x="10" y="44" width="160" height="96" fill="#fff" stroke={DARK} strokeWidth="2.5" />
    {/* واجهة العرض */}
    <rect x="24" y="68" width="66" height="50" rx="3" fill={SOFT} fillOpacity="0.55" stroke={DARK} strokeWidth="1.5" />
    <rect x="30" y="96" width="14" height="14" rx="2" fill={DARK} />
    <rect x="48" y="90" width="14" height="20" rx="2" fill={MID} />
    <circle cx="76" cy="103" r="7" fill="#fff" stroke={DARK} strokeWidth="1.5" />
    <line x1="24" y1="112" x2="90" y2="112" stroke={DARK} strokeWidth="2" />
    {/* الباب */}
    <rect x="108" y="68" width="42" height="72" rx="3" fill={MID} stroke={DARK} strokeWidth="2" />
    <circle cx="142" cy="106" r="2.5" fill="#fff" />
    <rect x="116" y="76" width="26" height="14" rx="7" fill="#fff" />
    <T x="129" y="86.5" size="8" fill={DARK} weight="bold">مفتوح</T>
    {/* المظلة */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i}>
        <rect x={10 + i * 26.67} y="24" width="26.67" height="22" fill={i % 2 ? "#fff" : DARK} stroke={DARK} strokeWidth="1.5" />
        <path d={`M ${10 + i * 26.67} 46 a 13.33 13.33 0 0 0 26.67 0 Z`} fill={i % 2 ? "#fff" : DARK} stroke={DARK} strokeWidth="1.5" />
      </g>
    ))}
  </g>
);

// التاجر: شخص على مكتب أمام لابتوب
const MerchantArt = () => (
  <g>
    <path d="M 14 98 Q 14 62 40 62 Q 66 62 66 98 Z" fill={MID} stroke={DARK} strokeWidth="2" />
    <path d="M 33 62 L 40 76 L 47 62" fill="#fff" stroke={DARK} strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="35" y="50" width="10" height="13" fill={SKIN} />
    <circle cx="40" cy="38" r="16" fill={SKIN} stroke={DARK} strokeWidth="2" />
    <path d="M 24 36 Q 24 18 41 20 Q 57 21 56 38 Q 46 28 24 36 Z" fill={HAIR} />
    <circle cx="34" cy="40" r="1.8" fill={HAIR} />
    <circle cx="46" cy="40" r="1.8" fill={HAIR} />
    <path d="M 35 47 Q 40 51 45 47" fill="none" stroke={HAIR} strokeWidth="1.8" strokeLinecap="round" />
    {/* الذراع */}
    <path d="M 58 74 Q 70 90 82 90" fill="none" stroke={MID} strokeWidth="9" strokeLinecap="round" />
    {/* لابتوب */}
    <rect x="74" y="54" width="48" height="34" rx="4" fill={DARK} />
    <rect x="79" y="59" width="38" height="24" rx="2" fill="#fff" />
    <rect x="83" y="75" width="5" height="6" fill={MID} />
    <rect x="91" y="70" width="5" height="11" fill={DARK} />
    <rect x="99" y="65" width="5" height="16" fill={MID} />
    <rect x="107" y="62" width="5" height="19" fill={DARK} />
    <path d="M 68 88 H 128 L 124 94 H 72 Z" fill={SOFT} stroke={DARK} strokeWidth="1.5" strokeLinejoin="round" />
    {/* المكتب */}
    <rect x="6" y="96" width="132" height="8" rx="3" fill="#fff" stroke={DARK} strokeWidth="2" />
    <line x1="18" y1="104" x2="18" y2="126" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="126" y1="104" x2="126" y2="126" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" />
    {/* كوب */}
    <rect x="134" y="80" width="0" height="0" />
  </g>
);

// الزبون: شخص يحمل حقيبة تسوق وموبايل
const ClientArt = () => (
  <g>
    {/* الأرجل */}
    <rect x="26" y="98" width="12" height="38" rx="5" fill={DARK} />
    <rect x="42" y="98" width="12" height="38" rx="5" fill={DARK} />
    <rect x="22" y="132" width="18" height="7" rx="3" fill={HAIR} />
    <rect x="40" y="132" width="18" height="7" rx="3" fill={HAIR} />
    {/* الجسم */}
    <path d="M 20 56 Q 40 46 60 56 L 64 104 L 16 104 Z" fill={MID} stroke={DARK} strokeWidth="2" strokeLinejoin="round" />
    <rect x="35" y="42" width="10" height="12" fill={SKIN} />
    <circle cx="40" cy="30" r="15" fill={SKIN} stroke={DARK} strokeWidth="2" />
    <path d="M 25 30 Q 22 10 40 12 Q 58 12 55 30 Q 52 20 40 20 Q 30 20 25 30 Z" fill={HAIR} />
    <circle cx="34" cy="32" r="1.7" fill={HAIR} />
    <circle cx="46" cy="32" r="1.7" fill={HAIR} />
    <path d="M 35 38 Q 40 42 45 38" fill="none" stroke={HAIR} strokeWidth="1.8" strokeLinecap="round" />
    {/* الموبايل */}
    <path d="M 22 62 Q 10 74 12 84" fill="none" stroke={MID} strokeWidth="8" strokeLinecap="round" />
    <rect x="4" y="76" width="13" height="22" rx="3" fill={DARK} />
    <rect x="6.5" y="79" width="8" height="14" rx="1" fill={SOFT} />
    {/* الحقيبة */}
    <path d="M 58 62 Q 72 72 76 84" fill="none" stroke={MID} strokeWidth="8" strokeLinecap="round" />
    <path d="M 74 84 Q 74 70 83 70 Q 92 70 92 84" fill="none" stroke={DARK} strokeWidth="2" />
    <path d="M 66 84 H 100 L 97 120 Q 97 124 93 124 H 73 Q 69 124 69 120 Z" fill={SOFT} stroke={DARK} strokeWidth="2" strokeLinejoin="round" />
    <path d="M 78 100 q 5 6 10 0" fill="none" stroke={DARK} strokeWidth="2" strokeLinecap="round" />
  </g>
);

/* شارة على السهم */
const Pill = ({ x, y, w, color, op, children }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <rect x={-w / 2} y="-13" width={w} height="26" rx="13" fill="#fff" stroke={color} strokeWidth="1.2" />
    <T x="0" y="4" size="11" fill={color} weight="bold">{children}</T>
  </g>
);

export default function Sketch() {
  const [active, setActive] = useState("all");
  const on = (...ids) => (active === "all" || ids.includes(active) ? 1 : 0.18);

  return (
    <div dir="rtl" className="bg-white text-gray-800 font-sans min-h-screen">
      <style>{`
        @keyframes fadeInSoft {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fade { animation: fadeInSoft 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        
        @keyframes flow { to { stroke-dashoffset: -22; } }
        .flow { animation: flow 1.1s linear infinite; }
        @media (prefers-reduced-motion: reduce) { 
          .flow { animation: none; }
          .anim-fade { animation: none; }
        }
      `}</style>

      {/* الترويسة */}
      <section className="relative py-14 bg-white overflow-hidden border-b border-accent/40">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3368a00d_1px,transparent_1px),linear-gradient(to_bottom,#3368a00d_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
<<<<<<< HEAD
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-accent/40 border border-accent text-dark text-xs font-bold mb-4">
           
            <span>المخطط المعماري التفاعلي (System Architecture Flow)</span>
=======
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center anim-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-accent/40 border border-accent text-dark text-xs font-bold mb-4 transition-transform hover:scale-105 duration-200">
            <span>إزاي متجرك بيشتغل خطوة بخطوة</span>
>>>>>>> 36f8532 (Initial commit)
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-gray-900 tracking-tight leading-snug sm:leading-tight mb-3">
            <span className="font-bold text-dark">
              رحلة الشغل مع متجرك الإلكتروني
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            من أول ما تفتح حسابك وتضيف بضاعتك، لحد ما زبونك يدخل يشتري وفلوسك توصلك في ثواني.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                  active === s.id
                    ? "bg-dark text-white shadow-sm scale-105"
                    : "bg-ligth/30 text-dark hover:bg-ligth/60 hover:-translate-y-0.5"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* الرسم */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAFDFD] border border-accent/60 rounded-3xl p-6 sm:p-10 shadow-sm anim-fade delay-1">
            <div className="flex items-center gap-1.5 mb-4 text-xs font-bold text-dark border-b border-accent/40 pb-3">
              <MousePointerClick size={16} className="text-brown animate-pulse" />
              <span>اضغط على أي جزء وشوف حركته ماشية إزاي</span>
            </div>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 1000 560" className="w-full h-auto min-w-[640px] max-w-5xl mx-auto select-none" style={{ direction: "ltr" }}>
                <defs>
                  <marker id="ah-dark" markerWidth="10" markerHeight="10" refX="8" refY="3.5" orient="auto">
                    <polygon points="0 0, 8 3.5, 0 7" fill={DARK} />
                  </marker>
                  <marker id="ah-mid" markerWidth="10" markerHeight="10" refX="8" refY="3.5" orient="auto">
                    <polygon points="0 0, 8 3.5, 0 7" fill={MID} />
                  </marker>
                </defs>

                {/* ===== الأسهم ===== */}
                {/* التاجر ← المنصة */}
                <path className="flow transition-opacity duration-300" d="M 335 432 Q 235 445 145 245" fill="none" stroke={DARK} strokeWidth="2.5" strokeDasharray="6 5" markerEnd="url(#ah-dark)" opacity={on("merchant", "platform")} />
                {/* المنصة ← المتجر */}
                <path className="flow transition-opacity duration-300" d="M 155 145 Q 280 40 402 110" fill="none" stroke={DARK} strokeWidth="2.5" strokeDasharray="6 5" markerEnd="url(#ah-dark)" opacity={on("platform", "store")} />
                {/* الزبون ← المتجر */}
                <path className="flow transition-opacity duration-300" d="M 775 295 Q 740 120 582 110" fill="none" stroke={MID} strokeWidth="2.5" strokeDasharray="6 5" markerEnd="url(#ah-mid)" opacity={on("client", "store")} />

                <Pill x={239} y={392} w={150} color={DARK} op={on("merchant", "platform")}>١. بتسجل وتظبط متجرك</Pill>
                <Pill x={278} y={84} w={186} color={DARK} op={on("platform", "store")}>٢. بنفتح رابط متجرك المباشر</Pill>
                <Pill x={745} y={178} w={156} color={MID} op={on("client", "store")}>٣. الزبون بيطلب ويدفع فوراً</Pill>

                {/* ===== المنصة ===== */}
                <g transform="translate(10 100)" className="cursor-pointer transition-all duration-300 hover:scale-[1.02]" opacity={on("platform")} onClick={() => setActive("platform")}>
                  <PlatformArt />
                  <T x="85" y="198" size="15" fill={DARK} weight="bold">محرك التشغيل السحابي</T>
                  <T x="85" y="216" size="11" fill={MID} weight="bold">شغال في ضهرك ٢٤ ساعة</T>
                  <T x="85" y="238" size="11">بياناتك معزولة ومحمية</T>
                  <T x="85" y="255" size="11">تجهيز رابط المتجر تلقائياً</T>
                  <T x="85" y="272" size="11">حماية وتشفير عالي وأمان</T>
                </g>

                {/* ===== المتجر ===== */}
                <g transform="translate(400 50)" className="cursor-pointer transition-all duration-300 hover:scale-[1.02]" opacity={on("store")} onClick={() => setActive("store")}>
                  <StoreArt />
                  <T x="90" y="170" size="15" fill={DARK} weight="bold">متجرك المستقل للزبائن</T>
                  <T x="90" y="188" size="11" fill={MID} weight="bold" mono>yourstore.mdkark.com</T>
                  <T x="90" y="210" size="11">اسمك وشعارك وألوانك فقط</T>
                  <T x="90" y="227" size="11">عرض المنتجات وتحديث الكميات</T>
                  <T x="90" y="244" size="11">سلة شراء وطرق دفع سريعة</T>
                </g>

                {/* ===== التاجر ===== */}
                <g transform="translate(335 330)" className="cursor-pointer transition-all duration-300 hover:scale-[1.02]" opacity={on("merchant")} onClick={() => setActive("merchant")}>
                  <MerchantArt />
                  <T x="72" y="154" size="14" fill={DARK} weight="bold">التاجر (صاحب البيزنس)</T>
                  <T x="72" y="173" size="11">بتدير كل حاجة من مكان واحد</T>
                  <T x="72" y="190" size="10.5" fill="#888">متابعة الطلبات، الأسعار، والمبيعات</T>
                </g>

                {/* ===== الزبون ===== */}
                <g transform="translate(735 300)" className="cursor-pointer transition-all duration-300 hover:scale-[1.02]" opacity={on("client")} onClick={() => setActive("client")}>
                  <ClientArt />
                  <T x="52" y="164" size="14" fill={MID} weight="bold">الزبون والمشتري</T>
                  <T x="52" y="183" size="11">بيدخل يشتري بضغطة زر</T>
                  <T x="52" y="200" size="10.5" fill="#888">تجربة سهلة ومريحة من موبايله</T>
                </g>
              </svg>
            </div>

            {/* البطاقات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-accent/40">
              {CARDS.map(({ id, icon: Icon, title, text }) => (
                <div
                  key={id}
                  onClick={() => setActive(id)}
                  className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-200 active:scale-[0.98] ${
                    active === id
                      ? "border-dark bg-ligth/30 shadow-sm -translate-y-1"
                      : "border-accent/60 bg-white hover:border-dark/60 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5 text-dark font-bold text-xs">
                    <Icon size={16} className="text-brown transition-transform duration-200 group-hover:scale-110" />
                    <span>{title}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* المميزات */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 anim-fade delay-2">
            {[
              { icon: Database, t: "بياناتك في أمان تام", d: "محدش يقدر يشوف مبيعاتك ولا طلباتك؛ متجرك مقفول على نفسه ومستقل تماماً." },
              { icon: Sliders, t: "شكله على ذوقك وبراحتك", d: "غير الألوان، اللوجو، وترتيب أقسامك بلمسة واحدة ومن غير ما تحتاج لأي مبرمج." },
              { icon: Globe, t: "رابط خاص يشتغل فوراً", d: "أول ما تسجل، متجرك بيكون جاهز برابط مباشر وشهادة أمان مجانية بدون انتظار." },
            ].map(({ icon: Icon, t, d }, idx) => (
              <div
                key={t}
                className="group bg-white p-5 rounded-2xl border border-accent flex items-start gap-3 shadow-sm hover:shadow-md hover:border-dark/60 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/30 text-dark flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-dark group-hover:text-white">
                  <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-dark mb-1">{t}</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-dark text-white rounded-xl hover:bg-dark/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 font-semibold text-sm shadow-md group"
            >
              <span>يلا نبدأ.. افتح متجرك دلوقتي</span>
              <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}