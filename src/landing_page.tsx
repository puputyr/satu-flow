import React from 'react';
import { Heart, ArrowRight, BarChart2, Map as MapIcon, ShieldCheck } from 'lucide-react';
import { Button, Card, Footer } from './elements';

const LandingPage = ({ onGetStarted, onLogin }: any) => (
  <div className="min-h-screen bg-pink-50 font-sans flex flex-col">
    <nav className="max-w-7xl mx-auto w-full px-6 py-6 flex justify-between items-center">
      <div className="flex items-center gap-2"><Heart className="h-8 w-8 text-pink-600 fill-current" /><span className="font-extrabold text-2xl text-slate-800 tracking-tight">JatimHealth</span></div>
      <div className="flex gap-3"><Button variant="ghost" onClick={onLogin}>Masuk</Button><Button onClick={onGetStarted}>Daftar</Button></div>
    </nav>
    <main className="flex-1 flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold mb-6 animate-fadeIn"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span></span>Data Terupdate 2024</div>
      <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-pink-900">Eksplorasi Profil Kesehatan <br/> <span className="text-pink-600">Jawa Timur</span></h1>
      <p className="text-lg md:text-xl text-slate-500 mb-8 max-w-2xl leading-relaxed">Platform analisis data kesehatan terpadu untuk memantau, membandingkan, dan memvisualisasikan indikator kesehatan di 38 Kabupaten/Kota.</p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"><Button onClick={onGetStarted} className="px-8 py-4 text-lg shadow-xl shadow-pink-500/20">Mulai Analisis <ArrowRight size={20} /></Button></div>
      
      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left w-full">
        {[{ icon: BarChart2, title: "Visualisasi Interaktif", desc: "Grafik dinamis untuk analisis tren kesehatan 5 tahun terakhir." }, { icon: MapIcon, title: "Peta Sebaran GIS", desc: "Pemetaan spasial untuk identifikasi wilayah prioritas." }, { icon: ShieldCheck, title: "Data Terverifikasi", desc: "Integrasi langsung dengan API Publik BPS Provinsi Jawa Timur." }].map((feat, idx) => (
          <Card key={idx} className="p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-4"><feat.icon size={24} /></div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">{feat.title}</h3><p className="text-slate-500 text-sm">{feat.desc}</p>
          </Card>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);
export default LandingPage;