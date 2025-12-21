import React, { useState } from 'react';
import { Mantra } from '../types';
import { PlusCircle, MinusCircle, X } from 'lucide-react';

interface InputModalProps {
  mantra: Mantra;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

export const InputModal: React.FC<InputModalProps> = ({ mantra, onClose, onConfirm }) => {
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(amount);
    if (!isNaN(val) && val > 0) {
      onConfirm(val);
    }
  };

  const handleDecrease = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(amount);
    if (!isNaN(val) && val > 0) {
      onConfirm(-val); // 扣除数值
    }
  };

  const addPreset = (val: number) => {
    setAmount((prev) => {
      const current = parseInt(prev);
      const base = isNaN(current) ? 0 : current;
      return (base + val).toString();
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X size={24} />
        </button>

        <h3 className="text-xl font-bold text-stone-800 mb-1">{mantra.name}</h3>
        <p className="text-stone-500 text-sm mb-6">新增念經數量</p>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center border-2 border-amber-500 rounded-xl overflow-hidden mb-6">
            <input 
              type="number" 
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 text-3xl text-center font-bold text-stone-800 outline-none placeholder:text-stone-300"
              placeholder="0"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
             {[1, 10, 100, 108].map(preset => (
               <button 
                 key={preset}
                 type="button"
                 onClick={() => addPreset(preset)}
                 className="py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 font-semibold rounded-lg transition-colors"
               >
                 +{preset}
               </button>
             ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={handleDecrease}
              disabled={!amount || parseInt(amount) <= 0}
              className="py-4 bg-red-500 hover:bg-red-600 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-lg font-bold rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <MinusCircle size={24} />
              減少數量
            </button>

            <button 
              type="submit" 
              disabled={!amount || parseInt(amount) <= 0}
              className="py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-lg font-bold rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <PlusCircle size={24} />
              確認新增
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};