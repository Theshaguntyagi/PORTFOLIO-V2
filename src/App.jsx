import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";

import Layout from "./components/Layout";
import PreLandingPage from "./components/PreLandingPage";

import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import BlogDetail from "./pages/BlogDetail";
import ProjectDetail from "./pages/ProjectDetail";
import CertificateDetail from "./pages/CertificateDetail";

import { ScrollProgress } from "./components/scroll-progress";
import { ScrollToTop } from "./components/scroll-to-top";
import { FloatingSocials } from "./components/floating-socials";
import { SmoothScrollProvider } from "./components/smooth-scroll-provider";
import CursorGlow from "./components/CursorGlow";

import SEO from "./components/SEO"; // 🔥 NEW

import "./index.css";

function App() {
  const location = useLocation();

  const [showPreLanding, setShowPreLanding] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  const handleEnterPortfolio = () => {
    setShowPreLanding(false);
    setTimeout(() => setShowMainContent(true), 950);
  };

  return (
    <HelmetProvider>
      <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

        {/* PRE LANDING */}
        <AnimatePresence mode="wait">
          {showPreLanding && (
            <PreLandingPage key="prelanding" onEnter={handleEnterPortfolio} />
          )}
        </AnimatePresence>

        {/* MAIN APP */}
        <AnimatePresence>
          {showMainContent && (
            <motion.div
              key="main-app"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <ScrollProgress />
              <FloatingSocials />
              <CursorGlow />

              <SmoothScrollProvider key={location.pathname}>
                {/* 🔥 GLOBAL SEO BASE */}
                <SEO path={location.pathname} />

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
                    <Route path="certificate/:id" element={<CertificateDetail />} />
                  </Route>
                </Routes>
              </SmoothScrollProvider>

              <ScrollToTop />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
}

export default App;