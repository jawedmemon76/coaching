'use client';

import Link from 'next/link';

const educationLevels = [
  {
    title: 'Literacy Program',
    titleUr: 'خواندگی پروگرام',
    description: 'Start from zero - learn to read and write',
    icon: '📖',
    href: '/courses/literacy',
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Middle School',
    titleUr: 'مڈل سکول',
    description: 'Grades 6-8 curriculum & practice',
    icon: '📚',
    href: '/courses/middle-school',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Matriculation',
    titleUr: 'میٹرک',
    description: 'Grade 9-10 board exam preparation',
    icon: '🎓',
    href: '/courses/matric',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Intermediate',
    titleUr: 'انٹرمیڈیٹ',
    description: 'FSc/FA Grade 11-12 preparation',
    icon: '🏆',
    href: '/courses/intermediate',
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'O/A Levels',
    titleUr: 'او/اے لیولز',
    description: 'Cambridge & Edexcel curriculum',
    icon: '🌍',
    href: '/courses/cambridge',
    color: 'from-rose-500 to-pink-600',
  },
  {
    title: 'Entry Tests',
    titleUr: 'داخلہ ٹیسٹ',
    description: 'MDCAT, ECAT, CSS & more',
    icon: '🎯',
    href: '/courses/entry-tests',
    color: 'from-indigo-500 to-blue-600',
  },
];

const features = [
  {
    icon: '📝',
    title: 'Past Papers',
    description: 'Access thousands of past exam papers with detailed solutions',
  },
  {
    icon: '🎲',
    title: 'Guess Papers',
    description: 'Expert-crafted predictions for upcoming exams',
  },
  {
    icon: '⏱️',
    title: 'Mock Exams',
    description: 'Realistic timed tests to simulate exam conditions',
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Track your progress and identify weak areas',
  },
  {
    icon: '🎥',
    title: 'Video Lessons',
    description: 'Learn from expert teachers at your own pace',
  },
  {
    icon: '🌐',
    title: 'Offline Access',
    description: 'Download content and study anywhere',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
        <div className="container-app">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-bold text-xl text-slate-900">
                teacher<span className="text-primary-600">.ac.pk</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/courses" className="text-slate-600 hover:text-slate-900 transition-colors">
                Courses
              </Link>
              <Link href="/past-papers" className="text-slate-600 hover:text-slate-900 transition-colors">
                Past Papers
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                About
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn-primary px-5 py-2"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-app">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Pakistan&apos;s Premier Education Platform
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 animate-slide-up">
              Master Your{' '}
              <span className="text-gradient">Exams</span>
              <br />
              Transform Your Future
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
              From basic literacy to professional exams — comprehensive courses,
              past papers, mock tests, and expert guidance all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Link
                href="/register"
                className="btn-primary px-8 py-4 text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
              >
                Start Learning Free
              </Link>
              <Link
                href="/courses"
                className="btn-outline px-8 py-4 text-lg"
              >
                Explore Courses
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
              {[
                { value: '100K+', label: 'Questions' },
                { value: '500+', label: 'Courses' },
                { value: '50K+', label: 'Students' },
                { value: '95%', label: 'Pass Rate' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Levels */}
      <section className="py-20 bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Whether you&apos;re starting from scratch or preparing for competitive exams,
              we have the right program for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationLevels.map((level) => (
              <Link
                key={level.title}
                href={level.href}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200 card-hover"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  {level.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">
                  {level.title}
                </h3>
                <p className="text-sm text-primary-600 font-medium mb-2" dir="rtl">
                  {level.titleUr}
                </p>
                <p className="text-slate-600">{level.description}</p>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful tools and resources designed specifically for Pakistan&apos;s education system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:border-primary-300 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container-app text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already preparing smarter with teacher.ac.pk
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-colors"
          >
            Create Free Account
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container-app">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="font-bold text-white">teacher.ac.pk</span>
              </div>
              <p className="text-sm">
                Pakistan&apos;s comprehensive exam-focused digital learning platform.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/courses/matric" className="hover:text-white transition-colors">Matriculation</Link></li>
                <li><Link href="/courses/intermediate" className="hover:text-white transition-colors">Intermediate</Link></li>
                <li><Link href="/courses/cambridge" className="hover:text-white transition-colors">O/A Levels</Link></li>
                <li><Link href="/courses/entry-tests" className="hover:text-white transition-colors">Entry Tests</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/past-papers" className="hover:text-white transition-colors">Past Papers</Link></li>
                <li><Link href="/guess-papers" className="hover:text-white transition-colors">Guess Papers</Link></li>
                <li><Link href="/mock-exams" className="hover:text-white transition-colors">Mock Exams</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} teacher.ac.pk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

