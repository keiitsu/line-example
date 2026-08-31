'use client';

import Image from 'next/image';
import { ArrowRight, Check, ChevronRight, CircleHelp, Handbag, MessageCircleMore, PackageCheck, Search, Sparkles, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

const products = [
  { id: 'tote', name: '帆布日常托特包', price: 980, stock: '現貨' },
  { id: 'cup', name: '手感釉面馬克杯', price: 720, stock: '現貨' },
  { id: 'mist', name: '午后木質織物噴霧', price: 580, stock: '剩 6 件' },
];
type View = 'catalog' | 'order' | 'support';

export default function Home() {
  const [cart, setCart] = useState<string[]>([]);
  const [view, setView] = useState<View>('catalog');
  const [checkedOut, setCheckedOut] = useState(false);
  const total = useMemo(() => cart.reduce((sum, id) => sum + (products.find((p) => p.id === id)?.price ?? 0), 0), [cart]);
  const addProduct = (id: string) => { setCart((items) => [...items, id]); setCheckedOut(false); setView('catalog'); };

  const renderReply = () => {
    if (view === 'order') return <div className="bubble bot-bubble order-bubble"><div className="flex items-center justify-between"><p className="font-bold">訂單 #MORI-0826</p><span className="status-chip"><Truck size={12} /> 配送中</span></div><p className="mt-2 text-xs text-stone-600">包裹已交由物流夥伴，預計 9/1 前送達。</p><button className="inline-link" onClick={() => setView('catalog')}>繼續選購 <ChevronRight size={14} /></button></div>;
    if (view === 'support') return <div className="bubble bot-bubble support-bubble"><span className="support-icon"><CircleHelp size={16} /></span><p className="font-bold">需要幫忙嗎？</p><p className="mt-1 text-xs leading-5 text-stone-600">退換貨、配送或商品問題，我們會交由專人協助。</p><button className="inline-link" onClick={() => setView('catalog')}>傳送客服需求 <ChevronRight size={14} /></button></div>;
    if (checkedOut) return <div className="bubble bot-bubble checkout-bubble"><div className="flex items-center gap-2 text-[#2f9a62]"><Check size={16} strokeWidth={3} /><span className="font-bold">已建立安全結帳連結</span></div><p className="mt-2 text-xs leading-5 text-stone-600">結帳會在受保護的付款頁完成；金額與庫存會再次確認。</p><button className="checkout-link"><span>前往模擬結帳</span><ArrowRight size={14} /></button></div>;
    return <><div className="bubble bot-bubble intro-bubble"><span className="eyebrow">MORI SELECT</span><p className="mt-1 font-bold">把喜歡的日常，帶回家。</p><p className="mt-1 text-xs leading-5 text-stone-600">從選品、加入購物車到訂單追蹤，都能在 LINE 裡完成。</p></div><div className="catalog-card"><div className="catalog-image-wrap"><Image src="/mori-hero.png" alt="MORI 精選日常商品：帆布包、手感杯與織物噴霧" fill sizes="(max-width: 640px) 80vw, 290px" className="object-cover" /></div><div className="p-3.5"><div className="flex items-center justify-between"><p className="text-[11px] font-bold tracking-[0.12em] text-[#2f9a62]">THIS WEEK’S EDIT</p><Sparkles size={14} className="text-[#d59a43]" /></div><p className="mt-1 text-sm font-bold">讓生活慢一點的三件選品</p><div className="mt-3 space-y-1.5">{products.map((p) => <button key={p.id} className="product-row" onClick={() => addProduct(p.id)}><span><strong>{p.name}</strong><small>{p.stock} · NT${p.price.toLocaleString()}</small></span><span className="add-dot">＋</span></button>)}</div></div></div>{cart.length > 0 && <div className="cart-summary"><div><span className="text-xs text-stone-500">購物車 {cart.length} 件</span><p className="font-bold">NT${total.toLocaleString()}</p></div><button onClick={() => setCheckedOut(true)}>確認結帳 <ArrowRight size={14} /></button></div>}</>;
  };

  return <main>
    <nav className="site-nav"><a className="brand" href="#top"><span className="brand-mark">M</span><span>MORI <em>SELECT</em></span></a><span className="demo-badge"><span /> INTERACTIVE DEMO</span><a className="nav-cta" href="#flow">查看流程 <ArrowRight size={15} /></a></nav>
    <section className="hero" id="top"><div className="hero-copy"><p className="kicker"><MessageCircleMore size={15} /> LINE OFFICIAL ACCOUNT</p><h1>客戶想買的那一刻，<br /><i>剛好都在 LINE 裡。</i></h1><p className="hero-description">這不是一般聊天機器人。這是一段從「看到喜歡」到「安心結帳」都能被好好接住的購物體驗。</p><div className="hero-actions"><Button onClick={() => document.getElementById('chat-demo')?.scrollIntoView({ behavior: 'smooth' })} className="primary-action">開始體驗 <ArrowRight size={16} /></Button><span>不連接真實帳號／付款</span></div><div className="trust-row"><span><Check size={14} /> 商品即時資訊</span><span><Check size={14} /> 安全結帳導流</span><span><Check size={14} /> 訂單追蹤支援</span></div></div><div className="hero-visual"><div className="paper-note">從一則訊息，<br />開啟一段好感購物。</div><div className="visual-frame"><Image src="/mori-hero.png" alt="日常選品展示" fill priority sizes="(max-width: 900px) 90vw, 40vw" className="object-cover" /></div><span className="floating-tag">CURATED<br />FOR EVERYDAY</span></div></section>
    <section className="demo-section" id="chat-demo"><div className="section-intro"><p className="kicker"><Handbag size={15} /> TRY THE CONVERSATION</p><h2>像客戶一樣，<br />親自走一遍。</h2><p>點選下方按鈕或商品卡，看看購物車與結帳引導如何自然接續。</p></div><div className="phone-shell"><div className="phone-top"><span className="speaker" /><span>9:41</span><span className="camera" /></div><div className="line-header"><button aria-label="返回"><ChevronRight className="rotate-180" size={18} /></button><div className="avatar">M</div><div><strong>MORI SELECT</strong><small>官方帳號</small></div><button aria-label="搜尋"><Search size={17} /></button></div><div className="chat-area"><p className="date-pill">今天</p><div className="message-line"><div className="mini-avatar">M</div><div>{renderReply()}</div></div></div><div className="quick-replies"><button onClick={() => { setView('catalog'); setCheckedOut(false); }}>看本週選品</button><button onClick={() => setView('order')}>追蹤我的訂單</button><button onClick={() => setView('support')}>需要協助</button></div><div className="chat-input"><span>輸入訊息</span><span className="input-plus">＋</span><span className="input-send">➤</span></div></div></section>
    <section className="flow-section" id="flow"><div className="flow-heading"><p className="kicker"><PackageCheck size={15} /> BUILT FOR TRUST</p><h2>看見商品，也看見<br />值得信任的購物流程。</h2></div><div className="flow-grid"><article><span>01</span><h3>商品資訊有來源</h3><p>價格、款式與可售狀態，應來自已核准的商品資料，而不是聊天內容的猜測。</p></article><article><span>02</span><h3>結帳前再次確認</h3><p>購物車會重新核對數量、價格與庫存，再把客戶帶往安全付款頁面。</p></article><article><span>03</span><h3>售後不斷線</h3><p>訂單追蹤、例外狀況與真人支援，都保留清楚且安心的下一步。</p></article></div></section>
    <footer><span>MORI SELECT · LINE SHOPPING BOT DEMO</span><span>所有商品、價格與訂單皆為展示用模擬資料。</span></footer>
  </main>;
}
