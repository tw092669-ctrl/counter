import React, { useState } from 'react';
import { Link2, X, Save, HelpCircle } from 'lucide-react';

interface SheetSettingsModalProps {
  currentUrl: string;
  onClose: () => void;
  onSave: (url: string) => void;
}

export const SheetSettingsModal: React.FC<SheetSettingsModalProps> = ({ currentUrl, onClose, onSave }) => {
  const [url, setUrl] = useState(currentUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(url.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X size={24} />
        </button>

        <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
          <Link2 className="text-amber-500" />
          連結 Google 試算表
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-amber-50 p-4 rounded-xl text-stone-600 text-sm leading-relaxed border border-amber-100">
            <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-1">
               <HelpCircle size={14} /> 如何取得網址？
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>建立 Google 試算表。</li>
              <li>點擊「擴充功能」 {'>'} 「Apps Script」。</li>
              <li>貼上後端程式碼 (請洽開發者)。</li>
              <li>點擊「部署」 {'>'} 「新增部署作業」。</li>
              <li>選擇類型「網頁應用程式」。</li>
              <li>存取權限設定為「任何人 (Anyone)」。</li>
              <li>複製產生的「網頁應用程式網址」並貼於下方。</li>
            </ol>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Apps Script 網頁應用程式網址</label>
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-200 focus:border-amber-500 outline-none text-sm text-stone-800"
              placeholder="https://script.google.com/macros/s/..."
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
            >
              <Save size={18} />
              儲存連結設定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};