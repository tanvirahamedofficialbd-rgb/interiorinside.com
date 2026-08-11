import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MessageSquare, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [msgCount, setMsgCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const msgSnap = await getDocs(collection(db, 'messages'));
        setMsgCount(msgSnap.size);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-8">স্বাগতম, এডমিন!</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">মোট মেসেজ</p>
            <h3 className="text-3xl font-bold text-white">{msgCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <MessageSquare size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Link to="/admin/settings" className="bg-slate-800 p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors group flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
            <Settings size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">সাইট সেটিংস</h3>
            <p className="text-gray-400 text-sm">ওয়েবসাইটের তথ্য এবং লিংক পরিবর্তন করুন</p>
          </div>
        </Link>
        <Link to="/admin/messages" className="bg-slate-800 p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors group flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">মেসেজসমূহ</h3>
            <p className="text-gray-400 text-sm">গ্রাহকদের পাঠানো মেসেজগুলো দেখুন</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
