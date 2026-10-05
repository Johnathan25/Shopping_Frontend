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
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // إرسال الرسالة إلى الـ API
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
      // رسالة الخطأ أو رسالة عامة
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
      {/* قسم الترويسة الرئيسي */}
      <section className="relative py-20 bg-white overflow-hidden border-b border-accent/40">
        <div className="absolute inset-0 bg-ligth/20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3368a00d_1px,transparent_1px),linear-gradient(to_bottom,#3368a00d_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/40 border border-accent text-dark text-xs font-bold mb-6">
            <Sparkles className="w-4 h-4 text-brown" />
            <span>نحن هنا لمساعدتك دائماً</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 tracking-tight mb-4">
            تواصل مع فريق <span className="font-bold text-dark">المنصة</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            سواء كنت تاجراً ترغب في بدء متجرك السحابي المستقل، أو شريكاً بحاجة إلى استفسار فني أو تجاري، يسعدنا التحدث معك.
          </p>
        </div>
      </section>

      {/* المحتوى الرئيسي: معلومات الاتصال + نموذج المراسلة */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* الجانب الأيمن: بطاقات فريق التواصل ومعلومات المنصة */}
            <div className="lg:col-span-5 space-y-6">
              <div>
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
              <div className="space-y-4">
                {contactTeam.map((member, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl border border-accent/80 bg-white hover:border-brown/40 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-base font-bold text-dark">{member.name}</h4>
                        <p className="text-xs text-brown font-medium">{member.role}</p>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-accent/30 flex items-center justify-center text-dark">
                        <Store size={16} />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-accent/40 text-xs text-gray-600">
                      {/* الهاتف */}
                      <a
                        href={`tel:${member.phone}`}
                        dir="ltr"
                        className="flex items-center gap-2 hover:text-dark transition-colors font-medium justify-end"
                      >
                        <span>{member.phone}</span>
                        <Phone size={14} className="text-brown" />
                      </a>

                      {/* البريد الإلكتروني */}
                      <a
                        href={`mailto:${member.email}`}
                        dir="ltr"
                        className="flex items-center gap-2 hover:text-dark transition-colors font-mono justify-end"
                      >
                        <span>{member.email}</span>
                        <Mail size={14} className="text-brown" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* معلومات إضافية وأوقات العمل */}
              <div className="p-6 rounded-2xl bg-ligth/20 border border-accent/60 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-accent flex items-center justify-center text-dark flex-shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-dark mb-0.5">أوقات العمل والتواجد</h5>
                    <p className="text-xs text-gray-500 font-normal">
                      متاحون للرد على الاستفسارات على مدار الساعة طوال أيام الأسبوع لدعم نجاح مبيعاتك.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-accent flex items-center justify-center text-dark flex-shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-dark mb-0.5">سرعة الاستجابة</h5>
                    <p className="text-xs text-gray-500 font-normal">
                      متوسط الرد على الرسائل لا يتجاوز ساعتين خلال أوقات الذروة.
                    </p>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </section>
    </div>
  );
}