import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { siteConfig as defaultConfig } from '../config';

const SiteContext = createContext<any>(defaultConfig);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, 'site_settings', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setConfig({ ...defaultConfig, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Failed to load site config from Firebase:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <SiteContext.Provider value={config}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSiteConfig = () => useContext(SiteContext);
