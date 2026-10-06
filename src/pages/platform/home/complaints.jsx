import React, { useState } from "react";
import {
  AlertCircle,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  HelpCircle,
} from "lucide-react";

export default function ComplaintsPage() {
  const [formData, setFormData] = useState({
    storeName: "",
    phone: "",
    category: "technical",
    subject: "",
    details: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // إرسال البيانات للـ Backend أو API
    setSubmitted(true);
  };

  return (
    <main dir="rtl" className="min-h-screen bg-ligth/20 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* الترويسة الرئيسية */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 rounded-2xl bg-dark text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <AlertCircle size={24} />
          </div>
          <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
            صوتك وملاحظاتك تهمنا
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug mb-4">
            الشكاوى والمقترحات
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            واجهتك مشكلة في متجرك أو عندك فكرة حابب تشوفها في المنصة؟ اكتبلنا
            تفاصيلها، وفريق الدعم الفني هيتابع معاك خطوة بخطوة لحد ما نحلها.
          </p>
        </div>

        {/* كروت التطمين السريعة */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border border-accent/70 rounded-2xl p-4.5 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-accent/30 text-dark flex items-center justify-center flex-shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-dark">رد سريع</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">خلال 24 ساعة كحد أقصى</p>
            </div>
          </div>

          <div className="bg-white border border-accent/70 rounded-2xl p-4.5 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-accent/30 text-dark flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-dark">متابعة مباشرة</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">مع فريق الإدارة المختص</p>
            </div>
          </div>

          <div className="bg-white border border-accent/70 rounded-2xl p-4.5 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-accent/30 text-dark flex items-center justify-center flex-shrink-0">
              <HelpCircle size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-dark">حلول عملية</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">نضمن استقرار شغلك دايمًا</p>
            </div>
          </div>
        </div>

        {/* نموذج تقديم الشكوى أو رسالة النجاح */}
        <div className="bg-white border border-accent/80 rounded-3xl p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">
                تم استلام رسالتك بنجاح!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
                فريق الدعم بيراجع التفاصيل حالياً وهنتواصل معاك على رقمك المسجل
                في أقرب وقت ممكن.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-dark bg-ligth/40 border border-accent hover:bg-ligth px-5 py-2.5 rounded-xl transition-all"
              >
                إرسال ملاحظة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* اسم المتجر */}
                <div>
                  <label className="block text-xs font-bold text-dark mb-2">
                    اسم متجرك أو الرابط:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: متجر الأناقة"
                    value={formData.storeName}
                    onChange={(e) =>
                      setFormData({ ...formData, storeName: e.target.value })
                    }
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-accent/80 focus:border-dark focus:outline-none bg-white transition-colors"
                  />
                </div>

                {/* رقم الهاتف / واتساب */}
                <div>
                  <label className="block text-xs font-bold text-dark mb-2">
                    رقم الهاتف / واتساب للتواصل:
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="01xxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-accent/80 focus:border-dark focus:outline-none bg-white transition-colors text-right"
                  />
                </div>
              </div>

              {/* نوع الرسالة */}
              <div>
                <label className="block text-xs font-bold text-dark mb-2">
                  نوع الرسالة:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "technical", label: "عطل فني في المتجر" },
                    { id: "payment", label: "المدفوعات والاشتراك" },
                    { id: "suggestion", label: "اقتراح ميزة جديدة" },
                    { id: "other", label: "موضوع آخر" },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() =>
                        setFormData({ ...formData, category: cat.id })
                      }
                      className={`text-xs font-semibold py-2.5 px-3 rounded-xl border transition-all text-center ${
                        formData.category === cat.id
                          ? "bg-dark text-white border-dark shadow-sm"
                          : "bg-white text-gray-700 border-accent/70 hover:border-brown/40"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* عنوان الشكوى / الموضوع */}
              <div>
                <label className="block text-xs font-bold text-dark mb-2">
                  الموضوع باختصار:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مشكلة في استقبال طلبات الدفع الإلكتروني"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-accent/80 focus:border-dark focus:outline-none bg-white transition-colors"
                />
              </div>

              {/* التفاصيل الكاملة */}
              <div>
                <label className="block text-xs font-bold text-dark mb-2">
                  تفاصيل المشكلة أو المقترح:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="اشرحلنا المشكلة بالتفصيل، وإيه اللي ظهرلك على الشاشة عشان نقدر نساعدك بسرعة..."
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm p-4 rounded-xl border border-accent/80 focus:border-dark focus:outline-none bg-white transition-colors leading-relaxed"
                />
              </div>

              {/* زر الإرسال */}
              <button
                type="submit"
                className="w-full py-3.5 bg-dark hover:bg-brown text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>إرسال الشكوى</span>
                <Send size={15} />
              </button>
            </form>
          )}
        </div>

        {/* بديل التواصل الفوري في الأسفل */}
        <div className="mt-8 p-5 rounded-2xl bg-white border border-accent/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/30 text-dark flex items-center justify-center flex-shrink-0">
              <Phone size={18} className="text-dark" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-dark">
                المشكلة عاجلة ومحتاج تدخل فوري؟
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-500">
                فريق الدعم الفني متاح للمحادثة السريعة لحل أي عطل طارئ.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/201000000000"
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <MessageSquare size={14} />
            <span>كلمنا واتساب مباشرة</span>
          </a>
        </div>

      </div>
    </main>
  );
}