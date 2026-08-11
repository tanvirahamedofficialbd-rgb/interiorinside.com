import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import VideoSection from './components/VideoSection';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import { SiteProvider } from './context/SiteContext';

export default function MainSite() {
  return (
    <SiteProvider>
      <div className="min-h-screen bg-slate-900 selection:bg-primary/30 selection:text-white">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <VideoSection />
        <Portfolio />
        <Contact />
        <Footer />
        <FloatingContact />
      </div>
    </SiteProvider>
  );
}

