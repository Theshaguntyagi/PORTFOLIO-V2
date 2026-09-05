const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/three.module-DJEeLZ9k.js","assets/vendor-three-BYc2EzOG.js"])))=>i.map(i=>d[i]);
import{c as e,s as t}from"./vendor-motion-DHpA7YRm.js";import{l as n}from"./vendor-react-BI5ByEiH.js";var r=e(),i=t();function a({className:e=``}){let t=(0,r.useRef)(null),[a,o]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let e=t.current;if(!e)return;let r=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,i=window.matchMedia(`(pointer: coarse)`).matches,a=window.innerWidth<768;if(r||i||a){o(!0);return}let s=!1,c=()=>{},l=async()=>{let t;try{t=await n(()=>import(`./three.module-DJEeLZ9k.js`),__vite__mapDeps([0,1]))}catch{s||o(!0);return}if(s)return;let r=new t.WebGLRenderer({antialias:!0,alpha:!0,powerPreference:`high-performance`});r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.setSize(e.clientWidth,e.clientHeight),e.appendChild(r.domElement);let i=new t.Scene,a=new t.PerspectiveCamera(45,e.clientWidth/e.clientHeight,.1,100);a.position.z=3.2;let l={uTime:{value:0},uPointer:{value:new t.Vector2(0,0)},uAmp:{value:.22}},u=new t.IcosahedronGeometry(1,64),d=new t.ShaderMaterial({uniforms:l,transparent:!0,vertexShader:`
          uniform float uTime;
          uniform vec2  uPointer;
          uniform float uAmp;

          varying vec3 vNormalW;
          varying vec3 vViewDir;
          varying float vNoise;

          // Ashima simplex noise (3D)
          vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
          vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
          vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
          vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

          float snoise(vec3 v){
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
                       i.z + vec4(0.0, i1.z, i2.z, 1.0))
                     + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                     + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
          }

          void main() {
            float t = uTime * 0.18;
            float n = snoise(normal * 1.6 + vec3(t, t * 0.7, -t));
            // pointer pulls the surface toward the cursor rather than
            // rotating the whole mesh — reads as material, not as a toy
            float pull = dot(normalize(normal.xy), uPointer) * 0.09;
            float disp = n * uAmp + pull;

            vec3 pos = position + normal * disp;
            vNoise = n;
            vNormalW = normalize(normalMatrix * normal);

            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            vViewDir = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,fragmentShader:`
          precision highp float;

          varying vec3 vNormalW;
          varying vec3 vViewDir;
          varying float vNoise;

          uniform float uTime;

          // Iridescent ramp sampled by fresnel term. Deep indigo core,
          // violet mid, cyan rim — matches the site's dark palette instead
          // of the usual full-spectrum rainbow.
          vec3 ramp(float t) {
            vec3 a = vec3(0.055, 0.078, 0.157); // #0e1428
            vec3 b = vec3(0.298, 0.157, 0.671); // #4c28ab
            vec3 c = vec3(0.659, 0.333, 0.969); // #a855f7
            vec3 d = vec3(0.352, 0.831, 0.933); // #5ad4ee

            vec3 col = mix(a, b, smoothstep(0.0, 0.42, t));
            col = mix(col, c, smoothstep(0.38, 0.76, t));
            col = mix(col, d, smoothstep(0.74, 1.0, t));
            return col;
          }

          void main() {
            float fres = 1.0 - clamp(dot(normalize(vNormalW), normalize(vViewDir)), 0.0, 1.0);
            float shift = fres + vNoise * 0.22 + sin(uTime * 0.35) * 0.04;

            vec3 col = ramp(clamp(shift, 0.0, 1.0));
            col += pow(fres, 4.0) * 0.5;

            float alpha = 0.30 + pow(fres, 1.7) * 0.70;
            gl_FragColor = vec4(col, alpha);
          }
        `}),f=new t.Mesh(u,d);i.add(f);let p={x:0,y:0,tx:0,ty:0},m=e=>{p.tx=e.clientX/window.innerWidth*2-1,p.ty=-(e.clientY/window.innerHeight*2-1)};window.addEventListener(`pointermove`,m,{passive:!0});let h=!0,g=!document.hidden,_=0,v=new IntersectionObserver(([e])=>{h=e.isIntersecting,w()},{threshold:0});v.observe(e);let y=()=>{g=!document.hidden,w()};document.addEventListener(`visibilitychange`,y);let b=new ResizeObserver(()=>{let t=e.clientWidth,n=e.clientHeight;!t||!n||(a.aspect=t/n,a.updateProjectionMatrix(),r.setSize(t,n))});b.observe(e);let x=e=>{e.preventDefault(),cancelAnimationFrame(_),_=0,o(!0)};r.domElement.addEventListener(`webglcontextlost`,x);let S=new t.Clock,C=()=>{_=requestAnimationFrame(C);let e=S.getElapsedTime();l.uTime.value=e,p.x+=(p.tx-p.x)*.045,p.y+=(p.ty-p.y)*.045,l.uPointer.value.set(p.x,p.y),f.rotation.y=e*.08+p.x*.18,f.rotation.x=p.y*.12,r.render(i,a)};function w(){let e=h&&g;e&&!_?(S.start(),_=requestAnimationFrame(C)):!e&&_&&(cancelAnimationFrame(_),_=0)}w(),e.dataset.ready=`true`,c=()=>{cancelAnimationFrame(_),v.disconnect(),b.disconnect(),document.removeEventListener(`visibilitychange`,y),window.removeEventListener(`pointermove`,m),r.domElement.removeEventListener(`webglcontextlost`,x),u.dispose(),d.dispose(),r.dispose(),r.domElement.parentNode===e&&e.removeChild(r.domElement)}},u=window.requestIdleCallback||(e=>window.setTimeout(e,900)),d=window.cancelIdleCallback||window.clearTimeout,f=u(l,{timeout:2500});return()=>{s=!0;try{d(f)}catch{}c()}},[]),(0,i.jsx)(`div`,{ref:t,className:`hero-canvas ${a?`is-fallback`:``} ${e}`.trim(),"aria-hidden":`true`})}export{a as default};