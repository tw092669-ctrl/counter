
# 法藏 fazang 修法記數器

一個簡潔優雅的佛教持咒計數應用，幫助您追蹤和管理每日修行進度。

## 功能特色

- ✨ **咒語管理**：新增、編輯和管理多個咒語
- 📊 **計數追蹤**：記錄每次持咒的次數，支援計數與總數顯示
- 🎯 **目標設定**：為每個咒語設定持誦目標
- 📅 **期間統計**：設定持咒期間（起訖日期），查看期間內的進度
- 📌 **置頂功能**：將重要的咒語置頂顯示
- 📖 **歷史紀錄**：查看完整的持咒歷史記錄
- 👤 **個人資料**：設定修行者姓名與個人資訊
- 🌙 **本地儲存**：所有資料儲存在本地瀏覽器，保護您的隱私

## 技術架構

- **框架**：React 19 + TypeScript
- **建置工具**：Vite 6
- **樣式**：Tailwind CSS 4 + PostCSS
- **圖示**：Lucide React
- **儲存**：LocalStorage API

## 安裝與執行

### 前置需求

- Node.js 18+ 
- npm 或 yarn

### 本地開發

1. 安裝依賴：
   ```bash
   npm install
   ```

2. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

3. 在瀏覽器開啟 `http://localhost:3000`

### 建置生產版本

```bash
npm run build
```

建置完成後，產出檔案會在 `dist` 目錄中。

### 預覽生產版本

```bash
npm run preview
```

## 專案結構

```
fazang/
├── components/          # React 元件
│   ├── BuddhaHeader.tsx
│   ├── DateSettingModal.tsx
│   ├── EditMantraModal.tsx
│   ├── HistoryView.tsx
│   ├── InputModal.tsx
│   ├── SheetSettingsModal.tsx
│   └── UserModal.tsx
├── services/           # 服務層
│   └── storage.ts      # LocalStorage 管理
├── App.tsx             # 主應用元件
├── index.tsx           # 應用入口
├── types.ts            # TypeScript 型別定義
├── constants.ts        # 常數定義
└── vite.config.ts      # Vite 配置
```

## 部署

此應用為純前端專案，可部署至任何靜態網站託管服務：

- **Vercel**：`vercel --prod`
- **Netlify**：拖放 `dist` 目錄
- **GitHub Pages**：推送 `dist` 目錄至 `gh-pages` 分支
- **其他**：上傳 `dist` 目錄至任何靜態伺服器

## 授權

MIT License

## 貢獻

歡迎提交 Issue 和 Pull Request！
