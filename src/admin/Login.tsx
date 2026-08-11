import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('এই ইমেইল দিয়ে ইতোমধ্যে একাউন্ট খোলা আছে। দয়া করে "লগইন" করুন।');
      } else if (err.code === 'auth/weak-password') {
        setError('পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে (যেমন: 123456)।');
      } else if (err.code === 'auth/invalid-credential') {
        setError('ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('আপনার Firebase-এ Email/Password লগইন চালু নেই। দয়া করে Firebase Console (console.firebase.google.com) এ গিয়ে Authentication > Sign-in method থেকে Email/Password চালু করুন।');
      } else {
        setError(err.message || 'একাউন্ট তৈরি বা লগইন করতে সমস্যা হয়েছে।');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('দয়া করে আগে আপনার ইমেইলটি লিখুন।');
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('আপনার ইমেইলে পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে! দয়া করে ইমেইল চেক করুন।');
      setTimeout(() => setIsResetting(false), 5000);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('আপনার Firebase-এ Email/Password লগইন চালু নেই। দয়া করে Firebase Console-এ গিয়ে এটি চালু করুন।');
      } else {
        setError('পাসওয়ার্ড রিসেট লিংক পাঠাতে সমস্যা হয়েছে। সঠিক ইমেইল দিয়েছেন কিনা চেক করুন।');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-white/5">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isResetting ? 'পাসওয়ার্ড রিসেট করুন' : (isRegistering ? 'এডমিন একাউন্ট তৈরি করুন' : 'এডমিন লগইন')}
        </h2>
        {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm break-words">{error}</div>}
        {message && <div className="bg-green-500/10 text-green-400 p-3 rounded-lg mb-4 text-sm break-words">{message}</div>}
        
        <form onSubmit={isResetting ? handleResetPassword : handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">ইমেইল</label>
            <input
              type="email"
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {!isResetting && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-300">পাসওয়ার্ড</label>
                {!isRegistering && (
                  <button
                    type="button"
                    onClick={() => { setIsResetting(true); setError(''); setMessage(''); }}
                    className="text-xs text-primary hover:text-primary-light transition-colors"
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                minLength={6}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? 'অপেক্ষা করুন...' : (isResetting ? 'রিসেট লিংক পাঠান' : (isRegistering ? 'একাউন্ট তৈরি করুন' : 'লগইন করুন'))}
          </button>
        </form>
        
        <div className="mt-6 text-center space-y-2 flex flex-col">
          {isResetting ? (
            <button
              type="button"
              onClick={() => { setIsResetting(false); setError(''); setMessage(''); }}
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              লগইন পেজে ফিরে যান
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setIsRegistering(!isRegistering); setError(''); setMessage(''); }}
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              {isRegistering ? 'ইতোমধ্যে একাউন্ট আছে? লগইন করুন' : 'নতুন একাউন্ট তৈরি করুন'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
