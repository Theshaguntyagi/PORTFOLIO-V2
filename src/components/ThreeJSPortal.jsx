import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "../styles/PreLanding.css";

const COLORS = [0x64b4ff, 0x9b59b6, 0x2ecc71];

const ThreeJSPortal = ({ enterSignal }) => {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pulse = useRef(0);
  const dimension = useRef(0);

  // ripple uniforms ref
  const rippleUniforms = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ================= SCENE ================= */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050012, 0.03);

    /* ================= CAMERA ================= */
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 10;

    /* ================= RENDERER ================= */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    /* ================= LIGHT ================= */
    scene.add(new THREE.AmbientLight(0x6aa9ff, 0.4));
    const light = new THREE.PointLight(0xffffff, 2, 30);
    light.position.set(0, 0, 8);
    scene.add(light);

    /* ================= CORE ================= */
    const coreMat = new THREE.MeshStandardMaterial({
      color: COLORS[0],
      emissive: COLORS[0],
      emissiveIntensity: 1.2,
    });
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 64, 64),
      coreMat
    );
    scene.add(core);

    /* ================= RINGS ================= */
    const rings = COLORS.map((c, i) => {
      const r = new THREE.Mesh(
        new THREE.TorusGeometry(1.6 + i * 0.35, 0.045, 16, 100),
        new THREE.MeshStandardMaterial({
          color: c,
          emissive: c,
          emissiveIntensity: 0.5,
          transparent: true,
          opacity: 0.7,
        })
      );
      r.rotation.set(Math.random(), Math.random(), 0);
      scene.add(r);
      return r;
    });

    /* ================= PARTICLES ================= */
    const pGeo = new THREE.BufferGeometry();
    const pCount = 2600;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pPos.length; i++) {
      pPos[i] = (Math.random() - 0.5) * 40;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: COLORS[0],
        size: 0.08,
        opacity: 0.6,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(particles);

    /* ================= WATER RIPPLE PLANE ================= */
    const rippleGeo = new THREE.PlaneGeometry(20, 20, 1, 1);

    rippleUniforms.current = {
      time: { value: 0 },
      center: { value: new THREE.Vector2(0.5, 0.5) },
      strength: { value: 0 },
    };

    const rippleMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: rippleUniforms.current,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        uniform vec2 center;
        uniform float strength;

        void main() {
          float dist = distance(vUv, center);
          float ripple = sin(20.0 * dist - time * 6.0);
          float mask = smoothstep(0.6, 0.0, dist);
          float alpha = ripple * mask * strength;
          gl_FragColor = vec4(0.5,0.7,1.0, alpha * 0.25);
        }
      `,
    });

    const ripplePlane = new THREE.Mesh(rippleGeo, rippleMat);
    ripplePlane.position.z = 3;
    scene.add(ripplePlane);

    /* ================= MOUSE ================= */
    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ================= CLICK RIPPLE ================= */
    const onClick = (e) => {
      rippleUniforms.current.center.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
      rippleUniforms.current.strength.value = 1;
    };
    window.addEventListener("click", onClick);

    /* ================= ENTER PULSE ================= */
    pulse.current = 1.2;
    dimension.current = (dimension.current + 1) % COLORS.length;

    /* ================= ANIMATE ================= */
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      pulse.current = Math.max(0, pulse.current - 0.03);
      rippleUniforms.current.time.value = t;
      rippleUniforms.current.strength.value *= 0.92;

      const c = COLORS[dimension.current];

      core.material.color.setHex(c);
      core.material.emissive.setHex(c);
      core.scale.setScalar(1 + pulse.current * 0.6 + Math.sin(t * 2) * 0.05);
      core.material.emissiveIntensity = 1.2 + pulse.current * 2;

      rings.forEach((r) => {
        r.material.color.setHex(c);
        r.material.emissive.setHex(c);
        r.rotation.x += 0.002 + pulse.current * 0.05;
        r.rotation.y += 0.003 + pulse.current * 0.05;
      });

      particles.rotation.y += 0.001 + pulse.current * 0.04;

      camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.08;
      camera.position.y += (mouse.current.y * 0.4 - camera.position.y) * 0.08;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [enterSignal]);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />;
};

export default ThreeJSPortal;
