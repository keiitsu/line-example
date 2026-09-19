# MORI SELECT｜LINE 官方購物機器人 Demo

這是一個給零售客戶展示的 LINE 官方帳號購物流程樣本，包含：

- 商品目錄與加入購物車
- 購物車結帳流程
- 營業資訊
- 會員登入後的訂單查詢

展示資料皆為模擬內容，不會建立真實訂單、扣庫存、傳送會員資料或進行付款。

## 線上展示

### D 型實體門市會員 LINE 互動成品（單一 HTML）

- [直接開啟 D 型互動成品](https://keiitsu.github.io/line-example/membership-template.html)：LINE 風格聊天視窗、訊息輸入、快速回覆、可收合六格圖文選單、貼圖及卡片操作。
- [單獨開啟完整建構導覽](https://keiitsu.github.io/line-example/membership-guide.html)：品牌設定、情境演練、自評、交接紀錄匯出與建構文件。
- 預覽頁按「下載獨立 HTML」後，用 Chrome、Edge 或 Firefox 直接開啟；樣式、程式與示範資料全部內嵌，不需要啟動伺服器。
- 基礎版提供門市資訊、固定 FAQ、優惠券、集點卡與人工聯絡；進階版提供會員綁定、會員卡、個人點數／消費紀錄、會員券、AI 問答與真人接管。切換版本會重置示範狀態。
- 「門市模擬」可操作消費發點、退款、核銷與店員接手／回覆／結案；同一收據、退款與券不可重複處理。待接手與人工服務期間，Bot 會暫停自動回答。
- 所有會員、交易、品牌規則及 AI 回覆均為本機模擬，不呼叫真實 AI、POS 或 LINE，不會付款或發送正式訊息。正式 AI 供應商待決定。
- 獨立 HTML 內嵌全部樣式、程式與示範資料，無外部資產。重新整理即清除狀態；下載檔從初始狀態啟動，不包含當次客服輸入。完整建構導覽保留在上方獨立連結。
- `docs/membership-template.html`、`docs/membership-guide.html` 供 GitHub Pages 使用；`public/` 內的同名檔供應用程式靜態發布使用，更新時須同步。

### C 型高單價／長決策 AI 諮詢模板（單一 HTML）

- [2026/09/19 新版 LINE 聊天互動成品](https://keiitsu.github.io/line-example/consultation-line.html)：依 Notion 指南區分基礎／進階版本，支援聊天輸入、快速回覆、案例卡片、六格選單、表單、需求確認、案件進度與人工接手模擬。
- 新版頁面另含可點選的建置架構、分階段工時、進階費用試算、選配模組與 CSV／規劃／獨立 HTML 下載。以 NT$1,500／人時估算，基礎版 20–32 人時；進階升級追加 42–76 人時、NT$63,000–114,000；整套 62–108 人時、NT$93,000–162,000，均未稅、平台月費另計。
- 新版僅使用本頁記憶體模擬，不會呼叫正式 LINE、AI、CRM 或日曆；重新整理即清除。`docs/consultation-line.html` 與 `public/consultation-line.html` 同步發布。舊版導覽保留如下。
- [直接開啟 C 型互動模板](https://keiitsu.github.io/line-example/consultation-template.html)
- [HTML 原始檔／下載](https://github.com/keiitsu/line-example/blob/main/docs/consultation-template.html)：按 Download raw file，或在預覽頁按「下載獨立 HTML」，儲存後用 Chrome、Edge 或 Firefox 開啟。
- 樣式、JavaScript 與示範資料已全部內嵌；可直接開啟本機 HTML，不需要 Node.js、本機伺服器、API 金鑰或網路連線。
- 保留知識問答、六種服務情境、需求填寫與摘要確認、顧問接單、互動架構圖、知識編輯／匯出及串接清單。
- AI 與案件皆為模擬，不會呼叫真實服務或發送 LINE 訊息。正式 AI 供應商仍待選定。
- `docs/consultation-template.html` 供 GitHub Pages 使用；`public/consultation-template.html` 為相同檔案，供應用程式靜態資產發布使用。更新時同步兩份。

### 可自訂品牌的 A 型導購模板（單一 HTML）

- [直接開啟互動模板](https://keiitsu.github.io/line-example/shopping-template.html)
- [HTML 原始檔／下載](https://github.com/keiitsu/line-example/blob/main/docs/shopping-template.html)：按 Download raw file，儲存為 `.html`，再用 Chrome 或 Edge 開啟。
- CSS、JavaScript 與示範目錄已內嵌，不需要 Node.js、本機伺服器、LINE 金鑰或網路連線。
- 提供品牌／歡迎詞／三款配色、商品與優惠情境、設定 JSON 匯入匯出及客服接管模擬；重新整理會重置展示。
- `docs/shopping-template.html` 供 GitHub Pages 使用；`public/shopping-template.html` 為相同檔案，供應用程式靜態資產發布使用。更新時請同步兩份。

### 原有購物流程展示

GitHub Pages：<https://keiitsu.github.io/line-example/>

Sites：<https://mori-line-shopping-demo.wyc325540.chatgpt.site/>
