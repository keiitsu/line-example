'use client';

import Image from 'next/image';
import { ArrowRight, Check, ChevronLeft, CircleCheck, MessageCircleMore, Plus, ReceiptText, ShoppingBasket, Utensils } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

const menu = [
  { id: 'braised-pork', name: '招牌滷肉飯', note: '慢滷肉燥、溏心蛋、當日小菜', price: 85 },
  { id: 'chicken-rice', name: '椒麻雞腿飯', note: '酥香雞腿、時蔬、特製椒麻醬', price: 145 },
  { id: 'tea', name: '桂花烏龍茶', note: '冷泡烏龍、微甜桂花香', price: 45 },
];

type View = 'menu' | 'cart' | 'confirmed';

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [view, setView] = useState<View>('menu');
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const cartItems = useMemo(() => menu.filter((item) => cart[item.id]).map((item) => ({ ...item, quantity: cart[item.id] })), [cart]);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = (id: string) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setLastAdded(menu.find((item) => item.id === id)?.name || null);
    setView('menu');
  };
  const resetDemo = () => { setCart({}); setLastAdded(null); setView('menu'); };

  const phoneContent = () => {
    if (view === 'confirmed') return <div className="message-stack"><div className="bot-bubble success-bubble"><CircleCheck size={19} /><div><strong>訂單已送出</strong><p>單號 #XIANG-2409</p></div></div><div className="bot-bubble"><p className="bubble-title">巷口食堂已收到您的點單</p><p>共 {itemCount} 件餐點，模擬小計 NT${total}。店家確認後，會在這個聊天室回覆您。</p></div><button className="chat-link" onClick={resetDemo}>再點一份 <ArrowRight size={14} /></button></div>;
    if (view === 'cart') return <div className="message-stack"><div className="bot-bubble"><span className="micro-label">您的購物車</span>{cartItems.length ? <><div className="cart-lines">{cartItems.map((item) => <div key={item.id}><span>{item.name} × {item.quantity}</span><strong>NT${item.price * item.quantity}</strong></div>)}</div><div className="cart-total"><span>小計</span><strong>NT${total}</strong></div></> : <p>購物車還沒有餐點，先看看今天的菜單吧。</p>}</div>{cartItems.length > 0 && <button className="confirm-order" onClick={() => setView('confirmed')}>確認送出訂單 <ArrowRight size={14} /></button>}</div>;
    return <div className="message-stack"><div className="bot-bubble"><span className="micro-label">巷口食堂</span><p className="bubble-title">今天想吃點什麼？</p><p>選好餐點後，直接在 LINE 裡完成點單。</p></div>{lastAdded && <div className="added-note"><Check size={13} /> 已加入 {lastAdded}</div>}<div className="menu-card"><div className="menu-card-header"><span>今日菜單</span><small>DEMO MENU</small></div>{menu.map((item) => <div className="menu-row" key={item.id}><div><strong>{item.name}</strong><small>{item.note}</small><b>NT${item.price}</b></div><button aria-label={`加入${item.name}`} onClick={() => addItem(item.id)}><Plus size={16} /></button></div>)}</div>{itemCount > 0 && <button className="floating-cart" onClick={() => setView('cart')}><span><ShoppingBasket size={15} /> 購物車 {itemCount} 件</span><strong>NT${total}</strong><ArrowRight size={14} /></button>}</div>;
  };

  return <main>
    <nav className="site-nav"><a className="brand" href="#top"><span className="brand-seal">巷</span><span>巷口食堂 <em>XIANGKOU TABLE</em></span></a><span className="demo-badge"><span /> INTERACTIVE DEMO</span><a className="nav-link" href="#experience">體驗點餐 <ArrowRight size={15} /></a></nav>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><MessageCircleMore size={15} /> LINE 官方帳號點餐</p><h1>想吃的那一刻，<br /><i>剛好就在 LINE 裡。</i></h1><p className="hero-description">用一段自然的聊天，帶客人走過看菜單、加入餐點、確認送單。這是專為餐飲品牌準備的互動展示。</p><div className="hero-actions"><Button className="primary-action" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>開始體驗 <ArrowRight size={16} /></Button><span>展示資料，不會送出真實訂單</span></div><div className="trust-row"><span><Check size={14} /> 菜單一目了然</span><span><Check size={14} /> 購物車即時更新</span><span><Check size={14} /> 訂單回覆有下一步</span></div></div><div className="hero-visual"><div className="hero-photo"><Image src="/restaurant-hero.png" alt="巷口食堂展示用的滷肉飯套餐" fill priority sizes="(max-width: 760px) 92vw, 42vw" className="object-cover" /></div><div className="food-note"><span>今日招牌</span><strong>慢滷肉燥飯</strong><small>一段 LINE 對話，就能完成點餐。</small></div></div></section>
    <section className="experience" id="experience"><div className="experience-copy"><p className="eyebrow"><Utensils size={15} /> TRY THE CONVERSATION</p><h2>像一位客人一樣，<br />走一次點餐流程。</h2><p>在手機裡加入餐點、打開購物車，再送出模擬訂單。每一步都在同一個熟悉的聊天介面完成。</p><div className="experience-steps"><span><b>01</b> 看菜單</span><span><b>02</b> 加入餐點</span><span><b>03</b> 確認送單</span></div></div><div className="phone-shell"><div className="phone-status"><span>9:41</span><span className="phone-pill" /><span>●●●</span></div><div className="line-header"><button aria-label="返回"><ChevronLeft size={19} /></button><div className="chat-avatar">巷</div><div><strong>巷口食堂</strong><small>官方帳號</small></div><span className="header-more">•••</span></div><div className="chat-area"><p className="date-pill">今天</p><div className="message-line"><div className="mini-avatar">巷</div>{phoneContent()}</div></div><div className="quick-replies"><button onClick={() => setView('menu')}>看今日菜單</button><button onClick={() => setView('cart')}>我的購物車</button><button onClick={resetDemo}>重新體驗</button></div><div className="chat-input"><span>輸入訊息</span><span>＋</span><span>➤</span></div></div></section>
    <section className="value-section"><div><p className="eyebrow"><ReceiptText size={15} /> DESIGNED FOR ORDERS</p><h2>不是把菜單貼進對話，<br />而是把客人的猶豫接住。</h2></div><div className="value-grid"><article><b>01</b><h3>讓選擇變簡單</h3><p>用清楚品項、價格與動作，把「今天吃什麼」化成下一次點擊。</p></article><article><b>02</b><h3>讓訂單有確認感</h3><p>購物車先整理，再確認送出，客人和店家都知道下一步。</p></article><article><b>03</b><h3>保留品牌的溫度</h3><p>從歡迎訊息到訂單回覆，每一句都能換成店家的口吻。</p></article></div></section>
    <footer><span>巷口食堂 · LINE 點餐互動展示</span><span>此頁所有餐點、價格與訂單皆為展示資料。</span></footer>
  </main>;
}
