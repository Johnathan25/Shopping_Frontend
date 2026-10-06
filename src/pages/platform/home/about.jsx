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
      title: "مدير النظام ",
      subtitle: "إدارة البنية التحتية",
      description:
      "فريق الدعم الفني المسؤول عن أمان وسرعة الموقع، استقرار شغلك 24 ساعة، وحماية بيانات مبيعاتك وزباينك عشان تركز في تجارتك وبس.",
      icon: ShieldCheck,
      badge: "الإدارة العليا",
    },
    {
      title: "التاجر المشترك ",
      subtitle: "صاحب المتجر المستقل",
      description:
"بيسجّل حسابه ويستلم متجره برابط واسم خاص بيه في دقايق. يقدر يختار ألوانه وتصميمه على ذوقه، ويدير بضاعته ومخزونه ومبيعاته كلها من لوحة تحكم سهلة وسريعة", 
      icon: Store,
      badge: "شريك النجاح",
    },
    {
      title: "المشتري النهائي ",
      subtitle: "المستهلك النهائي",
      description:
      "يدخل على متجرك بكل سهولة، يختار المنتجات اللي عجباه، يشتري ويدفع بالطريقة اللي تريحه، ويتابع خطوة بخطوة لحد ما الأوردر يوصله لحد باب البيت.",
      icon: ShoppingBag,
      badge: "العميل النهائي",
    },
  ];

  const pillars = [
    {
      title: "عزل تام للبيانات ",
      desc:"متجر منفصل وخاص بيك لوحدك، برابط مخصص لنشاطك، وحماية كاملة لحساباتك ومعاملاتك من غير أي تداخل مع غيرك.",
      icon: Server,
    },
    {
      title: "تخصيص بصري",
      desc:"تحكم كامل في مظهر متجرك؛ نسّق الألوان والأزرار والأقسام بالطريقة اللي تعجب زباينك وبكل سهولة وبدون أي مجهود تقني.", 
      icon: Palette,
    },
    {
      title: "سرعة وأداء فائق",
      desc:"سرعة عالية واستقرار مستمر؛ نظام قوي يستحمل آلاف الزوار والطلبات في نفس اللحظة بكفاءة عالية وبدون أي تهنيج.", 
      icon: Zap,
    },
    {
      title: "تجارة رقمية",
      desc:"ربط سريع وجاهز مع كل وسائل الدفع وشركات الشحن، عشان تدير توصيل طلباتك واستلام أرباحك من مكان واحد ومن غير أي مجهود.", 
      icon: Globe2,
    },
  ];

  return (
    <div dir="rtl" className="bg-white text-gray-800 font-sans min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden border-b border-accent/40">
        <div className="absolute inset-0 bg-ligth/20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3368a00d_1px,transparent_1px),linear-gradient(to_bottom,#3368a00d_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

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
        </div>
      </section>

      {/* Roles & Ecosystem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
              منظومة العمل المتكاملة
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
              <span className="font-bold text-dark">
              كيف تترابط أطراف المنصة؟</span>
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
                  className="bg-white border border-accent/80 rounded-3xl p-8 hover:border-brown/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-accent/40 rounded-2xl border border-accent flex items-center justify-center">
                        <Icon className="w-7 h-7 text-dark" strokeWidth={1.8} />
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1 bg-ligth/40 text-dark rounded-full border border-accent">
                        {role.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-dark mb-1">
                      {role.title}
                    </h3>
                    <p className="text-xs font-semibold text-brown mb-4">
                      {role.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {role.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-accent/40 flex items-center gap-2 text-xs text-gray-400">
                    <SlidersHorizontal size={14} className="text-brown" />
                    <span>صلاحيات وتجربة مستقلة 100%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
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
            </div>
          );
        })}
      </div>

    </div>

  </div>
</section>

      

      {/* CTA Section */}
      <section className="py-20 bg-ligth/20 border-t border-accent/40 text-center bg-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            <span className="font-bold text-white">
            جاهز للانضمام إلى مجتمع التجار؟</span>
          </h2>
          <p className="text-sm sm:text-base text-white mb-8 font-normal">
            احصل على نسختك من المتجر المستقل وابدأ البيع لعملائك بتجربة مخصصة لك بالكامل.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-white text-dark rounded-xl hover:bg-dark/90 transition-all font-semibold text-sm shadow-md flex items-center gap-2 group"
            >
              <span>ابدأ متجرك مجاناً</span>
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-3.5 border border-brown/40 text-dark bg-white rounded-xl hover:bg-ligth/20 transition-all font-semibold text-sm"
            >
              استعرض الخطط والأسعار
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}