import React from "react"
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

export default function Home() {
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
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-gray-900 mb-6 leading-tight">
              أطلق متجرك الإلكتروني المستقل
              <br />
              <span className="font-bold text-dark">خلال دقائق وبنطاقك الخاص.</span>
            </h1>

            {/* الوصف التعريفي */}
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              منصة سحابية متطورة تمنحك متجراً متكاملاً بنطاق فرعي مخصص، مع عزل تام لبياناتك، ولوحة تحكم شاملة لإدارة المنتجات، الطلبات، والمدفوعات بكل سهولة.
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
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-accent/60 pt-10">
              <div>
                <div className="text-3xl font-bold text-dark mb-1">+2,500</div>
                <div className="text-sm text-gray-500 font-normal">متجر نشط</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-dark mb-1">+1.2M</div>
                <div className="text-sm text-gray-500 font-normal">طلب مكتمل</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-dark mb-1">99.9%</div>
                <div className="text-sm text-gray-500 font-normal">ضمان استقرار الخوادم</div>
              </div>
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
            <p className="text-gray-600 max-w-2xl mx-auto font-normal">
              صممت منصتنا ببنية تحتية معزولة تضمن سرعة متجرك وأمان معاملاتك مع أدوات تخصيص غير محدودة.
            </p>
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
              <h3 className="text-lg font-bold text-dark mb-3">سجل حسابك وحدد الرابط</h3>
              <p className="text-gray-600 text-sm font-normal leading-relaxed">
                اختر اسم متجرك ورابط النطاق الفرعي مثل (store.mdkark.com) بدون متطلبات معقدة.
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-2xl border border-accent shadow-sm">
              <div className="w-16 h-16 bg-ligth/50 border border-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-dark">02</span>
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">خصص المظهر والمنتجات</h3>
              <p className="text-gray-600 text-sm font-normal leading-relaxed">
                حدد ألوان متجرك وهوية علامتك، وارفع منتجاتك وصورها مع ضبط خيارات التسعير والمخزون.
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-2xl border border-accent shadow-sm">
              <div className="w-16 h-16 bg-ligth/50 border border-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-dark">03</span>
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">ابدأ البيع واستقبل الطلبات</h3>
              <p className="text-gray-600 text-sm font-normal leading-relaxed">
                شارك رابط متجرك مع زبائنك واستقبل طلبات الدفع والشراء وتابعها عبر هاتفك أو حاسوبك.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-brown uppercase tracking-wider">قصص نجاح التجار</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-3">
              ماذا يقول أصحاب المتاجر عنا؟
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:border-brown/30 transition-all">
              <div className="flex items-center gap-1 mb-4 text-brown">
                {[...Array(5)].map((_, i) => (
                  <HiOutlineStar key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed font-normal">
                "تجربة إنشاء المتجر كانت فائقة السهولة، لم أحتاج لأي مبرمج لبدء نشاطي. التخصيص الكامل للألوان وتنسيق البطاقات ساعدني في إبراز هويتي التجارية بدقة."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-accent/40 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-dark">ع.س</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-dark">عمر السيد</p>
                  <p className="text-xs text-gray-500 font-normal">مالك متجر أزياء وإكسسوارات</p>
                </div>
              </div>
            </div>

            <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:border-brown/30 transition-all">
              <div className="flex items-center gap-1 mb-4 text-brown">
                {[...Array(5)].map((_, i) => (
                  <HiOutlineStar key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed font-normal">
                "استقلالية النطاق الفرعي وعزل البيانات أعطاني راحة وأمان كامل. لوحة التحكم منظمة وتتيح متابعة كل طلب ومعرفة تفاصيل المبيعات اليومية بلمحة سريعة."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-accent/40 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-dark">م.ك</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-dark">مريم كريم</p>
                  <p className="text-xs text-gray-500 font-normal">مؤسسة علامة مستحضرات تجميل</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-ligth/20 border-t border-accent/40">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            جاهز لإطلاق متجرك <span className="font-bold text-dark">اليوم؟</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg font-normal">
            انضم الآن لمئات رواد الأعمال وابدأ بيع منتجاتك مباشرة لعملائك عبر متجرك المستقل.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-9 py-3.5 bg-dark text-white rounded-xl hover:bg-dark/90 shadow-md transition-all duration-300 text-base font-semibold"
          >
            ابدأ تجربتك المجانية
            <HiOutlineSparkles className="w-5 h-5 text-accent" />
          </Link>
          <p className="text-xs text-gray-500 mt-6 font-normal">
            تجربة مجانية لمدة 14 يوماً · لا يلزم بطاقة دفع مسبقاً · إلغاء في أي وقت
          </p>
        </div>
      </section>
    </div>
  )
}