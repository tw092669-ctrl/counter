import React, { useState } from 'react';
import { X, Calendar, Save, ArrowRight, Tag } from 'lucide-react';

interface DateSettingModalProps {
  currentDateRange: { name?: string; start?: string; end?: string };
  onClose: () => void;
  onSave: (name: string | undefined, start: string | undefined, end: string | undefined) => void;
}

export const DateSettingModal: React.FC<DateSettingModalProps> = ({ currentDateRange, onClose, onSave }) => {
  const [name, setName] = useState(currentDateRange.name || '');
  const [startDate, setStartDate] = useState(currentDateRange.start || '');
  const [endDate, setEndDate] = useState(currentDateRange.end || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name || undefined, startDate || undefined, endDate || undefined);
  };

  const clearDate = () => {
    setName('');
    setStartDate('');
    setEndDate('');
    onSave(undefined, undefined, undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X size={24} />
        </button>

        <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
          <Calendar className="text-amber-500" />
          設定共同願力期限
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-amber-50 p-4 rounded-xl text-stone-600 text-sm leading-relaxed">
            設定一個共修活動名稱與時間區間，系統將自動計算並顯示該時段內的念經數量。
          </div>
          
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-2 flex items-center gap-1">
              <Tag size={12} /> 專案活動名稱
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-stone-200 focus:border-amber-500 outline-none text-base font-bold text-stone-800 placeholder:text-stone-300"
              placeholder="例如：2025歲末除障修法"
            />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-2">開始日期</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 rounded-lg border border-stone-200 focus:border-amber-500 outline-none text-sm font-bold text-stone-800"
              />
            </div>
            <div className="pt-6 text-stone-400">
              <ArrowRight size={16} />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-2">結束日期</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 rounded-lg border border-stone-200 focus:border-amber-500 outline-none text-sm font-bold text-stone-800"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button 
              type="submit" 
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-amber-500/20"
            >
              <Save size={18} />
              確認儲存
            </button>
            
            {(currentDateRange.start || currentDateRange.end || currentDateRange.name) && (
              <button 
                type="button" 
                onClick={clearDate}
                className="w-full py-3 text-stone-400 hover:text-red-500 hover:bg-red-50 font-bold rounded-xl transition-colors"
              >
                清除設定
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};