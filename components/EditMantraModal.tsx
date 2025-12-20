import React, { useState } from 'react';
import { Mantra } from '../types';
import { X, Save, Target, RotateCcw } from 'lucide-react';

interface EditMantraModalProps {
  mantra: Mantra;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Mantra>) => void;
  onReset?: (id: string) => void;
}

export const EditMantraModal: React.FC<EditMantraModalProps> = ({ mantra, onClose, onSave, onReset }) => {
  const [name, setName] = useState(mantra.name);
  const [targetCount, setTargetCount] = useState<string>(mantra.targetCount ? mantra.targetCount.toString() : '');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(mantra.id, {
      name,
      targetCount: targetCount ? parseInt(targetCount) : undefined,
    });
  };

  const handleReset = () => {
    if (onReset) {
      onReset(mantra.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      {showResetConfirm && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xs rounded-2xl shadow-2xl p-6 mx-4 animate-fade-in-up">
            <h4 className="text-lg font-bold text-stone-800 mb-4">確認歸零</h4>
            <p className="text-stone-600 text-sm mb-6">
              確定要將「{mantra.name}」的計數歸零嗎？此操作無法復原。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold rounded-xl transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
              >
                確認歸零
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X size={24} />
        </button>

        <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
          <Target className="text-amber-500" />
          編輯項目與目標
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-2">項目名稱</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl border border-stone-200 focus:border-amber-500 outline-none font-bold text-stone-800 text-lg bg-stone-50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-2 flex items-center gap-1">
              <Target size={14} /> 設定目標數量 (可留空)
            </label>
            <input 
              type="number" 
              value={targetCount}
              onChange={(e) => setTargetCount(e.target.value)}
              placeholder="例如：100000"
              className="w-full p-4 rounded-xl border border-stone-200 focus:border-amber-500 outline-none bg-stone-50 text-lg"
            />
            <p className="text-[10px] text-stone-400 mt-2">
              * 日期請至儀表板統一設定「共同願力期限」
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button 
              type="submit" 
              className="w-full py-4 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
            >
              <Save size={18} />
              儲存設定
            </button>
            
            {onReset && (
              <button 
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
              >
                <RotateCcw size={18} />
                歸零計數
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};