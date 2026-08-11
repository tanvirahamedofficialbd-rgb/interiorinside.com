import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Trash2 } from 'lucide-react';

export default function MessagesPanel() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, 'messages'));
      const querySnapshot = await getDocs(q);
      const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort manually on the client side
      msgs.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });

      setMessages(msgs);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'Error fetching messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি এই মেসেজটি ডিলিট করতে চান?')) return;
    try {
      await deleteDoc(doc(db, 'messages', id));
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">কাস্টমার মেসেজসমূহ</h2>
      
      {errorMsg && (
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-6">
          {errorMsg}
        </div>
      )}

      <div className="bg-slate-800 rounded-2xl border border-white/5 overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-gray-400">কোনো মেসেজ পাওয়া যায়নি।</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-slate-900/50 text-gray-400 uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">নাম</th>
                  <th className="px-6 py-4 font-medium">ফোন ও ইমেইল</th>
                  <th className="px-6 py-4 font-medium">মেসেজ</th>
                  <th className="px-6 py-4 font-medium text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{msg.name}</td>
                    <td className="px-6 py-4">
                      <p>{msg.phone}</p>
                      <p className="text-gray-500 text-xs">{msg.email}</p>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="truncate" title={msg.message}>{msg.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : ''}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(msg.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                        title="ডিলিট করুন"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
