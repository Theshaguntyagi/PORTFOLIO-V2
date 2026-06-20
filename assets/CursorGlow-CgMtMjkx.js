import{c as e,s as t}from"./vendor-motion-DHpA7YRm.js";var n=e(),r=t();function i(){let e=(0,n.useRef)(null);return(0,n.useEffect)(()=>{let t=t=>{e.current&&(e.current.style.background=`radial-gradient(
        600px at ${t.clientX}px ${t.clientY}px,
        rgba(100,180,255,0.15),
        transparent 80%
      )`)};return window.addEventListener(`mousemove`,t),()=>window.removeEventListener(`mousemove`,t)},[]),(0,r.jsx)(`div`,{ref:e,style:{position:`fixed`,inset:0,pointerEvents:`none`,zIndex:5}})}export{i as default};