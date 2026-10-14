import React from 'react';
import { X, ShieldCheck, BookOpen, Cpu, Sparkles } from 'lucide-react';

interface EditorialCharterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditorialCharterModal: React.FC<EditorialCharterModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-neutral-800" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">
              Editorial Charter & Standards
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-neutral-700 text-sm leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-2xl font-serif-editorial font-bold text-neutral-950">
              The Vektor Commitment to Rigor
            </h2>
            <p className="text-xs text-neutral-500">
              Published by the Vektor Editorial Board · Updated October 2026
            </p>
          </div>

          <p>
            Vektor Review is an independent publication dedicated to examining the intersection of modern digital marketing, artificial intelligence, econometrics, and consumer behavior. As machine learning reshapes discovery and commerce, we adhere to four foundational pillars:
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-neutral-800" />
                1. Empirical Evidence Over Speculation
              </h3>
              <p className="text-xs text-neutral-600">
                Every analysis published in Vektor must be substantiated with unredacted telemetry, randomized holdout experiments, or verified commercial case studies. We do not publish speculative predictions without mathematical backing.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-neutral-800" />
                2. Full Synthetic Media & Tool Disclosure
              </h3>
              <p className="text-xs text-neutral-600">
                In adherence to the C2PA standard, all articles that utilize computational analysis or generative synthesis prominently disclose model architectures, parameter configurations, and researcher review logs.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-neutral-800" />
                3. Anti-Slop Writing Discipline
              </h3>
              <p className="text-xs text-neutral-600">
                We strictly prohibit generic, superficial marketing platitudes. Every piece is curated to deliver actionable frameworks and strategic clarity for senior practitioners and business leaders.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Close Charter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
