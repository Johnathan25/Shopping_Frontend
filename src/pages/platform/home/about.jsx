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
      title: "مدير النظام (Super Admin)",
      subtitle: "إدارة البنية التحتية",
      description:
        "المسؤول عن مراقبة أداء المنصة المركزية، استقرار الخوادم السحابية، إدارة خطط الاشتراكات وبوابات الدفع، وضمان عزل وحماية بيانات المتاجر المشتركة.",
      icon: ShieldCheck,
      badge: "الإدارة العليا",
    },
    {
      title: "التاجر المشترك (Customer / Merchant)",
      subtitle: "صاحب المتجر المستقل",
      description:
        "يشترك في المنصة ويحصل على متجره بنطاق فرعي مخصص (subdomain). يتحكم بالكامل في الهوية البصرية (الألوان، الخطوط، شكل البطاقات)، ويدير المنتجات والمخزون والمبيعات عبر لوحة تحكم ذكية.",
      icon: Store,
      badge: "شريك النجاح",
    },
    {
      title: "المشتري النهائي (Client / Shopper)",
      subtitle: "المستهلك النهائي",
      description:
        "يدخل على أي متجر من المتاجر المستقلة للتصفح والشراء السلس، مع تجربة تسوق سريعة، طرق دفع متعددة، وتتبع مباشر لحالة الطلب والشحن.",
      icon: ShoppingBag,
      badge: "العميل النهائي",
    },
  ];

  const pillars = [
    {
      title: "عزل تام للبيانات (Multi-Tenancy)",
      desc: "لكل تاجر بيئته وقاعدة بياناته الخاصة مع نطاق فرعي فريد، مما يضمن أقصى معايير الخصوصية والأمان.",
      icon: Server,
    },
    {
      title: "تخصيص بصري لا محدود",
      desc: "حرية كاملة للتاجر في اختيار الألوان، الخطوط، أشكال الأزرار، وتنسيق أقسام واجهة متجره دون لمس سطر برمجي.",
      icon: Palette,
    },
    {
      title: "سرعة وأداء فائق",
      desc: "بنية سحابية مصممة للتعامل مع آلاف الزيارات وعمليات الشراء المتزامنة بكفاءة واستقرار دائم.",
      icon: Zap,
    },
    {
      title: "تجارة رقمية بلا حدود",
      desc: "حل متكامل يربط المتاجر ببوابات الدفع الإلكتروني وشركات الشحن بسلاسة تامة لتمكين التاجر من النمو.",
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/40 border border-accent text-dark text-xs font-bold mb-6">
            <Sparkles className="w-4 h-4 text-brown" />
            <span>رؤيتنا ورسالتنا</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight mb-6 leading-tight">
            نمكّن التجّار من إطلاق <br />
            <span className="font-bold text-dark">متاجر مستقلة بهوية فريدة</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
            منصتنا هي حل سحابي متطور (Multi-Tenant SaaS) صُمم ليختصر رحلة إطلاق التجارة الإلكترونية؛ حيث نوفر منصة مركزية قوية تمنح كل تاجر متجراً منعزلاً بالكامل وقابلاً للتخصيص الشامل ليخدم عملاءه بأعلى مستويات الاحترافية.
          </p>
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
              كيف تترابط <span className="font-bold text-dark">أطراف المنصة؟</span>
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
      <section className="py-20 bg-ligth/20 border-y border-accent/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
              القيمة التقنية
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
              لماذا يختار أصحاب المتاجر <span className="font-bold text-dark">منصتنا؟</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-accent/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-accent/30 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-dark" strokeWidth={1.8} />
                  </div>
                  <h4 className="text-base font-bold text-dark mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-accent/80 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
                  الرسالة والهدف
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-dark mb-4 leading-tight">
                  التحكم الكامل بمتجرك، دون عبء التكاليف التقنية.
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal mb-4">
                  هدفنا هو إلغاء الحاجة لتوظيف فرق تطوير وتكبد ميزانيات بناء المتاجر من الصفر. نقدم لكل تاجر بيئة برمجية جاهزة بالكامل تُمكنه من تعديل ألوانه، وتصميم صفحته، ومتابعة مبيعاته بلمسات بسيطة.
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold text-dark">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={16} className="text-brown" />
                    <span>توسع سريع</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-brown" />
                    <span>أمان مستمر</span>
                  </div>
                </div>
              </div>

              <div className="bg-ligth/30 border border-accent/60 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="border-b border-accent/50 pb-3">
                  <h5 className="text-sm font-bold text-dark mb-1">الاستقلالية التامة</h5>
                  <p className="text-xs text-gray-500 font-normal">نطاق فرعي مخصص يحمل اسم علامتك دون ظهور اسم منصتنا للزبائن.</p>
                </div>
                <div className="border-b border-accent/50 pb-3">
                  <h5 className="text-sm font-bold text-dark mb-1">مرونة المظهر</h5>
                  <p className="text-xs text-gray-500 font-normal">لوحة تحكم حية تعاين التعديلات على شكل البطاقات، والخطوط، والظلال فورياً.</p>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-dark mb-1">بنية سحابية تحت الطلب</h5>
                  <p className="text-xs text-gray-500 font-normal">نظام يتسع لنمو تجارتك من أول طلب حتى مئات الآلاف شهرياً.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ligth/20 border-t border-accent/40 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            جاهز للانضمام إلى <span className="font-bold text-dark">مجتمع التجار؟</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-8 font-normal">
            احصل على نسختك من المتجر المستقل وابدأ البيع لعملائك بتجربة مخصصة لك بالكامل.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-dark text-white rounded-xl hover:bg-dark/90 transition-all font-semibold text-sm shadow-md flex items-center gap-2 group"
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