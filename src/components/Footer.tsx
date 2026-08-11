import { useSiteConfig } from '../context/SiteContext';
import { Facebook, Instagram, ArrowUp, MessageCircle } from 'lucide-react';

export default function Footer() {
  const siteConfig = useSiteConfig();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 pt-20 pb-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Map Section */}
        <div className="w-full h-80 rounded-2xl overflow-hidden mb-16 map-container shadow-2xl border border-white/5 relative z-10">
          <iframe 
            title="Google Map Location"
            src="https://maps.google.com/maps?q=South%20Banasree,%20Dhaka&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12">
          
          <div className="space-y-4">
            <a href="#home" className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
              <img src={siteConfig.logo} alt={siteConfig.name} className="h-12 w-auto bg-white p-1.5 rounded" />
              <span className="text-secondary">{siteConfig.name}</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {siteConfig.tagline} - আধুনিক ডিজাইন, মানসম্মত ম্যাটেরিয়াল এবং আপনার সন্তুষ্টি।
            </p>
            <div className="flex gap-4 pt-2">
              <a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all">
                <Facebook size={18} />
              </a>
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all">
                <Instagram size={18} />
              </a>
              <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#25D366] transition-all">
                <MessageCircle size={18} />
              </a>
              <a href={siteConfig.messenger} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-secondary transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.477 2 2 6.145 2 11.26c0 2.913 1.545 5.503 3.936 7.186v3.313c0 .354.385.57.69.382l3.415-1.954c.631.173 1.29.263 1.959.263 5.523 0 10-4.145 10-9.26S17.523 2 12 2zm1.093 12.383l-2.617-2.793-5.074 2.793 5.578-5.922 2.65 2.793 5.042-2.793-5.579 5.922z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">গুরুত্বপূর্ণ লিংক</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-secondary transition-colors text-sm">হোম</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-secondary transition-colors text-sm">আমাদের সম্পর্কে</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-secondary transition-colors text-sm">সার্ভিসসমূহ</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-secondary transition-colors text-sm">পোর্টফোলিও</a></li>
              <li><a href="/admin" className="text-gray-400 hover:text-secondary transition-colors text-sm">অ্যাডমিন প্যানেল</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">যোগাযোগ</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">{siteConfig.address}</li>
              <li className="text-gray-400 text-sm">
                <a href={`tel:${siteConfig.phone}`} className="hover:text-secondary transition-colors">{siteConfig.phone}</a>
              </li>
              <li className="text-gray-400 text-sm">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-secondary transition-colors">{siteConfig.email}</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

      </div>
    </footer>
  );
}
