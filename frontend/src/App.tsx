import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { DataStudioPage } from './pages/DataStudioPage';
import { MLStudioPage } from './pages/MLStudioPage';
import { QuestsPage } from './pages/QuestsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { useAuthStore } from './store/useAuthStore';
import { authApi } from './services/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAuthenticated, setAuth, logout } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authApi
        .getMe()
        .then((res) => setAuth(res.data, localStorage.getItem('token')!))
        .catch(() => logout());
    }
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterMode) {
      authApi.register({ username, email, password }).then(() => {
        authApi.login(username, password).then((res) => {
          setAuth(res.data.user || { username, email }, res.data.access_token);
        });
      });
    } else {
      authApi.login(username, password).then((res) => {
        authApi.getMe().then((userRes) => {
          setAuth(userRes.data, res.data.access_token);
        });
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-extrabold text-white">DataQuest AI</h1>
            <p className="text-slate-400 text-xs">Gamified Enterprise AI/ML Platform</p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {isRegisterMode && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm"
            >
              {isRegisterMode ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-xs text-indigo-400 hover:underline"
            >
              {isRegisterMode ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pb-12">
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
