'use client';

import Link from 'next/link';

const stats = [
  {
    label: 'Total Users',
    value: '12,458',
    change: '+12%',
    changeType: 'positive',
    icon: '👥',
    color: 'bg-blue-100',
  },
  {
    label: 'Active Courses',
    value: '156',
    change: '+5',
    changeType: 'positive',
    icon: '📚',
    color: 'bg-emerald-100',
  },
  {
    label: 'Questions Bank',
    value: '45,892',
    change: '+1,234',
    changeType: 'positive',
    icon: '❓',
    color: 'bg-purple-100',
  },
  {
    label: 'Revenue (PKR)',
    value: '₨ 2.4M',
    change: '+18%',
    changeType: 'positive',
    icon: '💰',
    color: 'bg-amber-100',
  },
];

const recentActivities = [
  { id: 1, action: 'New user registered', user: 'Ali Khan', time: '5 min ago', type: 'user' },
  { id: 2, action: 'Course published', user: 'Dr. Fatima', time: '12 min ago', type: 'course' },
  { id: 3, action: 'Guess paper approved', user: 'Admin', time: '1 hour ago', type: 'paper' },
  { id: 4, action: 'Payment received', user: 'ABC School', time: '2 hours ago', type: 'payment' },
  { id: 5, action: 'Question batch imported', user: 'Content Team', time: '3 hours ago', type: 'question' },
];

const sidebarLinks = [
  { label: 'Dashboard', href: '/', icon: '📊', active: true },
  { label: 'Users', href: '/users', icon: '👥', active: false },
  { label: 'Courses', href: '/courses', icon: '📚', active: false },
  { label: 'Questions', href: '/questions', icon: '❓', active: false },
  { label: 'Papers', href: '/papers', icon: '📝', active: false },
  { label: 'Institutions', href: '/institutions', icon: '🏫', active: false },
  { label: 'Analytics', href: '/analytics', icon: '📈', active: false },
  { label: 'Settings', href: '/settings', icon: '⚙️', active: false },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h1 className="font-bold text-white">teacher.ac.pk</h1>
              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="py-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link ${link.active ? 'active' : ''}`}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-white font-medium">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@teacher.ac.pk</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500">Welcome back! Here&apos;s what&apos;s happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn-secondary">
              <span className="mr-2">📥</span>
              Export
            </button>
            <button className="btn-primary">
              <span className="mr-2">➕</span>
              Add New
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className={`stat-icon ${stat.color}`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 card">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'course' ? 'bg-emerald-100 text-emerald-600' :
                    activity.type === 'paper' ? 'bg-purple-100 text-purple-600' :
                    activity.type === 'payment' ? 'bg-amber-100 text-amber-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {activity.type === 'user' && '👤'}
                    {activity.type === 'course' && '📚'}
                    {activity.type === 'paper' && '📝'}
                    {activity.type === 'payment' && '💰'}
                    {activity.type === 'question' && '❓'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.user}</p>
                  </div>
                  <span className="text-xs text-slate-400">{activity.time}</span>
                </div>
              ))}
            </div>
            <Link
              href="/activity"
              className="block text-center text-sm text-primary-600 hover:text-primary-700 mt-4 font-medium"
            >
              View all activity →
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/users/new"
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <span className="text-xl">👤</span>
                <span className="text-sm font-medium text-slate-700">Add New User</span>
              </Link>
              <Link
                href="/courses/new"
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <span className="text-xl">📚</span>
                <span className="text-sm font-medium text-slate-700">Create Course</span>
              </Link>
              <Link
                href="/questions/import"
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <span className="text-xl">📥</span>
                <span className="text-sm font-medium text-slate-700">Import Questions</span>
              </Link>
              <Link
                href="/papers/new"
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <span className="text-xl">📝</span>
                <span className="text-sm font-medium text-slate-700">Create Paper</span>
              </Link>
              <Link
                href="/reports"
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <span className="text-xl">📊</span>
                <span className="text-sm font-medium text-slate-700">Generate Report</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Platform Health */}
        <div className="mt-6 card">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Platform Health</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">API Server</p>
                <p className="text-xs text-slate-500">Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Database</p>
                <p className="text-xs text-slate-500">Connected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Redis Cache</p>
                <p className="text-xs text-slate-500">Connected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">CDN</p>
                <p className="text-xs text-slate-500">Operational</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

