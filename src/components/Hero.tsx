import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteContext';
import { Facebook, Instagram, Mail, PhoneCall, MessageCircle } from 'lucide-react';

export default function Hero() {
  const siteConfig = useSiteConfig();
  const [textIndex, setTextIndex] = useState(0);
  const typingTexts = ["ওয়ালপেপার ডিজাইন", "হোম ইন্টেরিয়র", "অফিস ডেকোরেশন"];
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 100;

  useEffect(() => {
    let ticker = setTimeout(() => {
      const i = loopNum % typingTexts.length;
      const fullText = typingTexts[i];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(ticker);
  }, [currentText, isDeleting, loopNum]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-110"
        style={{ 
          backgroundImage: `url(${siteConfig.heroImage})`,
          backgroundAttachment: 'fixed',
          opacity: siteConfig.heroOpacity !== undefined ? siteConfig.heroOpacity / 100 : 0.4
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-secondary font-medium tracking-widest uppercase text-sm sm:text-base">
            স্বাগতম {siteConfig.name} এ
          </h2>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-primary leading-tight">
            আমরা করি সেরা <br />
            <span className="text-gradient inline-block min-w-[280px] text-left">
              {currentText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 font-light mt-4">
            {siteConfig.description}
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#portfolio"
              className="px-8 py-3.5 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(237,29,14,0.4)]"
            >
              আমাদের কাজ দেখুন
            </a>
            <a 
              href="#contact"
              className="px-8 py-3.5 bg-transparent border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all"
            >
              যোগাযোগ করুন
            </a>
          </div>

          <div className="pt-12 flex items-center justify-center gap-6">
            <SocialLink href={siteConfig.facebook} icon={<Facebook size={20} />} />
            <SocialLink href={siteConfig.instagram} icon={<Instagram size={20} />} />
            <SocialLink href={siteConfig.whatsapp} icon={<MessageCircle size={20} />} />
            <SocialLink href={siteConfig.messenger} icon={<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.145 2 11.26c0 2.913 1.545 5.503 3.936 7.186v3.313c0 .354.385.57.69.382l3.415-1.954c.631.173 1.29.263 1.959.263 5.523 0 10-4.145 10-9.26S17.523 2 12 2zm1.093 12.383l-2.617-2.793-5.074 2.793 5.578-5.922 2.65 2.793 5.042-2.793-5.579 5.922z"/></svg>} />
            <SocialLink href={`mailto:${siteConfig.email}`} icon={<Mail size={20} />} />
            <SocialLink href={`tel:${siteConfig.phone}`} icon={<PhoneCall size={20} />} />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/50 hover:text-primary transition-colors">
          <div className="w-[30px] h-[50px] border-2 border-current rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-current rounded-full animate-[scroll_2s_ease-in-out_infinite]" />
          </div>
        </a>
      </div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary transition-all duration-300 hover:-translate-y-1"
    >
      {icon}
    </a>
  );
}
