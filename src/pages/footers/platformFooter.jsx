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
  MessageCircle
} from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

// الإعدادات الافتراضية لمنصة التجارة الإلكترونية السحابية
export const defaultPlatformSettings = {
  platformName: "منصة المتاجر",
<<<<<<< HEAD
  description: "كل اللي محتاجه عشان تبيع أونلاين في مكان واحد؛ متجر كامل باسمك، متابعة سهلة لطلبات زباينك، واستلام أرباحك أول بأول.",
  address:"القاهرة مصر",
  phoneNumber: ["+20 1094124323", "+201270857659"],
  email: ["johnathanibraheem7@gmail.com", "kiroloesreda@gmail.com"],
  socialMedia: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedIn: "https://linkedin.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
    telegram: "https://t.me",
  },
=======
  description: "كل اللي محتاجه عشان تبيع أونلاين في مكان واحد؛ متجر كامل باسمك، متابعة سهلة لطلبات زباينك.",
  address:"القاهرة مصر",
  phoneNumber: ["+20 1094124323", "+201270857659"],
  email: ["johnathanibraheem7@gmail.com", "kiroloesreda@gmail.com"],
 socialMedia: {
  facebook: import.meta.env.VITE_FACEBOOK_URL || "https://facebook.com",
  instagram: import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com",
  linkedIn: import.meta.env.VITE_LINKEDIN_URL || "https://linkedin.com",
  youtube: import.meta.env.VITE_YOUTUBE_URL || "https://youtube.com",
  tiktok: import.meta.env.VITE_TIKTOK_URL || "https://tiktok.com",
  telegram: import.meta.env.VITE_TELEGRAM_URL || "https://t.me",

 whatsapp: import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/201000000000",
},
>>>>>>> 36f8532 (Initial commit)
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
    { key: "whatsapp", Icon: FaWhatsapp },
  ];

  // روابط المنصة السحابية
  const platformLinks = [
    { name: "عن المنصة", path: "/about" },
    { name: "المميزات", path: "/#features" },
    { name: "خطط الأسعار", path: "/plans" },
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
                كن أول من يعرف كل جديد
              </h3>
              <p className="text-gray-600 text-sm mb-8 font-normal">
                احصل على نصائح لنمو متجرك، وتحديثات الميزات، وأحدث أدوات المبيعات أولاً بأول.
              </p>

              <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
                  <a
                    href="https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK" // ضع رابط جروب الواتساب هنا
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg active:scale-98"
                  >
                    {/* أيقونة الواتساب SVG مدمجة ونقية */}
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>انضم لجروب التجار على واتساب</span>
                  </a>
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
                  <div className="w-8 h-8 rounded-md bg-accent/40 border border-accent flex items-center justify-center flex-shrink-0 text-dark">
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
                  <div className="w-8 h-8 rounded-md bg-accent/40 border border-accent flex items-center justify-center flex-shrink-0 text-dark">
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
                  <div className="w-8 h-8 rounded-md bg-accent/40 border border-accent flex items-center justify-center flex-shrink-0 text-dark">
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

            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;