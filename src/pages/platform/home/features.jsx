import React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  BadgePercent,
  Sliders,
  Database,
  Globe,
  Truck,
  CreditCard,
  BarChart3,
  BellRing,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Smartphone,
  CheckCircle2,
  Cpu
} from "lucide-react";

export default function Features() {
  // الركائز الثلاث الأساسية
  const corePillars = [
    {
      title: "متجرك جاهز في دقيقتين",
      description: "مش هتحتاج مبرمج ولا خبرة.. سجل واعرض بضاعتك وابدأ بيع فوراً من غير أي تأخير.",
      icon: Zap,
      badge: "جاهز في دقايق",
    },
    {
      title: "سريع وخفيف على الموبايل",
      description: "الموقع بيفتح في ثانية مع زبونك، سلس وسريع ومظبوط على كل أنواع الشاشات والموبايلات.",
      icon: Cpu,
      badge: "شغال ٢٤/٧ بدون تهنيج",
    },
    {
      title: "اشتراك واضح و 0% عمولة",
      description: "اشتراك شهري محدد وبس، ومفيش أي مصاريف مستخبية.. كل قرش يدخل من مبيعاتك بتاعك لوحدك.",
      icon: BadgePercent,
      badge: "كل أرباحك في جيبك",
    },
  ];

  // المزايا المقترحة والمفصلة للمنصة
  const featureList = [
    {
      title: "رابط خاص باسمك وعلامتك",
      description: "أول ما بتشترك بيطلعلك رابط مباشر باسم متجرك، وتقدر تربط دومينك الخاص براحتك في أي وقت.",
      icon: Globe,
      tag: "اسمك وهيبتك",
    },
    {
      title: "صمم متجرك على مزاجك",
      description: "تحكم بسهولة في الألوان، اللوجو، الخطوط، وشكل المنتجات عشان تليق بشغل البراند بتاعك.",
      icon: Sliders,
      tag: "الشكل والألوان",
    },
    {
      title: "بياناتك ومبيعاتك في سرية تامة",
      description: "حسابك مقفول ومحمي تماماً، ومفيش أي تاجر تاني يقدر يشوف أرقامك ولا تفاصيل زباينك.",
      icon: Database,
      tag: "الأمان والخصوصية",
    },
    {
      title: "طرق دفع مريحة لكل الزباين",
      description: "الزبون يدفع فيزا، محافظ كاش، أو حتى يختار الدفع وقت الاستلام.. اللي يريحه ويريّحك.",
      icon: CreditCard,
      tag: "الدفع والتحصيل",
    },
    {
      title: "تنبيه أول ما بضاعتك تقرب تخلص",
      description: "متابعة مستمرة للمقاسات والألوان المتبقية، ورسالة تنبيه عشان تلحق تزوّد المخزون قبل ما ينفد.",
      icon: BellRing,
      tag: "إدارة المخزن",
    },
    {
      title: "حساب مصاريف الشحن والمحافظات",
      description: "حدد سعر الشحن لكل محافظة بضغطة زر، وجهز بوالص الشحن وتابع التوصيل خطوة بخطوة.",
      icon: Truck,
      tag: "الشحن والتوصيل",
    },
    {
      title: "حسابات وتقارير تفهمك بيزنسك",
      description: "شاشة بسيطة بتعرفك كسبت كام، المنتجات الأكثر طلباً إيه، والطلبات اللي اتسلمت بنجاح.",
      icon: BarChart3,
      tag: "الأرقام والأرباح",
    },
    {
      title: "شراء سهل وسريع من الموبايل",
      description: "صفحة طلب مريحة ومختصرة عشان الزبون يطلب على طول من غير لف ودوران ولا تضييع وقت.",
      icon: Smartphone,
      tag: "سهولة الشراء",
    },
    {
      title: "حماية وتشفير مجاني للمتجر",
      description: "متجرك محمي بأعلى درجات الأمان وشهادات التشفير البنكية من غير ما تدفع مليم إضافي.",
      icon: ShieldCheck,
      tag: "أمان المتجر",
    },
  ];

  return (
    <div dir="rtl" className="bg-white text-gray-800 font-sans min-h-screen">
      {/* قسم الترويسة الرئيسي */}
      <section className="relative py-20 lg:py-24 bg-white overflow-hidden border-b border-accent/40">
        <div className="absolute inset-0 bg-ligth/20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3368a00d_1px,transparent_1px),linear-gradient(to_bottom,#3368a00d_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeIn">
<<<<<<< HEAD
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-accent/40 border border-accent text-dark text-xs font-bold mb-6">
            <span>بنيت لخدمة نجاحك التجاري</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 tracking-tight mb-4">
            <span className="font-bold text-dark">
            مميزات مصممة لتطلق متجرك <br />

            بسرعة فائقة وبأعلى جودة</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            جمعنا لك كل الأدوات التي تحتاجها للبيع والتوسع، في منصة واحدة باشتراك مرن وبدون تعقيدات تقنية.
=======
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-accent/40 border border-accent text-dark text-xs font-bold mb-6">
            <span>كل اللي تحتاجه عشان تجارتك تكبر</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-dark tracking-tight leading-snug sm:leading-normal mb-6">
  <span className="block mb-2">مميزات معمولالك مخصوص</span>
  <span className="block font-medium text-gray-700 text-2xl sm:text-4xl">
    عشان تفتح متجرك وتبيع من أول يوم
  </span>
</h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            جمعنالك كل الأدوات اللي بتسهل البيع وإدارة الطلبات في مكان واحد، باشتراك واضح ومن غير وجع دماغ تقني.
>>>>>>> 36f8532 (Initial commit)
          </p>
        </div>
      </section>

      {/* قسم الركائز الثلاث الأساسية: سرعة - جودة - سعر بسيط */}
      <section className="py-16 bg-ligth/20 border-b border-accent/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-accent/80 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-14 h-14 bg-accent/40 rounded-2xl border border-accent flex items-center justify-center text-dark">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 bg-ligth/40 text-dark rounded-full border border-accent">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-dark mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* شبكة المميزات المقترحة والتفصيلية */}
      <section className="py-20 bg-white">
<<<<<<< HEAD
      <div className="relative max-w-5xl mx-auto py-10">
  <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
    
    {/* الجانب الأيمن: 3 ميزات */}
    <div className="space-y-4 flex-1 w-full">
      {featureList.slice(0, 3).map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <div
            key={idx}
            className="p-5 bg-white border border-accent/70 rounded-2xl shadow-sm hover:border-dark hover:translate-x-2 transition-all flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/30 text-dark flex items-center justify-center flex-shrink-0">
              <Icon size={20} />
            </div>
            <div>
              <h5 className="text-sm font-bold text-dark">{feature.title}</h5>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{feature.description}</p>
            </div>
          </div>
        );
      })}
    </div>

    {/* المركز: النواة (المتجر الإلكتروني) */}
    <div className="w-48 h-48 rounded-full bg-dark text-white flex flex-col items-center justify-center text-center p-4 shadow-xl border-4 border-accent/40 flex-shrink-0 relative">
      
      <span className="font-bold text-base">متجرك المستقل</span>
      <span className="text-[11px] text-gray-300 mt-1">كل شيء متصل هنا</span>
    </div>

    {/* الجانب الأيسر: باقي الميزات */}
    <div className="space-y-4 flex-1 w-full">
      {featureList.slice(3, 6).map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <div
            key={idx}
            className="p-5 bg-white border border-accent/70 rounded-2xl shadow-sm hover:border-dark hover:-translate-x-2 transition-all flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/30 text-dark flex items-center justify-center flex-shrink-0">
              <Icon size={20} />
            </div>
            <div>
              <h5 className="text-sm font-bold text-dark">{feature.title}</h5>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{feature.description}</p>
            </div>
=======
        <div className="relative max-w-5xl mx-auto py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* الجانب الأيمن: 3 ميزات */}
            <div className="space-y-4 flex-1 w-full">
              {featureList.slice(0, 3).map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-accent/70 rounded-2xl shadow-sm hover:border-dark hover:translate-x-2 transition-all flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/30 text-dark flex items-center justify-center flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-dark">{feature.title}</h5>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* المركز: النواة (المتجر الإلكتروني) */}
            <div className="w-48 h-48 rounded-full bg-dark text-white flex flex-col items-center justify-center text-center p-4 shadow-xl border-4 border-accent/40 flex-shrink-0 relative">
              <span className="font-bold text-base">متجرك المستقل</span>
              <span className="text-[11px] text-gray-300 mt-1">كله متجمع هنا في مكان واحد</span>
            </div>

            {/* الجانب الأيسر: باقي الميزات */}
            <div className="space-y-4 flex-1 w-full">
              {featureList.slice(3, 6).map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-accent/70 rounded-2xl shadow-sm hover:border-dark hover:-translate-x-2 transition-all flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/30 text-dark flex items-center justify-center flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-dark">{feature.title}</h5>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

>>>>>>> 36f8532 (Initial commit)
          </div>
        );
      })}
    </div>

  </div>
</div>
      </section>

      {/* قسم الدعوة للبدء (CTA) */}
      <section className="py-20 bg-ligth/20 border-t border-accent/40 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            كل الإمكانيات دي بين إيديك <span className="font-bold text-dark">بأبسط تكلفة دلوقتي</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-8 font-normal">
            جرب بنفسك مجاناً لمدة ١٤ يوماً وشوف متجرك شغال ومكتمل باسمك وشعارك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-dark text-white rounded-xl hover:bg-dark/90 transition-all font-semibold text-sm shadow-md flex items-center gap-2 group"
            >
              <span>افتح متجرك وجربه مجاناً</span>
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/plans"
              className="px-8 py-3.5 border border-brown/40 text-dark bg-white rounded-xl hover:bg-ligth/20 transition-all font-semibold text-sm"
            >
              شوف خطط الأسعار
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}