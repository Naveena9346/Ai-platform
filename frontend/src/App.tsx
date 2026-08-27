import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { DataStudioPage } from './pages/DataStudioPage';
import { MLStudioPage } from './pages/MLStudioPage';
import { QuestsPage } from './pages/QuestsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { useAuthStore } from './store/useAuthStore';
import { authApi } from './services/api';
import { Brain, Lock, User as UserIcon, Mail, ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAuthenticated, setAuth, logout } = useAuthStore();
  const [username, setUsername] = useState('naveenadudekula01');
  const [password, setPassword] = useState('password123');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('naveenadudekula01@gmail.com');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authApi
        .getMe()
        .then((res) => setAuth(res.data, localStorage.getItem('token')!))
        .catch(() => logout());
    }
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (isRegisterMode) {
        try {
          await authApi.register({ username, email, password });
        } catch (regErr: any) {
          const detail = regErr?.response?.data?.detail;
          if (detail && typeof detail === 'string' && detail.toLowerCase().includes('already exists')) {
            try {
              const res = await authApi.login(username, password);
              const userRes = await authApi.getMe();
              setAuth(userRes.data, res.data.access_token);
              return;
            } catch {
              setErrorMessage("This account already exists! Switch to the 'Sign In' tab or check password.");
              return;
            }
          }
          throw regErr;
        }
        const res = await authApi.login(username, password);
        const userRes = await authApi.getMe();
        setAuth(userRes.data, res.data.access_token);
      } else {
        const res = await authApi.login(username, password);
        const userRes = await authApi.getMe();
        setAuth(userRes.data, res.data.access_token);
      }
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      if (typeof detail === 'string') {
        setErrorMessage(detail);
      } else if (Array.isArray(detail) && detail.length > 0) {
        setErrorMessage(detail[0]?.msg || 'Validation failed. Please check inputs.');
      } else {
        setErrorMessage('Invalid username or password. Click Demo Sign In below!');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      const res = await authApi.demoLogin();
      const userRes = await authApi.getMe();
      setAuth(userRes.data, res.data.access_token);
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.detail || 'Failed to sign in with demo credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-enterprise-mesh flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        
        {/* Background Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Enterprise Login/Register Card */}
        <div className="card-panel p-8 sm:p-10 max-w-md w-full relative z-10 space-y-6 border border-slate-800 shadow-2xl">
          
          {/* Logo & Platform Name */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 glow-accent mb-1">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                DataQuest <span className="text-indigo-400">AI</span>
              </h1>
              <p className="text-slate-400 text-xs font-medium tracking-wide mt-1">
                Gamified Enterprise Machine Learning Platform
              </p>
            </div>
          </div>

          {/* Quick Demo Access Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 border border-indigo-500/30 text-indigo-300 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-indigo-600/10"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>1-Click Quick Demo Sign In</span>
          </button>

          <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            <div className="h-px bg-slate-800 flex-1" />
            <span>Or Sign In Below</span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          {/* Login / Register Tab Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => { setIsRegisterMode(false); setErrorMessage(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                !isRegisterMode
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsRegisterMode(true); setErrorMessage(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                isRegisterMode
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-300 text-xs flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Controls */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="input-field pl-10 text-xs"
                />
              </div>
            </div>

            {isRegisterMode && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="input-field pl-10 text-xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="input-field pl-10 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-indigo py-3 text-xs flex items-center justify-center space-x-2 group"
            >
              <span>{loading ? 'Authenticating...' : isRegisterMode ? 'Register Account (+50 XP)' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer Text */}
          <div className="pt-2 text-center border-t border-slate-800/80 flex items-center justify-center space-x-1.5 text-slate-500 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Train Models • Complete Quests • Unlock Badges</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-enterprise-mesh text-slate-100 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 pb-16">
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'datasets' && <DataStudioPage />}
        {activeTab === 'ml' && <MLStudioPage />}
        {activeTab === 'quests' && <QuestsPage />}
        {activeTab === 'leaderboard' && <LeaderboardPage />}
      </main>
    </div>
  );
};
export default App;
