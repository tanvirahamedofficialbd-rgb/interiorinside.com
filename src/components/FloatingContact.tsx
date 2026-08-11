import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteContext';
import { Phone } from 'lucide-react';

export default function FloatingContact() {
  const siteConfig = useSiteConfig();
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Call Button */}
      <motion.a
        href={`tel:${siteConfig.phone}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
        className="bg-secondary text-white p-3.5 rounded-full shadow-lg hover:bg-secondary-dark hover:scale-110 transition-all duration-300 flex items-center justify-center group relative"
        aria-label="Call Us"
      >
        <span className="absolute right-full mr-4 bg-slate-800 border border-white/10 text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          সরাসরি কল করুন
        </span>
        <Phone size={24} />
      </motion.a>

      {/* Messenger Button */}
      <motion.a
        href={siteConfig.messenger}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5, type: 'spring' }}
        className="bg-[#0084FF] text-white p-3.5 rounded-full shadow-lg hover:bg-[#006bd1] hover:scale-110 transition-all duration-300 flex items-center justify-center group relative"
        aria-label="Chat on Messenger"
      >
        <span className="absolute right-full mr-4 bg-slate-800 border border-white/10 text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          মেসেঞ্জারে চ্যাট করুন
        </span>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.145 2 11.26c0 2.913 1.545 5.503 3.936 7.186v3.313c0 .354.385.57.69.382l3.415-1.954c.631.173 1.29.263 1.959.263 5.523 0 10-4.145 10-9.26S17.523 2 12 2zm1.093 12.383l-2.617-2.793-5.074 2.793 5.578-5.922 2.65 2.793 5.042-2.793-5.579 5.922z"/>
        </svg>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={siteConfig.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
        className="bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 flex items-center justify-center group relative"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute right-full mr-4 bg-slate-800 border border-white/10 text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          হোয়াটসঅ্যাপে মেসেজ দিন
        </span>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>
    </div>
  );
}
