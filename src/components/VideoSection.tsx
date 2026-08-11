import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteContext';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function VideoSection() {
  const siteConfig = useSiteConfig();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const videos = siteConfig.videos || [];

  if (videos.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8; // scroll one item width roughly
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Helper function to convert standard YouTube links to embed links
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtube.com/shorts/')) {
      const videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // Return as is if already embed or other format
  };

  return (
    <section id="video" className="py-24 bg-slate-900/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-secondary font-medium tracking-widest uppercase text-sm mb-2">ভিডিও</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              আমাদের প্রজেক্টের ভিডিও দেখুন
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="relative group">
          {/* Left Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scroll Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videos.map((video: any, index: number) => (
              <div
                key={index}
                className="flex-none w-[90%] md:w-[70%] lg:w-[60%] snap-center"
              >
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    src={getEmbedUrl(video.link)}
                    title={video.title || "Project Video"}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                {video.title && (
                  <h4 className="text-white text-center mt-4 font-medium text-lg">{video.title}</h4>
                )}
              </div>
            ))}
          </motion.div>

          {/* Right Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Hide Scrollbar for Webkit */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
