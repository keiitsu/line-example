# MORI SELECT｜LINE 官方購物機器人 Demo

這是一個給零售客戶展示的 LINE 官方帳號購物流程樣本，包含：

- 商品目錄與加入購物車
- 購物車結帳流程
- 營業資訊
- 會員登入後的訂單查詢

展示資料皆為模擬內容，不會建立真實訂單、扣庫存、傳送會員資料或進行付款。

## 線上展示

### C 型高單價／長決策 AI 諮詢模板（單一 HTML）

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
