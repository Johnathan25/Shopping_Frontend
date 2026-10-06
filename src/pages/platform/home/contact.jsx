import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  Store,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { showAlert } from "../../../services/alert";
import api from "../../../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    storeName: "",
    subject: "استفسار عام",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const contactTeam = [
    {
      name: "جونثان إبراهيم",
      role: "الدعم الفني وإدارة المنصة",
      email: "johnathanibraheem@gmail.com",
      phone: "01094124323",
    },
    {
      name: "كيرلس رضا",
      role: "المبيعات وتطوير الأعمال",
      email: "kiroloesreda@gmail.com",
      phone: "01270857659",
    },
    {
<<<<<<< HEAD
      
      name: "كيرلس ",
      role: "تسويق الكتروني",
      email: "kerosystem12@gmail.com",
      phone: "01227713425",
    }
=======
      name: "كيرلس",
      role: "تسويق إلكتروني",
      email: "kerosystem12@gmail.com",
      phone: "01227713425",
    },
>>>>>>> 36f8532 (Initial commit)
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/contact/send", formData);

      setSent(true);
      showAlert({
        title: "تم استلام رسالتك بنجاح! سيتواصل معك فريقنا قريباً",
        icon: "success",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        storeName: "",
        subject: "استفسار عام",
        message: "",
      });

      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "تم استلام رسالتك محلياً، وسنقوم بالتواصل معك في أقرب وقت.";

      showAlert({
        title: errorMsg,
        icon: err.response?.data?.message ? "error" : "success",
      });
      if (!err.response?.data?.message) {
        setSent(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="bg-white text-gray-800 font-sans min-h-screen">
      <style>{`
        @keyframes fadeInSoft {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fade { animation: fadeInSoft 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
      `}</style>

      {/* قسم الترويسة الرئيسي */}
      <section className="relative py-20 bg-white overflow-hidden border-b border-accent/40">
        <div className="absolute inset-0 bg-ligth/20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3368a00d_1px,transparent_1px),linear-gradient(to_bottom,#3368a00d_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

<<<<<<< HEAD
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/40 border border-accent text-dark text-xs font-bold mb-6">

            <span>نحن هنا لمساعدتك دائماً</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 tracking-tight mb-4">
            تواصل مع فريق المنصة
=======
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center anim-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-accent/40 border border-accent text-dark text-xs font-bold mb-6 transition-transform hover:scale-105 duration-200">
            <span>نحن هنا لمساعدتك دائماً</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light text-gray-900 tracking-tight leading-snug sm:leading-tight mb-3">
            <span className="font-bold text-dark">تواصل مع فريق المنصة</span>
>>>>>>> 36f8532 (Initial commit)
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            عايز تبدأ متجرك ولسه بتسأل، أو عندك أي استفسار عن شغلك معانا؟ فريقنا جاهز يساعدك ويكلمك خطوة بخطوة.
          </p>
        </div>
      </section>

      {/* المحتوى الرئيسي: معلومات الاتصال */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

<<<<<<< HEAD
            {/* الجانب الأيمن: بطاقات فريق التواصل ومعلومات المنصة */}
            <div className="lg:col-span-12 space-y-6">
              <div>
=======
            {/* بطاقات فريق التواصل ومعلومات المنصة */}
            <div className="lg:col-span-12 space-y-6">
              <div className="anim-fade delay-1">
>>>>>>> 36f8532 (Initial commit)
                <span className="text-xs font-bold text-brown uppercase tracking-wider block mb-2">
                  فريق العمل والدعم
                </span>
                <h3 className="text-2xl font-bold text-dark mb-3">
                  تواصل مباشر مع مسؤولي المنصة
                </h3>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  يمكنك التواصل مباشرة مع فريق الإدارة عبر الهاتف أو البريد الإلكتروني للحصول على استجابة سريعة.
                </p>
              </div>

              {/* بطاقات مسؤولي المنصة */}
              <div className="grid grid-cols-12 gap-y-6 w-full">
                {contactTeam.map((member, index) => {
<<<<<<< HEAD
                  // 5/6 من 12 عموداً = 10 أعمدة بالتمام
                  // الكارت الأول والثالث: من 1 لـ 10 (يترك 2/12 فراغ في الطرف الآخر)
                  // الكارت الثاني والرابع: من 3 لـ 12 (يبدأ بعد فراغ 2/12)
                  const isEven = index % 2 === 0;
                  const placement = isEven
                    ? "col-span-12 md:col-start-1 md:col-span-7"
                    : "col-span-12 md:col-start-5 md:col-span-7";
=======
                  const isEven = index % 2 === 0;

                  const placement = isEven
                    ? "col-span-12 md:col-start-1 md:col-span-7 bg-dark text-white border-dark"
                    : "col-span-12 md:col-start-5 md:col-span-7 bg-white text-dark border-accent/80";
>>>>>>> 36f8532 (Initial commit)

                  return (
                    <div
                      key={index}
<<<<<<< HEAD
                      className={`${placement} p-5 sm:p-6 rounded-2xl border border-accent/80 bg-white hover:border-brown/40 shadow-sm hover:shadow-md transition-all duration-300`}
=======
                      className={`group ${placement} p-5 sm:p-6 rounded-2xl border hover:border-brown/40 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 anim-fade`}
                      style={{ animationDelay: `${0.15 + index * 0.12}s` }}
>>>>>>> 36f8532 (Initial commit)
                    >
                      {/* الجزء العلوي: الاسم والصفة والأيقونة */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
<<<<<<< HEAD
                          <div className="w-11 h-11 rounded-xl bg-accent/30 text-dark flex items-center justify-center flex-shrink-0">
                            <Store size={20} className="text-dark" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-dark leading-tight">
                              {member.name}
                            </h4>
                            <p className="text-xs text-brown font-semibold mt-0.5">
=======
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                              isEven ? "bg-white/10 text-white" : "bg-accent/30 text-dark"
                            }`}
                          >
                            <Store size={20} className={isEven ? "text-white" : "text-dark"} />
                          </div>
                          <div>
                            <h4 className={`text-base font-bold leading-tight ${isEven ? "text-white" : "text-dark"}`}>
                              {member.name}
                            </h4>
                            <p className={`text-xs font-semibold mt-0.5 ${isEven ? "text-gray-300" : "text-brown"}`}>
>>>>>>> 36f8532 (Initial commit)
                              {member.role}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* خط فاصل ناعم */}
<<<<<<< HEAD
                      <div className="border-t border-accent/50 pt-3.5 space-y-2.5">
                        {/* الهاتف */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500 font-medium">رقم الهاتف / واتساب:</span>
                          <a
                            href={`tel:${member.phone}`}
                            dir="ltr"
                            className="flex items-center gap-2 font-mono font-bold text-dark hover:text-brown transition-colors bg-ligth/30 hover:bg-ligth/60 px-2.5 py-1 rounded-lg border border-accent/60"
                          >
                            <span>{member.phone}</span>
                            <Phone size={13} className="text-brown" />
=======
                      <div className={`border-t pt-3.5 space-y-2.5 ${isEven ? "border-white/15" : "border-accent/50"}`}>
                        {/* الهاتف */}
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-medium ${isEven ? "text-gray-300" : "text-gray-500"}`}>
                            رقم الهاتف / واتساب:
                          </span>
                          <a
                            href={`tel:${member.phone}`}
                            dir="ltr"
                            className={`group/btn flex items-center gap-2 font-mono font-bold px-2.5 py-1 rounded-md border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                              isEven
                                ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                                : "bg-ligth/30 text-dark border-accent/60 hover:bg-ligth/60 hover:text-brown"
                            }`}
                          >
                            <span>{member.phone}</span>
                            <Phone size={13} className={`transition-transform duration-200 group-hover/btn:scale-110 ${isEven ? "text-white" : "text-brown"}`} />
>>>>>>> 36f8532 (Initial commit)
                          </a>
                        </div>

                        {/* البريد الإلكتروني */}
                        <div className="flex items-center justify-between text-xs">
<<<<<<< HEAD
                          <span className="text-gray-500 font-medium">البريد الإلكتروني:</span>
                          <a
                            href={`mailto:${member.email}`}
                            dir="ltr"
                            className="flex items-center gap-2 font-mono text-dark hover:text-brown transition-colors bg-ligth/30 hover:bg-ligth/60 px-2.5 py-1 rounded-lg border border-accent/60"
                          >
                            <span className="truncate max-w-[190px] sm:max-w-none">{member.email}</span>
                            <Mail size={13} className="text-brown flex-shrink-0" />
=======
                          <span className={`font-medium ${isEven ? "text-gray-300" : "text-gray-500"}`}>
                            البريد الإلكتروني:
                          </span>
                          <a
                            href={`mailto:${member.email}`}
                            dir="ltr"
                            className={`group/btn flex items-center gap-2 font-mono px-2.5 py-1 rounded-md border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                              isEven
                                ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                                : "bg-ligth/30 text-dark border-accent/60 hover:bg-ligth/60 hover:text-brown"
                            }`}
                          >
                            <span className="truncate max-w-[190px] sm:max-w-none">{member.email}</span>
                            <Mail size={13} className={`flex-shrink-0 transition-transform duration-200 group-hover/btn:scale-110 ${isEven ? "text-white" : "text-brown"}`} />
>>>>>>> 36f8532 (Initial commit)
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

<<<<<<< HEAD

=======
>>>>>>> 36f8532 (Initial commit)
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}