import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Sparkles, Award, ShieldCheck, Heart } from 'lucide-react';
import { ATELIER_IMAGE } from '../../data/seedProducts';

export const AboutModal: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen } = useStore();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#EAE5D9] overflow-hidden my-8 relative">
        <button
          onClick={() => setIsAboutOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-[16/8] w-full relative overflow-hidden bg-stone-900">
          <img
            src={ATELIER_IMAGE}
            alt="Artisans at work in Florence atelier"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
              The Atelier Legacy
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-white">
              Aurelia Atelier Florence
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto text-xs text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-slate-900">
              The Genesis of Quiet Elegance
            </h3>
            <p>
              Founded on the cobblestone lanes of the Santa Croce leather district in Florence, Aurelia Atelier was created with a single uncompromising premise: to build women's handbags that honor the historic discipline of saddle-stitch leathercraft while reflecting contemporary architectural grace.
            </p>
            <p>
              Every bag begins with hand-selected French and Tuscan calfskins, steeped in certified organic chestnut and mimosa tannins for over sixty days. We reject synthetic PU coatings, plastic edge glues, and mass mechanized conveyor belts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#EAE5D9]">
            <div className="p-4 rounded-xl bg-white border border-[#EAE5D9] text-center space-y-1">
              <Award className="w-5 h-5 text-[#8B5A2B] mx-auto" />
              <h4 className="font-semibold text-slate-900 text-xs">Zero Heavy Metals</h4>
              <p className="text-[10px] text-slate-400">100% Vegetable Tannin baths</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#EAE5D9] text-center space-y-1">
              <Sparkles className="w-5 h-5 text-[#8B5A2B] mx-auto" />
              <h4 className="font-semibold text-slate-900 text-xs">Bespoke Locks</h4>
              <p className="text-[10px] text-slate-400">24k Brushed Gold over brass</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#EAE5D9] text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-[#8B5A2B] mx-auto" />
              <h4 className="font-semibold text-slate-900 text-xs">Lifetime Care</h4>
              <p className="text-[10px] text-slate-400">Generational restoration pledge</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed font-serif italic">
            "A luxury handbag should not shout a logo across a boulevard; it should whisper its pedigree through the weight of its leather, the precision of its stitches, and the silent closure of its gold lock."
          </div>
        </div>
      </div>
    </div>
  );
};
