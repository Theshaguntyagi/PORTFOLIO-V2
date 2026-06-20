import{a as e}from"./rolldown-runtime-XE_PPbSL.js";import{c as t,s as n}from"./vendor-motion-DHpA7YRm.js";import{s as r}from"./vendor-react-BI5ByEiH.js";import{t as i}from"./message-square-DUzpn-kJ.js";import{t as a}from"./trash-2-DlapHK8p.js";import{a as o,c as s,l as c,s as l}from"./index-BWEuehVC.js";import{i as u,t as d}from"./api-1jv1e838.js";import{t as f}from"./projects-CQ9rtUfJ.js";import{n as p,r as m,t as h}from"./achievements-B4VMNH3a.js";import{t as g}from"./experience-Tp-Z9BdM.js";import{t as _}from"./certifications-Ekj3OlU9.js";var v=e(t(),1),y=`Shagun Tyagi is an AI/ML Engineer based in Noida, India.
He builds production-ready intelligent systems — LLM agents, RAG pipelines,
ML-powered APIs, and full-stack cloud-native platforms.
Stack: Python · LangChain · FastAPI · React 19 · AWS · Azure · Docker · TensorFlow · OpenCV.
Currently at Envigo (Gurugram) architecting AI-driven SEO intelligence systems.
Previously at Airtel, shipping FastAPI microservices and Python automation at scale.
Published researcher in ECG/PPG-based health monitoring (IJSRA 2024).
Pursuing an MBA at Chandigarh University alongside his engineering career.`,b=`https://calendar.app.google/Wzwe5GD2vg17iHp89`,x=`Email: theshaguntyagi@gmail.com
Phone: +91 8445692029
Location: Noida, Uttar Pradesh, India
GitHub: https://github.com/theshaguntyagi
LinkedIn: https://linkedin.com/in/theshaguntyagi
Instagram: https://instagram.com/theshaguntyagi
Twitter: https://twitter.com/theshaguntyagi
Calendar / Meeting Scheduling Link: ${b}`,S=`Open to: senior ML engineering roles, AI product builds, and consulting engagements.
For collaborations or consulting, reach out at theshaguntyagi@gmail.com or schedule a meeting directly on his calendar at ${b}.`;function C(){return Object.entries(m).map(([e,t])=>`- ${e}: ${Array.isArray(t)?t.join(`, `):t}`).join(`
`)}function w(){return g.map(e=>{let t=[`- ${e.role} at ${e.company} (${e.duration}${e.location?`, ${e.location}`:``})`];return e.description&&t.push(`  ${e.description}`),e.achievements?.length&&t.push(`  Key wins: ${e.achievements.join(`; `)}`),e.stack&&t.push(`  Stack: ${e.stack}`),t.join(`
`)}).join(`
`)}function T(){return p.map(e=>{let t=e.extra?` — ${e.extra}`:``;return`- ${e.title}, ${e.institute} (${e.duration})${t}`}).join(`
`)}function E(){return _.map(e=>{let t=e.issuedBy||e.subtitle||``,n=e.date?` (${e.date})`:``;return`- ${e.title}${t?` by ${t}`:``}${n}`}).join(`
`)}function D(){return h.map(e=>`- ${e.title}${e.subtitle?` — ${e.subtitle}`:``}`).join(`
`)}function O(){return f.map(e=>{let t=[`### ${e.title}`];return t.push(e.description),e.technologies?.length&&t.push(`Tech: ${e.technologies.join(`, `)}`),e.problem&&t.push(`Problem: ${e.problem}`),e.solution&&t.push(`Solution: ${e.solution}`),e.overview&&t.push(`Overview: ${e.overview}`),e.results?.length&&t.push(`Results: ${e.results.join(`; `)}`),e.achievements?.length&&t.push(`Highlights: ${e.achievements.join(`; `)}`),e.liveUrl&&t.push(`Live demo: ${e.liveUrl}`),e.githubUrl&&t.push(`GitHub: ${e.githubUrl}`),t.join(`
`)}).join(`

`)}function k(){return`You are Shagun's AI portfolio assistant. You answer questions about Shagun Tyagi — his work, projects, skills, experience, education, and how to contact him. If someone asks about anything unrelated to Shagun or his professional profile, politely decline and redirect them.

# AGENTIC UI COMMAND CONTROLS
You can dynamically control the website on the user's behalf. If the user asks to navigate, switch languages, or change the theme, append these commands at the end of your response.
1. Navigating pages: [CMD:NAVIGATE:/path] (Valid paths: /, /about, /experience, /projects, /guestbook, /contact, /blog, /admin, /now, /uses). Note: Analytics are now accessible inside the owner dashboard (/admin).
2. Changing language: [CMD:SET_LANG:en|hi|es] (e.g. Spanish -> [CMD:SET_LANG:es]).
3. Changing theme: [CMD:SET_THEME:light|dark].

# ABOUT SHAGUN
${y}

# CONTACT & AVAILABILITY
${x}

${S}

# TECHNICAL SKILLS
${C()}

# EXPERIENCE
${w()}

# EDUCATION
${T()}

# CERTIFICATIONS
${E()}

# ACHIEVEMENTS
${D()}

# PROJECTS
${O()}`}var A=n(),j={role:`assistant`,content:`Hi! I'm Shagun's AI assistant. Ask me about his skills, projects, or experience.`},M=[`What are his skills?`,`Tell me about his projects`,`How can I contact him?`],N=()=>{let e=r(),{i18n:t}=l(),[n,f]=(0,v.useState)(!1),[p,m]=(0,v.useState)(()=>{try{let e=localStorage.getItem(`chat-messages`);if(e){let t=JSON.parse(e);if(Array.isArray(t)&&t.length)return t}}catch{}return[j]}),[h,g]=(0,v.useState)(``),[_,y]=(0,v.useState)(!1),b=(0,v.useRef)(null),[x,S]=(0,v.useState)(()=>{let e=localStorage.getItem(`theme`);return e?e===`dark`:window.matchMedia(`(prefers-color-scheme: dark)`).matches});(0,v.useEffect)(()=>{let e=()=>{let e=localStorage.getItem(`theme`);S(e?e===`dark`:window.matchMedia(`(prefers-color-scheme: dark)`).matches)};window.addEventListener(`storage`,e),window.addEventListener(`theme-change`,e);let t=window.matchMedia(`(prefers-color-scheme: dark)`);return t.addEventListener(`change`,e),()=>{window.removeEventListener(`storage`,e),window.removeEventListener(`theme-change`,e),t.removeEventListener(`change`,e)}},[]),(0,v.useEffect)(()=>{try{localStorage.setItem(`chat-messages`,JSON.stringify(p))}catch{}C()},[p]);let C=()=>{b.current&&(b.current.scrollTop=b.current.scrollHeight,setTimeout(()=>{b.current&&(b.current.scrollTop=b.current.scrollHeight)},50))},w=(n,r)=>{try{let i=r.trim();if(n===`NAVIGATE`)e(i);else if(n===`SET_THEME`){let e=i.toLowerCase();(e===`dark`||e===`light`)&&(localStorage.setItem(`theme`,e),window.dispatchEvent(new Event(`theme-change`)))}else if(n===`SET_LANG`){let e=i.toLowerCase();[`en`,`hi`,`es`].includes(e)&&t.changeLanguage(e)}}catch(e){console.warn(`ChatWidget execute command failed:`,n,r,e)}},T=async e=>{let t=(typeof e==`string`?e:h).trim();if(!t||_)return;let n={role:`user`,content:t},r=[...p,n];m(r),g(``),y(!0),o();let i=r.filter(e=>!(e.role===`assistant`&&e.content===j.content)),a=!0,s=``;try{if(!d.chat.isConfigured())throw Error(`not-configured`);await d.chat.completeStream(i,k(),e=>{a&&=(y(!1),!1),s+=e,m(e=>{let t=[...e],n=t[t.length-1],r=s.replace(/\[CMD:[^\]]+\]/g,``);return n&&n.role===`assistant`?t[t.length-1]={...n,content:r}:t.push({role:`assistant`,content:r}),t})});let e=/\[CMD:([A-Z_]+):([^\]]+)\]/g,t;for(;(t=e.exec(s))!==null;){let[e,n,r]=t;w(n,r)}}catch(e){console.error(`Error sending message:`,e),y(!1);let t=e.message===`not-configured`?`The AI assistant isn't connected yet. Meanwhile, reach Shagun at theshaguntyagi@gmail.com.`:`Sorry, I'm having trouble connecting right now. Please try again in a moment.`;m(e=>{let n=[...e],r=n[n.length-1];return r&&r.role===`assistant`&&!r.content?n[n.length-1]={role:`assistant`,content:t}:(!r||r.role!==`assistant`)&&n.push({role:`assistant`,content:t}),n})}finally{y(!1)}},E=()=>{m([j]);try{localStorage.removeItem(`chat-messages`)}catch{}},D=e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),T())};return(0,A.jsx)(`div`,{className:`chat-widget-container`,children:n?(0,A.jsxs)(`div`,{className:`chat-window ${x?`chat-window-dark`:`chat-window-light`}`,children:[(0,A.jsxs)(`div`,{className:`chat-header`,children:[(0,A.jsxs)(`div`,{className:`chat-header-content`,children:[(0,A.jsx)(`div`,{className:`chat-status-indicator`}),(0,A.jsx)(i,{className:`chat-header-icon`,size:20}),(0,A.jsx)(`span`,{className:`chat-header-title`,children:`Chatterbox`})]}),(0,A.jsxs)(`div`,{className:`chat-header-actions`,children:[(0,A.jsx)(`button`,{onClick:E,className:`chat-header-btn`,title:`Clear chat history`,"aria-label":`Clear chat history`,children:(0,A.jsx)(a,{size:18})}),(0,A.jsx)(`button`,{onClick:()=>f(!1),className:`chat-header-btn`,"aria-label":`Close chat`,children:(0,A.jsx)(s,{size:20})})]})]}),(0,A.jsxs)(`div`,{className:`chat-messages`,ref:b,children:[p.map((e,t)=>(0,A.jsx)(`div`,{className:`chat-message ${e.role===`user`?`chat-message-user`:`chat-message-assistant`}`,children:(0,A.jsx)(`div`,{className:`chat-bubble ${e.role===`user`?`chat-bubble-user`:x?`chat-bubble-assistant-dark`:`chat-bubble-assistant-light`}`,children:e.role===`assistant`?(0,A.jsx)(u,{children:e.content}):e.content})},t)),p.length===1&&!_&&(0,A.jsx)(`div`,{className:`chat-suggestions`,children:M.map(e=>(0,A.jsx)(`button`,{type:`button`,className:`chat-suggestion`,onClick:()=>T(e),children:e},e))}),_&&(0,A.jsx)(`div`,{className:`chat-message chat-message-assistant`,children:(0,A.jsx)(`div`,{className:`chat-bubble ${x?`chat-bubble-assistant-dark`:`chat-bubble-assistant-light`}`,children:(0,A.jsxs)(`div`,{className:`typing-indicator`,children:[(0,A.jsx)(`span`,{className:`typing-dot`}),(0,A.jsx)(`span`,{className:`typing-dot`}),(0,A.jsx)(`span`,{className:`typing-dot`})]})})})]}),(0,A.jsxs)(`div`,{className:`chat-input-area ${x?``:`chat-input-area-light`}`,children:[(0,A.jsxs)(`div`,{className:`chat-input-wrapper`,children:[(0,A.jsx)(`input`,{type:`text`,value:h,onChange:e=>g(e.target.value),onKeyDown:D,placeholder:`Ask me anything...`,disabled:_,className:`chat-input ${x?``:`chat-input-light`}`}),(0,A.jsx)(`button`,{onClick:T,disabled:!h.trim()||_,className:`chat-send-btn`,"aria-label":`Send message`,children:(0,A.jsx)(c,{size:20})})]}),(0,A.jsx)(`p`,{className:`chat-footer-text`,children:`Powered by Google Gemini`})]})]}):(0,A.jsxs)(`button`,{onClick:()=>f(!0),className:`chat-float-btn`,"aria-label":`Open AI chat assistant`,children:[(0,A.jsx)(i,{size:28}),(0,A.jsx)(`span`,{className:`chat-float-pulse`}),(0,A.jsx)(`div`,{className:`chat-tooltip`,children:`Chat with Chatterbox`})]})})};export{N as default};