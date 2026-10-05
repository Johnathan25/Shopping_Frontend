import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  CheckCircle2,
  Store,
  ArrowUpLeft,
} from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaTelegramPlane,
} from "react-icons/fa";

// الإعدادات الافتراضية لمنصة التجارة الإلكترونية السحابية
export const defaultPlatformSettings = {
  platformName: "منصة المتاجر",
  description: "المنصة السحابية المتكاملة لإنشاء وإدارة المتاجر الإلكترونية المستقلة بنطاق فرعي مخصص ودون تعقيد برمجي.",
  address: "القاهرة، جمهورية مصر العربية - مجمع الأعمال الذكي",
  phoneNumber: ["+20 100 123 4567", "+20 122 987 6543"],
  email: ["support@mdkark.com", "sales@mdkark.com"],
  socialMedia: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedIn: "https://linkedin.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
    telegram: "https://t.me",
  },
};

const Footer = ({ settings = defaultPlatformSettings }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  // أيقونات التواصل الاجتماعي
  const socialIcons = [
    { key: "facebook", Icon: FaFacebookF },
    { key: "instagram", Icon: FaInstagram },
    { key: "linkedIn", Icon: FaLinkedinIn },
    { key: "youtube", Icon: FaYoutube },
    { key: "tiktok", Icon: FaTiktok },
    { key: "telegram", Icon: FaTelegramPlane },
  ];

  // روابط المنصة السحابية
  const platformLinks = [
    { name: "عن المنصة", path: "/about" },
    { name: "المميزات", path: "/#features" },
    { name: "خطط الأسعار", path: "/pricing" },
    { name: "تواصل معنا", path: "/contact" },
    { name: "سياسة الاستخدام", path: "/terms" },
    { name: "الشكاوى والاقتراحات", path: "/complaints" },
  ];

  return (
    <footer className="bg-white border-t border-accent/40 font-sans" dir="rtl">
      {/* قسم النشرة البريدية - يظهر في الصفحة الرئيسية فقط */}
      {location.pathname === "/" && (
        <div className="bg-ligth/20 border-b border-accent/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-xs font-bold text-brown uppercase tracking-wider mb-2 block">
                النشرة الدورية
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-dark mb-2">
                كن أول من يعرف جديد التجارة السحابية
              </h3>
              <p className="text-gray-600 text-sm mb-8 font-normal">
                احصل على نصائح لنمو متجرك، وتحديثات الميزات، وأحدث أدوات المبيعات أولاً بأول.
              </p>

              <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-brown"
                      size={18}
                    />
                    <input
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pr-11 pl-4 py-3 bg-white border border-accent rounded-xl focus:ring-2 focus:ring-dark/20 focus:border-dark outline-none transition-all text-sm text-gray-800 placeholder:text-gray-400 font-normal"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-7 py-3 bg-dark hover:bg-dark/90 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <span>اشترك الآن</span>
                    <Send size={15} className="rotate-180" />
                  </button>
                </div>

                {subscribed && (
                  <div className="absolute -bottom-7 right-0 left-0 flex items-center justify-center gap-1.5 text-dark text-xs font-semibold animate-fadeIn">
                    <CheckCircle2 size={16} className="text-brown" /> 
                    تم اشتراكك بنجاح، شكراً لانضمامك!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* المحتوى الرئيسي للـ Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* هوية المنصة ووصفها */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-accent/40 flex items-center justify-center border border-accent group-hover:bg-accent/70 transition-colors">
                <Store className="w-5 h-5 text-dark" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-dark tracking-tight leading-tight">
                  {settings.platformName}
                </span>
                <span className="text-[10px] text-brown font-medium">سحابي متكامل</span>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-sm font-normal">
              {settings.description}
            </p>

            {/* أيقونات التواصل الاجتماعي */}
            <div className="flex flex-wrap gap-2.5">
              {socialIcons.map(({ key, Icon }) =>
                settings.socialMedia?.[key] ? (
                  <a
                    key={key}
                    href={settings.socialMedia[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-ligth/30 border border-accent/60 text-dark hover:bg-dark hover:text-white transition-all shadow-sm"
                    aria-label={key}
                  >
                    <Icon size={14} />
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* روابط سريعة */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-dark uppercase tracking-widest mb-6 border-r-2 border-brown pr-2.5">
              روابط سريعة
            </h4>
            <ul className="grid grid-cols-1 gap-3.5">
              {platformLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-dark text-sm font-normal transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowUpLeft 
                      size={14} 
                      className="text-brown opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" 
                    />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* بيانات الاتصال */}
          <div className="lg:col-span-5">
            <h4 className="text-xs font-bold text-dark uppercase tracking-widest mb-6 border-r-2 border-brown pr-2.5">
              تواصل معنا
            </h4>
            <div className="space-y-4">
              {/* العنوان */}
              {settings.address && (
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-accent/40 border border-accent flex items-center justify-center flex-shrink-0 text-dark">
                    <MapPin size={15} />
                  </div>
                  <span className="text-gray-600 text-sm leading-relaxed font-normal pt-1">
                    {settings.address}
                  </span>
                </div>
              )}

              {/* أرقام الهواتف */}
              {settings.phoneNumber?.some((p) => p !== "") && (
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-accent/40 border border-accent flex items-center justify-center flex-shrink-0 text-dark">
                    <Phone size={15} />
                  </div>
                  <div className="flex flex-col gap-1 pt-1" dir="ltr">
                    {settings.phoneNumber
                      .filter((p) => p !== "")
                      .map((phone, idx) => (
                        <a
                          key={idx}
                          href={`tel:${phone}`}
                          className="text-gray-600 hover:text-dark text-sm transition-colors text-right"
                        >
                          {phone}
                        </a>
                      ))}
                  </div>
                </div>
              )}

              {/* البريد الإلكتروني */}
              {settings.email?.some((e) => e !== "") && (
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-accent/40 border border-accent flex items-center justify-center flex-shrink-0 text-dark">
                    <Mail size={15} />
                  </div>
                  <div className="flex flex-col gap-1 pt-1" dir="ltr">
                    {settings.email
                      .filter((e) => e !== "")
                      .map((mail, idx) => (
                        <a
                          key={idx}
                          href={`mailto:${mail}`}
                          className="text-gray-600 hover:text-dark text-sm transition-colors text-right"
                        >
                          {mail}
                        </a>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="border-t border-accent/50 mt-14 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-normal">
            <div>
              جميع الحقوق محفوظة © {currentYear} لمنصة{" "}
              <span className="font-bold text-dark">
                {settings.platformName}
              </span>
            </div>

            <div className="flex items-center gap-1">
              صُنع بكل
              <Heart size={14} className="mx-1 text-red-500 fill-red-500 inline" />
              لأصحاب المتاجر والمبدعين
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;