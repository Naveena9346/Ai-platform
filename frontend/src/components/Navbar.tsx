import React from 'react';
import { Database, Brain, Trophy, Flame, Award, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuthStore();
  const profile = user?.gamification_profile;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center glow-indigo">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
            DataQuest AI
          </span>
          <span className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            Gamified AI/ML Platform
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('datasets')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'datasets' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Data Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('ml')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'ml' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>ML Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('quests')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'quests' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Quests</span>
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'leaderboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Leaderboard</span>
        </button>
      </div>

      {/* User Gamification Stats Widget */}
      {profile && (
        <div className="flex items-center space-x-4">
          {/* Level Badge */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 px-3 py-1.5 rounded-lg">
            <span className="text-xs text-purple-300 font-bold uppercase">LVL</span>
            <span className="text-sm font-black text-white">{profile.level}</span>
          </div>

          {/* XP Badge */}
          <div className="flex items-center space-x-2 bg-slate-900 border border-amber-500/30 px-3 py-1.5 rounded-lg">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-amber-300">{profile.xp} XP</span>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center space-x-1.5 bg-slate-900 border border-orange-500/30 px-3 py-1.5 rounded-lg">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-sm font-bold text-orange-400">{profile.current_streak}d</span>
          </div>

          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-900"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </nav>
  );
};
