import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { 
  User, 
  Store, 
  Menu, 
  X, 
  Sparkles 
} from "lucide-react"

export default function Navbar({ platformName = "منصة المتاجر" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

const navLinks = [
  { name: "الرئيسية", path: "/" },
  { name: "المميزات", path: "/features" },
  { name: "كيف تعمل؟", path: "/how-it-works" },
  { name: "خطط الأسعار", path: "/plans" },
  { name: "عن المنصة", path: "/about" },
  { name: "تواصل معنا", path: "/contact" },
  { name: "الشكاوى", path: "/complaints" },
  { name: "سياسة الاستخدام", path: "/terms" },
]

  return (
    <nav 
      dir="rtl" 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-accent/60 shadow-sm py-3" 
          : "bg-white border-b border-gray-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          
          {/* Desktop Buttons - أزرار الدخول والتسجيل */}
          <div className="hidden md:flex md:items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-dark hover:text-brown border border-transparent hover:border-accent rounded-md transition-colors inline-flex items-center gap-1.5"
            >
              <User className="w-4 h-4 text-brown" strokeWidth={2} />
              <span>تسجيل الدخول</span>
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-semibold bg-dark text-white rounded-md hover:bg-dark/90 shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5"
            >
              <span>أنشئ متجرك مجاناً</span>
            </Link>
          </div>

          {/* Desktop Menu - الروابط للشاشات الكبيرة */}
          <div className="hidden md:flex md:items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium text-gray-600 hover:text-dark transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-brown after:absolute after:bottom-0 after:right-0 after:transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>

<<<<<<< HEAD
          {/* Desktop Buttons - أزرار الدخول والتسجيل */}
          <div className="hidden md:flex md:items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-dark hover:text-brown border border-transparent hover:border-accent rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <User className="w-4 h-4 text-brown" strokeWidth={2} />
              <span>تسجيل الدخول</span>
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-semibold bg-dark text-white rounded-lg hover:bg-dark/90 shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5"
            >
              <span>أنشئ متجرك مجاناً</span>
            </Link>
          </div>

=======
            
          {/* Logo - شعار منصة التجارة */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-accent/40 flex items-center justify-center border border-accent group-hover:bg-accent/70 transition-colors">
              <Store className="w-5 h-5 text-dark" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-dark tracking-tight leading-tight">
                {platformName}
              </span>
              <span className="text-[10px] text-brown font-medium">سحابي متكامل</span>
            </div>
          </Link>
>>>>>>> 36f8532 (Initial commit)
          {/* Mobile Menu Button - زر القائمة للموبايل */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-md bg-ligth/30 border border-accent hover:bg-ligth/60 transition-colors"
            aria-label="القائمة الرئيسية"
          >
            {isOpen ? (
              <X className="text-dark w-5 h-5" strokeWidth={2} />
            ) : (
              <Menu className="text-dark w-5 h-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[450px] opacity-100 border-b border-accent/60 shadow-lg" : "max-h-0 opacity-0"
        } bg-white`}
      >
        <div className="px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-dark hover:bg-ligth/20 rounded-md transition-colors"
            >
              {item.name}
            </Link>
          ))}
          
          <div className="border-t border-accent/40 my-3"></div>
          
          <div className="flex flex-col gap-2 pt-1">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-dark border border-brown/30 rounded-md hover:bg-ligth/20 transition-colors"
            >
              <User className="w-4 h-4 text-brown" strokeWidth={2} />
              <span>تسجيل الدخول</span>
            </Link>
            
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold bg-dark text-white rounded-md hover:bg-dark/90 transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-accent" strokeWidth={2} />
              <span>أنشئ متجرك مجاناً</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}