import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'daily'>('weekly');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <section id="newsletter-section" className="border-t border-neutral-200 bg-neutral-900 text-white py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400 font-mono">
          <Mail className="w-4 h-4 text-neutral-300" />
          <span>The Monday Intelligence Dispatch</span>
        </div>

        <h2
          className="text-2xl sm:text-4xl font-serif-editorial font-bold text-white tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Stay Ahead of the Algorithmic Frontier
        </h2>

        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Join 42,000+ growth leaders, VP marketers, and data architects receiving our weekly teardown of search generative algorithms, multimodal ad bidding, and predictive customer telemetry.
        </p>

        {subscribed ? (
          <div className="p-6 bg-neutral-800/80 border border-neutral-700 rounded-xl max-w-md mx-auto space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-white">Subscription Confirmed</p>
            <p className="text-xs text-neutral-400">
              Check your inbox for the latest Volume IV Executive Dossier. You can adjust frequency or unsubscribe at any time.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your corporate work email..."
                className="flex-1 px-4 py-3 text-xs sm:text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 text-[11px] text-neutral-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                Zero spam. Strict unsubscription.
              </span>
              <span>·</span>
              <button
                type="button"
                onClick={() => setFrequency(frequency === 'weekly' ? 'daily' : 'weekly')}
                className="hover:text-white transition-colors cursor-pointer underline underline-offset-2"
              >
                Delivery: {frequency === 'weekly' ? 'Weekly Dossier' : 'Real-Time Alerts'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
