import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";

// Code-split each page into its own chunk (smaller initial bundle).
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const CertificateDetail = lazy(() => import("./pages/CertificateDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Now = lazy(() => import("./pages/Now"));
const PublicAnalytics = lazy(() => import("./pages/PublicAnalytics"));
const Colophon = lazy(() => import("./pages/Colophon"));
const Links = lazy(() => import("./pages/Links"));
const Press = lazy(() => import("./pages/Press"));
const Talks = lazy(() => import("./pages/Talks"));
const Changelog = lazy(() => import("./pages/Changelog"));
const StartHere = lazy(() => import("./pages/StartHere"));
const Uses = lazy(() => import("./pages/Uses"));
const Admin = lazy(() => import("./pages/Admin"));
const Guestbook = lazy(() => import("./pages/Guestbook"));

import { SmoothScrollProvider } from "./components/smooth-scroll-provider";
import Deferred from "./components/Deferred";
const CursorGlow = lazy(() => import("./components/CursorGlow"));
const CommandPalette = lazy(() => import("./components/CommandPalette"));
const ScrollProgress = lazy(() => import("./components/scroll-progress").then(m => ({ default: m.ScrollProgress })));
const ScrollToTop = lazy(() => import("./components/scroll-to-top").then(m => ({ default: m.ScrollToTop })));
const FloatingSocials = lazy(() => import("./components/floating-socials").then(m => ({ default: m.FloatingSocials })));

import SEO from "./components/SEO";
import { getSeoMeta } from "./data/seoMeta";
import { trackPageView } from "./analytics";
import { trackVisitor } from "./services/telemetry";

import "./index.css";

function App() {
  const location = useLocation();
  const seo = getSeoMeta(location.pathname);

  // GA4 SPA page view on every route change (no-op until VITE_GA_ID set).
  useEffect(() => {
    trackPageView(location.pathname);
    trackVisitor(); // Custom Firestore session telemetry tracker
  }, [location.pathname]);

  // Active/Inactive tab title easter egg — swaps the tab title when the user
  // switches away and back. Two bugs fixed here:
  // 1. It used to restore `seo.title` from data/seoMeta.js, which is a
  //    separate, generic per-route string — not necessarily what Helmet
  //    actually rendered (e.g. BlogDetail sets a per-post title that
  //    overrides the generic one). Restoring the stale generic title could
  //    silently replace a correct, more specific title. Now it captures
  //    whatever document.title actually was right before hiding, and
  //    restores exactly that.
  // 2. It ran unconditionally, including for headless-browser bots (link
  //    preview scrapers for Twitter/LinkedIn/Slack/WhatsApp, some SEO
  //    crawlers) that can render with a backgrounded/hidden tab — which
  //    risked baking "come back 😩" into what should be the real scraped
  //    title. Now skipped entirely for known bot user agents.
  useEffect(() => {
    const isBot = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegrambot|slackbot|linkedinbot|embedly|quora|pinterest|vkshare|lighthouse|headless/i.test(
      navigator.userAgent || ""
    );
    if (isBot) return undefined;

    let timeoutId = null;
    let capturedTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        capturedTitle = document.title;
        if (timeoutId) clearTimeout(timeoutId);
        document.title = "come back 😩";
      } else {
        document.title = "welcome back 😊";
        timeoutId = setTimeout(() => {
          document.title = capturedTitle;
        }, 2000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  return (
    <HelmetProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: { background: "#1a1730", color: "#fff", border: "1px solid rgba(124,58,237,0.4)" },
          success: { iconTheme: { primary: "#7c3aed", secondary: "#fff" } },
        }}
      />

      {/* Content renders immediately (no click-gate) so search engines and
          link previews can crawl every route. The old 3D pre-landing splash
          hid all content behind an "Enter" interaction crawlers never make. */}
      <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        <Suspense fallback={null}>
          <Deferred>
            <ScrollProgress />
            <FloatingSocials />
            <CursorGlow />
            <CommandPalette />
          </Deferred>
        </Suspense>

        <SmoothScrollProvider key={location.pathname}>
          {/* GLOBAL SEO — per-route title/description */}
          <SEO title={seo.title} desc={seo.desc} path={location.pathname} />

          <Suspense fallback={<div className="route-fallback" />}>
            <Routes location={location}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="experience" element={<Experience />} />
                <Route path="projects" element={<Projects />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:id" element={<BlogDetail />} />
                <Route path="project/:id" element={<ProjectDetail />} />
                <Route path="contact" element={<Contact />} />
                <Route path="now" element={<Now />} />
                <Route path="analytics" element={<PublicAnalytics />} />
                <Route path="colophon" element={<Colophon />} />
                <Route path="links" element={<Links />} />
                <Route path="press" element={<Press />} />
                <Route path="speaking" element={<Talks />} />
                <Route path="changelog" element={<Changelog />} />
                <Route path="start-here" element={<StartHere />} />
                <Route path="uses" element={<Uses />} />
                <Route path="guestbook" element={<Guestbook />} />
                <Route path="certificate/:id" element={<CertificateDetail />} />
                <Route path="admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </SmoothScrollProvider>

        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
      </div>
    </HelmetProvider>
  );
}

export default App;
