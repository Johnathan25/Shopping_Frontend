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
      title: "إطلاق فوري وسرعة استثنائية",
      description: "متجرك جاهز للعمل والبيع في أقل من دقيقتين دون انتظار أو الحاجة لأي مبرمج أو خبرة تقنية.",
      icon: Zap,
      badge: "جاهز في دقائق",
    },
    {
      title: "أعلى معايير الجودة السحابية",
      description: "بنية تحتية سريعة جداً وتصميم متجاوب 100% مع الهواتف والحواسب لضمان تجربة شراء سلسة وممتعة.",
      icon: Cpu,
      badge: "أداء 99.9%",
    },
    {
      title: "أسعار بسيطة و 0% عمولة",
      description: "اشتراك شهري واضح دون أي مصاريف خفية، مع احتفاظك بكامل أرباح مبيعاتك دون أي اقتطاع.",
      icon: BadgePercent,
      badge: "أرباحك كاملة لك",
    },
  ];

  // المزايا المقترحة والمفصلة للمنصة
  const featureList = [
    {
      title: "نطاق فرعي مخصص واستقلالية تامة",
      description: "يحصل كل تاجر فور التسجيل على رابط مستقل (store.mdkark.com) مع إمكانية ربط نطاقك الخاص لاحقاً.",
      icon: Globe,
      tag: "الهوية والاستقلالية",
    },
    {
      title: "محرر مظهر حي وتخصيص مرئي (Theme Customizer)",
      description: "تحكم كامل وفوري في ألوان المتجر، الخطوط، شكل البطاقات، تدوير الحواف، والظلال ليعكس هوية علامتك بدقة.",
      icon: Sliders,
      tag: "التصميم والتخصيص",
    },
    {
      title: "عزل كامل وآمن لقواعد البيانات (Data Isolation)",
      description: "بيانات متجرك، منتجاتك، وفواتير عملائك معزولة ومحمية بالكامل ولا يمكن لأي متجر آخر الوصول إليها.",
      icon: Database,
      tag: "الأمان والخصوصية",
    },
    {
      title: "تكامل سلس مع بوابات الدفع الإلكتروني",
      description: "دعم مدمج للدفع عبر البطاقات البنكية (Visa & Mastercard)، المحافظ الإلكترونية، ونظام الدفع عند الاستلام.",
      icon: CreditCard,
      tag: "المدفوعات",
    },
    {
      title: "إدارة المخزون والتنبيه التلقائي للنفاذ",
      description: "متابعة دقيقة لكميات المنتجات وتنوعاتها (المقاسات والألوان) مع إشعارات فورية عند اقتراب نفاذ أي صنف.",
      icon: BellRing,
      tag: "إدارة المنتجات",
    },
    {
      title: "ربط شركات الشحن وحساب التكلفة",
      description: "تحديد أسعار الشحن بحسب المحافظة أو المدينة مع إمكانية تصدير بوالص الشحن وتتبع حالة التوصيل بسهولة.",
      icon: Truck,
      tag: "اللوجستيات",
    },
    {
      title: "تقارير بيع ذكية ورؤى تحليليّة (Analytics)",
      description: "لوحة مؤشرات توضح صافي المبيعات، الطلبات المكتملة، والمنتجات الأكثر طلباً لاتخاذ قرارات تجارية سليمة.",
      icon: BarChart3,
      tag: "الإحصائيات والنمو",
    },
    {
      title: "تجربة تسوق مثالية عبر الموبايل (Mobile First)",
      description: "واجهات شراء فائقة السرعة مصممة خصيصاً لمستخدمي الهواتف الذكية مع خطوات دفع سريعة ترفع نسبة المبيعات.",
      icon: Smartphone,
      tag: "تجربة المستخدم",
    },
    {
      title: "شهادة أمان وتشفير SSL مجانية",
      description: "حماية فورية لجميع المعاملات والبيانات الحساسة عبر بروتوكولات تشفير بنكية متقدمة دون أي تكلفة إضافية.",
      icon: ShieldCheck,
      tag: "الحماية السحابية",
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/40 border border-accent text-dark text-xs font-bold mb-6">
            <Sparkles className="w-4 h-4 text-brown" />
            <span>بنيت لخدمة نجاحك التجاري</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 tracking-tight mb-4">
            مميزات مصممة لتطلق متجرك <br />
            <span className="font-bold text-dark">بسرعة فائقة وبأعلى جودة</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            جمعنا لك كل الأدوات التي تحتاجها للبيع والتوسع، في منصة سحابية واحدة باشتراك مرن وبدون تعقيدات تقنية.
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
              قدرات المنصة الشاملة
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
              كل ما تحتاجه لإدارة وتخصيص <span className="font-bold text-dark">متجرك السحابي</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureList.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl border border-accent/80 bg-white hover:border-brown/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-accent/30 flex items-center justify-center text-dark">
                        <Icon size={22} strokeWidth={1.8} />
                      </div>
                      <span className="text-[11px] font-bold text-brown bg-ligth/30 px-2.5 py-1 rounded-lg border border-accent/60">
                        {feature.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-dark mb-2.5">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-accent/40 flex items-center gap-1.5 text-xs font-semibold text-dark">
                    <CheckCircle2 size={15} className="text-brown" />
                    <span>متاح ومدمج وجاهز للاستخدام</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* قسم الدعوة للبدء (CTA) */}
      <section className="py-20 bg-ligth/20 border-t border-accent/40 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            امتلك كل هذه المميزات <span className="font-bold text-dark">بأقل تكلفة اليوم</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-8 font-normal">
            ابدأ تجربتك المجانية لمدة 14 يوماً واستمتع بمتجر مستقل متكامل ومخصص لهويتك بالكامل.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-dark text-white rounded-xl hover:bg-dark/90 transition-all font-semibold text-sm shadow-md flex items-center gap-2 group"
            >
              <span>أنشئ متجرك مجاناً</span>
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/plans"
              className="px-8 py-3.5 border border-brown/40 text-dark bg-white rounded-xl hover:bg-ligth/20 transition-all font-semibold text-sm"
            >
              استعراض خطط الأسعار
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}