import{a as e}from"./rolldown-runtime-Cn8xt2Gj.js";import{c as t,s as n}from"./vendor-motion-ZN3_BsN1.js";import{t as r}from"./message-square-CZGb8E6l.js";import{t as i}from"./trash-2-BViSFCNg.js";import{f as a,u as o}from"./index-DgXXitLz.js";import{i as s,t as c}from"./api-C9VloP6s.js";import{t as l}from"./projects-BZC4Q_do.js";import{n as u,r as d,t as f}from"./achievements-00Xbj53F.js";import{t as p}from"./experience-D4OlZ7BI.js";import{t as m}from"./certifications-2EzppkIO.js";var h=e(t(),1),g=`Shagun Tyagi is an AI/ML Engineer based in Noida, India.
He builds production-ready intelligent systems — LLM agents, RAG pipelines,
ML-powered APIs, and full-stack cloud-native platforms.
Stack: Python · LangChain · FastAPI · React 19 · AWS · Azure · Docker · TensorFlow · OpenCV.
Currently at Envigo (Gurugram) architecting AI-driven SEO intelligence systems.
Previously at Airtel, shipping FastAPI microservices and Python automation at scale.
Published researcher in ECG/PPG-based health monitoring (IJSRA 2024).
Pursuing an MBA at Chandigarh University alongside his engineering career.`,_=`Email: theshaguntyagi@gmail.com
Phone: +91 8445692029
Location: Noida, Uttar Pradesh, India
GitHub: https://github.com/theshaguntyagi
LinkedIn: https://linkedin.com/in/theshaguntyagi
Instagram: https://instagram.com/theshaguntyagi
Twitter: https://twitter.com/theshaguntyagi`,v=`Open to: senior ML engineering roles, AI product builds, and consulting engagements.
For collaborations or consulting, reach out at theshaguntyagi@gmail.com.`;function y(){return Object.entries(d).map(([e,t])=>`- ${e}: ${Array.isArray(t)?t.join(`, `):t}`).join(`
`)}function b(){return p.map(e=>{let t=[`- ${e.role} at ${e.company} (${e.duration}${e.location?`, ${e.location}`:``})`];return e.description&&t.push(`  ${e.description}`),e.achievements?.length&&t.push(`  Key wins: ${e.achievements.join(`; `)}`),e.stack&&t.push(`  Stack: ${e.stack}`),t.join(`
`)}).join(`
`)}function x(){return u.map(e=>{let t=e.extra?` — ${e.extra}`:``;return`- ${e.title}, ${e.institute} (${e.duration})${t}`}).join(`
`)}function S(){return m.map(e=>{let t=e.issuedBy||e.subtitle||``,n=e.date?` (${e.date})`:``;return`- ${e.title}${t?` by ${t}`:``}${n}`}).join(`
`)}function C(){return f.map(e=>`- ${e.title}${e.subtitle?` — ${e.subtitle}`:``}`).join(`
`)}function w(){return l.map(e=>{let t=[`### ${e.title}`];return t.push(e.description),e.technologies?.length&&t.push(`Tech: ${e.technologies.join(`, `)}`),e.problem&&t.push(`Problem: ${e.problem}`),e.solution&&t.push(`Solution: ${e.solution}`),e.overview&&t.push(`Overview: ${e.overview}`),e.results?.length&&t.push(`Results: ${e.results.join(`; `)}`),e.achievements?.length&&t.push(`Highlights: ${e.achievements.join(`; `)}`),e.liveUrl&&t.push(`Live demo: ${e.liveUrl}`),e.githubUrl&&t.push(`GitHub: ${e.githubUrl}`),t.join(`
`)}).join(`

`)}function T(){return`You are Shagun's AI portfolio assistant. You answer questions about Shagun Tyagi — his work, projects, skills, experience, education, and how to contact him. If someone asks about anything unrelated to Shagun or his professional profile, politely decline and redirect them.

# ABOUT SHAGUN
${g}

# CONTACT & AVAILABILITY
${_}

${v}

# TECHNICAL SKILLS
${y()}

# EXPERIENCE
${b()}

# EDUCATION
${x()}

# CERTIFICATIONS
${S()}

# ACHIEVEMENTS
${C()}

# PROJECTS
${w()}`}var E=n(),D={role:`assistant`,content:`Hi! I'm Shagun's AI assistant. Ask me about his skills, projects, or experience.`},O=[`What are his skills?`,`Tell me about his projects`,`How can I contact him?`],k=()=>{let[e,t]=(0,h.useState)(!1),[n,l]=(0,h.useState)(()=>{try{let e=localStorage.getItem(`chat-messages`);if(e){let t=JSON.parse(e);if(Array.isArray(t)&&t.length)return t}}catch{}return[D]}),[u,d]=(0,h.useState)(``),[f,p]=(0,h.useState)(!1),m=(0,h.useRef)(null),[g,_]=(0,h.useState)(()=>{let e=localStorage.getItem(`theme`);return e?e===`dark`:window.matchMedia(`(prefers-color-scheme: dark)`).matches});(0,h.useEffect)(()=>{let e=()=>{let e=localStorage.getItem(`theme`);_(e?e===`dark`:window.matchMedia(`(prefers-color-scheme: dark)`).matches)};window.addEventListener(`storage`,e);let t=window.matchMedia(`(prefers-color-scheme: dark)`);return t.addEventListener(`change`,e),()=>{window.removeEventListener(`storage`,e),t.removeEventListener(`change`,e)}},[]),(0,h.useEffect)(()=>{try{localStorage.setItem(`chat-messages`,JSON.stringify(n))}catch{}v()},[n]);let v=()=>{m.current&&(m.current.scrollTop=m.current.scrollHeight,setTimeout(()=>{m.current&&(m.current.scrollTop=m.current.scrollHeight)},50))},y=async e=>{let t=(typeof e==`string`?e:u).trim();if(!t||f)return;let r={role:`user`,content:t},i=[...n,r];l(i),d(``),p(!0);try{if(!c.chat.isConfigured())throw Error(`not-configured`);let e=i.filter(e=>!(e.role===`assistant`&&e.content===D.content)),t=await c.chat.complete(e,T());l(e=>[...e,{role:`assistant`,content:t.message}])}catch(e){console.error(`Error sending message:`,e);let t=e.message===`not-configured`?`The AI assistant isn't connected yet. Meanwhile, reach Shagun at theshaguntyagi@gmail.com.`:`Sorry, I'm having trouble connecting right now. Please try again in a moment.`;l(e=>[...e,{role:`assistant`,content:t}])}finally{p(!1)}},b=()=>{if(window.confirm(`Are you sure you want to clear the chat history?`)){l([D]);try{localStorage.removeItem(`chat-messages`)}catch{}}},x=e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),y())};return(0,E.jsx)(`div`,{className:`chat-widget-container`,children:e?(0,E.jsxs)(`div`,{className:`chat-window ${g?`chat-window-dark`:`chat-window-light`}`,children:[(0,E.jsxs)(`div`,{className:`chat-header`,children:[(0,E.jsxs)(`div`,{className:`chat-header-content`,children:[(0,E.jsx)(`div`,{className:`chat-status-indicator`}),(0,E.jsx)(r,{className:`chat-header-icon`,size:20}),(0,E.jsx)(`span`,{className:`chat-header-title`,children:`Chatterbox`})]}),(0,E.jsxs)(`div`,{className:`chat-header-actions`,children:[(0,E.jsx)(`button`,{onClick:b,className:`chat-header-btn`,title:`Clear chat history`,"aria-label":`Clear chat history`,children:(0,E.jsx)(i,{size:18})}),(0,E.jsx)(`button`,{onClick:()=>t(!1),className:`chat-header-btn`,"aria-label":`Close chat`,children:(0,E.jsx)(o,{size:20})})]})]}),(0,E.jsxs)(`div`,{className:`chat-messages`,ref:m,children:[n.map((e,t)=>(0,E.jsx)(`div`,{className:`chat-message ${e.role===`user`?`chat-message-user`:`chat-message-assistant`}`,children:(0,E.jsx)(`div`,{className:`chat-bubble ${e.role===`user`?`chat-bubble-user`:g?`chat-bubble-assistant-dark`:`chat-bubble-assistant-light`}`,children:e.role===`assistant`?(0,E.jsx)(s,{children:e.content}):e.content})},t)),n.length===1&&!f&&(0,E.jsx)(`div`,{className:`chat-suggestions`,children:O.map(e=>(0,E.jsx)(`button`,{type:`button`,className:`chat-suggestion`,onClick:()=>y(e),children:e},e))}),f&&(0,E.jsx)(`div`,{className:`chat-message chat-message-assistant`,children:(0,E.jsx)(`div`,{className:`chat-bubble ${g?`chat-bubble-assistant-dark`:`chat-bubble-assistant-light`}`,children:(0,E.jsxs)(`div`,{className:`typing-indicator`,children:[(0,E.jsx)(`span`,{className:`typing-dot`}),(0,E.jsx)(`span`,{className:`typing-dot`}),(0,E.jsx)(`span`,{className:`typing-dot`})]})})})]}),(0,E.jsxs)(`div`,{className:`chat-input-area ${g?``:`chat-input-area-light`}`,children:[(0,E.jsxs)(`div`,{className:`chat-input-wrapper`,children:[(0,E.jsx)(`input`,{type:`text`,value:u,onChange:e=>d(e.target.value),onKeyDown:x,placeholder:`Ask me anything...`,disabled:f,className:`chat-input ${g?``:`chat-input-light`}`}),(0,E.jsx)(`button`,{onClick:y,disabled:!u.trim()||f,className:`chat-send-btn`,"aria-label":`Send message`,children:(0,E.jsx)(a,{size:20})})]}),(0,E.jsx)(`p`,{className:`chat-footer-text`,children:`Powered by Google Gemini`})]})]}):(0,E.jsxs)(`button`,{onClick:()=>t(!0),className:`chat-float-btn`,"aria-label":`Open AI chat assistant`,children:[(0,E.jsx)(r,{size:28}),(0,E.jsx)(`span`,{className:`chat-float-pulse`}),(0,E.jsx)(`div`,{className:`chat-tooltip`,children:`Chat with Chatterbox`})]})})};export{k as default};