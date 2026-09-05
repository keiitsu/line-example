import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });
export const metadata: Metadata = { title: 'MORI SELECT｜LINE 購物機器人展示', description: '讓客戶親自體驗 LINE 官方帳號購物流程的互動展示。' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-Hant"><body className={geist.variable}>{children}</body></html>; }
