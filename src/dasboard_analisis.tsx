import React, { useMemo } from 'react';
import { Activity, TrendingUp, TrendingDown, Layers, ArrowUpRight, ArrowDownRight, PieChart as PieChartIcon, FileQuestion } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Card, EmptyState } from './elements';

const COLORS = [
  '#ec4899', '#db2777', '#d946ef', '#c026d3', '#e11d48', '#be123c', '#8b5cf6', '#7c3aed',
  '#be185d', '#a21caf', '#9f1239', '#6d28d9', '#f472b6', '#e879f9', '#fb7185', '#a78bfa',
  '#831843', '#701a75', '#881337', '#5b21b6'
];

const DashboardAnalysis = ({ dbData, selectedYear, currentIndicator }: any) => {
  const dashboardData = useMemo(() => {
    if (!dbData || !currentIndicator) return {
       trendChartData: [], top10: [], bottom10: [], growthRate: 0, pieDataWithPercent: [], totalJatim: 0, totalRegions: 0
    };

    const tableData = dbData[currentIndicator.table_name] || [];
    const normalize = (str: string) => String(str).trim().toLowerCase();
    
    // Tren Jatim
    const jatimRows = tableData.filter((r:any) => normalize(r.kabupatenkota) === 'jawa timur');
    const trendJatim: any = {};
    jatimRows.forEach((row:any) => { trendJatim[row.tahun] = (trendJatim[row.tahun] || 0) + row.jumlah; });
    const trendChartData = Object.keys(trendJatim).sort().map(year => ({ tahun: year, jumlah: trendJatim[year] }));

    // Ranking Data & Jumlah Wilayah
    const yearData = tableData.filter((r:any) => String(r.tahun) === String(selectedYear) && normalize(r.kabupatenkota) !== 'jawa timur');
    
    const regionSums: any = {};
    yearData.forEach((row:any) => { regionSums[row.kabupatenkota] = (regionSums[row.kabupatenkota] || 0) + row.jumlah; });
    const sortedRegions = Object.entries(regionSums).map(([name, val]:any) => ({ name, value: val })).sort((a, b) => b.value - a.value);

    const totalRegions = sortedRegions.length;

    // Growth Rate
    let growthRate = 0;
    if (trendChartData.length >= 2) {
      const last = trendChartData[trendChartData.length - 1].jumlah;
      const prev = trendChartData[trendChartData.length - 2].jumlah;
      if (prev > 0) growthRate = ((last - prev) / prev) * 100;
    }

    // Pie Data
    const jatimYearData = jatimRows.filter((r:any) => String(r.tahun) === String(selectedYear));
    const pieData = jatimYearData.map((r:any) => ({ name: r.kategori, value: r.jumlah }));
    const totalPie = pieData.reduce((acc:number, curr:any) => acc + curr.value, 0);
    const pieDataWithPercent = pieData.map((p:any) => ({
      ...p, percent: totalPie > 0 ? ((p.value / totalPie) * 100).toFixed(1) : 0
    }));

    const totalJatim = jatimYearData.reduce((acc:number, curr:any) => acc + curr.jumlah, 0);
    return { trendChartData, top10: sortedRegions.slice(0, 10), bottom10: sortedRegions.slice().reverse().slice(0, 10), growthRate, pieDataWithPercent, totalJatim, totalRegions };
  }, [currentIndicator, dbData, selectedYear]);

  // Check if data is available for the selected year
  const hasData = dashboardData.totalRegions > 0 || dashboardData.totalJatim > 0;

  if (!hasData) {
    return (
      <EmptyState 
        title={`Data Tahun ${selectedYear} Tidak Tersedia`}
        message={<span>Maaf, data untuk indikator <strong>{currentIndicator?.name || 'terpilih'}</strong> pada tahun {selectedYear} belum tersedia di database.</span>}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600"><Activity size={24}/></div>
          <div><p className="text-xs font-bold text-slate-400 uppercase">Total Jawa Timur</p><p className="text-2xl font-bold text-slate-800">{dashboardData.totalJatim ? dashboardData.totalJatim.toLocaleString() : '0'}</p></div>
        </Card>
        <Card className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${dashboardData.growthRate >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>{dashboardData.growthRate >= 0 ? <TrendingUp size={24}/> : <TrendingDown size={24}/>}</div>
          <div><p className="text-xs font-bold text-slate-400 uppercase">Pertumbuhan (YoY)</p><p className={`text-2xl font-bold ${dashboardData.growthRate >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{dashboardData.growthRate > 0 ? '+' : ''}{dashboardData.growthRate.toFixed(2)}%</p></div>
        </Card>
        <Card className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Layers size={24}/></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Jumlah Wilayah</p>
            <p className="text-2xl font-bold text-slate-800">{dashboardData.totalRegions} Kab/Kota</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><TrendingUp size={18}/> Tren Provinsi Jawa Timur (Aggregat)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData.trendChartData}>
                <defs><linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#db2777" stopOpacity={0.2}/><stop offset="95%" stopColor="#db2777" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="tahun" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip contentStyle={{borderRadius: '12px', border:'none', boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="jumlah" stroke="#db2777" strokeWidth={3} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><PieChartIcon size={18}/> Proporsi Kategori ({selectedYear})</h3>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dashboardData.pieDataWithPercent} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                  {dashboardData.pieDataWithPercent.map((entry:any, index:number) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-32 pr-2 custom-scrollbar">
            {dashboardData.pieDataWithPercent.map((item:any, idx:number) => (
              <div key={idx} className="flex justify-between items-start text-xs">
                <div className="flex items-start gap-2 flex-1 mr-2">
                    <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
                    <span className="text-slate-600 leading-tight">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800 shrink-0">{item.percent}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-emerald-600 flex items-center gap-2 mb-4"><ArrowUpRight size={18}/> Top 10 Wilayah Tertinggi</h3>
          <div className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart layout="vertical" data={dashboardData.top10} margin={{left: 40}}><CartesianGrid horizontal={false} stroke="#f1f5f9"/><XAxis type="number" hide/><YAxis dataKey="name" type="category" width={100} tick={{fontSize:10, fontWeight:'bold'}}/><Tooltip cursor={{fill:'#ecfdf5'}}/><Bar dataKey="value" fill="#10b981" radius={[0,4,4,0]} barSize={20}/></BarChart></ResponsiveContainer></div>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold text-rose-600 flex items-center gap-2 mb-4"><ArrowDownRight size={18}/> Top 10 Wilayah Terendah</h3>
          <div className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart layout="vertical" data={dashboardData.bottom10} margin={{left: 40}}><CartesianGrid horizontal={false} stroke="#f1f5f9"/><XAxis type="number" hide/><YAxis dataKey="name" type="category" width={100} tick={{fontSize:10, fontWeight:'bold'}}/><Tooltip cursor={{fill:'#fff1f2'}}/><Bar dataKey="value" fill="#f43f5e" radius={[0,4,4,0]} barSize={20}/></BarChart></ResponsiveContainer></div>
        </Card>
      </div>
    </div>
  );
};
export default DashboardAnalysis;