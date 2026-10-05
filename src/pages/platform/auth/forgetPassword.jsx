import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Sparkles, ShieldCheck, KeyRound } from "lucide-react";
import api from "../../../services/api";
import { showAlert } from "../../../services/alert";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  async function forgetPassword(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put("/users/forgot-password", {
        email: email,
      });

      setSent(true);
      showAlert({
        title: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
        icon: "success",
      });

      setTimeout(() => {
        navigate("/reset-password");
      }, 400);
    } catch (err) {
      showAlert({
        title: err.response?.data?.message || "حدث خطأ، يرجى المحاولة مرة أخرى",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden px-4 py-12"
    >
      {/* خلفية بتدرج لوني خفيف مع نمط هندسي */}
      <div className="absolute inset-0 bg-ligth/20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3368a00d_1px,transparent_1px),linear-gradient(to_bottom,#3368a00d_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10 animate-fadeIn">
        {/* رابط العودة لتسجيل الدخول */}
        <div className="mb-6 text-right">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-dark transition-colors"
          >
            <ArrowLeft size={14} className="rotate-180 text-brown" />
            <span>العودة لتسجيل الدخول</span>
          </Link>
        </div>

        {/* كارت استعادة كلمة المرور */}
        <div className="bg-white/95 backdrop-blur-sm border border-accent/80 rounded-3xl p-8 sm:p-10 shadow-lg shadow-dark/5">
          {/* الترويسة والشعار */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-accent/40 rounded-2xl border border-accent flex items-center justify-center mx-auto mb-4 shadow-sm">
              <KeyRound className="w-7 h-7 text-dark" strokeWidth={1.8} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              نسيت كلمة المرور؟
            </h1>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">
              أدخل بريدك الإلكتروني المسجل وسنرسل لك تعليمات استعادة الحساب
            </p>
          </div>

          {/* النموذج */}
          {!sent && (
            <form onSubmit={forgetPassword} className="space-y-5">
              {/* حقل البريد الإلكتروني */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-dark mb-2"
                >
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown w-4 h-4 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@store.com"
                    required
                    className="w-full pr-10 pl-4 py-3 bg-ligth/10 border border-accent/70 rounded-xl focus:outline-none focus:border-dark focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm transition-all"
                  />
                </div>
              </div>

              {/* زر الإرسال */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 bg-dark hover:bg-dark/90 text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>جاري إرسال الرابط...</span>
                  </span>
                ) : (
                  <>
                    <span>إرسال رابط إعادة التعيين</span>
                    <Sparkles
                      size={16}
                      className="text-accent group-hover:rotate-12 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>
          )}

          {/* خط فاصل ورابط العودة لتسجيل الدخول */}
          <div className="mt-8 pt-6 border-t border-accent/50 text-center">
            <p className="text-sm text-gray-500 font-normal">
              تذكرت كلمة المرور؟{" "}
              <Link
                to="/login"
                className="text-dark hover:text-brown font-bold transition-colors inline-flex items-center gap-1"
              >
                <span>تسجيل الدخول</span>
              </Link>
            </p>
          </div>
        </div>

        {/* شارة الأمان السفلية */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-6">
          <ShieldCheck size={15} className="text-brown" />
          <span>إعادة تعيين كلمة المرور محمية بروابط مشفرة لمرة واحدة فقط</span>
        </div>
      </div>
    </div>
  );
}