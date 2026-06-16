import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations for the UI chrome (nav, hero, common buttons).
// Add more keys/languages as needed — page body content can stay English
// or be added here under the same keys.
const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home', about: 'About', experience: 'Experience', projects: 'Projects',
        blog: 'Blog', aiMatch: 'AI Match', contact: 'Contact', now: 'Now', uses: 'Uses',
      },
      hero: {
        greeting: "Hi, I'm Shagun Tyagi",
        description: 'AI/ML Engineer & Full Stack Developer. I build production-ready intelligent systems — from generative-AI apps and data pipelines to scalable cloud-native web platforms.',
        hire: 'Hire Me', work: 'View My Work', resume: 'Resume',
        statProjects: 'Projects', statExperience: 'Year Experience', statCerts: 'Certifications',
      },
      sections: {
        featuredTitle: 'Featured Projects', featuredSub: 'Check out some of my recent work',
        githubTitle: 'GitHub Activity', githubSub: 'Live stats from my open-source work',
        skillsTitle: 'Technical Skills', skillsSub: 'My expertise across various technologies and tools',
        achievementsTitle: 'Achievements', achievementsSub: 'Recognition and milestones from my technical journey',
      },
      common: { viewAll: 'View All Projects', quickLinks: 'Quick Links', connect: 'Connect' },
    },
  },
  hi: {
    translation: {
      nav: {
        home: 'होम', about: 'परिचय', experience: 'अनुभव', projects: 'प्रोजेक्ट्स',
        blog: 'ब्लॉग', aiMatch: 'एआई मैच', contact: 'संपर्क', now: 'अभी', uses: 'उपकरण',
      },
      hero: {
        greeting: 'नमस्ते, मैं शगुन त्यागी हूँ',
        description: 'एआई/एमएल इंजीनियर और फुल स्टैक डेवलपर। मैं जेनरेटिव-एआई ऐप्स, डेटा पाइपलाइन और स्केलेबल क्लाउड-नेटिव वेब प्लेटफॉर्म बनाता हूँ।',
        hire: 'मुझे नियुक्त करें', work: 'मेरा काम देखें', resume: 'रिज़्यूमे',
        statProjects: 'प्रोजेक्ट्स', statExperience: 'वर्ष अनुभव', statCerts: 'प्रमाणपत्र',
      },
      sections: {
        featuredTitle: 'चुनिंदा प्रोजेक्ट्स', featuredSub: 'मेरे कुछ हालिया काम देखें',
        githubTitle: 'गिटहब गतिविधि', githubSub: 'मेरे ओपन-सोर्स काम के लाइव आँकड़े',
        skillsTitle: 'तकनीकी कौशल', skillsSub: 'विभिन्न तकनीकों और उपकरणों में मेरी विशेषज्ञता',
        achievementsTitle: 'उपलब्धियाँ', achievementsSub: 'मेरी तकनीकी यात्रा की पहचान और मील के पत्थर',
      },
      common: { viewAll: 'सभी प्रोजेक्ट्स देखें', quickLinks: 'त्वरित लिंक', connect: 'जुड़ें' },
    },
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio', about: 'Sobre mí', experience: 'Experiencia', projects: 'Proyectos',
        blog: 'Blog', aiMatch: 'AI Match', contact: 'Contacto', now: 'Ahora', uses: 'Uso',
      },
      hero: {
        greeting: 'Hola, soy Shagun Tyagi',
        description: 'Ingeniero de IA/ML y desarrollador full stack. Construyo sistemas inteligentes listos para producción: apps de IA generativa, pipelines de datos y plataformas web cloud-native escalables.',
        hire: 'Contrátame', work: 'Ver mi trabajo', resume: 'Currículum',
        statProjects: 'Proyectos', statExperience: 'Año de experiencia', statCerts: 'Certificaciones',
      },
      sections: {
        featuredTitle: 'Proyectos destacados', featuredSub: 'Echa un vistazo a mi trabajo reciente',
        githubTitle: 'Actividad en GitHub', githubSub: 'Estadísticas en vivo de mi trabajo open-source',
        skillsTitle: 'Habilidades técnicas', skillsSub: 'Mi experiencia en diversas tecnologías y herramientas',
        achievementsTitle: 'Logros', achievementsSub: 'Reconocimientos e hitos de mi trayectoria técnica',
      },
      common: { viewAll: 'Ver todos los proyectos', quickLinks: 'Enlaces rápidos', connect: 'Conectar' },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'es'],
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  });

// Keep <html lang> in sync for accessibility/SEO.
const applyLang = (lng) => { document.documentElement.lang = (lng || 'en').slice(0, 2); };
applyLang(i18n.resolvedLanguage);
i18n.on('languageChanged', applyLang);

export default i18n;
