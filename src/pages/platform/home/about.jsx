import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Store,
  Users,
  Palette,
  Sparkles,
  ArrowLeft,
  Server,
  Zap,
  Globe2,
  TrendingUp,
  SlidersHorizontal,
  ShoppingBag
} from "lucide-react";

export default function About() {
  const roles = [
    {
<<<<<<< HEAD
      title: "مدير النظام ",
      subtitle: "إدارة البنية التحتية",
      description:
      "فريق الدعم الفني المسؤول عن أمان وسرعة الموقع، استقرار شغلك 24 ساعة، وحماية بيانات مبيعاتك وزباينك عشان تركز في تجارتك وبس.",
=======
      title: "مدير النظام",
      subtitle: "إدارة البنية التحتية",
      description:
        "فريق الدعم الفني المسؤول عن أمان وسرعة الموقع، استقرار شغلك 24 ساعة، وحماية بيانات مبيعاتك وزباينك عشان تركز في تجارتك وبس.",
>>>>>>> 36f8532 (Initial commit)
      icon: ShieldCheck,
      badge: "الإدارة العليا",
    },
    {
<<<<<<< HEAD
      title: "التاجر المشترك ",
      subtitle: "صاحب المتجر المستقل",
      description:
"بيسجّل حسابه ويستلم متجره برابط واسم خاص بيه في دقايق. يقدر يختار ألوانه وتصميمه على ذوقه، ويدير بضاعته ومخزونه ومبيعاته كلها من لوحة تحكم سهلة وسريعة", 
=======
      title: "التاجر المشترك",
      subtitle: "صاحب المتجر المستقل",
      description:
        "بيسجّل حسابه ويستلم متجره برابط واسم خاص بيه في دقايق. يقدر يختار ألوانه وتصميمه على ذوقه، ويدير بضاعته ومخزونه ومبيعاته كلها من لوحة تحكم سهلة وسريعة.",
>>>>>>> 36f8532 (Initial commit)
      icon: Store,
      badge: "شريك النجاح",
    },
    {
<<<<<<< HEAD
      title: "المشتري النهائي ",
      subtitle: "المستهلك النهائي",
      description:
      "يدخل على متجرك بكل سهولة، يختار المنتجات اللي عجباه، يشتري ويدفع بالطريقة اللي تريحه، ويتابع خطوة بخطوة لحد ما الأوردر يوصله لحد باب البيت.",
=======
      title: "المشتري النهائي",
      subtitle: "المستهلك النهائي",
      description:
        "يدخل على متجرك بكل سهولة، يختار المنتجات اللي عجباه، يشتري ويدفع بالطريقة اللي تريحه، ويتابع خطوة بخطوة لحد ما الأوردر يوصله لحد باب البيت.",
>>>>>>> 36f8532 (Initial commit)
      icon: ShoppingBag,
      badge: "العميل النهائي",
    },
  ];

  const pillars = [
    {
<<<<<<< HEAD
      title: "عزل تام للبيانات ",
      desc:"متجر منفصل وخاص بيك لوحدك، برابط مخصص لنشاطك، وحماية كاملة لحساباتك ومعاملاتك من غير أي تداخل مع غيرك.",
=======
      title: "عزل تام للبيانات",
      desc: "متجر منفصل وخاص بيك لوحدك، برابط مخصص لنشاطك، وحماية كاملة لحساباتك ومعاملاتك من غير أي تداخل مع غيرك.",
>>>>>>> 36f8532 (Initial commit)
      icon: Server,
    },
    {
      title: "تخصيص بصري",
<<<<<<< HEAD
      desc:"تحكم كامل في مظهر متجرك؛ نسّق الألوان والأزرار والأقسام بالطريقة اللي تعجب زباينك وبكل سهولة وبدون أي مجهود تقني.", 
=======
      desc: "تحكم كامل في مظهر متجرك؛ نسّق الألوان والأزرار والأقسام بالطريقة اللي تعجب زباينك وبكل سهولة وبدون أي مجهود تقني.",
>>>>>>> 36f8532 (Initial commit)
      icon: Palette,
    },
    {
      title: "سرعة وأداء فائق",
<<<<<<< HEAD
      desc:"سرعة عالية واستقرار مستمر؛ نظام قوي يستحمل آلاف الزوار والطلبات في نفس اللحظة بكفاءة عالية وبدون أي تهنيج.", 
=======
      desc: "سرعة عالية واستقرار مستمر؛ نظام قوي يستحمل آلاف الزوار والطلبات في نفس اللحظة بكفاءة عالية وبدون أي تهنيج.",
>>>>>>> 36f8532 (Initial commit)
      icon: Zap,
    },
    {
      title: "تجارة رقمية",
<<<<<<< HEAD
      desc:"ربط سريع وجاهز مع كل وسائل الدفع وشركات الشحن، عشان تدير توصيل طلباتك واستلام أرباحك من مكان واحد ومن غير أي مجهود.", 
=======
      desc: "ربط سريع وجاهز مع كل وسائل الدفع وشركات الشحن، عشان تدير توصيل طلباتك واستلام أرباحك من مكان واحد ومن غير أي مجهود.",
>>>>>>> 36f8532 (Initial commit)
      icon: Globe2,
    },
  ];

  return (
    <div dir="rtl" className="bg-white text-gray-800 font-sans min-h-screen">
      <style>{`
        @keyframes fadeInSoft {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fade { animation: fadeInSoft 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden border-b border-accent/40">
        <div className="absolute inset-0 bg-ligth/20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3368a00d_1px,transparent_1px),linear-gradient(to_bottom,#3368a00d_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

<<<<<<< HEAD
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-accent/40 border border-accent text-dark text-xs font-bold mb-6">
            
            <span>رؤيتنا ورسالتنا</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-snug">
  نساعد التجار علي إنشاء <br />
  متاجر مستقلة بهوية خاصة
</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
مكان واحد بيسهّل عليك بداية تجارتك , بنقدملك متجر كامل وخاص بيك لوحدك، تقدر تظبط تصميمه على ذوقك وتدير منتجاتك وطلباتك بكل راحة واحترافية.          </p>
=======
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="anim-fade inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-accent/40 border border-accent text-dark text-xs font-bold mb-6 transition-transform hover:scale-105 duration-200">
            <span>رؤيتنا ورسالتنا</span>
          </div>

          <h1 className="anim-fade delay-1 text-3xl sm:text-5xl font-light text-gray-900 tracking-tight leading-snug sm:leading-tight mb-4">
            نساعد التجار على إنشاء <br />
            <span className="font-bold text-dark inline-block mt-1">متاجر مستقلة بهوية خاصة</span>
          </h1>

          <p className="anim-fade delay-2 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
            مكان واحد بيسهّل عليك بداية تجارتك، بنقدملك متجر كامل وخاص بيك لوحدك، تقدر تظبط تصميمه على ذوقك وتدير منتجاتك وطلباتك بكل راحة واحترافية.
          </p>
>>>>>>> 36f8532 (Initial commit)
        </div>
      </section>

      {/* Roles & Ecosystem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 anim-fade">
            <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
              منظومة العمل المتكاملة
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
<<<<<<< HEAD
              <span className="font-bold text-dark">
              كيف تترابط أطراف المنصة؟</span>
=======
              <span className="font-bold text-dark">كيف تترابط أطراف المنصة؟</span>
>>>>>>> 36f8532 (Initial commit)
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2">
              بنية ثلاثية تضمن لكل مستخدم التجربة والأدوات المناسبة لمهامه
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white border border-accent/80 rounded-3xl p-8 hover:border-dark hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-accent/40 rounded-2xl border border-accent flex items-center justify-center transition-colors duration-300 group-hover:bg-dark group-hover:border-dark">
                        <Icon className="w-7 h-7 text-dark group-hover:text-white transition-all duration-300 group-hover:scale-110" strokeWidth={1.8} />
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1 bg-ligth/40 text-dark rounded-full border border-accent transition-colors duration-300 group-hover:bg-dark/10">
                        {role.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-dark mb-1 group-hover:text-dark transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs font-semibold text-brown mb-4">
                      {role.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {role.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-accent/40 flex items-center gap-2 text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                    <SlidersHorizontal size={14} className="text-brown group-hover:rotate-45 transition-transform duration-300" />
                    <span>صلاحيات وتجربة مستقلة 100%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
<<<<<<< HEAD
    <section className="py-20 bg-ligth/20 border-y border-accent/40 select-none overflow-hidden">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* الترويسة */}
    <div className="text-center mb-20">
      <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
        القيمة والمميزات
      </span>
      <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
        ليه أصحاب المتاجر بيختاروا <span className="font-bold text-dark">منصتنا؟</span>
      </h2>
    </div>

    {/* الحاوية الأساسية */}
    <div className="relative">
      
      {/* الخط الرأسي المتصل - مضمون بستايل مباشر ولون واضح */}
      <span 
        aria-hidden="true"
        className="absolute top-4 bottom-4 w-0.5 bg-gray-400 right-4 md:right-1/2 md:translate-x-1/2 block pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="space-y-12 md:space-y-16 relative" style={{ zIndex: 2 }}>
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isRight = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`relative flex items-center md:justify-between ${
                isRight ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* مساحة موازنة للشاشات الكبيرة */}
              <div className="hidden md:block md:w-[44%]" />

              {/* النقطة المركزية التي تقع فوق الخط */}
              <div className="absolute right-4 md:right-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-dark flex items-center justify-center shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-brown block" />
              </div>

              {/* كارت المحتوى */}
              <div className="w-full pr-14 md:pr-0 md:w-[44%]">
                <div className="bg-white border border-accent/70 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-brown/40 transition-all duration-300">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 bg-accent/30 rounded-xl flex items-center justify-center flex-shrink-0 text-dark">
                      <Icon className="w-5 h-5 text-dark" strokeWidth={1.8} />
                    </div>
                    <h4 className="text-base font-bold text-dark">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
=======
      <section className="py-20 bg-ligth/20 border-y border-accent/40 select-none overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* الترويسة */}
          <div className="text-center mb-20">
            <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
              القيمة والمميزات
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
              ليه أصحاب المتاجر بيختاروا <span className="font-bold text-dark">منصتنا؟</span>
            </h2>
          </div>

          {/* الحاوية الأساسية */}
          <div className="relative">
            {/* الخط الرأسي المتصل */}
            <span 
              aria-hidden="true"
              className="absolute top-4 bottom-4 w-0.5 bg-gray-300 right-4 md:right-1/2 md:translate-x-1/2 block pointer-events-none"
              style={{ zIndex: 1 }}
            />

            <div className="space-y-12 md:space-y-16 relative" style={{ zIndex: 2 }}>
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isRight = idx % 2 === 0;

                return (
                  <div
                    key={idx}
                    className={`relative flex items-center md:justify-between ${
                      isRight ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                  >
                    {/* مساحة موازنة للشاشات الكبيرة */}
                    <div className="hidden md:block md:w-[44%]" />

                    {/* النقطة المركزية مع نبض تفاعلي هادئ */}
                    <div className="absolute right-4 md:right-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-dark flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-125">
                      <span className="w-2.5 h-2.5 rounded-full bg-brown block animate-ping opacity-75" />
                      <span className="w-2.5 h-2.5 rounded-full bg-brown block absolute" />
                    </div>

                    {/* كارت المحتوى */}
                    <div className="w-full pr-14 md:pr-0 md:w-[44%]">
                      <div className="group bg-white border border-accent/70 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-dark hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-3.5 mb-3">
                          <div className="w-10 h-10 bg-accent/30 rounded-xl flex items-center justify-center flex-shrink-0 text-dark transition-all duration-300 group-hover:bg-dark group-hover:text-white">
                            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} />
                          </div>
                          <h4 className="text-base font-bold text-dark">
                            {pillar.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
>>>>>>> 36f8532 (Initial commit)
            </div>
          );
        })}
      </div>

    </div>

  </div>
</section>

      

      {/* CTA Section */}
<<<<<<< HEAD
      <section className="py-20 bg-ligth/20 border-t border-accent/40 text-center bg-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            <span className="font-bold text-white">
            جاهز للانضمام إلى مجتمع التجار؟</span>
          </h2>
          <p className="text-sm sm:text-base text-white mb-8 font-normal">
=======
      <section className="py-20 bg-dark text-white border-t border-accent/40 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light mb-4">
            <span className="font-bold text-white">جاهز للانضمام إلى مجتمع التجار؟</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-200 mb-8 font-normal leading-relaxed">
>>>>>>> 36f8532 (Initial commit)
            احصل على نسختك من المتجر المستقل وابدأ البيع لعملائك بتجربة مخصصة لك بالكامل.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
<<<<<<< HEAD
              className="px-8 py-3.5 bg-white text-dark rounded-xl hover:bg-dark/90 transition-all font-semibold text-sm shadow-md flex items-center gap-2 group"
=======
              className="px-8 py-3.5 bg-white text-dark rounded-xl hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 font-semibold text-sm shadow-md flex items-center gap-2 group"
>>>>>>> 36f8532 (Initial commit)
            >
              <span>ابدأ متجرك مجاناً</span>
              <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform duration-200" />
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-3.5 border border-white/30 text-white bg-transparent rounded-xl hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 font-semibold text-sm"
            >
              استعرض الخطط والأسعار
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}