import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteContext';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const siteConfig = useSiteConfig();
  return (
    <section id="about" className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img 
                src={siteConfig.profileImage} 
                alt="About Interior Inside" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-8 -right-8 sm:-right-12 glass-card p-6 rounded-2xl hidden sm:block"
            >
              <div className="text-4xl font-bold text-primary mb-1">৫+</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">বছরের<br/>অভিজ্ঞতা</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-secondary font-medium tracking-widest uppercase text-sm mb-2">আমাদের সম্পর্কে</h2>
              <h3 className="text-3xl sm:text-4xl font-bold text-primary leading-tight">
                আপনার স্বপ্নকে বাস্তবে রূপ দিতে আমরা বদ্ধপরিকর
              </h3>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              {siteConfig.aboutText}
            </p>

            <div className="space-y-4">
              {[
                "উন্নত মানের কাস্টম ওয়ালপেপার",
                "দক্ষ ও অভিজ্ঞ ইন্টেরিয়র ডিজাইনার",
                "সঠিক সময়ে কাজ ডেলিভারি",
                "আকর্ষণীয় ও বাজেট-বান্ধব প্যাকেজ"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">যেকোনো তথ্যের জন্য কল করুন</p>
                <a href={`tel:${siteConfig.phone}`} className="text-xl font-bold text-white hover:text-primary transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
