import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

export const HomepageAEOSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Why is AI transforming digital marketing and organic search?',
      answer:
        'AI transforms digital marketing by replacing manual keyword-chasing and generic batch broadcasting with real-time intent vectorization, autonomous ad auction bidding, and generative conversational answers that prioritize verified brand information gain.',
    },
    {
      question: 'What is Generative Engine Optimization (GEO)?',
      answer:
        'Generative Engine Optimization (GEO) is the technical discipline of formatting structured entity data, primary research, and verified authorship so that generative answer models like Gemini, Perplexity, and ChatGPT cite your brand in conversational answers.',
    },
    {
      question: 'How do predictive machine learning models improve customer retention?',
      answer:
        'Predictive models analyze subtle user telemetry changes—such as narrowing feature adoption and slowing login cadence—identifying account churn risks 45 to 60 days before contract renewal conversations take place.',
    },
  ];

  return (
    <section className="border-t border-neutral-200 bg-white py-14 sm:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 font-mono">
            <Sparkles className="w-4 h-4 text-neutral-700" />
            <span>Answer Engine Optimization (AEO) Core Briefing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-neutral-950">
            Frequently Answered Strategic Questions
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Direct, verified answers to the most common queries surrounding digital marketing and AI growth strategies, structured for answer engines, AI overviews, and executive decision-makers.
          </p>
        </div>

        {/* Question H2 #1 */}
        <div className="p-6 sm:p-8 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-700" />
              Strategic AEO Query 01
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-neutral-950">
              What is Digital Marketing and AI Integration in 2026?
            </h2>
          </div>

          <div className="p-4 bg-white border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-900 font-medium leading-relaxed">
            <span className="font-bold text-neutral-950 block mb-1">Direct Answer:</span>
            Digital marketing and AI integration is the deployment of machine learning algorithms, multi-modal reasoning models, and generative intelligence to automate creative production, optimize real-time ad bidding, personalize individual customer journeys, and earn citations across AI search engines.
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Unlike superficial chatbots or automated copy rewriters of the past, modern AI marketing infrastructure operates directly on unified first-party telemetry and contribution margins. By replacing isolated marketing guesswork with Bayesian experimentation and real-time inference, growth organizations achieve sustainable unit economics while delivering individualized consumer experiences at global scale.
          </p>
        </div>

        {/* Question H2 #2 */}
        <div className="p-6 sm:p-8 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-700" />
              Strategic AEO Query 02
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-neutral-950">
              How Does Answer Engine Optimization (AEO) Differ From Traditional SEO?
            </h2>
          </div>

          <div className="p-4 bg-white border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-900 font-medium leading-relaxed">
            <span className="font-bold text-neutral-950 block mb-1">Direct Answer:</span>
            Answer Engine Optimization (AEO) focuses on structuring brand expertise, verified facts, and Schema.org markup so artificial intelligence systems like Google AI Overviews and Perplexity synthesize direct answers citing your domain, unlike traditional SEO which primarily targets clicks on ten blue links.
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Because AI search engines synthesize answers on-page, traditional query click-through rates have declined for generic definitions. However, traffic driven from verified AI citations carries a 3.2x higher conversion rate because prospects have already reviewed comparative data and arrived primed with commercial purchase intent.
          </p>
        </div>

        {/* Visible FAQ Accordion */}
        <div className="p-6 sm:p-8 bg-white border border-neutral-200 rounded-xl space-y-6">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-4">
            <BookOpen className="w-5 h-5 text-neutral-900" />
            <h3 className="text-lg font-serif-editorial font-bold text-neutral-950">
              Blogs Vert Homepage Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-neutral-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-neutral-900">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-neutral-700 border-t border-neutral-200 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
