import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  KeyRound, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  CheckCircle2
} from "lucide-react";
import api from "../../../services/api";
import { showAlert } from "../../../services/alert";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  async function resetPassword(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put("/users/reset-password", {
        email,
        resetCode,
        newPassword,
      });

      setSuccess(true);
      showAlert({
        title: "تم تغيير كلمة المرور بنجاح، جاري التحويل لتسجيل الدخول...",
        icon: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
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

        {/* كارت إعادة تعيين كلمة المرور */}
        <div className="bg-white/95 backdrop-blur-sm border border-accent/80 rounded-3xl p-8 sm:p-10 shadow-lg shadow-dark/5">
          {/* الترويسة والشعار */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-accent/40 rounded-2xl border border-accent flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-7 h-7 text-dark" strokeWidth={1.8} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              إعادة تعيين كلمة المرور
            </h1>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">
              أدخل رمز التحقق المرسل لبريدك الإلكتروني، ثم عيّن كلمة المرور الجديدة
            </p>
          </div>

          {/* النموذج */}
          {!success ? (
            <form onSubmit={resetPassword} className="space-y-4">
              {/* حقل البريد الإلكتروني */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-dark mb-1.5">
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
                    className="w-full pr-10 pl-4 py-2.5 bg-ligth/10 border border-accent/70 rounded-xl focus:outline-none focus:border-dark focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm transition-all"
                  />
                </div>
              </div>

              {/* حقل رمز التحقق */}
              <div>
                <label htmlFor="resetCode" className="block text-xs font-bold text-dark mb-1.5">
                  رمز التحقق (الكود)
                </label>
                <div className="relative">
                  <KeyRound className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown w-4 h-4 pointer-events-none" />
                  <input
                    id="resetCode"
                    type="text"
                    dir="ltr"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="رمز التحقق (6 أرقام)"
                    maxLength={6}
                    required
                    className="w-full pr-10 pl-4 py-2.5 bg-ligth/10 border border-accent/70 rounded-xl focus:outline-none focus:border-dark focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm font-mono tracking-widest transition-all"
                  />
                </div>
              </div>

              {/* حقل كلمة المرور الجديدة */}
              <div>
                <label htmlFor="newPassword" className="block text-xs font-bold text-dark mb-1.5">
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown w-4 h-4 pointer-events-none" />
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="w-full pr-10 pl-11 py-2.5 bg-ligth/10 border border-accent/70 rounded-xl focus:outline-none focus:border-dark focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">يجب ألا تقل عن 8 خانات</p>
              </div>

              {/* زر التحديث */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 bg-dark hover:bg-dark/90 text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>جاري حفظ كلمة المرور...</span>
                  </span>
                ) : (
                  <>
                    <span>تحديث كلمة المرور</span>
                    
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 animate-fadeIn">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-1">تم التحديث بنجاح!</h3>
              <p className="text-sm text-gray-500 font-normal">
                جاري توجيهك لصفحة تسجيل الدخول تلقائياً...
              </p>
            </div>
          )}

          {/* خط فاصل ورابط إعادة الإرسال */}
          <div className="mt-8 pt-6 border-t border-accent/50 text-center">
            <p className="text-sm text-gray-500 font-normal">
              لم يصلك رمز التحقق؟{" "}
              <Link
                to="/forget-password"
                className="text-dark hover:text-brown font-bold transition-colors inline-flex items-center gap-1"
              >
                <span>إعادة الإرسال</span>
              </Link>
            </p>
          </div>
        </div>

      
      </div>
    </div>
  );
}