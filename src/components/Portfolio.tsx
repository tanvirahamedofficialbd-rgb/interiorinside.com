import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteContext';
import { ExternalLink, Github, Eye } from 'lucide-react'; // Using standard lucide icons as placeholders for live/details

export default function Portfolio() {
  const siteConfig = useSiteConfig();
  return (
    <section id="portfolio" className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-secondary font-medium tracking-widest uppercase text-sm mb-2">পোর্টফোলিও</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              আমাদের সাম্প্রতিক কাজসমূহ
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl group overflow-hidden flex flex-col"
            >
              {/* Image Container with Scroll Hover Effect */}
              <div className="project-image-container relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href={project.liveLink} className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform">
                    <Eye size={20} />
                  </a>
                  <a href={project.detailsLink} className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-110 transition-transform">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <div className="absolute -top-5 left-6 bg-slate-800 border border-white/10 px-4 py-1 rounded-full text-xs font-medium text-secondary shadow-lg uppercase tracking-wider">
                  {project.category}
                </div>
                <h4 className="text-xl font-bold text-white mt-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
