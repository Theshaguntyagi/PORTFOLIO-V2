import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { MessageSquare, Mail, Edit3, Eye, BarChart2, Lock, ShieldAlert, LogOut } from 'lucide-react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth, googleProvider, OWNER_EMAIL } from '../firebase';
import { fetchTelemetryData } from '../services/telemetry';
import '../styles/Analytics.css';

// Generate last 7 days of ISO dates helper
const getLast7Days = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
};

const INITIAL_STATE = {
  chatbotQueries: 0,
  contactsCount: 0,
  guestbookCount: 0,
  visitorCount: 0,
  pageViews: 0,
  projectClicks: {},
  languages: {},
  dailyQueries: {},
};

// Populate default queries to 0 for chart mapping
const dates = getLast7Days();
dates.forEach((d) => {
  INITIAL_STATE.dailyQueries[d] = 0;
});

export default function Analytics({ isNested = false }) {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(INITIAL_STATE);

  // Monitor auth state changes
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
  }, []);

  const isOwner = user?.email === OWNER_EMAIL;

  useEffect(() => {
    if (!authReady) return;
    if (!isOwner) {
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const telemetry = await fetchTelemetryData();
        const merged = {
          chatbotQueries: telemetry.chatbotQueries || 0,
          visitorCount: telemetry.visitorCount || 0,
          pageViews: telemetry.pageViews || 0,
          contactsCount: telemetry.contactsCount || 0,
          guestbookCount: telemetry.guestbookCount || 0,
          projectClicks: telemetry.projectClicks || {},
          languages: telemetry.languages || {},
          dailyQueries: { ...INITIAL_STATE.dailyQueries, ...telemetry.dailyQueries },
        };
        setData(merged);
      } catch (err) {
        console.warn('Analytics: fetch telemetry failed:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [isOwner, authReady, isNested]);

  const signIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => toast.success('Signed in successfully'))
      .catch(() => toast.error('Sign-in failed.'));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => toast.success('Signed out'))
      .catch(() => toast.error('Sign-out failed.'));
  };

  if (!isNested && !authReady) {
    return (
      <div className="analytics-loading">
        <div className="glass-loader">
          <div className="loader-orbit"></div>
          <p>Connecting to secure telemetry...</p>
        </div>
      </div>
    );
  }

  // Gate 1: No user logged in
  if (!isNested && !user) {
    return (
      <div className="analytics-page container auth-gate-wrapper">
        <Motion.div
          className="auth-gate-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lock-icon-wrapper purple">
            <Lock size={32} />
          </div>
          <h2>Telemetry Access Locked</h2>
          <p className="auth-subtitle">
            This dashboard displays live system telemetry and performance metrics. Please authenticate with the site owner account to continue.
          </p>
          <button className="btn btn-primary btn-lg auth-btn" onClick={signIn}>
            Sign in with Google
          </button>
        </Motion.div>
      </div>
    );
  }

  // Gate 2: Logged in but not the owner
  if (!isNested && !isOwner) {
    return (
      <div className="analytics-page container auth-gate-wrapper">
        <Motion.div
          className="auth-gate-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lock-icon-wrapper orange">
            <ShieldAlert size={32} />
          </div>
          <h2>Unauthorized Access</h2>
          <p className="auth-subtitle">
            Signed in as <strong>{user.email}</strong>. This metric stream is restricted to the site administrator.
          </p>
          <button className="btn btn-outline auth-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </Motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="glass-loader">
          <div className="loader-orbit"></div>
          <p>Analyzing telemetry streams...</p>
        </div>
      </div>
    );
  }

  // --- CHART 1: Daily Chatbot Queries (Line/Area Chart) ---
  const lineDates = getLast7Days();
  const lineValues = lineDates.map((d) => data.dailyQueries[d] || 0);
  const maxVal = Math.max(...lineValues, 10);

  // SVG coordinates calculation
  const paddingX = 50;
  const paddingY = 30;
  const chartWidth = 500;
  const chartHeight = 200;
  const widthStep = (chartWidth - paddingX * 2) / 6;

  const points = lineValues.map((v, i) => {
    const x = paddingX + i * widthStep;
    const y = chartHeight - paddingY - (v / maxVal) * (chartHeight - paddingY * 2);
    return { x, y, val: v, date: lineDates[i] };
  });

  const lineD = points.length
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : '';

  const areaD = points.length
    ? `${lineD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
    : '';

  // --- CHART 2: Project Click Distribution (Horizontal Bar Chart) ---
  const sortedProjects = Object.entries(data.projectClicks)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxProjectClicks = Math.max(...sortedProjects.map(p => p[1]), 10);

  // --- CHART 3: Language Preference Donut Charts ---
  const totalLangs = Object.values(data.languages).reduce((sum, v) => sum + v, 0) || 1;
  const langPercentage = (code) => Math.round(((data.languages[code] || 0) / totalLangs) * 100);

  return (
    <Motion.div
      className={isNested ? "analytics-nested-view" : "analytics-page container"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {!isNested && (
        <div className="analytics-header">
          <div className="analytics-top-meta">
            <div className="glow-badge">
              <span className="live-dot animate-pulse"></span>
              LIVE TELEMETRY
            </div>
            <button className="btn btn-ghost btn-sm analytics-signout-btn" onClick={handleSignOut}>
              <LogOut size={14} /> Sign out
            </button>
          </div>
          <h1 className="analytics-title">Portfolio System Performance</h1>
          <p className="analytics-subtitle">
            Real-time metrics monitoring visitor engagement, chatbot usage, and language distribution.
          </p>
        </div>
      )}

      {/* Grid: Overview Stats */}
      <div className="metrics-grid">
        <div className="metric-card glass-panel">
          <div className="metric-icon-wrapper purple">
            <MessageSquare size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">AI Chat Queries</span>
            <h2 className="metric-value">{data.chatbotQueries}</h2>
            <span className="metric-trend text-purple">Character streams</span>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon-wrapper blue">
            <Mail size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Inquiries Received</span>
            <h2 className="metric-value">{data.contactsCount}</h2>
            <span className="metric-trend text-blue">Direct contacts</span>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon-wrapper green">
            <Edit3 size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Guestbook Signs</span>
            <h2 className="metric-value">{data.guestbookCount}</h2>
            <span className="metric-trend text-green">Signatures saved</span>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon-wrapper orange">
            <Eye size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Unique Visitors</span>
            <h2 className="metric-value">{data.visitorCount}</h2>
            <span className="metric-trend text-orange">{data.pageViews} Total page views</span>
          </div>
        </div>
      </div>

      {/* Main Charts Layout */}
      <div className="charts-main-grid">
        {/* Left Column: Chat Queries Line Area Chart */}
        <div className="chart-wrapper glass-panel queries-chart">
          <div className="chart-header-block">
            <BarChart2 size={18} className="chart-header-icon" />
            <h3 className="chart-title">Daily Chatbot Inquiries</h3>
          </div>
          <div className="svg-container">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="svg-chart">
              <defs>
                <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal gridlines */}
              <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.05)" />
              <line x1={paddingX} y1={(chartHeight) / 2} x2={chartWidth - paddingX} y2={(chartHeight) / 2} stroke="rgba(255,255,255,0.05)" />
              <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="rgba(255,255,255,0.1)" />

              {/* Area fill */}
              {areaD && <path d={areaD} fill="url(#area-grad)" />}

              {/* Stroke line */}
              {lineD && <path d={lineD} fill="none" stroke="url(#line-grad)" strokeWidth="3" strokeLinecap="round" />}

              {/* Data points */}
              {points.map((p, i) => (
                <g key={i} className="chart-dot-group">
                  <circle cx={p.x} cy={p.y} r="5" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" className="chart-dot" />
                  <text x={p.x} y={p.y - 10} textAnchor="middle" className="chart-tooltip-text" fill="#fff" fontSize="10">
                    {p.val}
                  </text>
                  <text x={p.x} y={chartHeight - 10} textAnchor="middle" className="chart-axis-text" fill="rgba(255,255,255,0.4)" fontSize="9">
                    {p.date.slice(5)}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Right Column: Project details bar chart */}
        <div className="chart-wrapper glass-panel projects-chart">
          <div className="chart-header-block">
            <BarChart2 size={18} className="chart-header-icon" />
            <h3 className="chart-title">Popular Project Views</h3>
          </div>
          <div className="bar-list">
            {sortedProjects.length === 0 ? (
              <div className="empty-chart-msg">No project clicks recorded yet</div>
            ) : (
              sortedProjects.map(([id, val]) => {
                const widthPct = (val / maxProjectClicks) * 100;
                return (
                  <div key={id} className="bar-item">
                    <div className="bar-label-group">
                      <span className="bar-name">{id.replace(/_/g, ' ').toUpperCase()}</span>
                      <span className="bar-value">{val} clicks</span>
                    </div>
                    <div className="bar-track">
                      <Motion.div
                        className="bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPct}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Languages Dial Indicators */}
      <div className="chart-wrapper glass-panel languages-panel">
        <div className="chart-header-block">
          <BarChart2 size={18} className="chart-header-icon" />
          <h3 className="chart-title">Active Language Preferences</h3>
        </div>
        <div className="donut-row">
          {[
            { code: 'en', label: 'English', color: '#8b5cf6' },
            { code: 'hi', label: 'Hindi / हिन्दी', color: '#f59e0b' },
            { code: 'es', label: 'Spanish / Español', color: '#10b981' },
          ].map((l) => {
            const pct = langPercentage(l.code);
            const radius = 35;
            const strokeDash = 2 * Math.PI * radius; // 219.9
            const strokeOffset = strokeDash - (pct / 100) * strokeDash;
            return (
              <div key={l.code} className="donut-item">
                <div className="donut-svg-wrapper">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                    <Motion.circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke={l.color}
                      strokeWidth="8"
                      strokeDasharray={strokeDash}
                      initial={{ strokeDashoffset: strokeDash }}
                      animate={{ strokeDashoffset: strokeOffset }}
                      transition={{ duration: 1.0, ease: 'easeOut' }}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="55" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">
                      {pct}%
                    </text>
                  </svg>
                </div>
                <div className="donut-label-group">
                  <span className="donut-title">{l.label}</span>
                  <span className="donut-subtitle">{data.languages[l.code] || 0} switches</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Motion.div>
  );
}
