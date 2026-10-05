import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
      {toasts.map(toast => {
        let Icon = CheckCircle2;
        let borderClass = 'border-emerald-600/30 bg-[#FAF8F5] text-slate-900 shadow-xl';
        let iconColor = 'text-emerald-700';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-rose-600/30 bg-[#FAF8F5] text-slate-900 shadow-xl';
          iconColor = 'text-rose-700';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-amber-600/30 bg-[#FAF8F5] text-slate-900 shadow-xl';
          iconColor = 'text-amber-700';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border ${borderClass} backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />
              <p className="text-xs font-medium tracking-tight text-slate-800">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-1 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
