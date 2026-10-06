import { Link } from "react-router-dom"
import {
  HiOutlineBuildingStorefront,
  HiOutlineGlobeAlt,
  HiOutlinePaintBrush,
  HiOutlineChartBarSquare,
  HiOutlineShoppingBag,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineChevronLeft,
  HiOutlineStar,
  HiOutlineArrowTrendingUp,
  HiOutlineCheckCircle
} from "react-icons/hi2"
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import api from "../../../services/api";
export default function Home() {
=======
import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import api from "../../../services/api";

// Hook لحساب تزايد الرقم من 0 إلى 99.9 خلال ثانية واحدة عند التمرير له
function useCounter(targetValue, duration = 1000, decimals = 1) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp = null;
    const startValue = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // حركة تسارع وتباطؤ انسيابية (Ease Out)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = startValue + (targetValue - startValue) * easeProgress;

      setCount(Number(current.toFixed(decimals)));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, targetValue, duration, decimals]);

  return { count, ref: elementRef };
}

export default function Home() {
  const { count: serverUptime, ref: statsRef } = useCounter(99.9, 1000, 1);
  const features = [
    {
      icon: HiOutlineGlobeAlt,
      title: "نطاق فرعي واستقلالية تامة",
      desc: "يحصل كل تاجر فور تسجيله على متجر منفصل بنطاق فرعي مخصص مع عزل آمن لقواعد البيانات والبيانات الحساسة.",
    },
    {
      icon: HiOutlinePaintBrush,
      title: "تخصيص الواجهة والهوية",
      desc: "تحكم كامل في مظهر متجرك: الألوان، الخطوط، الشعار، شكل بطاقات المنتجات، والأزرار بما يعكس هويتك التجارية.",
    },
    {
      icon: HiOutlineShoppingBag,
      title: "إدارة المنتجات والمخزون",
      desc: "أضف التصنيفات والمنتجات وسماتها المختلفة، وتابع حركة المخزون وتنبيهات النفاذ عبر لوحة تحكم ذكية.",
    },
    {
      icon: HiOutlineBuildingStorefront,
      title: "إدارة الطلبات والشحن",
      desc: "تتبع مسار الطلبات منذ إنشائها حتى التسليم، مع إدارة فواتير البيع وبيانات العملاء بسلاسة تامة.",
    },
    {
      icon: HiOutlineChartBarSquare,
      title: "تقارير وتحليلات فورية",
      desc: "لوحة إحصائيات متقدمة توضح حركة المبيعات، المنتجات الأكثر طلباً، ومعدلات التحويل لاتخاذ قرارات مدروسة.",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "أمان عالي وسرعة فائقة",
      desc: "شهادات أمان SSL مجانية، نسخ احتياطي تلقائي، وحماية فائقة ضد الهجمات الإلكترونية لضمان تشغيل دائم.",
    },
  ];
>>>>>>> 36f8532 (Initial commit)
  const staticReviews = [
    {
      _id: "static-1",
      name: "عمر السيد",
      role: "مالك متجر أزياء وإكسسوارات",
      initials: "ع.س",
      comment:
        "تجربة إنشاء المتجر كانت فائقة السهولة، لم أحتاج لأي مبرمج لبدء نشاطي. التخصيص الكامل للألوان وتنسيق البطاقات ساعدني في إبراز هويتي التجارية بدقة.",
      rating: 5,
    },
    {
      _id: "static-2",
      name: "مريم كريم",
      role: "مؤسسة علامة مستحضرات تجميل",
      initials: "م.ك",
      comment:
        "استقلالية النطاق الفرعي وعزل البيانات أعطاني راحة وأمان كامل. لوحة التحكم منظمة وتتيح متابعة كل طلب ومعرفة تفاصيل المبيعات اليومية بلمحة سريعة.",
      rating: 5,
    },
    {
      _id: "static-3",
      name: "أحمد منصور",
      role: "مؤسس متجر إلكترونيات",
      initials: "أ.م",
      comment:
        "الميزة الأهم بالنسبة لي هي سرعة إطلاق المتجر وربط بوابات الدفع في دقايق. الزباين مبسوطين جداً من سلاسة الطلب عبر الموبايل.",
      rating: 5,
    },
  ];

  const [reviews, setReviews] = useState(staticReviews);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. جلب الريفيوهات المتسجلة من الداتابيز ودمجها مع الثابتة
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await api.get("/reviews"); // تأكد من endpoint الخاص بك
        const dbReviews = res.data?.data || res.data || [];

        if (Array.isArray(dbReviews) && dbReviews.length > 0) {
          // دمج الثابت ثم المسجل في الداتابيز
          setReviews([...staticReviews, ...dbReviews]);
        }
      } catch (err) {
        // في حالة عدم توفر السيرفر حالياً نعتمد على الثابت فقط
        console.error("Failed to load reviews from DB:", err);
      }
    }

    fetchReviews();
  }, []);

  // حساب عدد الكروت المعروضة في الشاشة (كارتين في الشاشات العريضة، كارت في الموبايل)
  const itemsPerPage = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2;
  const maxIndex = Math.max(0, reviews.length - itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };
  return (
    <div className="bg-white text-gray-800" dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-white overflow-hidden">
        {/* خلفية بنمط شبكي وتدرج خفيف */}
        <div className="absolute inset-0 bg-ligth/20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3368a00f_1px,transparent_1px),linear-gradient(to_bottom,#3368a00f_1px,transparent_1px)] bg-[size:28px_28px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fadeIn">
            {/* الشارة العلوية */}


            {/* العنوان الرئيسي */}
<<<<<<< HEAD
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-dark mb-6 leading-[2.5] sm:leading-[2]">
              <span className="block mb-2 sm:mb-4">
                أنشئ متجرك الإلكتروني الخاص
              </span>

              <span className="block text-gray-700 font-medium text-3xl sm:text-5xl md:text-6xl">
                خلال دقائق وبنطاقك الخاص.
              </span>
            </h1>
=======
           <h1 className="flex flex-col gap-4 sm:gap-6 md:gap-7 font-bold text-dark mb-6 leading-normal sm:leading-relaxed">
  <span className="text-4xl sm:text-6xl md:text-7xl">
    أنشئ متجرك الإلكتروني الخاص
  </span>

  <span className="text-gray-700 font-medium text-3xl sm:text-5xl md:text-6xl">
    خلال دقائق وبنطاقك الخاص.
  </span>
</h1>
>>>>>>> 36f8532 (Initial commit)

            {/* الوصف التعريفي */}
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              افتح متجرك الإلكتروني باسمك وشغلك الخاص، وتابع منتجاتك وطلبات الزباين وأرباحك من مكان واحد بكل سهولة وبأمان تام
            </p>

            {/* أزرار الإجراء */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/register"
                className="group px-8 py-3.5 bg-dark text-white rounded-xl hover:bg-dark/90 shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 text-base font-semibold"
              >
                أنشئ متجرك مجاناً
                <HiOutlineChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/plans"
                className="px-8 py-3.5 border border-brown/40 text-dark bg-white rounded-xl hover:border-brown hover:bg-ligth/20 transition-all duration-300 text-base font-semibold"
              >
                خطط الأسعار
              </Link>
            </div>

            {/* محاكاة المعاينة / Subdomain Preview Bar */}
            <div className="max-w-xl mx-auto p-3 bg-white/90 backdrop-blur rounded-2xl border border-accent shadow-sm flex items-center justify-between text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-2 font-medium text-dark">
                <HiOutlineGlobeAlt className="w-5 h-5 text-brown" />
                رابط متجرك المستقل:
              </span>
              <span className="font-mono bg-ligth/40 text-dark px-3 py-1 rounded-md border border-accent">
                yourstore.mdkark.com
              </span>
            </div>

            {/* إحصائيات سريعة */}
<<<<<<< HEAD
            <div className="mt-16 grid grid-cols-2 md:grid-cols-6 gap-6 max-w-4xl mx-auto border-t border-accent/60 pt-10">
              <div></div>
              <div>
                <div className="text-3xl font-bold text-dark mb-1">+2,500</div>
                <div className="text-sm text-gray-500 font-normal">متجر نشط</div>
              </div>
              <div>

              </div><div></div>
              <div>
                <div className="text-3xl font-bold text-dark mb-1">0%</div>
=======
            {/* استبدل الـ div القديم بهذا الجزء */}
            <div
              ref={statsRef}
              className="mt-16 max-w-2xl mx-auto border-t border-accent/60 pt-10 flex flex-wrap items-center justify-around gap-8 text-center"
            >
              {/* الإحصائية الأولى: العداد التفاعلي */}
              <div className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight mb-1 font-mono">
                  {serverUptime}%
                </div>
                <div className="text-sm text-gray-500 font-normal">ضمان استقرار الخوادم</div>
              </div>

              {/* الإحصائية الثانية */}
              <div className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight mb-1 font-mono">
                  0%
                </div>
>>>>>>> 36f8532 (Initial commit)
                <div className="text-sm text-gray-500 font-normal">خبرة برمجية مطلوبة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - الميزات الأساسية للمنصة السحابية */}
      <section className="py-24 bg-white overflow-hidden" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* الترويسة */}
          <div className="text-center mb-20">
            <span className="text-sm font-bold text-brown uppercase tracking-wider block mb-2">
              حلول متكاملة للتجار
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mt-2">
              كل ما تحتاجه لإدارة وتوسيع تجارتك في مكان واحد
            </h2>
<<<<<<< HEAD

=======
>>>>>>> 36f8532 (Initial commit)
          </div>

          {/* حاوية الخط الزمني */}
          <div className="relative">
  {/* الخط الرأسي المركزي مع تأثير نبض خفيف أو توهج */}
  <span
    aria-hidden="true"
    className="absolute top-6 bottom-6 w-0.5 bg-gradient-to-b from-gray-200 via-brown/30 to-gray-200 right-4 md:right-1/2 md:translate-x-1/2 block pointer-events-none transition-all duration-700"
    style={{ zIndex: 1 }}
  />

  <div className="space-y-12 md:space-y-16 relative" style={{ zIndex: 2 }}>
    {features.map((feature, idx) => {
      const Icon = feature.icon;
      const isRight = idx % 2 === 0;

      return (
        <div
          key={idx}
          className={`relative flex items-center md:justify-between group/row ${
            isRight ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          {/* مساحة توازن في الشاشات العريضة */}
          <div className="hidden md:block md:w-[45%]" />

          {/* الدائرة المركزية مع أنيميشن نبض وتكبير عند الـ Hover */}
          <div className="absolute right-4 md:right-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-dark flex items-center justify-center shadow-md transition-all duration-300 group-hover/row:scale-125 group-hover/row:border-brown group-hover/row:shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-brown block transition-transform duration-300 group-hover/row:scale-110" />
          </div>

          {/* كارت المحتوى مع حركة ارتداد خفيفة للأعلى والجانب */}
          <div className="w-full pr-12 md:pr-0 md:w-[45%]">
            <div className="group p-6 sm:p-8 border border-gray-100 rounded-2xl hover:border-brown/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 bg-white">
              <div className="w-12 h-12 bg-accent/40 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/70 group-hover:rotate-6 transition-all duration-300">
                <Icon className="w-6 h-6 text-dark transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-dark mb-2 transition-colors duration-200 group-hover:text-brown">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                {feature.desc}
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

      {/* How It Works Section */}
      <section className="py-24 bg-ligth/30 border-y border-accent/40" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-brown uppercase tracking-wider">كيف تبدأ؟</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-3">
              ٣ خطوات بسيطة تفصلك عن <span className="font-bold text-dark">متجرك الإلكتروني</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center bg-white p-8 rounded-2xl border border-accent shadow-sm">
              <div className="w-16 h-16 bg-ligth/50 border border-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-dark">01</span>
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">سجل حسابك</h3>
              <p className="text-gray-600 text-sm font-normal leading-relaxed">
                انشئ حسابك الخاص للبدء في انشاء متجرك و البدء في العمل.
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-2xl border border-accent shadow-sm">
              <div className="w-16 h-16 bg-ligth/50 border border-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-dark">02</span>
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">اختر خطتك</h3>
              <p className="text-gray-600 text-sm font-normal leading-relaxed">
                اختر الخطة الافضل لنظامك حسب عدد منتجاتك و عملائك
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-2xl border border-accent shadow-sm">
              <div className="w-16 h-16 bg-ligth/50 border border-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-dark">03</span>
              </div>
<<<<<<< HEAD
              <h3 className="text-lg font-bold text-dark mb-3">خصص المظهر و ابدا البيع</h3>
=======
              <h3 className="text-lg font-bold text-dark mb-3">انشئ المتجر و ابدا شغلك</h3>
>>>>>>> 36f8532 (Initial commit)
              <p className="text-gray-600 text-sm font-normal leading-relaxed">
                حدد مظهر متجرك و اضف منتجاتك و ابدا البيع بعد مشاركة الرابط مع عملائك للبدء في استقبال طلبات البيع
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section dir="rtl" className="py-24 bg-white relative select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* الترويسة + أزرار الأسهم */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="text-right">
              <span className="text-sm font-bold text-brown uppercase tracking-wider block mb-2">
                قصص نجاح التجار
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                ماذا يقول <span className="font-bold text-dark">أصحاب المتاجر عنا؟</span>
              </h2>
            </div>

            {/* أزرار التنقل (Next / Prev) */}
            <div className="flex items-center gap-3 mt-6 md:mt-0">
              {/* في الـ RTL زر اليمين هو السابق وزر اليسار هو التالي */}
              <button
                onClick={handlePrev}
                aria-label="السابق"
                className="w-12 h-12 rounded-2xl border border-accent/80 bg-white hover:bg-ligth/20 hover:border-dark text-dark flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>

              <button
                onClick={handleNext}
                aria-label="التالي"
                className="w-12 h-12 rounded-2xl border border-accent/80 bg-white hover:bg-ligth/20 hover:border-dark text-dark flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>

          {/* حاوية الكاروسيل */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {reviews.map((rev, idx) => {
                const initials =
                  rev.initials ||
                  (rev.name
                    ? rev.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join(".")
                    : "ع.م");

                return (
                  <div
                    key={rev._id || idx}
                    className="w-full md:w-1/2 flex-shrink-0 px-3"
                  >
                    <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:border-brown/30 transition-all h-full flex flex-col justify-between">
                      <div>
                        {/* النجوم */}
                        <div className="flex items-center gap-1 mb-4 text-brown">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <HiOutlineStar key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>

                        {/* نص التقييم */}
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed font-normal">
                          "{rev.comment || rev.text || rev.content}"
                        </p>
                      </div>

                      {/* بيانات التاجر */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                        <div className="w-11 h-11 bg-accent/40 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-dark">{initials}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-dark">{rev.name}</p>
                          <p className="text-xs text-gray-500 font-normal">
                            {rev.role || "مالك متجر مستقل"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* نقاط المؤشر (Dots Indicators) */}
          <div className="flex justify-center items-center gap-1.5 mt-8">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === i ? "w-8 bg-dark" : "w-2 bg-accent"
                  }`}
                aria-label={`انتقال للشريحة ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-ligth/20 border-t border-accent/40 bg-dark">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8 ">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4 text-white">
            جاهز لإطلاق متجرك <span className="font-bold text-white">اليوم؟</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg font-normal text-white">
            ابدأ خطوتك النهاردة، واعرض بضاعتك وبيع لزباينك في كل مكان من متجرك الخاص بكل سهولة.          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-9 py-3.5 bg-white text-dark rounded-xl hover:bg-dark/90 shadow-md transition-all duration-300 text-base font-semibold"
          >
            ابدأ تجربتك المجانية

          </Link>
          <p className="text-xs text-gray-500 mt-6 font-normal text-white">
            تجربة مجانية لمدة 7 ايام · لا يلزم بطاقة دفع مسبقاً · إلغاء في أي وقت
          </p>
        </div>
      </section>
    </div>
  )
}