import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Building2,
  Crown,
  HelpCircle,
  ArrowLeft,
  ShieldCheck,
  Store
} from "lucide-react";

export default function Plans() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" | "yearly"

  // باقات الاشتراك
  const plans = [
    {
      id: "starter",
      name: "البداية (Starter)",
      badge: "للمبتدئين والمشاريع الصغيرة",
      popular: false,
      icon: Store,
      monthlyPrice: 299,
      yearlyPrice: 249, // سعر الشهر عند الدفع السنوي
      description: "الحل الأمثل لإطلاق أول متجر إلكتروني مستقل بنطاق فرعي مخصص وتجربة البيع المباشر.",
      features: [
        "نطاق فرعي مخصص (yourstore.mdkark.com)",
        "حتى 100 منتج",
        "تخصيص الألوان والشعار والخطوط",
        "لوحة تحكم لإدارة الطلبات والعملاء",
        "شهادة أمان SSL سحابية مجانية",
        "تقارير وإحصائيات مبيعات أساسية",
        "دعم فني عبر البريد الإلكتروني",
      ],
      notIncluded: [
        "ربط نطاق خاص مخصص (Custom Domain .com)",
        "تعديل متقدم لشكل بطاقات المنتجات والأقسام",
        "تكامل بوابات الدفع الإلكتروني المباشرة",
        "إدارة موظفين وصلاحيات متعددة",
      ],
      ctaText: "ابدأ بالباقة الأساسية",
    },
    {
      id: "pro",
      name: "النمو (Pro Business)",
      badge: "الأكثر طلباً للتجار",
      popular: true,
      icon: Zap,
      monthlyPrice: 699,
      yearlyPrice: 579,
      description: "مصممة للعلامات التجارية التي تتوسع وتحتاج لمرونة بصرية متقدمة وبوابات دفع متعددة.",
      features: [
        "كل مميزات باقة البداية",
        "عدد منتجات غير محدود",
        "إمكانية ربط دومين خاص (yourbrand.com)",
        "تحكم كامل في مظهر البطاقات والظلال والهيدر",
        "ربط بوابات الدفع الإلكتروني (فيزا، ماستركارد، فوري)",
        "حسابات موظفين (حتى 5 مشرفين)",
        "أكواد خصم وكوبونات ترويجية",
        "دعم فني سريع عبر الواتساب والمحادثة الحية",
      ],
      notIncluded: [
        "خادم سحابي مخصص وفائق السرعة",
        "مدير حساب شخصي واستشارات نمو",
      ],
      ctaText: "اختر باقة النمو",
    },
    {
      id: "enterprise",
      name: "الشركات (Enterprise)",
      badge: "للمتاجر الكبرى والماركات",
      popular: false,
      icon: Crown,
      monthlyPrice: 1499,
      yearlyPrice: 1249,
      description: "بنية تحتية مخصصة، عزل فائق للبيانات، وسرعة استجابة قصوى لآلاف المعاملات اليومية.",
      features: [
        "كل مميزات باقة النمو المتقدمة",
        "عدد لا محدود من المشرفين والصلاحيات",
        "سيرفر وموارد سحابية مخصصة لمتجرك",
        "تخصيص كامل لواجهة المتجر بنظام CSS مخصص",
        "تقارير متقدمة وتحليلات ذكاء أعمال (BI)",
        "أولوية قصوى للدعم الفني على مدار الساعة",
        "مدير حساب شخصي ومتابعة تقنية مخصصة",
        "تكامل مخصص عبر API مع أنظمة ERP والشحن",
      ],
      notIncluded: [],
      ctaText: "تواصل لحجز باقة الشركات",
    },
  ];

  // جدول مقارنة المميزات المفصل
  const comparisonCategories = [
    {
      category: "المتجر والهوية البصرية",
      features: [
        { name: "نطاق فرعي مخصص (.mdkark.com)", starter: "نعم", pro: "نعم", enterprise: "نعم" },
        { name: "ربط دومين خاص مخصص (.com / .net)", starter: false, pro: "نعم", enterprise: "نعم" },
        { name: "تخصيص الألوان والخطوط والشعار", starter: "نعم", pro: "نعم", enterprise: "نعم" },
        { name: "تخصيص أشكال البطاقات والأزرار والظلال", starter: "أساسي", pro: "شامل", enterprise: "كامل + CSS" },
        { name: "شهادة حماية وأمان SSL مجانية", starter: "نعم", pro: "نعم", enterprise: "نعم (متقدمة)" },
      ],
    },
    {
      category: "المنتجات والمبيعات",
      features: [
        { name: "الحد الأقصى للمنتجات", starter: "100 منتج", pro: "غير محدود", enterprise: "غير محدود" },
        { name: "إدارة المخزون والتنبيهات التلقائية", starter: "نعم", pro: "نعم", enterprise: "نعم" },
        { name: "بوابات الدفع الإلكتروني المباشرة", starter: "الدفع عند الاستلام", pro: "جميع البوابات", enterprise: "جميع البوابات + كوستوم" },
        { name: "إنشاء كوبونات وعروض التخفيض", starter: false, pro: "نعم", enterprise: "نعم" },
      ],
    },
    {
      category: "الإدارة والدعم الفني",
      features: [
        { name: "حسابات فريق العمل والموظفين", starter: "1 (المالك)", pro: "حتى 5", enterprise: "غير محدود" },
        { name: "تقارير وتحليلات المبيعات", starter: "أساسية", pro: "متقدمة", enterprise: "ذكاء أعمال (BI)" },
        { name: "قنوات الدعم الفني", starter: "البريد الإلكتروني", pro: "واتساب ومحادثة حية", enterprise: "مدير حساب مخصص 24/7" },
        { name: "موارد الخادم واستقرار الخدمة", starter: "99.5%", pro: "99.9%", enterprise: "99.99% سيرفر مخصص" },
      ],
    },
  ];

  // الأسئلة الشائعة حول الخطط
  const faqs = [
    {
      q: "هل يمكنني تغيير خطتي لاحقاً؟",
      a: "نعم بالتأكيد، يمكنك الترقية أو التخفيض بين الخطط في أي وقت من خلال لوحة تحكم متجرك مع احتساب الفارق تلقائياً.",
    },
    {
      q: "هل توجد أي عمولة على مبيعات متجري؟",
      a: "لا نأخذ أي نسبة أو عمولة على مبيعاتك إطلاقاً؛ كل ما تحققه من أرباح يذهب لحسابك بالكامل .",
    },
    {
      q: "كيف يعمل النطاق الفرعي؟",
      a: "فور التسجيل، يتم حجز رابط فوري لمتجرك مثل (yourstore.mdkark.com) يعمل بشكل فوري مع عزل كامل لقاعدة بياناتك وتصميمك.",
    },
    {
      q: "هل يوجد فترة تجريبية مجانية؟",
      a: "نعم، نقدم فترة تجربة مجانية لمدة 7 أيام بدون الحاجة لإدخال أي بطاقة بنكية لاختبار كافة الميزات.",
    },
  ];

  return (
    <div dir="rtl" className="bg-white text-gray-800 font-sans min-h-screen">
      {/* قسم الترويسة والتبديل بين الشهري والسنوي */}
      <section className="relative py-20 bg-white overflow-hidden border-b border-accent/40">
        <div className="absolute inset-0 bg-ligth/20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3368a00d_1px,transparent_1px),linear-gradient(to_bottom,#3368a00d_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/40 border border-accent text-dark text-xs font-bold mb-6">
            
            <span>تسعير واضح وشفاف بدون مصاريف خفية</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 tracking-tight mb-4">
            <span className="font-bold text-dark">
            اختر الخطة المناسبة لنمو تجارتك</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal mb-10">
            ابدأ بالباقة اللي تريحك وكبر تجارتك وقت ما تحب.. كل خطة معاها متجرك المستقل برابط واسم خاص بيك، وشكل على مزاجك، وأمان كامل لبياناتك.
          </p>

          {/* مفتاح التبديل (Monthly / Yearly Toggle) */}
          <div className="inline-flex items-center bg-ligth/30 p-1.5 rounded-2xl border border-accent">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-dark text-white shadow-sm"
                  : "text-gray-600 hover:text-dark"
              }`}
            >
              الدفع الشهري
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                billingCycle === "yearly"
                  ? "bg-dark text-white shadow-sm"
                  : "text-gray-600 hover:text-dark"
              }`}
            >
              <span>الدفع السنوي</span>
                خصم 20%
              
            </button>
          </div>
        </div>
      </section>

      {/* بطاقات الخطط الأساسية */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                    plan.popular
                      ? "bg-white border-2 border-dark shadow-xl shadow-dark/10 lg:-translate-y-2"
                      : "bg-white border border-accent/80 hover:border-brown/40 shadow-sm hover:shadow-md"
                  }`}
                >
                  {/* شارة الخطة الأكثر طلباً */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 right-1/2 translate-x-1/2 bg-dark text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                      الخيار الأفضل للتجار
                    </div>
                  )}

                  <div>
                    {/* ترويسة الخطة */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-dark mb-1">{plan.name}</h3>
                        <p className="text-xs text-brown font-semibold">{plan.badge}</p>
                      </div>
                      <div className="w-12 h-12 bg-accent/40 rounded-2xl border border-accent flex items-center justify-center text-dark">
                        <Icon size={24} strokeWidth={1.8} />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed font-normal">
                      {plan.description}
                    </p>

                    {/* السعر */}
                    <div className="mb-6 p-4 rounded-2xl bg-ligth/20 border border-accent/60">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-dark">{price}</span>
                        <span className="text-sm font-bold text-gray-600">جنيه مصري</span>
                        <span className="text-xs text-gray-400 font-normal">/ شهرياً</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">
                        {billingCycle === "yearly" ? "تُدفع سنوياً مع وفر شهرين كاملين" : "تجدد شهرياً وإلغاء في أي وقت"}
                      </p>
                    </div>

                    {/* قائمة المميزات */}
                    <div className="space-y-3 mb-8">
                      <p className="text-xs font-bold text-dark uppercase tracking-wider mb-2">
                        المميزات المتضمنة:
                      </p>
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <div className="w-4 h-4 rounded-full bg-accent/50 text-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}

                      {plan.notIncluded.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400 line-through">
                          <div className="w-4 h-4 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X size={12} strokeWidth={2} />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* زر الاشتراك */}
                  <Link
                    to={`/register?plan=${plan.id}&billing=${billingCycle}`}
                    className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 group ${
                      plan.popular
                        ? "bg-dark text-white hover:bg-dark/90 shadow-md hover:shadow-lg"
                        : "bg-ligth/30 text-dark border border-brown/40 hover:bg-dark hover:text-white"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* جدول المقارنة التفصيلي الشامل */}
      <section className="py-20 bg-ligth/10 border-t border-accent/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
              جدول المقارنة الكامل
            </span>
            <h2 className="text-3xl font-light text-gray-900">
              قارن المميزات بالتفصيل بين <span className="font-bold text-dark">كافة الخطط</span>
            </h2>
          </div>

          <div className="bg-white border border-accent/80 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-ligth/30 border-b border-accent/60">
                    <th className="py-5 px-6 text-sm font-bold text-dark w-2/5">الميزة</th>
                    <th className="py-5 px-4 text-sm font-bold text-dark text-center">البداية</th>
                    <th className="py-5 px-4 text-sm font-bold text-dark text-center bg-accent/20">النمو</th>
                    <th className="py-5 px-4 text-sm font-bold text-dark text-center">الشركات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent/40 text-xs sm:text-sm">
                  {comparisonCategories.map((group, groupIdx) => (
                    <React.Fragment key={groupIdx}>
                      {/* ترويسة المجموعة */}
                      <tr className="bg-ligth/10">
                        <td colSpan={4} className="py-3 px-6 text-xs font-bold text-brown uppercase">
                          {group.category}
                        </td>
                      </tr>
                      {/* عناصر المجموعة */}
                      {group.features.map((item, itemIdx) => (
                        <tr key={itemIdx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-6 font-medium text-gray-700">{item.name}</td>
                          
                          {/* عمود باقة البداية */}
                          <td className="py-4 px-4 text-center text-gray-600">
                            {typeof item.starter === "boolean" ? (
                              item.starter ? (
                                <Check size={16} className="text-emerald-600 mx-auto" />
                              ) : (
                                <X size={16} className="text-gray-300 mx-auto" />
                              )
                            ) : (
                              item.starter
                            )}
                          </td>

                          {/* عمود باقة النمو */}
                          <td className="py-4 px-4 text-center text-dark font-semibold bg-accent/10">
                            {typeof item.pro === "boolean" ? (
                              item.pro ? (
                                <Check size={16} className="text-emerald-600 mx-auto" />
                              ) : (
                                <X size={16} className="text-gray-300 mx-auto" />
                              )
                            ) : (
                              item.pro
                            )}
                          </td>

                          {/* عمود باقة الشركات */}
                          <td className="py-4 px-4 text-center text-gray-600">
                            {typeof item.enterprise === "boolean" ? (
                              item.enterprise ? (
                                <Check size={16} className="text-emerald-600 mx-auto" />
                              ) : (
                                <X size={16} className="text-gray-300 mx-auto" />
                              )
                            ) : (
                              item.enterprise
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الأسئلة الشائعة حول الاشتراكات */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
              الأسئلة المتكررة
            </span>
            <h2 className="text-3xl font-light text-gray-900">
              كل ما تحتاج لمعرفته عن <span className="font-bold text-dark">الاشتراكات</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-accent/80 bg-white hover:border-brown/40 shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/30 flex items-center justify-center text-dark flex-shrink-0 mt-0.5">
                    <HelpCircle size={18} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-dark mb-1.5">{faq.q}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* شارة الأمان السفلية */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-12">
            <ShieldCheck size={16} className="text-brown" />
            <span>دفع آمن بنسبة 100% مع ضمان استرجاع الأموال خلال 7 أيام</span>
          </div>
        </div>
      </section>
    </div>
  );
}