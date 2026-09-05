import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });
export const metadata: Metadata = {
  metadataBase: new URL('https://mori-line-shopping-demo.wyc325540.chatgpt.site'),
  title: '巷口食堂｜LINE 圖文選單體驗',
  description: '點擊菜單、購物車、營業資訊與每日限定，體驗完整 LINE 點餐流程。',
  openGraph: { title: '巷口食堂｜LINE 圖文選單體驗', description: '點擊菜單、購物車、營業資訊與每日限定，體驗完整 LINE 點餐流程。', images: ['/og.png'] },
  twitter: { card: 'summary_large_image', title: '巷口食堂｜LINE 圖文選單體驗', description: '點擊菜單、購物車、營業資訊與每日限定，體驗完整 LINE 點餐流程。', images: ['/og.png'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-Hant"><body className={geist.variable}>{children}</body></html>; }
