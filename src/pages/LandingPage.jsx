/**
 * Landing Page — Women-led startup investment platform.
 * Brand: #F3E8FE + white. No emojis; professional imagery.
 */
import React from 'react'
import { Link } from 'react-router-dom'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80'

const IconDiscovery = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
)
const IconInvestment = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 011.414-1.414L21 7.5" />
  </svg>
)
const IconValidation = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const IconImpact = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
)
const IconMobile = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25h-10.5a2.25 2.25 0 00-2.25 2.25v15a2.25 2.25 0 002.25 2.25z" />
  </svg>
)
const IconShield = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
)
const IconRocket = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
)

const TEAM = [
  { name: 'Meronn', role: 'Team' },
  { name: 'Hayat', role: 'Team' },
  { name: 'Tsion', role: 'Team' },
  { name: 'Mekdelawit', role: 'Team' },
  { name: 'Tsion', role: 'Team' },
]

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand antialiased">
      <header className="bg-white border-b border-brand-dark/30 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-base md:text-lg shadow-sm">
                WSP
              </div>
              <span className="text-lg md:text-xl font-bold text-text">
                Women Startup Platform
              </span>
            </Link>
            <nav className="flex items-center gap-4 md:gap-6">
              <a href="#about" className="text-sm font-medium text-text-muted hover:text-primary transition-colors hidden sm:inline">About</a>
              <a href="#services" className="text-sm font-medium text-text-muted hover:text-primary transition-colors hidden sm:inline">Services</a>
              <a href="#team" className="text-sm font-medium text-text-muted hover:text-primary transition-colors hidden sm:inline">Team</a>
              <Link to="/admin/login" className="text-sm font-semibold text-text hover:text-primary transition-colors">Admin</Link>
              <Link to="/investor" className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors">Investor</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero with professional image */}
        <section className="relative overflow-hidden bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh] lg:min-h-[85vh] py-16 lg:py-0">
              <div className="order-2 lg:order-1 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text mb-6 leading-tight">
                  Empowering <span className="text-primary">Women-Led</span> Startups
                </h1>
                <p className="text-lg md:text-xl text-text-muted mb-10 max-w-xl mx-auto lg:mx-0">
                  Connect with investors who believe in diversity. We help women founders get validated, funded, and scale—and help investors back the next generation of leaders.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link
                    to="/investor"
                    className="px-6 py-3.5 rounded-xl font-semibold bg-primary text-white hover:bg-primary-hover transition-colors shadow-sm"
                  >
                    Explore Startups
                  </Link>
                  <Link
                    to="/investor"
                    className="px-6 py-3.5 rounded-xl font-semibold bg-white border-2 border-primary/30 text-primary hover:bg-brand transition-colors"
                  >
                    Join as Investor
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative rounded-2xl overflow-hidden shadow-card-hover aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
                <img
                  src={HERO_IMAGE}
                  alt="Team collaboration"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 bg-brand">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">Our Mission</h2>
              <p className="text-lg text-text-muted leading-relaxed mb-4">
                Women Startup Platform exists to close the funding gap for women entrepreneurs. We believe great ideas deserve capital regardless of who pitches them.
              </p>
              <p className="text-lg text-text-muted leading-relaxed">
                We empower women founders by connecting them with mission-driven investors, and we give investors a single place to discover, validate, and fund high-potential women-led ventures.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text text-center mb-4">Platform Features</h2>
            <p className="text-center text-text-muted mb-12 max-w-xl mx-auto">Everything you need to discover, validate, and invest in women-led startups.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { Icon: IconDiscovery, title: 'Startup Discovery', desc: 'Browse vetted women-led startups in one place. Filter by sector, stage, and impact.' },
                { Icon: IconInvestment, title: 'Smart Investment', desc: 'Track deals, manage portfolios, and follow startups from first pitch to scale.' },
                { Icon: IconValidation, title: 'Startup Validation', desc: 'Admin-verified startups so you invest in ideas that have passed our quality bar.' },
                { Icon: IconImpact, title: 'Impact Investing', desc: 'Align capital with impact. Support founders who are building inclusive businesses.' },
              ].map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="group p-6 md:p-8 rounded-2xl bg-brand/50 border border-brand-dark/30 shadow-card hover:shadow-card-hover hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-brand">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text text-center mb-4">How It Works</h2>
            <p className="text-center text-text-muted mb-14 max-w-xl mx-auto">From idea to funding in three clear steps.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {[
                { step: '1', Icon: IconMobile, title: 'Startups submit ideas', desc: 'Founders submit their ventures through our mobile app. We collect pitch, traction, and team info.' },
                { step: '2', Icon: IconShield, title: 'Admin validates startups', desc: 'Our team reviews and validates each startup. Only verified companies appear for investors.' },
                { step: '3', Icon: IconRocket, title: 'Investors discover & fund', desc: 'Investors browse validated startups, connect with founders, and fund the ones they believe in.' },
              ].map(({ step, Icon, title, desc }) => (
                <div key={step} className="relative text-center">
                  <div className="inline-flex w-14 h-14 rounded-xl bg-primary text-white font-bold text-lg items-center justify-center mb-5 shadow-sm">
                    {step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
                  <p className="text-sm text-text-muted">{desc}</p>
                  {step !== '3' && (
                    <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-primary/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">Why Support Women Founders?</h2>
              <p className="text-lg text-text-muted leading-relaxed mb-4">
                Women-led startups are underfunded despite strong performance. Diverse teams drive innovation and better outcomes for customers and communities.
              </p>
              <p className="text-lg text-text-muted leading-relaxed">
                By backing women founders, you're not only investing in individual companies—you're helping reshape who gets to build the future. Our platform makes it easy to find and fund these ventures with confidence.
              </p>
            </div>
          </div>
        </section>

        <section id="team" className="py-16 md:py-24 bg-brand">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text text-center mb-3">Built by Women in Tech</h2>
            <p className="text-center text-text-muted mb-12">The people behind the platform.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
              {TEAM.map((member, i) => (
                <div key={`${member.name}-${i}`} className="text-center p-6 rounded-2xl bg-white border border-brand-dark/30 shadow-card hover:shadow-card-hover transition-all">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary font-semibold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-text">{member.name}</h3>
                  <p className="text-sm text-text-muted mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-white/90 text-lg mb-10">Explore women-led startups or join as an investor and back the next generation of founders.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/investor"
                className="px-6 py-3.5 rounded-xl font-semibold bg-white text-primary hover:bg-brand transition-colors"
              >
                Explore Startups
              </Link>
              <Link
                to="/investor"
                className="px-6 py-3.5 rounded-xl font-semibold border-2 border-white/80 text-white hover:bg-white/10 transition-colors"
              >
                Become an Investor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-brand-dark/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">WSP</div>
                <span className="font-bold text-text">Women Startup Platform</span>
              </Link>
              <nav className="flex flex-wrap gap-6">
                <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Home</a>
                <a href="#about" className="text-sm text-text-muted hover:text-primary transition-colors">About</a>
                <a href="#team" className="text-sm text-text-muted hover:text-primary transition-colors">Team</a>
                <a href="#services" className="text-sm text-text-muted hover:text-primary transition-colors">Services</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-primary hover:bg-brand-dark transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-primary hover:bg-brand-dark transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-primary hover:bg-brand-dark transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
          <div className="border-t border-brand-dark/30 mt-10 pt-8 text-center md:text-left">
            <p className="text-sm text-text-muted">© {new Date().getFullYear()} Women Startup Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
