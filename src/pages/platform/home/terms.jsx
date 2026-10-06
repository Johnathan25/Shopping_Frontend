import React from "react";
import { ShieldCheck, Store, CreditCard, Ban, RefreshCw, FileText } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: Store,
      title: "1. استخدام المنصة وإنشاء المتجر",
      points: [
        "بمجرد تسجيلك، بنوفرلك متجرك المستقل برابط واسم مخصص لنشاطك التجاري.",
        "أنت المسؤول الأول عن دقة البيانات والمنتجات والأسعار اللي بتعرضها لزباينك في متجرك.",
        "بيانات حسابك وكلمات السر مسؤوليتك الكاملة، وممنوع مشاركتها مع أطراف غير موثوقة.",
      ],
    },
    {
      icon: ShieldCheck,
      title: "2. ملكية البيانات والخصوصية",
      points: [
        "كل منتجاتك، صورك، وقواعد بيانات عملائك هي ملكك أنت بنسبة 100%، ولا يحق لنا بيعها أو استخدامها تجارياً.",
        "نلتزم بعزل بيانات متجرك وحمايتها تقنياً بأعلى معايير الأمان والتشفير.",
        "في حالة طلبك إغلاق الحساب، تقدر تسحب نسخة من بياناتك وطلباتك بكل سهولة.",
      ],
    },
    {
      icon: CreditCard,
      title: "3. الاشتراكات والدفع",
      points: [
        "يتم تجديد اشتراك باقتك الشهرية أو السنوية في موعدها المحدد لضمان استمرار الخدمة بدون انقطاع.",
      ],
    },
    {
      icon: Ban,
      title: "4. المنتجات والأنشطة المحظورة",
      points: [
        "يُمنع منعاً باتاً استخدام المنصة لبيع أي منتجات مخالفة للقانون، أو أدوية غير مرخصة، أو سلع مقلدة ومغشوشة.",
        "يُمنع أي نشاط يسبب ضرراً بالخوادم أو محاولات اختراق أو التعدي على حقوق الملكية الفكرية للغير.",
        "يحق للمنصة إيقاف أي متجر يخالف هذه البنود فوراً لحماية باقي المشتركين وسمعة المنصة.",
      ],
    },
    {
      icon: RefreshCw,
      title: "5. التحديثات والتعديلات",
      points: [
        "بنعمل باستمرار على تطوير المنصة وإضافة مميزات جديدة تخدم نمو تجارتك ومبيعاتك.",
        "في حالة وجود أي تعديل جوهري في بنود الخدمة أو خطط الأسعار، بيتم إخطارك قبلها بوقت كافٍ عبر بريدك الإلكتروني أو لوحة التحكم.",
      ],
    },
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-ligth/20 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* الترويسة الرئيسية */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="w-12 h-12 rounded-2xl bg-dark text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <FileText size={24} />
          </div>
          <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
            اتفاقية واضحة ومباشرة
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug mb-4">
            الشروط والأحكام
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            الهدف من هذه الشروط هو حفظ حقوقك كتاجر وضمان أفضل بيئة آمنة ومستقرة لتجارتك وزباينك، بعيداً عن التعقيد والمصطلحات الصعبة.
          </p>
          <span className="inline-block mt-4 text-xs font-medium text-gray-500 bg-white border border-accent/60 px-3 py-1 rounded-full">
            آخر تحديث: أكتوبر 2026
          </span>
        </div>

        {/* قائمة البنود */}
        <div className="space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-accent/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:border-brown/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/30 text-dark flex items-center justify-center flex-shrink-0">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-dark">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-2.5 pr-2 sm:pr-4">
                  {section.points.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="text-xs sm:text-sm text-gray-600 leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brown mt-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* سيكشن الاستفسارات / الدعم في الأسفل */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-accent/80 text-center">
          <h3 className="text-base font-bold text-dark mb-1">
            عندك أي استفسار بخصوص الشروط؟
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-4">
            فريقنا جاهز يجاوب على كل تساؤلاتك ويوضحلك أي تفاصيل في أي وقت.
          </p>
          <a
            href="mailto:support@platform.com"
            className="inline-flex items-center justify-center text-xs font-bold text-white bg-dark hover:bg-brown px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            تواصل مع فريق الدعم
          </a>
        </div>

      </div>
    </main>
  );
}