const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.esm-B83Vl8mB.js","assets/vendor-firebase-6JYbpQ2V.js","assets/firebase-BSrTNJo8.js","assets/firebase-D72E6by9.js","assets/utm-DNQEXNWi.js","assets/index-CGgS9EQD.js","assets/vendor-react-Cj8udqBR.js","assets/vendor-motion-auVSsmmu.js","assets/rolldown-runtime-XE_PPbSL.js","assets/index-Bgr7hqbD.css"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-XE_PPbSL.js";import{c as t,s as n}from"./vendor-motion-auVSsmmu.js";import{l as r,s as i}from"./vendor-react-Cj8udqBR.js";import{t as a}from"./message-square-BwtaDnZx.js";import{t as o}from"./trash-2-BwUcJ7ip.js";import{d as s,l as c,s as l,u}from"./index-CGgS9EQD.js";import"./index.dom-BYBZ0k8o.js";import{i as d,t as f}from"./api-hrQkvJXj.js";import{t as p}from"./projects-CAtyyz1s.js";import{n as m,r as h,t as g}from"./achievements-UacWKWWm.js";import{t as _}from"./experience-JRvJqQjb.js";import{t as v}from"./certifications-ATK1RnkG.js";var y=e(t(),1),b=`Shagun Tyagi is an AI/ML Engineer based in Noida, India.
He builds production-ready intelligent systems — LLM agents, RAG pipelines,
ML-powered APIs, and full-stack cloud-native platforms.
Stack: Python · LangChain · FastAPI · React 19 · AWS · Azure · Docker · TensorFlow · OpenCV.
Currently at Envigo (Gurugram) architecting AI-driven SEO intelligence systems.
Previously at Airtel, shipping FastAPI microservices and Python automation at scale.
Published researcher in ECG/PPG-based health monitoring (IJSRA 2024).
Pursuing an MBA at Chandigarh University alongside his engineering career.`,x=`https://calendar.app.google/Wzwe5GD2vg17iHp89`,S=`Email: theshaguntyagi@gmail.com
Phone: +91 8445692029
Location: Noida, Uttar Pradesh, India
GitHub: https://github.com/theshaguntyagi
LinkedIn: https://linkedin.com/in/theshaguntyagi
Instagram: https://instagram.com/theshaguntyagi
Twitter: https://twitter.com/theshaguntyagi
Calendar / Meeting Scheduling Link: ${x}`,C=`Open to: senior ML engineering roles, AI product builds, and consulting engagements.
For collaborations or consulting, reach out at theshaguntyagi@gmail.com or schedule a meeting directly on his calendar at ${x}.`;function w(){return Object.entries(h).map(([e,t])=>`- ${e}: ${Array.isArray(t)?t.join(`, `):t}`).join(`
`)}function T(){return _.map(e=>{let t=[`- ${e.role} at ${e.company} (${e.duration}${e.location?`, ${e.location}`:``})`];return e.description&&t.push(`  ${e.description}`),e.achievements?.length&&t.push(`  Key wins: ${e.achievements.join(`; `)}`),e.stack&&t.push(`  Stack: ${e.stack}`),t.join(`
`)}).join(`
`)}function E(){return m.map(e=>{let t=e.extra?` — ${e.extra}`:``;return`- ${e.title}, ${e.institute} (${e.duration})${t}`}).join(`
`)}function D(){return v.map(e=>{let t=e.issuedBy||e.subtitle||``,n=e.date?` (${e.date})`:``;return`- ${e.title}${t?` by ${t}`:``}${n}`}).join(`
`)}function O(){return g.map(e=>`- ${e.title}${e.subtitle?` — ${e.subtitle}`:``}`).join(`
`)}function k(){return p.map(e=>{let t=[`### ${e.title}`];return t.push(e.description),e.technologies?.length&&t.push(`Tech: ${e.technologies.join(`, `)}`),e.problem&&t.push(`Problem: ${e.problem}`),e.solution&&t.push(`Solution: ${e.solution}`),e.overview&&t.push(`Overview: ${e.overview}`),e.results?.length&&t.push(`Results: ${e.results.join(`; `)}`),e.achievements?.length&&t.push(`Highlights: ${e.achievements.join(`; `)}`),e.liveUrl&&t.push(`Live demo: ${e.liveUrl}`),e.githubUrl&&t.push(`GitHub: ${e.githubUrl}`),t.join(`
`)}).join(`

`)}function A(){return`You are Shagun's AI portfolio assistant. You answer questions about Shagun Tyagi — his work, projects, skills, experience, education, and how to contact him. If someone asks about anything unrelated to Shagun or his professional profile, politely decline and redirect them.

# AGENTIC UI COMMAND CONTROLS
You can dynamically control the website on the user's behalf. If the user asks to navigate, switch languages, or change the theme, append these commands at the end of your response.
1. Navigating pages: [CMD:NAVIGATE:/path] (Valid paths: /, /about, /experience, /projects, /testimonials, /guestbook, /contact, /blog, /now, /uses, /analytics, /colophon, /links, /press, /speaking, /changelog, /start-here). /analytics is a public traffic dashboard (no login) — it is NOT the same as the owner-only /admin panel, which you should never suggest navigating to.
2. Changing language: [CMD:SET_LANG:en|hi|es] (e.g. Spanish -> [CMD:SET_LANG:es]).
3. Changing theme: [CMD:SET_THEME:light|dark].
4. Lead capture: if the visitor expresses clear hiring, consulting, freelance, or collaboration intent (e.g. "we're hiring for...", "want to discuss a project", "are you available for consulting"), append [CMD:SHOW_LEAD_FORM:reason] where reason is a short lowercase tag like hiring, consulting, or collaboration. This shows an inline email field so Shagun can follow up directly — only use it once per conversation, and only when the visitor's own words show real intent, not just because they asked what he's open to.

# OTHER SITE PAGES
- /start-here — a guided map of the site for first-time visitors, grouped by what they're looking for.
- /colophon — the tech stack, hosting, and type choices behind this site itself.
- /links — every place to find Shagun online in one list (GitHub, LinkedIn, X, Instagram, RSS, email).
- /press — a media/press kit: short bio, verified facts, and asset links for journalists or podcast hosts.
- /speaking — workshops Shagun has led (ML/AI/cloud, via the CXI Community) and his openness to speaking; he has not yet given a conference talk, so don't claim otherwise.
- /changelog — a real, git-commit-generated log of changes to this site (not curated marketing copy).
- /analytics — public, no-login traffic dashboard (visitors, page views, top-clicked projects).
- /resume.json — a machine-readable JSON Resume version of his experience/education/skills, at shaguntyagi.tech/resume.json.
- /rss.xml — RSS feed of blog posts, at shaguntyagi.tech/rss.xml.

# ABOUT SHAGUN
${b}

# CONTACT & AVAILABILITY
${S}

${C}

# TECHNICAL SKILLS
${w()}

# EXPERIENCE
${T()}

# EDUCATION
${E()}

# CERTIFICATIONS
${D()}

# ACHIEVEMENTS
${O()}

# PROJECTS
${k()}`}var j=n(),M={role:`assistant`,content:`Hi! I'm Shagun's AI assistant. Ask me about his skills, projects, or experience.`},N=[`What are his skills?`,`Tell me about his projects`,`How can I contact him?`],P=()=>{let e=i(),{i18n:t}=c(),[n,p]=(0,y.useState)(!1),[m,h]=(0,y.useState)(()=>{try{let e=localStorage.getItem(`chat-messages`);if(e){let t=JSON.parse(e);if(Array.isArray(t)&&t.length)return t}}catch{}return[M]}),[g,_]=(0,y.useState)(``),[v,b]=(0,y.useState)(!1),x=(0,y.useRef)(null),[S,C]=(0,y.useState)(()=>{let e=localStorage.getItem(`theme`);return e?e===`dark`:window.matchMedia(`(prefers-color-scheme: dark)`).matches});(0,y.useEffect)(()=>{let e=()=>{let e=localStorage.getItem(`theme`);C(e?e===`dark`:window.matchMedia(`(prefers-color-scheme: dark)`).matches)};window.addEventListener(`storage`,e),window.addEventListener(`theme-change`,e);let t=window.matchMedia(`(prefers-color-scheme: dark)`);return t.addEventListener(`change`,e),()=>{window.removeEventListener(`storage`,e),window.removeEventListener(`theme-change`,e),t.removeEventListener(`change`,e)}},[]),(0,y.useEffect)(()=>{try{localStorage.setItem(`chat-messages`,JSON.stringify(m))}catch{}w()},[m]);let w=()=>{x.current&&(x.current.scrollTop=x.current.scrollHeight,setTimeout(()=>{x.current&&(x.current.scrollTop=x.current.scrollHeight)},50))},[T,E]=(0,y.useState)(!1),[D,O]=(0,y.useState)(``),[k,P]=(0,y.useState)(!1),[F,I]=(0,y.useState)(!1),L=(n,r)=>{try{let i=r.trim();if(n===`NAVIGATE`)e(i);else if(n===`SET_THEME`){let e=i.toLowerCase();(e===`dark`||e===`light`)&&(localStorage.setItem(`theme`,e),window.dispatchEvent(new Event(`theme-change`)))}else if(n===`SET_LANG`){let e=i.toLowerCase();[`en`,`hi`,`es`].includes(e)&&t.changeLanguage(e)}else n===`SHOW_LEAD_FORM`&&(E(!0),I(!1),z(i||`general`))}catch(e){console.warn(`ChatWidget execute command failed:`,n,r,e)}},[R,z]=(0,y.useState)(`general`),B=async e=>{if(e.preventDefault(),!(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(D)||k)){P(!0);try{let{collection:e,addDoc:t,serverTimestamp:n}=await r(async()=>{let{collection:e,addDoc:t,serverTimestamp:n}=await import(`./index.esm-B83Vl8mB.js`);return{collection:e,addDoc:t,serverTimestamp:n}},__vite__mapDeps([0,1])),{db:i}=await r(async()=>{let{db:e}=await import(`./firebase-BSrTNJo8.js`);return{db:e}},__vite__mapDeps([2,1,3])),{getUtmAttribution:a}=await r(async()=>{let{getUtmAttribution:e}=await import(`./utm-DNQEXNWi.js`);return{getUtmAttribution:e}},__vite__mapDeps([4,5,1,6,7,8,9]));await t(e(i,`chatLeads`),{email:D.trim().toLowerCase(),reason:R,conversationSnippet:m.slice(-4).map(e=>`${e.role}: ${e.content}`).join(`
`),utm:a()||null,createdAt:n()}),I(!0),O(``)}catch(e){console.error(`Lead capture failed:`,e)}finally{P(!1)}}},V=async e=>{let t=(typeof e==`string`?e:g).trim();if(!t||v)return;let n={role:`user`,content:t},r=[...m,n];h(r),_(``),b(!0),l();let i=r.filter(e=>!(e.role===`assistant`&&e.content===M.content)),a=!0,o=``;try{if(!f.chat.isConfigured())throw Error(`not-configured`);await f.chat.completeStream(i,A(),e=>{a&&(b(!1),a=!1),o+=e,h(e=>{let t=[...e],n=t[t.length-1],r=o.replace(/\[CMD:[^\]]+\]/g,``);return n&&n.role===`assistant`?t[t.length-1]={...n,content:r}:t.push({role:`assistant`,content:r}),t})});let e=/\[CMD:([A-Z_]+):([^\]]+)\]/g,t;for(;(t=e.exec(o))!==null;){let[e,n,r]=t;L(n,r)}}catch(e){console.error(`Error sending message:`,e),b(!1);let t=e.message===`not-configured`?`The AI assistant isn't connected yet. Meanwhile, reach Shagun at theshaguntyagi@gmail.com.`:`Sorry, I'm having trouble connecting right now. Please try again in a moment.`;h(e=>{let n=[...e],r=n[n.length-1];return r&&r.role===`assistant`&&!r.content?n[n.length-1]={role:`assistant`,content:t}:(!r||r.role!==`assistant`)&&n.push({role:`assistant`,content:t}),n})}finally{b(!1)}},H=()=>{h([M]);try{localStorage.removeItem(`chat-messages`)}catch{}},U=e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),V())};return(0,j.jsx)(`div`,{className:`chat-widget-container`,children:n?(0,j.jsxs)(`div`,{className:`chat-window ${S?`chat-window-dark`:`chat-window-light`}`,children:[(0,j.jsxs)(`div`,{className:`chat-header`,children:[(0,j.jsxs)(`div`,{className:`chat-header-content`,children:[(0,j.jsx)(`div`,{className:`chat-status-indicator`}),(0,j.jsx)(a,{className:`chat-header-icon`,size:20}),(0,j.jsx)(`span`,{className:`chat-header-title`,children:`Chatterbox`})]}),(0,j.jsxs)(`div`,{className:`chat-header-actions`,children:[(0,j.jsx)(`button`,{onClick:H,className:`chat-header-btn`,title:`Clear chat history`,"aria-label":`Clear chat history`,children:(0,j.jsx)(o,{size:18})}),(0,j.jsx)(`button`,{onClick:()=>p(!1),className:`chat-header-btn`,"aria-label":`Close chat`,children:(0,j.jsx)(u,{size:20})})]})]}),(0,j.jsxs)(`div`,{className:`chat-messages`,ref:x,children:[m.map((e,t)=>(0,j.jsx)(`div`,{className:`chat-message ${e.role===`user`?`chat-message-user`:`chat-message-assistant`}`,children:(0,j.jsx)(`div`,{className:`chat-bubble ${e.role===`user`?`chat-bubble-user`:S?`chat-bubble-assistant-dark`:`chat-bubble-assistant-light`}`,children:e.role===`assistant`?(0,j.jsx)(d,{children:e.content}):e.content})},t)),T&&(0,j.jsx)(`div`,{className:`chat-message chat-message-assistant`,children:(0,j.jsx)(`div`,{className:`chat-bubble ${S?`chat-bubble-assistant-dark`:`chat-bubble-assistant-light`}`,children:F?(0,j.jsx)(`p`,{children:`Thanks — Shagun will follow up at that address soon.`}):(0,j.jsxs)(`form`,{onSubmit:B,children:[(0,j.jsx)(`p`,{style:{marginBottom:`0.5rem`},children:`Leave your email and Shagun will reach out directly.`}),(0,j.jsx)(`input`,{type:`email`,required:!0,placeholder:`you@example.com`,value:D,onChange:e=>O(e.target.value),className:`chat-input ${S?``:`chat-input-light`}`,style:{width:`100%`,marginBottom:`0.5rem`}}),(0,j.jsxs)(`div`,{style:{display:`flex`,gap:`0.5rem`},children:[(0,j.jsx)(`button`,{type:`submit`,disabled:k,className:`chat-suggestion`,children:k?`Sending…`:`Send`}),(0,j.jsx)(`button`,{type:`button`,className:`chat-suggestion`,onClick:()=>E(!1),children:`No thanks`})]})]})})}),m.length===1&&!v&&(0,j.jsx)(`div`,{className:`chat-suggestions`,children:N.map(e=>(0,j.jsx)(`button`,{type:`button`,className:`chat-suggestion`,onClick:()=>V(e),children:e},e))}),v&&(0,j.jsx)(`div`,{className:`chat-message chat-message-assistant`,children:(0,j.jsx)(`div`,{className:`chat-bubble ${S?`chat-bubble-assistant-dark`:`chat-bubble-assistant-light`}`,children:(0,j.jsxs)(`div`,{className:`typing-indicator`,children:[(0,j.jsx)(`span`,{className:`typing-dot`}),(0,j.jsx)(`span`,{className:`typing-dot`}),(0,j.jsx)(`span`,{className:`typing-dot`})]})})})]}),(0,j.jsxs)(`div`,{className:`chat-input-area ${S?``:`chat-input-area-light`}`,children:[(0,j.jsxs)(`div`,{className:`chat-input-wrapper`,children:[(0,j.jsx)(`input`,{type:`text`,value:g,onChange:e=>_(e.target.value),onKeyDown:U,placeholder:`Ask me anything...`,disabled:v,className:`chat-input ${S?``:`chat-input-light`}`}),(0,j.jsx)(`button`,{onClick:V,disabled:!g.trim()||v,className:`chat-send-btn`,"aria-label":`Send message`,children:(0,j.jsx)(s,{size:20})})]}),(0,j.jsx)(`p`,{className:`chat-footer-text`,children:`Powered by Google Gemini`})]})]}):(0,j.jsxs)(`button`,{onClick:()=>p(!0),className:`chat-float-btn`,"aria-label":`Open AI chat assistant`,children:[(0,j.jsx)(a,{size:28}),(0,j.jsx)(`span`,{className:`chat-float-pulse`}),(0,j.jsx)(`div`,{className:`chat-tooltip`,children:`Chat with Chatterbox`})]})})};export{P as default};