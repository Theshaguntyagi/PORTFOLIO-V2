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
const Uses = lazy(() => import("./pages/Uses"));
const Admin = lazy(() => import("./pages/Admin"));
const Guestbook = lazy(() => import("./pages/Guestbook"));

import { ScrollProgress } from "./components/scroll-progress";
import { ScrollToTop } from "./components/scroll-to-top";
import { FloatingSocials } from "./components/floating-socials";
import { SmoothScrollProvider } from "./components/smooth-scroll-provider";
import Deferred from "./components/Deferred";
const CursorGlow = lazy(() => import("./components/CursorGlow"));
const CommandPalette = lazy(() => import("./components/CommandPalette"));

import SEO from "./components/SEO";
import { getSeoMeta } from "./data/seoMeta";
import { trackPageView } from "./analytics";

import "./index.css";

function App() {
  const location = useLocation();
  const seo = getSeoMeta(location.pathname);

  // GA4 SPA page view on every route change (no-op until VITE_GA_ID set).
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  // Active/Inactive tab title dynamic effect
  useEffect(() => {
    let timeoutId = null;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "come back 😩";
      } else {
        document.title = "welcome back 😊";
        timeoutId = setTimeout(() => {
          document.title = seo.title;
        }, 2000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [seo.title]);

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
        <ScrollProgress />
        <FloatingSocials />
        <Suspense fallback={null}>
          <Deferred>
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
                <Route path="uses" element={<Uses />} />
                <Route path="guestbook" element={<Guestbook />} />
                <Route path="certificate/:id" element={<CertificateDetail />} />
                <Route path="admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </SmoothScrollProvider>

        <ScrollToTop />
      </div>
    </HelmetProvider>
  );
}

export default App;
