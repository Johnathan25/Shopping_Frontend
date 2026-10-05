import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../../../services/api"
import { showAlert } from "../../../services/alert"
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Store, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck,
  Building2
} from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post("/users/login", { email, password })
      localStorage.setItem("token", res.data.accessToken)
      const decoded = jwtDecode(res.data.accessToken)

      showAlert({
        title: "تم تسجيل الدخول بنجاح",
        icon: "success",
      })

      // التوجيه بحسب دور المستخدم في المنصة السحابية
      if (decoded.role === "customer" ) {
        navigate("/customer_dashboard")
      } else if (decoded.role === "admin") {
        navigate("/admin_dashboard")
      } else {
        navigate("/")
      } 
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "تعذر تسجيل الدخول، يُرجى التأكد من البيانات المدخلة."
      showAlert({
        title: errorMsg,
        icon: "error",
      })
    } finally {
      setLoading(false)
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
        
        {/* رابط العودة للرئيسية */}
        <div className="mb-6 text-right">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-dark transition-colors"
          >
            <ArrowLeft size={14} className="rotate-180 text-brown" />
            <span>العودة للصفحة الرئيسية</span>
          </Link>
        </div>

        {/* كارت تسجيل الدخول */}
        <div className="bg-white/95 backdrop-blur-sm border border-accent/80 rounded-3xl p-8 sm:p-10 shadow-lg shadow-dark/5">
          
          {/* الترويسة والشعار */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-accent/40 rounded-2xl border border-accent flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Store className="w-7 h-7 text-dark" strokeWidth={1.8} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              مرحباً بك مجدداً
            </h1>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">
              سجّل دخولك للوصول إلى لوحة تحكم متجرك السحابي
            </p>
          </div>

          {/* نموذج الدخول */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* حقل البريد الإلكتروني */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-dark mb-2">
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

            {/* حقل كلمة المرور */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-bold text-dark">
                  كلمة المرور
                </label>
                <Link 
                  to="/forget-password" 
                  className="text-xs text-brown hover:text-dark font-medium transition-colors"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown w-4 h-4 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pr-10 pl-11 py-3 bg-ligth/10 border border-accent/70 rounded-xl focus:outline-none focus:border-dark focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                  aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* زر تسجيل الدخول */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-dark hover:bg-dark/90 text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>جاري التحقق والدخول...</span>
                </span>
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <Sparkles size={16} className="text-accent group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* خط فاصل ورابط إنشاء حساب */}
          <div className="mt-8 pt-6 border-t border-accent/50 text-center">
            <p className="text-sm text-gray-500 font-normal">
              ليس لديك متجر بعد؟{" "}
              <Link 
                to="/register" 
                className="text-dark hover:text-brown font-bold transition-colors inline-flex items-center gap-1"
              >
                <span>ابدأ بإنشاء متجرك مجاناً</span>
              </Link>
            </p>
          </div>
        </div>

        {/* شارة الأمان السفلية */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-6">
          <ShieldCheck size={15} className="text-brown" />
          <span>اتصال مشفر وآمن عبر بنية تحتية سحابية مستقلة</span>
        </div>
      </div>
    </div>
  )
}