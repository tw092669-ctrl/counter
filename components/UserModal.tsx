import React, { useState } from 'react';
import { User, X } from 'lucide-react';

interface UserModalProps {
  currentName: string;
  onClose: () => void;
  onSave: (name: string) => void;
}

export const UserModal: React.FC<UserModalProps> = ({ currentName, onClose, onSave }) => {
  const [name, setName] = useState(currentName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X size={24} />
        </button>

        <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
          <User className="text-amber-500" />
          設定法名
        </h3>
        <p className="text-stone-500 text-sm mb-6">請輸入您的稱呼，以便統計。</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-2 flex items-center gap-1">
               <User size={12} /> 姓名
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-stone-200 focus:border-amber-500 focus:outline-none text-lg"
              placeholder="例如：王小明 或 圓滿"
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-xl transition-transform active:scale-95"
            >
              儲存設定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};