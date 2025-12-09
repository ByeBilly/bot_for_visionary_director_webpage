import React, { useState } from 'react';
import { Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { WaitlistData } from '../types';

export const WaitlistForm: React.FC = () => {
  const [data, setData] = useState<WaitlistData>({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.email) return;

    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      console.log('Waitlist submission:', data);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border border-emerald-500/30 rounded-xl p-6 text-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
        <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
        <p className="text-emerald-200 text-sm">Welcome to the future of Visionary Director. We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Join the Waitlist</h3>
        </div>
        <p className="text-gray-300 text-sm mb-6">
          Be the first to enter the Shopping Town and experience the power of M Forms.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Name</label>
            <input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="you@visionary.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Securing Spot...
              </>
            ) : (
              'Get Early Access'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
