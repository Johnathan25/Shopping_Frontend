import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../../../services/api"
import { showAlert } from "../../../services/alert"
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Store, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  Book
} from "lucide-react"

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    subdomain: "",
    email: "",
    password: "",
    confirmPassword: "",
    newSlug: ""
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // تنظيف النطاق الفرعي تلقائياً (أحرف إنجليزية صغيرة، أرقام وشرطات فقط)
    if (name === "newSlug") {
      const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, "")
      setForm(prev => ({ ...prev, newSlug: sanitized }))
      return
    }

    setForm(prev => ({ ...prev, [name]: value }))

    // التحقق من تطابق كلمة المرور
    if (name === "password") {
      setPasswordMatch(value === form.confirmPassword || form.confirmPassword === "")
    } else if (name === "confirmPassword") {
      setPasswordMatch(form.password === value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      showAlert({
        title: "كلمتا المرور غير متطابقتين",
        icon: "error"
      })
      return
    }

    if (form.password.length < 8) {
      showAlert({
        title: "يجب ألا تقل كلمة المرور عن 8 أحرف",
        icon: "error"
      })
      return
    }

    setLoading(true)

    try {
      // إرسال بيانات إنشاء حساب التاجر والمتجر المستقل
      const response = await api.post("/users/sign-up", {
        userName: form.name,
        phoneNumber: form.phoneNumber,
        subdomain: form.subdomain,
        email: form.email,
        password: form.password,
        newSlug: form.newSlug
      })

      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
      }

      showAlert({
        title: "تم إنشاء المتجر بنجاح! مرحباً بك",
        icon: "success"
      })

      navigate("/login")
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "تعذر إنشاء الحساب، يرجى المحاولة مرة أخرى."
      showAlert({
        title: errorMessage,
        icon: "error"
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
      {/* خلفية بتدرج ناعم وشبكة هندسية */}
      <div className="absolute inset-0 bg-ligth/20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3368a00d_1px,transparent_1px),linear-gradient(to_bottom,#3368a00d_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="max-w-xl w-full relative z-10 animate-fadeIn">
        
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

        {/* كارت التسجيل الرئيسي */}
        <div className="bg-white/95 backdrop-blur-sm border border-accent/80 rounded-3xl p-8 sm:p-10 shadow-lg shadow-dark/5">
          
          {/* الترويسة والشعار */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-accent/40 rounded-2xl border border-accent flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Store className="w-7 h-7 text-dark" strokeWidth={1.8} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              أنشئ متجرك الإلكتروني الآن
            </h1>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">
              ابدأ تجربتك المجانية واحصل على نطاق فرعي خاص ومساحة مستقلة لمشروعك
            </p>
          </div>

          {/* نموذج التسجيل */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1  gap-4">
              {/* الاسم الكامل */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-dark mb-1.5">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown w-4 h-4 pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="مثال: أحمد محمد"
                    required
                    className="w-full pr-10 pl-4 py-2.5 bg-ligth/10 border border-accent/70 rounded-xl focus:outline-none focus:border-dark focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm transition-all"
                  />
                </div>
              </div>

    
            </div>

          


            {/* البريد الإلكتروني */}
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
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="owner@domain.com"
                  required
                  className="w-full pr-10 pl-4 py-2.5 bg-ligth/10 border border-accent/70 rounded-xl focus:outline-none focus:border-dark focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm transition-all"
                />
              </div>
            </div>

                        <div>
              <label htmlFor="phoneNumber" className="block text-xs font-bold text-dark mb-1.5">
               رقم الهاتف
              </label>
              <div className="relative">
                <PhoneCall className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown w-4 h-4 pointer-events-none" />
                <input
                  id="phoneNumber"
                  type="phoneNumber"
                  dir="ltr"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="01270857659"
                  required
                  className="w-full pr-10 pl-4 py-2.5 bg-ligth/10 border border-accent/70 rounded-xl focus:outline-none focus:border-dark focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm transition-all"
                />
              </div>
            </div>

{/* slug */}

           <div>
              <label htmlFor="newSlug" className="block text-xs font-bold text-dark mb-1.5">
              ادخل نطاق فرعي لمتجرك 
              </label>
              <div className="relative">
                <Book className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown w-4 h-4 pointer-events-none" />
                <input
                  id="newSlug"
                  type="newSlug"
                  dir="ltr"
                  name="newSlug"
                  value={form.newSlug}
                  onChange={handleChange}
                  placeholder="مثال: myshop"
                  required
                  className="w-full pr-10 pl-4 py-2.5 bg-ligth/10 border border-accent/70 rounded-xl focus:outline-none focus:border-dark focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm transition-all"
                />
              </div>
            </div>

            {/* كلمات المرور */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* كلمة المرور */}
              <div>
                <label htmlFor="password" className="block text-xs font-bold text-dark mb-1.5">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown w-4 h-4 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="w-full pr-10 pl-10 py-2.5 bg-ligth/10 border border-accent/70 rounded-xl focus:outline-none focus:border-dark focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* تأكيد كلمة المرور */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-bold text-dark mb-1.5">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown w-4 h-4 pointer-events-none" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    dir="ltr"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className={`w-full pr-10 pl-10 py-2.5 bg-ligth/10 border rounded-xl focus:outline-none focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm transition-all ${
                      form.confirmPassword && !passwordMatch
                        ? "border-red-400 focus:border-red-500"
                        : "border-accent/70 focus:border-dark"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* مؤشر تطابق كلمة المرور */}
            {form.confirmPassword && (
              <div className="flex items-center gap-1.5 text-xs pt-1">
                {passwordMatch ? (
                  <>
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span className="text-emerald-600 font-medium">كلمتا المرور متطابقتان</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} className="text-red-500" />
                    <span className="text-red-500 font-medium">كلمتا المرور غير متطابقتين</span>
                  </>
                )}
              </div>
            )}

            {/* الشروط والأحكام */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 accent-dark border-accent rounded cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                أوافق على{" "}
                <Link to="/terms" className="text-dark hover:underline font-semibold">
                  شروط الاستخدام
                </Link>{" "}
                و{" "}
                <Link to="/privacy" className="text-dark hover:underline font-semibold">
                  سياسة الخصوصية
                </Link>{" "}
                الخاصة بالمنصة.
              </label>
            </div>

            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={loading || (!passwordMatch && form.confirmPassword !== "")}
              className="w-full py-3.5 mt-3 bg-dark hover:bg-dark/90 text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>جاري إنشاء المتجر والتهيئة...</span>
                </span>
              ) : (
                <>
                  <span>إطلاق متجري الآن</span>
                </>
              )}
            </button>
          </form>

          {/* رابط تسجيل الدخول */}
          <div className="mt-7 pt-5 border-t border-accent/50 text-center">
            <p className="text-sm text-gray-500 font-normal">
              لديك متجر بالفعل؟{" "}
              <Link 
                to="/login" 
                className="text-dark hover:text-brown font-bold transition-colors inline-flex items-center gap-1"
              >
                <span>تسجيل الدخول</span>
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}