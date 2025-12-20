import React, { useState } from 'react';
import { X, Share2, Link2, ExternalLink } from 'lucide-react';

interface DesktopShortcutModalProps {
  onClose: () => void;
}

export const DesktopShortcutModal: React.FC<DesktopShortcutModalProps> = ({ onClose }) => {
  // Get current page URL with all parameters (including script and group)
  const getCurrentFullUrl = () => {
    return window.location.href;
  };

  const [url, setUrl] = useState(getCurrentFullUrl());
  const [name, setName] = useState('法藏修法記數器');

  const handleOpenUrl = () => {
    if (!url.trim()) {
      alert('請輸入網址');
      return;
    }
    
    // Open URL in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyUrl = async () => {
    if (!url.trim()) {
      alert('請輸入網址');
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      alert('網址已複製到剪貼簿！');
    } catch (err) {
      alert('複製失敗，請手動複製');
    }
  };

  const handleShare = async () => {
    if (!url.trim()) {
      alert('請輸入網址');
      return;
    }

    const shareData = {
      title: name.trim() || '分享網址',
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          alert('分享失敗');
        }
      }
    } else {
      // Fallback: copy to clipboard
      await handleCopyUrl();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link2 className="text-amber-500" />
            <h2 className="text-xl font-bold text-stone-800">快速開啟網址</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X size={20} className="text-stone-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              名稱（選填）
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：法藏修法記數器"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              網址 <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-stone-700">
            <p className="font-medium mb-1">如何加到主畫面：</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li><strong>iOS</strong>：在 Safari 點擊「開啟網址」後，點擊分享 → 加入主畫面</li>
              <li><strong>Android</strong>：點擊「開啟網址」後，在選單中選擇「加到主畫面」</li>
              <li className="text-amber-700">包含試算表設定，從桌面開啟可自動連結</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={handleOpenUrl}
              className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <ExternalLink size={18} />
              開啟網址
            </button>

            <button
              onClick={handleShare}
              className="w-full bg-stone-500 text-white py-3 px-4 rounded-lg hover:bg-stone-600 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Share2 size={18} />
              分享網址
            </button>

            <button
              onClick={handleCopyUrl}
              className="w-full border-2 border-stone-300 text-stone-700 py-3 px-4 rounded-lg hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Link2 size={18} />
              複製網址
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
