import React from 'react';
import { Heart, FileQuestion } from 'lucide-react';
export const EmptyState = ({ 
  title = "Data Tidak Tersedia", 
  message, 
  subMessage = "Silakan pilih tahun lain atau cek kembali data sumber." 
}: { 
  title?: string, 
  message: React.ReactNode, 
  subMessage?: string 
}) => {
  return (
    <div className="w-full min-h-[500px] flex flex-col items-center justify-center p-8 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 animate-fadeIn">
       <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
           <FileQuestion size={40} className="text-slate-300" />
       </div>
       <h3 className="text-lg font-bold text-slate-600 mb-1">{title}</h3>
       <p className="text-sm text-center max-w-md text-slate-500">
         {message}
       </p>
       {subMessage && (
         <p className="text-xs text-slate-400 mt-4 bg-slate-100 px-3 py-1 rounded-full">
           {subMessage}
         </p>
       )}
    </div>
  );
};

export const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyle = "px-4 py-2.5 rounded-xl font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  const variants: any = {
    primary: "bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:shadow-lg hover:shadow-pink-500/30",
    secondary: "bg-white text-pink-700 border border-pink-200 hover:bg-pink-50 shadow-sm",
    ghost: "text-pink-600 hover:bg-pink-50",
    outline: "border border-pink-600 text-pink-600 hover:bg-pink-50"
  };
  return <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

export const Card = ({ children, className = '', ...props }: any) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-pink-100 ${className}`} {...props}>{children}</div>
);

export const Input = ({ icon: Icon, className = '', ...props }: any) => (
  <div className={`relative group ${className}`}>
    {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon size={18} className="text-pink-300 group-focus-within:text-pink-500 transition-colors" /></div>}
    <input className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-pink-50/50 border border-pink-100 text-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder-pink-300`} {...props} />
  </div>
);

export const Footer = () => (
  <footer className="bg-white border-t border-pink-100 py-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2"><Heart className="h-5 w-5 text-pink-500 fill-current" /><span className="font-bold text-slate-700">JatimHealth<span className="text-pink-500">Explorer</span></span></div>
      <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Dinas Kesehatan Provinsi Jawa Timur.</p>
    </div>
  </footer>
);


export const WrappedYAxisTick = ({ x, y, payload }: any) => {
  const text = String(payload.value).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
     if (currentLine.length + words[i].length < 25) {
        currentLine += ' ' + words[i];
     } else {
        lines.push(currentLine);
        currentLine = words[i];
     }
  }
  lines.push(currentLine);

  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, index) => (
        <text 
          key={index}
          x={0} 
          y={0} 
          dy={index * 12 - (lines.length - 1) * 6 + 3} 
          textAnchor="end" 
          fill="#64748b" 
          fontSize={11} 
          fontWeight={500}
        >
          {line}
        </text>
      ))}
    </g>
  );
};