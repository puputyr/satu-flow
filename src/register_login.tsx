import React, { useState } from 'react';
import { Heart, User, Key, RefreshCw, ArrowDownRight, Lock, UserPlus } from 'lucide-react';
import { Card, Input, Button } from './elements';

const AuthPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    const endpoint = isRegister ? '/api/register' : '/api/login';
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      });
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) data = await response.json();
      else throw new Error('Gagal menghubungi server database (Cek server.py).');
      if (!response.ok) throw new Error(data.error || 'Terjadi kesalahan');
      if (isRegister) {
        setSuccess('Registrasi berhasil! Silakan login.'); setIsRegister(false); setFormData({ ...formData, password: '' });
      } else { onLogin(data.user); }
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Heart className="mx-auto h-12 w-12 text-pink-600 fill-current" /><h2 className="mt-6 text-3xl font-extrabold text-slate-900">{isRegister ? 'Buat Akun Baru' : 'Masuk ke Dashboard'}</h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Username</label><Input icon={User} type="text" required placeholder="username" value={formData.username} onChange={(e:any) => setFormData({...formData, username: e.target.value})}/></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Password</label><Input icon={Key} type="password" required placeholder="••••••••" value={formData.password} onChange={(e:any) => setFormData({...formData, password: e.target.value})}/></div>
            {error && <div className="rounded-md bg-rose-50 p-4 text-rose-800 text-sm flex items-center gap-2"><ArrowDownRight size={14}/> {error}</div>}
            {success && <div className="rounded-md bg-emerald-50 p-4 text-emerald-800 text-sm">{success}</div>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? <RefreshCw className="animate-spin" size={18}/> : (isRegister ? <><UserPlus size={18}/> Daftar</> : <><Lock size={18} /> Masuk</>)}</Button>
          </form>
          <div className="mt-6 text-center"><button onClick={() => { setIsRegister(!isRegister); setError(''); setSuccess(''); }} className="font-medium text-pink-600 hover:text-pink-500">{isRegister ? 'Sudah punya akun? Login' : 'Belum punya akun? Daftar'}</button></div>
        </Card>
      </div>
    </div>
  );
};
export default AuthPage;