import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { DataStudioPage } from './pages/DataStudioPage';
import { MLStudioPage } from './pages/MLStudioPage';
import { QuestsPage } from './pages/QuestsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { useAuthStore } from './store/useAuthStore';
import { authApi } from './services/api';
import { Brain, Lock, User as UserIcon, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAuthenticated, setAuth, logout } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
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
        await authApi.register({ username, email, password });
        const res = await authApi.login(username, password);
        const userRes = await authApi.getMe();
        setAuth(userRes.data, res.data.access_token);
      } else {
        const res = await authApi.login(username, password);
        const userRes = await authApi.getMe();
        setAuth(userRes.data, res.data.access_token);
      }
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.detail || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Login Card */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 max-w-md w-full relative z-10 shadow-2xl space-y-8">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 glow-indigo mb-2">
              <Brain className="w-9 h-9 text-white animate-pulse-slow" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-300 bg-clip-text text-transparent tracking-tight">
                DataQuest AI
              </h1>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-1">
                Gamified Enterprise AI/ML Platform
              </p>
            </div>
          </div>

          {/* Toggle Tab */}
          <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/80">
            <button
              type="button"
              onClick={() => { setIsRegisterMode(false); setErrorMessage(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                !isRegisterMode
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsRegisterMode(true); setErrorMessage(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isRegisterMode
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/30 p-3.5 rounded-xl text-red-300 text-xs flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="w-full glass-input rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-slate-600"
                />
              </div>
            </div>

            {isRegisterMode && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full glass-input rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-slate-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full glass-input rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold py-3.5 rounded-xl shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all group active:scale-[0.98]"
            >
              <span>{loading ? 'Authenticating...' : isRegisterMode ? 'Get Started (+50 XP)' : 'Sign In to Quest Hub'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer Badge */}
          <div className="pt-2 text-center border-t border-slate-800/80 flex items-center justify-center space-x-2 text-slate-500 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Train Models • Complete Quests • Earn Badges</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-gradient-mesh">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pb-16">
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
