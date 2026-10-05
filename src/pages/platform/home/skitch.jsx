import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Server,
  Store,
  User,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  Layers,
  ShieldCheck,
  MousePointerClick
} from "lucide-react";

export default function Sketch() {
  const [activeStep, setActiveStep] = useState("all"); // 'all' | 'platform' | 'store' | 'merchant' | 'client'

  return (
    <div dir="rtl" className="bg-white text-gray-800 font-sans min-h-screen">
      {/* الترويسة الرئيسية */}
      <section className="relative py-16 bg-white overflow-hidden border-b border-accent/40">
        <div className="absolute inset-0 bg-ligth/20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3368a00d_1px,transparent_1px),linear-gradient(to_bottom,#3368a00d_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/40 border border-accent text-dark text-xs font-bold mb-4">
            <Sparkles className="w-4 h-4 text-brown" />
            <span>المخطط الهيكلي التوضيحي (Architecture Flow)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light text-gray-900 tracking-tight mb-3">
            مخطط منظومة <span className="font-bold text-dark">المتاجر السحابية</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            توضيح بصري مبسط يبيّن ترابط المنصة المركزية مع المتاجر المستقلة ورحلة كُلٍّ من التاجر والعميل داخل بيئة سحابية موحدة.
          </p>

          {/* أزرار التفاعل السريع لتسليط الضوء على العناصر */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveStep("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStep === "all" ? "bg-dark text-white shadow-sm" : "bg-ligth/30 text-dark hover:bg-ligth/60"
              }`}
            >
              عرض الكل
            </button>
            <button
              onClick={() => setActiveStep("platform")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStep === "platform" ? "bg-dark text-white shadow-sm" : "bg-ligth/30 text-dark hover:bg-ligth/60"
              }`}
            >
              1. المنصة المركزية
            </button>
            <button
              onClick={() => setActiveStep("merchant")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStep === "merchant" ? "bg-dark text-white shadow-sm" : "bg-ligth/30 text-dark hover:bg-ligth/60"
              }`}
            >
              2. التاجر (Customer)
            </button>
            <button
              onClick={() => setActiveStep("store")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStep === "store" ? "bg-dark text-white shadow-sm" : "bg-ligth/30 text-dark hover:bg-ligth/60"
              }`}
            >
              3. المتجر المستقل
            </button>
            <button
              onClick={() => setActiveStep("client")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStep === "client" ? "bg-dark text-white shadow-sm" : "bg-ligth/30 text-dark hover:bg-ligth/60"
              }`}
            >
              4. المشتري (Client)
            </button>
          </div>
        </div>
      </section>

      {/* منطقة الدياجرام الاحترافي (SVG Flow Diagram) */}
      <section className="py-14 bg-ligth/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-accent/80 rounded-3xl p-4 sm:p-8 shadow-xl shadow-dark/5 relative overflow-hidden">
            
            {/* مؤشر تفاعلي صغير */}
            <div className="absolute top-4 left-6 hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
              <MousePointerClick size={14} className="text-brown" />
              <span>رسم حي وتفاعلي مطابق للتخطيط المعماري</span>
            </div>

            {/* الرسم التخطيطي المتجاوب */}
            <div className="w-full relative flex justify-center items-center py-6">
              <svg
                viewBox="0 0 900 520"
                className="w-full h-auto max-w-4xl select-none"
                style={{ direction: "ltr" }} // اتجاه الرسم الهندسي ثابت للإحداثيات
              >
                <defs>
                  {/* تأثيرات الظلال والتدرجات */}
                  <filter id="cardShadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#3368a0" floodOpacity="0.08" />
                  </filter>
                  <linearGradient id="cloudBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3368A0" />
                    <stop offset="50%" stopColor="#66A3BF" />
                    <stop offset="100%" stopColor="#C8DFDB" />
                  </linearGradient>

                  {/* رؤوس الأسهم (Arrowheads) */}
                  <marker
                    id="arrowhead-blue"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3.5, 0 7" fill="#3368A0" />
                  </marker>
                  <marker
                    id="arrowhead-brown"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3.5, 0 7" fill="#66A3BF" />
                  </marker>
                </defs>

                {/* 1. الإطار البيضاوي الكبير الحاوي للبيئة السحابية (Big Ellipse Perimeter) */}
                <ellipse
                  cx="450"
                  cy="260"
                  rx="420"
                  ry="230"
                  fill="#F4F8F8"
                  fillOpacity="0.45"
                  stroke="url(#cloudBorder)"
                  strokeWidth="3.5"
                  strokeDasharray="10 8"
                  className="animate-pulse"
                />
                
                {/* وسم الإطار السحابي */}
                <text
                  x="450"
                  y="62"
                  textAnchor="middle"
                  fill="#3368A0"
                  fontSize="13"
                  fontWeight="bold"
                  letterSpacing="1"
                >
                  ☁ بيئة المنصة السحابية الموحدة (SaaS Cloud Ecosystem)
                </text>

                {/* 2. الأسهم المنحنية المترابطة (Curved Connection Arrows) */}
                
                {/* سهم من التاجر (أسفل) إلى المنصة المركزية (يسار) */}
                <path
                  d="M 460 380 Q 350 400 295 320"
                  fill="none"
                  stroke="#3368A0"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  markerEnd="url(#arrowhead-blue)"
                  opacity={activeStep === "all" || activeStep === "merchant" || activeStep === "platform" ? "1" : "0.2"}
                  className="transition-all duration-300"
                />
                <text x="340" y="390" fill="#3368A0" fontSize="11" fontWeight="bold">
                  ١. إدارة واشتراك
                </text>

                {/* سهم من المنصة المركزية إلى المتجر الفرعي (أعلى) */}
                <path
                  d="M 270 200 Q 330 150 435 155"
                  fill="none"
                  stroke="#3368A0"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  markerEnd="url(#arrowhead-blue)"
                  opacity={activeStep === "all" || activeStep === "platform" || activeStep === "store" ? "1" : "0.2"}
                  className="transition-all duration-300"
                />
                <text x="315" y="160" fill="#3368A0" fontSize="11" fontWeight="bold">
                  ٢. توليد المتجر (Subdomain)
                </text>

                {/* سهم من المشتري/العميل (يمين) إلى المتجر المستقل (أعلى) */}
                <path
                  d="M 680 340 Q 640 220 540 175"
                  fill="none"
                  stroke="#66A3BF"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  markerEnd="url(#arrowhead-brown)"
                  opacity={activeStep === "all" || activeStep === "client" || activeStep === "store" ? "1" : "0.2"}
                  className="transition-all duration-300"
                />
                <text x="635" y="240" fill="#66A3BF" fontSize="11" fontWeight="bold">
                  ٣. تصفح وشراء مباشر
                </text>

                {/* =================== العناصر الممثلة في الرسم =================== */}

                {/* أ. المربع الأيسر: المنصة المركزية (Central Core) */}
                <g
                  transform="translate(140, 160)"
                  filter="url(#cardShadow)"
                  className="cursor-pointer transition-all duration-300"
                  opacity={activeStep === "all" || activeStep === "platform" ? "1" : "0.3"}
                  onClick={() => setActiveStep("platform")}
                >
                  <rect
                    width="150"
                    height="150"
                    rx="22"
                    fill="#FFFFFF"
                    stroke="#3368A0"
                    strokeWidth="2.5"
                  />
                  <rect x="18" y="18" width="38" height="38" rx="10" fill="#C8DFDB" fillOpacity="0.6" />
                  <circle cx="37" cy="37" r="10" fill="#3368A0" />
                  <text x="75" y="42" fill="#3368A0" fontSize="13" fontWeight="bold">
                    المنصة المركزية
                  </text>
                  <text x="75" y="58" fill="#66A3BF" fontSize="10">
                    SaaS Core Engine
                  </text>

                  <line x1="18" y1="72" x2="132" y2="72" stroke="#C8DFDB" strokeWidth="1.2" />

                  <text x="18" y="94" fill="#555" fontSize="10.5">● عزل قواعد البيانات</text>
                  <text x="18" y="112" fill="#555" fontSize="10.5">● توجيه النطاقات</text>
                  <text x="18" y="130" fill="#555" fontSize="10.5">● بوابات الدفع والأمان</text>
                </g>

                {/* ب. المربع العلوي: المتجر المستقل (Customer Storefront) */}
                <g
                  transform="translate(440, 100)"
                  filter="url(#cardShadow)"
                  className="cursor-pointer transition-all duration-300"
                  opacity={activeStep === "all" || activeStep === "store" ? "1" : "0.3"}
                  onClick={() => setActiveStep("store")}
                >
                  <rect
                    width="145"
                    height="135"
                    rx="20"
                    fill="#FFFFFF"
                    stroke="#66A3BF"
                    strokeWidth="2.5"
                  />
                  <rect x="15" y="15" width="34" height="34" rx="10" fill="#C8DFDB" fillOpacity="0.5" />
                  <rect x="23" y="23" width="18" height="18" rx="4" fill="#66A3BF" />

                  <text x="60" y="34" fill="#3368A0" fontSize="12.5" fontWeight="bold">
                    المتجر المستقل
                  </text>
                  <text x="60" y="49" fill="#999" fontSize="9" fontFamily="monospace">
                    store1.mdkark.com
                  </text>

                  <line x1="15" y1="60" x2="130" y2="60" stroke="#C8DFDB" strokeWidth="1" />

                  <text x="15" y="80" fill="#444" fontSize="10">🎨 ألوان وشعار مخصص</text>
                  <text x="15" y="98" fill="#444" fontSize="10">📦 كتالوج المنتجات</text>
                  <text x="15" y="116" fill="#444" fontSize="10">💳 سلة ودفع فوري</text>
                </g>

                {/* ج. شخصية التاجر (Merchant Stick Figure & Card - أسفل) */}
                <g
                  transform="translate(450, 320)"
                  className="cursor-pointer transition-all duration-300"
                  opacity={activeStep === "all" || activeStep === "merchant" ? "1" : "0.3"}
                  onClick={() => setActiveStep("merchant")}
                >
                  {/* رسم التاجر (Stick-figure / Modern Avatar) */}
                  <circle cx="50" cy="30" r="16" fill="#FFFFFF" stroke="#3368A0" strokeWidth="2.5" />
                  <path d="M 50 46 L 50 90" stroke="#3368A0" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 50 60 L 25 72" stroke="#3368A0" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 50 60 L 75 72" stroke="#3368A0" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 50 90 L 32 120" stroke="#3368A0" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 50 90 L 68 120" stroke="#3368A0" strokeWidth="2.5" strokeLinecap="round" />

                  {/* بطاقة التاجر التوضيحية */}
                  <rect x="90" y="35" width="130" height="60" rx="14" fill="#FFFFFF" stroke="#C8DFDB" strokeWidth="1.5" filter="url(#cardShadow)" />
                  <text x="102" y="58" fill="#3368A0" fontSize="12" fontWeight="bold">التاجر (Customer)</text>
                  <text x="102" y="75" fill="#777" fontSize="9.5">يتحكم بالمتجر والمظهر</text>
                </g>

                {/* د. شخصية المشتري النهائي (Client / Shopper - يمين) */}
                <g
                  transform="translate(680, 270)"
                  className="cursor-pointer transition-all duration-300"
                  opacity={activeStep === "all" || activeStep === "client" ? "1" : "0.3"}
                  onClick={() => setActiveStep("client")}
                >
                  {/* رسم المشتري */}
                  <circle cx="45" cy="30" r="15" fill="#FFFFFF" stroke="#66A3BF" strokeWidth="2.5" />
                  <path d="M 45 45 L 45 88" stroke="#66A3BF" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 45 58 L 22 72" stroke="#66A3BF" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 45 58 L 70 65" stroke="#66A3BF" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 45 88 L 28 118" stroke="#66A3BF" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 45 88 L 64 118" stroke="#66A3BF" strokeWidth="2.5" strokeLinecap="round" />

                  {/* حقيبة تسوق صغيرة في يد المشتري */}
                  <rect x="68" y="65" width="14" height="15" rx="3" fill="#C8DFDB" stroke="#66A3BF" strokeWidth="1.5" />

                  {/* بطاقة المشتري التوضيحية */}
                  <rect x="85" y="35" width="125" height="58" rx="14" fill="#FFFFFF" stroke="#C8DFDB" strokeWidth="1.5" filter="url(#cardShadow)" />
                  <text x="98" y="58" fill="#66A3BF" fontSize="12" fontWeight="bold">الزبون (Client)</text>
                  <text x="98" y="75" fill="#777" fontSize="9.5">يتصفح ويشتري مباشرة</text>
                </g>

              </svg>
            </div>

            {/* تفصيل وشرح الخطوات الأربع أسفل المخطط */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-accent/40">
              <div
                onClick={() => setActiveStep("platform")}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  activeStep === "platform" ? "border-dark bg-ligth/30" : "border-accent/60 bg-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 text-dark font-bold text-xs">
                  <Server size={15} className="text-brown" />
                  <span>١. المحرك السحابي</span>
                </div>
                <p className="text-[11px] text-gray-500 font-normal leading-relaxed">
                  المنصة المركزية تؤمن تشغيل الخوادم، عزل قواعد البيانات وتوزيع النطاقات.
                </p>
              </div>

              <div
                onClick={() => setActiveStep("merchant")}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  activeStep === "merchant" ? "border-dark bg-ligth/30" : "border-accent/60 bg-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 text-dark font-bold text-xs">
                  <User size={15} className="text-brown" />
                  <span>٢. اشتراك التاجر</span>
                </div>
                <p className="text-[11px] text-gray-500 font-normal leading-relaxed">
                  يسجل التاجر حسابه ويتحكم في لوحة القيادة لتخصيص المنتجات والألوان.
                </p>
              </div>

              <div
                onClick={() => setActiveStep("store")}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  activeStep === "store" ? "border-dark bg-ligth/30" : "border-accent/60 bg-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 text-dark font-bold text-xs">
                  <Store size={15} className="text-brown" />
                  <span>٣. استقلال المتجر</span>
                </div>
                <p className="text-[11px] text-gray-500 font-normal leading-relaxed">
                  يظهر المتجر بنطاق فرعي مستقل وهوية بصرية كاملة لا تشبه أي متجر آخر.
                </p>
              </div>

              <div
                onClick={() => setActiveStep("client")}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  activeStep === "client" ? "border-dark bg-ligth/30" : "border-accent/60 bg-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 text-dark font-bold text-xs">
                  <ShoppingBag size={15} className="text-brown" />
                  <span>٤. شراء العميل</span>
                </div>
                <p className="text-[11px] text-gray-500 font-normal leading-relaxed">
                  يدخل العميل النهائي للمتجر مباشرة ويتسوق بأمان وتصل الأرباح للتاجر.
                </p>
              </div>
            </div>

          </div>

          {/* زر اتخاذ القرار للانطلاق */}
          <div className="mt-12 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-dark text-white rounded-xl hover:bg-dark/90 transition-all font-semibold text-sm shadow-md"
            >
              <span>ابدأ بإنشاء متجرك المستقل الآن</span>
              <ArrowLeft size={16} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}