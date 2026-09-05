'use client';

import Image from 'next/image';
import { ArrowRight, Check, ChevronLeft, CircleCheck, Clock, Info, MapPin, Plus, RotateCcw, ShoppingBasket, Sparkles, Utensils } from 'lucide-react';
import { useMemo, useState } from 'react';

const menu = [
  { id: 'braised-pork', name: '招牌滷肉飯', note: '慢滷肉燥、溏心蛋、當日小菜', price: 85 },
  { id: 'chicken-rice', name: '椒麻雞腿飯', note: '酥香雞腿、時蔬、特製椒麻醬', price: 145 },
  { id: 'tea', name: '桂花烏龍茶', note: '冷泡烏龍、微甜桂花香', price: 45 },
  { id: 'daily-salmon', name: '炙燒味噌鮭魚飯', note: '每日限定 12 份，售完為止', price: 180, limited: true },
];

type View = 'home' | 'menu' | 'cart' | 'info' | 'limited' | 'confirmed';
type Topic = Exclude<View, 'home' | 'confirmed'>;

const sopFlows: { id: Topic; label: string; action: string; result: string; steps: string[] }[] = [
  { id: 'menu', label: '菜單', action: 'menu.open.v1', result: '回傳目前可售的 Flex 菜單', steps: ['顧客點擊「菜單」', '後端讀取有效菜單與售價', '回覆可售餐點卡片', '點選餐點後加入購物車'] },
  { id: 'cart', label: '查看購物車', action: 'cart.view.v1', result: '重新計價後顯示訂單摘要', steps: ['顧客點擊「查看購物車」', '讀取該顧客的購物車', '重新核對品項、數量與價格', '顧客修改內容或確認送單'] },
  { id: 'info', label: '營業資訊', action: 'store.info.v1', result: '回傳核准的營業與交通資訊', steps: ['顧客點擊「營業資訊」', '讀取店家公開設定', '回覆營業時間與地址', '引導開啟地圖或返回主選單'] },
  { id: 'limited', label: '每日限定', action: 'special.today.v1', result: '依台北日期回傳當日限定', steps: ['顧客點擊「每日限定」', '以 Asia/Taipei 判斷日期', '查詢今日品項與可售狀態', '可售則加入；售完則安全提示'] },
];

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [view, setView] = useState<View>('home');
  const [activeFlow, setActiveFlow] = useState<Topic>('menu');
  const cartItems = useMemo(() => menu.filter((item) => cart[item.id]).map((item) => ({ ...item, quantity: cart[item.id] })), [cart]);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openTopic = (topic: Topic) => { setView(topic); setActiveFlow(topic); };
  const addItem = (id: string) => { setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 })); setView('cart'); setActiveFlow('cart'); };
  const resetDemo = () => { setCart({}); setView('home'); setActiveFlow('menu'); };

  const phoneContent = () => {
    if (view === 'home') return <div className="message-stack"><div className="bot-bubble"><span className="micro-label">歡迎來到巷口食堂</span><p className="bubble-title">午安，今天想吃點什麼？</p><p>請從下方圖文選單開始，四個入口都可以直接點擊體驗。</p></div><div className="guide-bubble"><span>↓</span> 點選下方任一主題</div></div>;
    if (view === 'menu') return <div className="message-stack"><div className="bot-bubble compact"><span className="micro-label">目前可售菜單</span><p>價格與供應狀態由店家資料即時提供。</p></div><div className="menu-card">{menu.filter((item) => !item.limited).map((item) => <div className="menu-row" key={item.id}><div><strong>{item.name}</strong><small>{item.note}</small><b>NT${item.price}</b></div><button aria-label={`加入${item.name}`} onClick={() => addItem(item.id)}><Plus size={16} /></button></div>)}</div></div>;
    if (view === 'cart') return <div className="message-stack"><div className="bot-bubble"><span className="micro-label">您的購物車</span>{cartItems.length ? <><div className="cart-lines">{cartItems.map((item) => <div key={item.id}><span>{item.name} × {item.quantity}</span><strong>NT${item.price * item.quantity}</strong></div>)}</div><div className="cart-total"><span>重新計算小計</span><strong>NT${total}</strong></div></> : <p>購物車目前是空的，先從「菜單」或「每日限定」挑選餐點。</p>}</div>{cartItems.length ? <button className="confirm-order" onClick={() => setView('confirmed')}>確認送出模擬訂單 <ArrowRight size={15} /></button> : <button className="chat-link" onClick={() => openTopic('menu')}>前往菜單 <ArrowRight size={14} /></button>}</div>;
    if (view === 'info') return <div className="message-stack"><div className="bot-bubble info-bubble"><span className="micro-label">巷口食堂｜營業資訊</span><div className="info-line"><Clock size={15} /><div><strong>週一至週六</strong><p>11:30–14:00、17:00–20:30</p></div></div><div className="info-line"><MapPin size={15} /><div><strong>台北市中山區巷口路 18 號</strong><p>捷運站步行約 5 分鐘</p></div></div><small className="demo-note">以上為展示資料，正式版會使用店家核准資訊。</small></div></div>;
    if (view === 'limited') { const item = menu.find((entry) => entry.limited)!; return <div className="message-stack"><div className="limited-card"><div className="limited-art"><Image src="/restaurant-hero.png" alt="每日限定套餐展示" fill sizes="290px" className="object-cover" /></div><div><span className="micro-label">今日限定｜剩餘 7 份</span><p className="bubble-title">{item.name}</p><p>{item.note}</p><div className="limited-action"><strong>NT${item.price}</strong><button onClick={() => addItem(item.id)}>加入購物車 <Plus size={14} /></button></div></div></div></div>; }
    return <div className="message-stack"><div className="bot-bubble success-bubble"><CircleCheck size={22} /><div><strong>模擬訂單已送出</strong><p>單號 #XIANG-2409</p></div></div><div className="bot-bubble"><p className="bubble-title">店家已收到點單摘要</p><p>共 {itemCount} 件，模擬小計 NT${total}。正式版會等待店家確認後再回覆顧客。</p></div><button className="chat-link" onClick={resetDemo}>重新體驗 <RotateCcw size={14} /></button></div>;
  };

  const activeSop = sopFlows.find((flow) => flow.id === activeFlow)!;

  return <main>
    <nav className="site-nav"><a className="brand" href="#top"><span className="brand-seal">巷</span><span>巷口食堂 <em>LINE ORDERING DEMO</em></span></a><span className="demo-badge"><span /> INTERACTIVE DEMO</span><a className="nav-link" href="#sop">查看流程 <ArrowRight size={15} /></a></nav>
    <section className="demo-stage" id="top"><div className="stage-copy"><p className="eyebrow"><Sparkles size={16} /> LINE 圖文選單體驗</p><h1>四個入口，<br />把點餐流程說清楚。</h1><p>請直接點擊手機下方的「菜單、查看購物車、營業資訊、每日限定」，看看每個主題如何回覆顧客。</p><div className="legend"><span><Check size={15} /> 可實際點擊</span><span><Check size={15} /> 全程模擬資料</span><span><Check size={15} /> 不會送出真實訂單</span></div><div className="food-preview"><Image src="/restaurant-hero.png" alt="巷口食堂套餐展示" fill priority sizes="(max-width: 820px) 92vw, 36vw" className="object-cover" /><span>今日好味道，從 LINE 開始。</span></div></div>
      <div className="phone-shell"><div className="phone-status"><span>9:41</span><span className="phone-pill" /><span>●●●</span></div><div className="line-header"><button aria-label="返回"><ChevronLeft size={19} /></button><div className="chat-avatar">巷</div><div><strong>巷口食堂</strong><small>官方帳號</small></div><span className="header-more">•••</span></div><div className="chat-area"><p className="date-pill">今天</p><div className="message-line"><div className="mini-avatar">巷</div>{phoneContent()}</div></div><div className="chat-input"><span>輸入訊息</span><span>＋</span><span>➤</span></div><div className="rich-menu"><button className={view === 'menu' ? 'active' : ''} onClick={() => openTopic('menu')}><span className="rich-icon menu-icon"><Utensils size={22} /></span><span><strong>菜單</strong><small>查看全部餐點</small></span></button><button className={view === 'cart' ? 'active' : ''} onClick={() => openTopic('cart')}><span className="rich-icon cart-icon"><ShoppingBasket size={22} /></span><span><strong>查看購物車</strong><small>{itemCount ? `${itemCount} 件・NT$${total}` : '確認已選品項'}</small></span></button><button className={view === 'info' ? 'active' : ''} onClick={() => openTopic('info')}><span className="rich-icon info-icon"><Info size={22} /></span><span><strong>營業資訊</strong><small>時間・地址・交通</small></span></button><button className={view === 'limited' ? 'active' : ''} onClick={() => openTopic('limited')}><span className="rich-icon limited-icon"><Sparkles size={22} /></span><span><strong>每日限定</strong><small>今天才吃得到</small></span></button></div></div>
    </section>
    <section className="sop-section" id="sop"><div className="sop-heading"><p className="eyebrow">CLICK SOP</p><h2>四個主題的點擊流程</h2><p>點選主題可切換 SOP。正式實作時，每個入口都使用固定版本的 postback 動作，後端再決定要回覆的資料。</p></div><div className="sop-layout"><div className="sop-tabs">{sopFlows.map((flow, index) => <button key={flow.id} className={activeFlow === flow.id ? 'active' : ''} onClick={() => { setActiveFlow(flow.id); setView(flow.id); }}><span>0{index + 1}</span><strong>{flow.label}</strong><ArrowRight size={16} /></button>)}</div><div className="sop-detail"><div className="contract-row"><span>點擊動作</span><code>{activeSop.action}</code></div><div className="contract-row"><span>預期結果</span><strong>{activeSop.result}</strong></div><div className="flow-track">{activeSop.steps.map((step, index) => <div key={step}><b>{index + 1}</b><span>{step}</span>{index < activeSop.steps.length - 1 && <ArrowRight size={16} />}</div>)}</div><div className="safety-note"><strong>正式版守則</strong><p>postback 只表達顧客意圖；價格、庫存、營業資訊與每日限定內容都由伺服器重新讀取與驗證。重複點擊不會重複建立訂單。</p></div></div></div></section>
    <section className="summary-strip"><div><strong>菜單</strong><span>瀏覽與加入</span></div><div><strong>購物車</strong><span>重算與確認</span></div><div><strong>營業資訊</strong><span>核准內容回覆</span></div><div><strong>每日限定</strong><span>依日期與庫存判斷</span></div></section>
    <footer><span>巷口食堂 · LINE 圖文選單展示</span><span>餐點、價格、庫存、地址與訂單皆為模擬資料。</span></footer>
  </main>;
}
