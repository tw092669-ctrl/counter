import React, { useState } from 'react';
import { X, Download, Link2 } from 'lucide-react';

interface DesktopShortcutModalProps {
  onClose: () => void;
}

export const DesktopShortcutModal: React.FC<DesktopShortcutModalProps> = ({ onClose }) => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [iconUrl, setIconUrl] = useState('https://i.meee.com.tw/bWzgb80.jpg');

  const generateDesktopShortcut = () => {
    if (!url.trim()) {
      alert('請輸入網址');
      return;
    }

    const shortcutName = name.trim() || '網站快捷方式';
    
    // Generate .url file content (Windows format) with optional icon
    let urlFileContent = `[InternetShortcut]\nURL=${url}\n`;
    if (iconUrl.trim()) {
      urlFileContent += `IconFile=${iconUrl}\nIconIndex=0\n`;
    }
    
    // Create blob and download
    const blob = new Blob([urlFileContent], { type: 'text/plain' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${shortcutName}.url`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
    
    // Also generate .webloc file (macOS format)
    const weblocContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>URL</key>
  <string>${url}</string>
</dict>
</plist>`;
    
    const weblocBlob = new Blob([weblocContent], { type: 'application/xml' });
    const weblocUrl = window.URL.createObjectURL(weblocBlob);
    const weblocLink = document.createElement('a');
    weblocLink.href = weblocUrl;
    weblocLink.download = `${shortcutName}.webloc`;
    document.body.appendChild(weblocLink);
    weblocLink.click();
    document.body.removeChild(weblocLink);
    window.URL.revokeObjectURL(weblocUrl);
    setIconUrl('');
    
    // Clear and close
    setUrl('');
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link2 className="text-amber-500" />
            <h2 className="text-xl font-bold text-stone-800">建立桌面快捷方式</h2>
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
              快捷方式名稱
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
              >
            <label className="block text-sm font-medium text-stone-700 mb-2">
              圖標網址（選填）
            </label>
            <input
              type="url"
              value={iconUrl}
              onChange={(e) => setIconUrl(e.target.value)}
              placeholder="https://example.com/icon.ico"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <p className="text-xs text-stone-500 mt-1">
              支援 .ico、.png、.jpg 格式（僅 Windows）
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-stone-700">
            <p className="font-medium mb-1">說明：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>將會下載兩個檔案（Windows .url 和 macOS .webloc）</li>
              <li>圖標設定僅對 Windows 有效，macOS 會自動使用網站 favicon

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-stone-700">
            <p className="font-medium mb-1">說明：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>將會下載兩個檔案（Windows .url 和 macOS .webloc）</li>
              <li>將檔案移動到桌面即可使用</li>
              <li>點擊快捷方式會在瀏覽器中開啟該網址</li>
            </ul>
          </div>

          <button
            onClick={generateDesktopShortcut}
            className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Download size={18} />
            下載快捷方式
          </button>
        </div>
      </div>
    </div>
  );
};
