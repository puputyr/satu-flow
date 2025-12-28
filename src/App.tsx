import React, { useState, useEffect } from 'react';
import { Activity, Map as MapIcon, Users, LayoutDashboard, Heart, LogOut, User, ChevronDown, Calendar, Database } from 'lucide-react';
import LandingPage from './landing_page';
import AuthPage from './register_login';
import DashboardAnalysis from './dasboard_analisis';
import RegionComparison from './komparasi_wilayah';
import GisMap from './peta';
import { INDICATORS, generateMockData } from './constants';

export default function App() {
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard'>('landing'); 
  const [user, setUser] = useState<{username: string} | null>(null);
  const [activeTab, setActiveTab] = useState('single');
  const [region1, setRegion1] = useState('Kota Surabaya');
  const [region2, setRegion2] = useState('Kab. Malang');
  const [indicator, setIndicator] = useState('ind_3');
  const [selectedYear, setSelectedYear] = useState(2023);
  const [dbData, setDbData] = useState(() => generateMockData());
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  const currentIndicator = INDICATORS.find(i => i.id === indicator);

  useEffect(() => {
    if(!currentIndicator || view !== 'dashboard') return;
    const fetchTable = async () => {
      setIsFetching(true);
      try {
        const res = await fetch(`http://localhost:5000/api/data?table=${currentIndicator.table_name}`);
        if(res.ok) {
          const contentType = res.headers.get("content-type");
          if(contentType && contentType.includes("json")) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              setDbData(prev => ({...prev, [currentIndicator.table_name]: data}));
              setIsDbConnected(true);
            }
          }
        } else { setIsDbConnected(false); }
      } catch (e) { setIsDbConnected(false); } finally { setIsFetching(false); }
    };
    fetchTable();
  }, [indicator, view, currentIndicator]);

  useEffect(() => {
    if (document.getElementById('leaflet-script')) { setLeafletLoaded(true); return; }
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
    const script = document.createElement('script'); script.id = 'leaflet-script'; script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; script.async = true; script.onload = () => setLeafletLoaded(true); document.body.appendChild(script);
  }, []);

  const handleLogin = (userData: any) => { setUser(userData); setView('dashboard'); };
  const handleLogout = () => { setUser(null); setView('landing'); };

  if (view === 'landing') return <LandingPage onGetStarted={() => setView('auth')} onLogin={() => setView('auth')} />;
  if (view === 'auth') return <AuthPage onLogin={handleLogin} />;

  return (
    <div className="flex h-screen bg-pink-50 font-sans text-slate-800 overflow-hidden">
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-pink-100 z-20 shadow-lg">
        <div className="p-6 flex flex-col items-center border-b border-pink-50">
          <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mb-3 shadow-md"><Heart className="text-white w-7 h-7 fill-current" /></div>
          <h1 className="text-xl font-bold text-pink-900 tracking-tight">JatimHealth</h1>
          <p className="text-[10px] text-pink-400 font-mono mt-1">{isDbConnected ? '🟢 Live Data' : '🟠 Mock Data'}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <p className="px-4 text-xs font-bold text-pink-400 uppercase tracking-wider mb-2">Menu Utama</p>
          {[{ id: 'single', label: 'Analisis Provinsi', icon: LayoutDashboard }, { id: 'compare', label: 'Komparasi Wilayah', icon: Users }, { id: 'map', label: 'Peta GIS', icon: MapIcon }].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === item.id ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-500 hover:bg-pink-50'}`}><item.icon size={18} /> {item.label}</button>
          ))}
        </nav>
        <div className="p-4 border-t border-pink-50"><div className="mb-3 px-2 flex items-center gap-2 text-xs text-pink-600"><User size={14} /> {user?.username}</div><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"><LogOut size={18} /> Keluar</button></div>
      </aside>

      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 z-10">
          <div className="md:hidden w-full flex justify-between items-center"><div className="flex items-center gap-2"><Heart className="text-pink-600 w-6 h-6 fill-current"/><span className="font-bold text-lg text-pink-900">JatimHealth</span></div><button onClick={handleLogout}><LogOut className="text-slate-400" size={20}/></button></div>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-80"><Activity size={16} className="absolute left-3 top-3 text-pink-400" /><select value={indicator} onChange={(e) => setIndicator(e.target.value)} className="w-full pl-10 pr-8 py-2.5 bg-white border border-pink-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/50 appearance-none">{INDICATORS.map(ind => <option key={ind.id} value={ind.id}>{ind.name}</option>)}</select><ChevronDown size={16} className="absolute right-3 top-3 text-pink-400 pointer-events-none" /></div>
            <div className="relative group w-full md:w-40"><Calendar size={16} className="absolute left-3 top-3 text-pink-400" /><select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="w-full pl-10 pr-8 py-2.5 bg-white border border-pink-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/50 appearance-none">{[2019, 2020, 2021, 2022, 2023, 2024].map(y => <option key={y} value={y}>Tahun {y}</option>)}</select><ChevronDown size={16} className="absolute right-3 top-3 text-pink-400 pointer-events-none" /></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 scroll-smooth">
          {activeTab === 'single' && currentIndicator && <DashboardAnalysis dbData={dbData} selectedYear={selectedYear} currentIndicator={currentIndicator} />}
          {activeTab === 'compare' && currentIndicator && <RegionComparison dbData={dbData} selectedYear={selectedYear} currentIndicator={currentIndicator} region1={region1} setRegion1={setRegion1} region2={region2} setRegion2={setRegion2} />}
          {activeTab === 'map' && currentIndicator && <GisMap dbData={dbData} selectedYear={selectedYear} currentIndicator={currentIndicator} leafletLoaded={leafletLoaded} />}
        </main>
      </div>
    </div>
  );
}