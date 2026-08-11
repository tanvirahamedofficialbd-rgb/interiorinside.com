import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteContext';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Contact() {
  const siteConfig = useSiteConfig();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'unread'
      });
      
      setSubmitStatus('success');

      // Google Sheets Redirect
      if (siteConfig.googleScriptUrl) {
        try {
          fetch(siteConfig.googleScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              message: formData.message,
              timestamp: new Date().toISOString()
            })
          }).catch(err => console.error("Google Sheets Error:", err));
        } catch (e) {
          console.error("Google Sheets Catch:", e);
        }
      }

      // WhatsApp Redirect
      const text = `নাম: ${formData.name}\nফোন: ${formData.phone}\nইমেইল: ${formData.email}\nবার্তা: ${formData.message}`;
      let waUrl = siteConfig.whatsapp || "https://wa.me/8801624241051";
      if (waUrl.includes('?')) {
        waUrl += `&text=${encodeURIComponent(text)}`;
      } else {
        waUrl += `?text=${encodeURIComponent(text)}`;
      }
      window.open(waUrl, '_blank');

      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-secondary font-medium tracking-widest uppercase text-sm mb-2">যোগাযোগ করুন</h2>
              <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                আমাদের সাথে প্রজেক্ট নিয়ে আলোচনা করুন
              </h3>
              <p className="text-gray-400">
                যেকোনো প্রজেক্টের আইডিয়া বা সার্ভিস সম্পর্কিত তথ্যের জন্য আমাদের সাথে যোগাযোগ করতে পারেন। আমরা দ্রুততম সময়ের মধ্যে আপনার সাথে কথা বলবো।
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <ContactInfoItem icon={<Phone className="text-secondary" />} title="ফোন নম্বর" content={siteConfig.phone} />
              <ContactInfoItem icon={<Mail className="text-secondary" />} title="ইমেইল" content={siteConfig.email} />
              <ContactInfoItem icon={<MapPin className="text-secondary" />} title="অফিস ঠিকানা" content={siteConfig.address} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 rounded-2xl space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">আপনার নাম</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="আপনার সম্পূর্ণ নাম"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">ফোন নম্বর</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="০১৭..."
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">আপনার বার্তা</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="আপনার প্রজেক্টের বিস্তারিত লিখুন..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">পাঠানো হচ্ছে...</span>
                ) : (
                  <>
                    <span>মেসেজ পাঠান</span>
                    <Send size={18} />
                  </>
                )}
              </button>
              
              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm text-center">আপনার বার্তা সফলভাবে পাঠানো হয়েছে!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm text-center">দুঃখিত, কোনো একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function ContactInfoItem({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="flex items-start gap-4 p-4 glass rounded-xl">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-medium mb-1">{title}</h4>
        <p className="text-gray-400">{content}</p>
      </div>
    </div>
  );
}
