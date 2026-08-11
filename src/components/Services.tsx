import React from 'react';
import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteContext';
import { Wallpaper, Home, Building2, PaintBucket, Sofa, Lightbulb } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  "Wallpaper": <Wallpaper size={40} strokeWidth={1.5} />,
  "Home": <Home size={40} strokeWidth={1.5} />,
  "Building2": <Building2 size={40} strokeWidth={1.5} />,
  "PaintBucket": <PaintBucket size={40} strokeWidth={1.5} />,
  "Sofa": <Sofa size={40} strokeWidth={1.5} />,
  "Lightbulb": <Lightbulb size={40} strokeWidth={1.5} />
};

export default function Services() {
  const siteConfig = useSiteConfig();
  return (
    <section id="services" className="py-24 bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-secondary font-medium tracking-widest uppercase text-sm mb-2">সার্ভিসসমূহ</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              আমরা যে সকল সার্ভিস প্রদান করি
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {iconMap[service.icon] || <Home size={40} strokeWidth={1.5} />}
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{service.title}</h4>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
