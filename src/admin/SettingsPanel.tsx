import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { siteConfig as defaultConfig } from '../config';

export default function SettingsPanel() {
  const [formData, setFormData] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'site_settings', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData({ ...defaultConfig, ...docSnap.data() } as any);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: string, arrayName: 'services' | 'projects' | 'videos') => {
    const updatedArray = [...((formData as any)[arrayName] as any[])];
    updatedArray[index] = { ...updatedArray[index], [field]: e.target.value };
    setFormData((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleAddVideo = () => {
    const newVideo = {
      id: Date.now(),
      title: 'নতুন ভিডিও',
      link: 'https://www.youtube.com/embed/...'
    };
    setFormData((prev: any) => ({ ...prev, videos: [...(prev.videos || []), newVideo] }));
  };

  const handleRemoveVideo = (index: number) => {
    const updatedArray = [...((formData as any).videos as any[])];
    updatedArray.splice(index, 1);
    setFormData((prev: any) => ({ ...prev, videos: updatedArray }));
  };

  const handleAddService = () => {
    const newService = {
      id: Date.now(),
      title: 'নতুন সার্ভিস',
      description: 'সার্ভিসের বর্ণনা এখানে লিখুন',
      icon: 'Home'
    };
    setFormData((prev) => ({ ...prev, services: [...(prev.services || []), newService] }));
  };

  const handleRemoveService = (index: number) => {
    const updatedArray = [...(formData.services as any[])];
    updatedArray.splice(index, 1);
    setFormData((prev) => ({ ...prev, services: updatedArray }));
  };

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'নতুন প্রজেক্ট',
      category: 'ক্যাটাগরি',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
      liveLink: '#',
      detailsLink: '#'
    };
    setFormData((prev) => ({ ...prev, projects: [...(prev.projects || []), newProject] }));
  };

  const handleRemoveProject = (index: number) => {
    const updatedArray = [...(formData.projects as any[])];
    updatedArray.splice(index, 1);
    setFormData((prev) => ({ ...prev, projects: updatedArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const docRef = doc(db, 'site_settings', 'main');
      await setDoc(docRef, formData, { merge: true });
      setMessage('সেটিংস সফলভাবে সেভ হয়েছে!');
    } catch (error) {
      console.error(error);
      setMessage('সেভ করতে সমস্যা হয়েছে।');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-white mb-6">সাইট সেটিংস</h2>
      
      {message && (
        <div className="bg-green-500/10 text-green-400 p-4 rounded-lg mb-6">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-slate-800 p-8 rounded-2xl border border-white/5">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">সাধারণ তথ্য</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">সাইটের নাম</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">ট্যাগলাইন</label>
              <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">ডেসক্রিপশন (About)</label>
            <textarea name="aboutText" rows={3} value={formData.aboutText} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">যোগাযোগের তথ্য</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">ফোন নম্বর</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">ইমেইল</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">ঠিকানা</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">ম্যাপ লিংক</label>
              <input type="text" name="mapLink" value={formData.mapLink} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Google Script URL (For Auto Google Sheets)</label>
              <input type="text" name="googleScriptUrl" value={formData.googleScriptUrl || ''} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="https://script.google.com/macros/s/.../exec" />
            </div>
          </div>
        </div>

        {/* Images & Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">ছবি ও অন্যান্য তথ্য</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">হিরো সেকশন ছবি (URL)</label>
              <input type="text" name="heroImage" value={formData.heroImage} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">হিরো ছবির উজ্জ্বলতা (Opacity: {formData.heroOpacity !== undefined ? formData.heroOpacity : 40}%)</label>
              <input type="range" min="0" max="100" name="heroOpacity" value={formData.heroOpacity !== undefined ? formData.heroOpacity : 40} onChange={handleChange} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer mt-3" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">আমাদের সম্পর্কে ছবি (URL)</label>
            <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">হিরো ডেসক্রিপশন</label>
            <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
          </div>
        {/* Videos Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-xl font-semibold text-white">ভিডিওসমূহ (Videos)</h3>
            <button type="button" onClick={handleAddVideo} className="text-sm bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1.5 rounded-lg transition-colors font-medium">
              + নতুন ভিডিও যুক্ত করুন
            </button>
          </div>
          {(formData as any).videos?.map((video: any, index: number) => (
            <div key={index} className="bg-slate-900/30 p-4 rounded-lg border border-white/5 space-y-4 relative">
              <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">ভিডিও {index + 1}</h4>
                <button type="button" onClick={() => handleRemoveVideo(index)} className="text-red-400 hover:text-red-300 text-sm">
                  ডিলিট করুন
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">শিরোনাম (Title)</label>
                  <input type="text" value={video.title} onChange={(e) => handleArrayChange(e, index, 'title', 'videos')} className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">ভিডিও লিংক (YouTube Embed URL)</label>
                  <input type="text" value={video.link} onChange={(e) => handleArrayChange(e, index, 'link', 'videos')} placeholder="https://www.youtube.com/embed/..." className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">সোশ্যাল লিংক</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">ফেসবুক</label>
              <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">ইন্সটাগ্রাম</label>
              <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">হোয়াটসঅ্যাপ লিংক</label>
              <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">মেসেঞ্জার লিংক</label>
              <input type="text" name="messenger" value={formData.messenger} onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-xl font-semibold text-white">সার্ভিসসমূহ (Services)</h3>
            <button type="button" onClick={handleAddService} className="text-sm bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1.5 rounded-lg transition-colors font-medium">
              + নতুন সার্ভিস যুক্ত করুন
            </button>
          </div>
          {formData.services?.map((service: any, index: number) => (
            <div key={index} className="bg-slate-900/30 p-4 rounded-lg border border-white/5 space-y-4 relative">
              <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">সার্ভিস {index + 1}</h4>
                <button type="button" onClick={() => handleRemoveService(index)} className="text-red-400 hover:text-red-300 text-sm">
                  ডিলিট করুন
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">শিরোনাম (Title)</label>
                  <input type="text" value={service.title} onChange={(e) => handleArrayChange(e, index, 'title', 'services')} className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">আইকন (Icon Name)</label>
                  <input type="text" value={service.icon} onChange={(e) => handleArrayChange(e, index, 'icon', 'services')} className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" placeholder="e.g. Home, Wallpaper, Sofa" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">ডেসক্রিপশন</label>
                <textarea rows={2} value={service.description} onChange={(e) => handleArrayChange(e, index, 'description', 'services')} className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Projects / Portfolio Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-xl font-semibold text-white">পোর্টফোলিও (Projects)</h3>
            <button type="button" onClick={handleAddProject} className="text-sm bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1.5 rounded-lg transition-colors font-medium">
              + নতুন প্রজেক্ট যুক্ত করুন
            </button>
          </div>
          {formData.projects?.map((project: any, index: number) => (
            <div key={index} className="bg-slate-900/30 p-4 rounded-lg border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">প্রজেক্ট {index + 1}</h4>
                <button type="button" onClick={() => handleRemoveProject(index)} className="text-red-400 hover:text-red-300 text-sm">
                  ডিলিট করুন
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">প্রজেক্টের নাম (Title)</label>
                  <input type="text" value={project.title} onChange={(e) => handleArrayChange(e, index, 'title', 'projects')} className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">ক্যাটাগরি (Category)</label>
                  <input type="text" value={project.category} onChange={(e) => handleArrayChange(e, index, 'category', 'projects')} className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">ছবির লিংক (Image URL)</label>
                <input type="text" value={project.image} onChange={(e) => handleArrayChange(e, index, 'image', 'projects')} className="w-full bg-slate-900/80 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {saving ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
          </button>
        </div>
      </form>
    </div>
  );
}
