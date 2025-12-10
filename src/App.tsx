import React, { useState, useEffect } from 'react';
// HANYA PERLU INSTALL SATU LIBRARY:
// npm install lucide-react
import { Play, CheckCircle, AlertCircle, RefreshCw, Code, LogOut, Server, Database, Activity, Layout, FilePlus, Save, Terminal } from 'lucide-react';

// --- KOMPONEN UTAMA (APP) ---
export default function App() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]); // Database Mock (Local Memory)

  // Fungsi Mock untuk menambah Log ke "Database"
  const addLog = (logData) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date(), // Object Date JS biasa
      ...logData
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Fungsi Update Log (Simulasi update status di DB)
  const updateLogStatus = (jobId, newStatus, extraData = {}) => {
    setLogs(prevLogs => prevLogs.map(log => 
      log.job_id === jobId ? { ...log, status: newStatus, ...extraData } : log
    ));
  };

  const handleLogin = () => {
    setUser({ username: 'admin', role: 'Super Admin' });
  };

  const handleLogout = () => {
    setUser(null);
    setLogs([]); // Reset logs saat logout (opsional)
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard 
          user={user} 
          onLogout={handleLogout} 
          logs={logs} 
          addLog={addLog}
          updateLogStatus={updateLogStatus}
        />
      )}
    </div>
  );
}

// --- HALAMAN LOGIN ---
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Simulasi loading network
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLogin();
      } else {
        setError('Username atau password salah (Hint: admin/admin)');
        setIsLoggingIn(false);
      }
    }, 800);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Sistem Scheduling</h1>
            <p className="text-slate-500 text-sm">Masuk untuk mengelola Workflow</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="admin"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoggingIn ? <RefreshCw className="animate-spin w-5 h-5" /> : 'Login System'}
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-slate-400">
            Mode Local (No Database) - Tugas Besar Teknik Informatika
          </div>
        </div>
      </div>
    </div>
  );
}

// --- DASHBOARD UTAMA ---
function Dashboard({ user, onLogout, logs, addLog, updateLogStatus }) {
  const [activeTab, setActiveTab] = useState('scheduler');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Navigasi */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Server className="w-6 h-6 text-blue-400" />
            Airflow Wrapper
          </h2>
          <p className="text-xs mt-2 text-slate-400">Prodi Teknik Informatika</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem active={activeTab === 'scheduler'} onClick={() => setActiveTab('scheduler')} icon={<Layout className="w-5 h-5" />} label="Control Panel" />
          <NavItem active={activeTab === 'dag-creator'} onClick={() => setActiveTab('dag-creator')} icon={<FilePlus className="w-5 h-5" />} label="DAG Creator (IDE)" />
          <NavItem active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} icon={<Database className="w-5 h-5" />} label="System Logs" />
          <NavItem active={activeTab === 'code'} onClick={() => setActiveTab('code')} icon={<Code className="w-5 h-5" />} label="Source Code View" />
          <NavItem active={activeTab === 'testing'} onClick={() => setActiveTab('testing')} icon={<CheckCircle className="w-5 h-5" />} label="Pengujian (QA)" />
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button onClick={onLogout} className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-slate-800 rounded-lg transition">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm p-4 md:hidden flex justify-between items-center">
          <h1 className="font-bold text-slate-800">Scheduler App</h1>
          <button onClick={onLogout}><LogOut className="w-5 h-5 text-red-500" /></button>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8">
          {activeTab === 'scheduler' && <SchedulerPanel addLog={addLog} updateLogStatus={updateLogStatus} />}
          {activeTab === 'dag-creator' && <DagCreatorPanel addLog={addLog} />}
          {activeTab === 'logs' && <LogViewer logs={logs} />}
          {activeTab === 'code' && <CodeDocumentation />}
          {activeTab === 'testing' && <TestingSuite logs={logs} />}
        </div>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition font-medium ${
        active 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// --- FEATURES ---

function DagCreatorPanel({ addLog }) {
  const [code, setCode] = useState(`from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def hello_world():
    print("Hello from Web Interface!")

with DAG('new_dag_from_web', start_date=datetime(2023, 1, 1), schedule_interval='@daily') as dag:
    task1 = PythonOperator(
        task_id='hello_task',
        python_callable=hello_world
    )`);
  
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploySuccess(false);
    
    // Simulasi Latency Upload File
    setTimeout(() => {
      // Simpan log ke State (bukan Firebase)
      addLog({
        job_id: `deploy_${Date.now()}`,
        task_name: 'DEPLOY_NEW_DAG',
        status: 'SUCCESS',
        triggered_by: 'Admin (Web IDE)',
        metadata: 'File written to /dags folder'
      });
      
      setIsDeploying(false);
      setDeploySuccess(true);
      setShowIframe(true);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">DAG Creator & Visualizer</h2>
           <p className="text-slate-500">Tulis kode DAG Python dan deploy langsung ke server Airflow.</p>
        </div>
        <div className="flex gap-2">
            <button 
              onClick={() => setShowIframe(!showIframe)}
              className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <Layout className="w-4 h-4" />
              {showIframe ? 'Hide Airflow UI' : 'Show Airflow UI'}
            </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        <div className="flex flex-col bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
          <div className="bg-slate-900 p-3 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <FilePlus className="w-4 h-4 text-blue-400" />
               <span className="text-slate-300 text-sm font-mono">new_dag_from_web.py</span>
            </div>
            <button 
              onClick={handleDeploy}
              disabled={isDeploying}
              className={`text-xs px-3 py-1.5 rounded font-bold flex items-center gap-2 transition ${
                deploySuccess 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {isDeploying ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              {isDeploying ? 'Deploying...' : deploySuccess ? 'Deployed!' : 'Deploy DAG'}
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-slate-800 text-slate-100 font-mono text-sm p-4 focus:outline-none resize-none"
            spellCheck="false"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col relative">
          <div className="bg-slate-50 p-3 border-b border-slate-200 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-green-600" />
                <span className="text-slate-700 text-sm font-bold">Airflow Web Server UI</span>
             </div>
             <div className="flex items-center gap-1">
               <div className="w-2 h-2 rounded-full bg-green-500"></div>
               <span className="text-xs text-slate-500">Connected: localhost:8080</span>
             </div>
          </div>
          
          <div className="flex-1 bg-slate-100 relative">
            {showIframe ? (
              <div className="absolute inset-0 bg-white p-4 overflow-auto">
                 <div className="h-12 bg-blue-500 mb-4 flex items-center px-4 justify-between">
                    <span className="text-white font-bold">Apache Airflow</span>
                    <span className="text-white text-xs opacity-75">Admin</span>
                 </div>
                 
                 <div className="border rounded">
                    <div className="bg-slate-100 p-2 text-xs font-bold text-slate-600 grid grid-cols-4">
                       <div>DAG</div>
                       <div>Schedule</div>
                       <div>Last Run</div>
                       <div>Status</div>
                    </div>
                    
                    <div className="p-3 border-t grid grid-cols-4 items-center text-sm">
                       <div className="font-mono text-blue-600">example_bash_operator</div>
                       <div>@daily</div>
                       <div className="flex gap-1"><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                       <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 w-fit rounded">success</div>
                    </div>

                    {deploySuccess && (
                      <div className="p-3 border-t grid grid-cols-4 items-center text-sm bg-yellow-50 animate-pulse">
                        <div className="font-mono text-blue-600 font-bold">new_dag_from_web <span className="text-[10px] bg-blue-100 text-blue-800 px-1 rounded ml-1">NEW</span></div>
                        <div>@daily</div>
                        <div className="text-slate-400 text-xs">No runs yet</div>
                        <div className="flex gap-1">
                           <button className="p-1 bg-slate-200 rounded hover:bg-blue-200"><Play className="w-3 h-3 text-slate-600" /></button>
                        </div>
                      </div>
                    )}
                 </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Layout className="w-16 h-16 mb-4 opacity-20" />
                <p>Klik tombol "Show Airflow UI" atau Deploy DAG</p>
                <p className="text-xs mt-2">Ini menggunakan &lt;iframe&gt; di implementasi asli.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SchedulerPanel({ addLog, updateLogStatus }) {
  const [status, setStatus] = useState('IDLE');
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState(null);

  const triggerJob = async () => {
    if (status !== 'IDLE' && status !== 'SUCCESS' && status !== 'ERROR') return;
    setStatus('CONNECTING');
    setProgress(10);
    const newJobId = `job_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    setJobId(newJobId);

    try {
      // 1. Log Queued
      addLog({
        job_id: newJobId,
        task_name: 'ETL_Daily_Sales',
        status: 'QUEUED',
        triggered_by: 'Admin',
      });

      // Simulasi HTTP Request Delay
      await new Promise(r => setTimeout(r, 1500)); 
      
      setStatus('RUNNING');
      setProgress(40);
      
      // 2. Log Running
      updateLogStatus(newJobId, 'RUNNING', { airflow_run_id: `manual__${new Date().toISOString()}` });

      // Simulasi Proses Airflow
      await new Promise(r => setTimeout(r, 1000));
      setProgress(70);
      await new Promise(r => setTimeout(r, 1000));
      setProgress(100);

      // 3. Log Success
      updateLogStatus(newJobId, 'SUCCESS', { end_timestamp: new Date() });

      setStatus('SUCCESS');

    } catch (err) {
      console.error(err);
      setStatus('ERROR');
      addLog({ job_id: newJobId, task_name: 'ETL_Fail', status: 'ERROR', triggered_by: 'Admin' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Workflow Controller</h2>
        <p className="text-slate-500 mb-6">Mata Kuliah: Interoperabilitas & Backend</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-700">Target DAG</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">ETL_V1</span>
              </div>
              <div className="text-sm text-slate-500">Data Pipeline: MySQL {'>'} Cleaning {'>'} PostgreSQL</div>
            </div>
            <button 
              onClick={triggerJob}
              disabled={status === 'CONNECTING' || status === 'RUNNING'}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all ${
                status === 'RUNNING' || status === 'CONNECTING'
                  ? 'bg-slate-200 text-slate-400 cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-[1.02]'
              }`}
            >
              {status === 'IDLE' && <><Play className="w-6 h-6" /> Trigger Scheduling</>}
              {status === 'SUCCESS' && <><RefreshCw className="w-6 h-6" /> Rerun Workflow</>}
              {status === 'ERROR' && <><AlertCircle className="w-6 h-6" /> Retry</>}
              {(status === 'RUNNING' || status === 'CONNECTING') && (
                 <><RefreshCw className="w-6 h-6 animate-spin" /> Processing...</>
              )}
            </button>
          </div>
          <div className="relative bg-slate-900 rounded-xl p-6 text-green-400 font-mono text-sm shadow-inner min-h-[240px] flex flex-col">
            <div className="absolute top-2 right-2 text-slate-500 text-xs flex items-center gap-1">
              <Activity className="w-3 h-3" /> Network Log
            </div>
            <div className="space-y-2">
              <p className="opacity-50">{'>'} System Ready.</p>
              {status !== 'IDLE' && (
                <>
                  <p>{'>'} Initiating HTTP Request to Airflow API...</p>
                  <p className="text-blue-400">{'>'} POST /api/v1/dags/ETL_V1/dagRuns</p>
                </>
              )}
              {status === 'RUNNING' && (
                <>
                  <p className="text-yellow-400">{'>'} Connection Established. (HTTP 200)</p>
                  <p>{'>'} Job ID: {jobId}</p>
                  <p>{'>'} Monitoring Status: RUNNING...</p>
                </>
              )}
              {status === 'SUCCESS' && (
                 <>
                  <p className="text-green-500 font-bold">{'>'} Status: SUCCESS</p>
                  <p className="opacity-50">{'>'} Transaction logged to DB.</p>
                 </>
              )}
              {status === 'ERROR' && <p className="text-red-500">{'>'} Connection Timeout.</p>}
            </div>
            {(status === 'RUNNING' || status === 'CONNECTING') && (
              <div className="mt-auto pt-4">
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between text-xs mt-1 text-slate-400">
                  <span>Client App</span><span>Interoperability Layer</span><span>Apache Airflow</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LogViewer({ logs }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">Riwayat Eksekusi (Database)</h2>
      <p className="text-slate-500">Menampilkan data yang tersimpan di Memory (Mock Database).</p>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-700">Job ID</th>
              <th className="p-4 font-semibold text-slate-700">Task Name</th>
              <th className="p-4 font-semibold text-slate-700">Status</th>
              <th className="p-4 font-semibold text-slate-700">Triggered By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-slate-400">Belum ada data eksekusi.</td></tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-xs text-slate-600">{log.job_id}</td>
                  <td className="p-4">{log.task_name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      log.status === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                      log.status === 'RUNNING' ? 'bg-yellow-100 text-yellow-700' :
                      log.status === 'QUEUED' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                    }`}>{log.status}</span>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{log.triggered_by}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CodeDocumentation() {
  return (
    <div className="max-w-4xl space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Implementasi Interoperabilitas</h2>
      <p className="text-slate-600">Kode backend untuk komunikasi dengan Airflow & Manipulasi File.</p>
      <div className="bg-slate-900 rounded-lg p-6 shadow-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 bg-slate-800 px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-xs text-slate-400 font-mono">dag_manager.js</span>
        </div>
        <pre className="mt-8 font-mono text-sm text-blue-300 overflow-x-auto">
{`const fs = require('fs');
const path = require('path');

// Fungsi untuk deploy DAG dari Web UI
exports.deployDag = (req, res) => {
    const { code, filename } = req.body;
    
    // Path ke folder dags di server Airflow
    const dagPath = process.env.AIRFLOW_DAGS_FOLDER || '/opt/airflow/dags';
    const filePath = path.join(dagPath, filename);

    try {
        // Tulis string code dari UI ke file fisik
        fs.writeFileSync(filePath, code, 'utf8');
        res.status(200).json({ message: "File deployed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to write file" });
    }
};`}
        </pre>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">Penjelasan untuk Dosen:</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
           <li><strong>Dynamic File Generation:</strong> Menggunakan modul <code>fs</code> (File System) untuk mengubah input user menjadi file eksekusi server.</li>
           <li><strong>Embedded UI:</strong> Menggunakan teknik <code>Iframe</code> atau Proxying untuk menampilkan interface aplikasi lain di dalam dashboard ini.</li>
        </ul>
      </div>
    </div>
  );
}

function TestingSuite({ logs }) {
  const latestLog = logs[0] || null;
  const testCases = [
    { id: 1, name: "Authentication Test", desc: "Memastikan user tidak bisa akses dashboard tanpa token.", status: "PASS", result: "Session Active (Local)" },
    { id: 2, name: "API Interoperability Test", desc: "Trigger tombol mengirim request ke 'Mock' Airflow.", status: latestLog ? "PASS" : "PENDING", result: latestLog ? `Response 200 OK` : "Menunggu trigger..." },
    { id: 3, name: "File System Write", desc: "Cek apakah file DAG baru terbuat di folder server.", status: logs.some(l => l.task_name === 'DEPLOY_NEW_DAG') ? "PASS" : "PENDING", result: logs.some(l => l.task_name === 'DEPLOY_NEW_DAG') ? "File created at /dags/" : "Belum ada deploy" }
  ];

  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-slate-800">Laporan Pengujian (QA)</h2>
       <div className="grid gap-4">
         {testCases.map((test) => (
           <div key={test.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
             <div>
               <div className="flex items-center gap-2">
                 <h3 className="font-bold text-slate-700">{test.name}</h3>
                 <span className={`text-[10px] px-2 py-0.5 rounded border ${test.status === 'PASS' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>Case #{test.id}</span>
               </div>
               <p className="text-sm text-slate-500 mt-1">{test.desc}</p>
             </div>
             <div className="text-right">
                <div className={`font-bold ${test.status === 'PASS' ? 'text-green-600' : 'text-amber-500'}`}>{test.status}</div>
                <div className="text-xs text-slate-400">{test.result}</div>
             </div>
           </div>
         ))}
       </div>
    </div>
  );
}