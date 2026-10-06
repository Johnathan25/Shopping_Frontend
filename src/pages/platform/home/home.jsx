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
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import api from "../../../services/api";
export default function Home() {
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
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-dark mb-6 leading-[2.5] sm:leading-[2]">
              <span className="block mb-2 sm:mb-4">
                أنشئ متجرك الإلكتروني الخاص
              </span>

              <span className="block text-gray-700 font-medium text-3xl sm:text-5xl md:text-6xl">
                خلال دقائق وبنطاقك الخاص.
              </span>
            </h1>

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
              <span className="font-mono bg-ligth/40 text-dark px-3 py-1 rounded-lg border border-accent">
                yourstore.mdkark.com
              </span>
            </div>

            {/* إحصائيات سريعة */}
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
                <div className="text-sm text-gray-500 font-normal">خبرة برمجية مطلوبة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - الميزات الأساسية للمنصة السحابية */}
      <section className="py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-brown uppercase tracking-wider">حلول متكاملة للتجار</span>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mt-3 mb-4">
              كل ما تحتاجه لإدارة وتوسيع تجارب البيع <span className="font-bold text-dark">في مكان واحد</span>
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 border border-gray-100 rounded-2xl hover:border-brown/40 hover:shadow-md transition-all duration-300 bg-white">
              <div className="w-14 h-14 bg-accent/40 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/70 transition-colors">
                <HiOutlineGlobeAlt className="w-7 h-7 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">نطاق فرعي واستقلالية تامة</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                يحصل كل تاجر فور تسجيله على متجر منفصل بنطاق فرعي مخصص مع عزل آمن لقواعد البيانات والبيانات الحساسة.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 border border-gray-100 rounded-2xl hover:border-brown/40 hover:shadow-md transition-all duration-300 bg-white">
              <div className="w-14 h-14 bg-accent/40 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/70 transition-colors">
                <HiOutlinePaintBrush className="w-7 h-7 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">تخصيص الواجهة والهوية</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                تحكم كامل في مظهر متجرك: الألوان، الخطوط، الشعار، شكل بطاقات المنتجات، والأزرار بما يعكس هويتك التجارية.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 border border-gray-100 rounded-2xl hover:border-brown/40 hover:shadow-md transition-all duration-300 bg-white">
              <div className="w-14 h-14 bg-accent/40 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/70 transition-colors">
                <HiOutlineShoppingBag className="w-7 h-7 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">إدارة المنتجات والمخزون</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                أضف التصنيفات والمنتجات وسماتها المختلفة، وتابع حركة المخزون وتنبيهات النفاذ عبر لوحة تحكم ذكية.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 border border-gray-100 rounded-2xl hover:border-brown/40 hover:shadow-md transition-all duration-300 bg-white">
              <div className="w-14 h-14 bg-accent/40 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/70 transition-colors">
                <HiOutlineBuildingStorefront className="w-7 h-7 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">إدارة الطلبات والشحن</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                تتبع مسار الطلبات منذ إنشائها حتى التسليم، مع إدارة فواتير البيع وبيانات العملاء بسلاسة تامة.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 border border-gray-100 rounded-2xl hover:border-brown/40 hover:shadow-md transition-all duration-300 bg-white">
              <div className="w-14 h-14 bg-accent/40 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/70 transition-colors">
                <HiOutlineChartBarSquare className="w-7 h-7 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">تقارير وتحليلات فورية</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                لوحة إحصائيات متقدمة توضح حركة المبيعات، المنتجات الأكثر طلباً، ومعدلات التحويل لاتخاذ قرارات مدروسة.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 border border-gray-100 rounded-2xl hover:border-brown/40 hover:shadow-md transition-all duration-300 bg-white">
              <div className="w-14 h-14 bg-accent/40 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/70 transition-colors">
                <HiOutlineShieldCheck className="w-7 h-7 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">أمان عالي وسرعة فائقة</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                شهادات أمان SSL مجانية، نسخ احتياطي تلقائي، وحماية فائقة ضد الهجمات الإلكترونية لضمان تشغيل دائم.
              </p>
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
              <h3 className="text-lg font-bold text-dark mb-3">خصص المظهر و ابدا البيع</h3>
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