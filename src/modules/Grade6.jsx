import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/useStore';
import translations from '../locales/translations';

export default function Grade6() {
  const { activeExperiment, grade6Params, resetTrigger, language } = useStore();
  const t = translations[language];
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const brownianRef = useRef(null);
  const magnetsRef = useRef([]);
  const filingsRef = useRef([]);
  const [dragging, setDragging] = useState(null);
  const [droppedObj, setDroppedObj] = useState(null);
  const [dropAnim, setDropAnim] = useState(0);

  useEffect(() => {
    particlesRef.current = [];
    brownianRef.current = null;
    filingsRef.current = [];
    magnetsRef.current = [];
    setDroppedObj(null);
    setDropAnim(0);
  }, [activeExperiment, resetTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    const resize = () => { canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; };
    window.addEventListener('resize', resize);
    resize();
    let time = 0;

    // ======= EXP 1 INIT: States of Matter =======
    if (activeExperiment === 1 && particlesRef.current.length === 0) {
      const cx = canvas.width / 2, cy = canvas.height / 2;
      for (let i = 0; i < 80; i++) {
        particlesRef.current.push({
          x: cx - 90 + (i % 10) * 20, y: cy - 70 + Math.floor(i / 10) * 20,
          vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
          gridX: cx - 90 + (i % 10) * 20, gridY: cy - 70 + Math.floor(i / 10) * 20,
        });
      }
      brownianRef.current = { x: cx, y: cy, vx: 0, vy: 0 };
    }

    // ======= EXP 3 INIT: Magnets =======
    if (activeExperiment === 3 && filingsRef.current.length === 0) {
      magnetsRef.current = [
        { x: canvas.width / 2 - 150, y: canvas.height / 2, angle: 0 },
        { x: canvas.width / 2 + 150, y: canvas.height / 2, angle: Math.PI },
      ];
      for (let i = 0; i < 2500; i++) {
        filingsRef.current.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, angle: 0 });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2;

      if (activeExperiment === 1) {
        // ============ STATES OF MATTER ============
        const temp = grade6Params.matterTemperature;
        const boxW = 300, boxH = 250;
        const bx = cx - boxW / 2, by = cy - boxH / 2;

        // Container
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 3;
        ctx.strokeRect(bx, by, boxW, boxH);

        // State label
        let stateLabel, stateColor;
        if (temp < 0) { stateLabel = language === 'uk' ? 'ТВЕРДЕ ТІЛО' : 'PEVNÁ LÁTKA'; stateColor = '#93c5fd'; }
        else if (temp < 100) { stateLabel = language === 'uk' ? 'РІДИНА' : 'KAPALINA'; stateColor = '#38bdf8'; }
        else { stateLabel = language === 'uk' ? 'ГАЗ' : 'PLYN'; stateColor = '#f87171'; }

        ctx.fillStyle = stateColor;
        ctx.font = 'bold 28px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(stateLabel, cx, by - 20);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px Inter';
        ctx.fillText(`T = ${temp} °C`, cx, by - 50);
        ctx.textAlign = 'left';

        // Update & draw particles
        const speed = temp < 0 ? 0.3 : (temp < 100 ? 1 + temp * 0.03 : 3 + (temp - 100) * 0.01);
        particlesRef.current.forEach(p => {
          if (temp < 0) {
            // Solid: vibrate around grid position
            p.x = p.gridX + (Math.random() - 0.5) * Math.max(1, (temp + 50) * 0.08);
            p.y = p.gridY + (Math.random() - 0.5) * Math.max(1, (temp + 50) * 0.08);
          } else {
            p.vx += (Math.random() - 0.5) * speed * 0.3;
            p.vy += (Math.random() - 0.5) * speed * 0.3;
            const mag = Math.hypot(p.vx, p.vy);
            if (mag > speed) { p.vx = (p.vx / mag) * speed; p.vy = (p.vy / mag) * speed; }
            p.x += p.vx; p.y += p.vy;

            if (temp < 100) {
              // Liquid: keep close to center
              const dx = p.x - cx, dy = p.y - cy;
              if (Math.abs(dx) > boxW * 0.35) p.vx -= dx * 0.005;
              if (dy < -boxH * 0.15) p.vy += 0.3;
              if (dy > boxH * 0.35) p.vy -= 0.1;
            }
            // Walls
            if (p.x < bx + 6) { p.x = bx + 6; p.vx *= -0.8; }
            if (p.x > bx + boxW - 6) { p.x = bx + boxW - 6; p.vx *= -0.8; }
            if (p.y < by + 6) { p.y = by + 6; p.vy *= -0.8; }
            if (p.y > by + boxH - 6) { p.y = by + boxH - 6; p.vy *= -0.8; }
          }

          // Color based on temp
          const tRatio = Math.min(1, Math.max(0, (temp + 50) / 550));
          const r = Math.floor(59 + tRatio * 189);
          const g = Math.floor(130 - tRatio * 80);
          const b2 = Math.floor(246 - tRatio * 200);
          ctx.fillStyle = `rgb(${r},${g},${b2})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill();
        });

        // Brownian particle
        const bp = brownianRef.current;
        if (bp && temp >= 0) {
          particlesRef.current.forEach(p => {
            const dx = bp.x - p.x, dy = bp.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d < 20 && d > 0) {
              bp.vx += (dx / d) * speed * 0.15;
              bp.vy += (dy / d) * speed * 0.15;
            }
          });
          bp.vx *= 0.95; bp.vy *= 0.95;
          bp.x += bp.vx; bp.y += bp.vy;
          if (bp.x < bx + 12) { bp.x = bx + 12; bp.vx *= -1; }
          if (bp.x > bx + boxW - 12) { bp.x = bx + boxW - 12; bp.vx *= -1; }
          if (bp.y < by + 12) { bp.y = by + 12; bp.vy *= -1; }
          if (bp.y > by + boxH - 12) { bp.y = by + boxH - 12; bp.vy *= -1; }

          ctx.fillStyle = '#fde047';
          ctx.shadowBlur = 15; ctx.shadowColor = '#fde047';
          ctx.beginPath(); ctx.arc(bp.x, bp.y, 12, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#fff'; ctx.font = '9px Inter'; ctx.textAlign = 'center';
          ctx.fillText(language === 'uk' ? 'Броун' : 'Brown', bp.x, bp.y + 3);
          ctx.textAlign = 'left';
        }

        // Bonds in solid state
        if (temp < 0) {
          ctx.strokeStyle = 'rgba(147,197,253,0.3)'; ctx.lineWidth = 1;
          particlesRef.current.forEach((p, i) => {
            if (i % 10 < 9) {
              const n = particlesRef.current[i + 1];
              if (n) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(n.x, n.y); ctx.stroke(); }
            }
            if (i + 10 < particlesRef.current.length) {
              const n = particlesRef.current[i + 10];
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(n.x, n.y); ctx.stroke();
            }
          });
        }

      } else if (activeExperiment === 2) {
        // ============ DENSITY & VOLUME ============
        const objects = {
          gold:  { name: language==='uk' ? 'Золоте кільце' : 'Zlatý prsten',  rho: 19300, vol: 5,  mass: 96.5,  color: '#fbbf24', shape: 'ring' },
          wood:  { name: language==='uk' ? "Дерев'яний кубик" : 'Dřevěná kostka', rho: 600,   vol: 27, mass: 16.2,  color: '#a3743a', shape: 'cube' },
          iron:  { name: language==='uk' ? 'Залізна кулька' : 'Železná kulička',  rho: 7874,  vol: 14, mass: 110.2, color: '#94a3b8', shape: 'ball' },
          glass: { name: language==='uk' ? 'Скляна кулька' : 'Skleněná kulička',  rho: 2500,  vol: 18, mass: 45.0,  color: '#a5f3fc', shape: 'ball' },
        };

        // Graduated cylinder
        const cylX = cx - 80, cylY = cy - 150, cylW = 80, cylH = 300;
        const baseWater = 150; // ml
        const addedVol = droppedObj && objects[droppedObj] ? objects[droppedObj].vol : 0;
        const totalVol = baseWater + addedVol;
        const waterH = (totalVol / 250) * cylH;

        // Cylinder body
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cylX, cylY); ctx.lineTo(cylX, cylY + cylH);
        ctx.quadraticCurveTo(cylX, cylY + cylH + 20, cylX + cylW / 2, cylY + cylH + 20);
        ctx.quadraticCurveTo(cylX + cylW, cylY + cylH + 20, cylX + cylW, cylY + cylH);
        ctx.lineTo(cylX + cylW, cylY); ctx.stroke();

        // Markings
        ctx.fillStyle = '#64748b'; ctx.font = '10px Inter'; ctx.textAlign = 'right';
        for (let ml = 0; ml <= 250; ml += 50) {
          const my = cylY + cylH - (ml / 250) * cylH;
          ctx.fillRect(cylX + cylW - 10, my, 10, 1);
          ctx.fillText(`${ml}`, cylX - 5, my + 3);
        }
        ctx.textAlign = 'left';

        // Water
        const waterTop = cylY + cylH - waterH;
        const waterGrad = ctx.createLinearGradient(0, waterTop, 0, cylY + cylH);
        waterGrad.addColorStop(0, 'rgba(56, 189, 248, 0.5)');
        waterGrad.addColorStop(1, 'rgba(30, 64, 175, 0.7)');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(cylX + 2, waterTop, cylW - 4, waterH);

        // Wave on top
        ctx.beginPath(); ctx.moveTo(cylX + 2, waterTop);
        for (let x = cylX + 2; x <= cylX + cylW - 2; x += 3) {
          ctx.lineTo(x, waterTop + Math.sin(x * 0.15 + time * 0.05) * 2);
        }
        ctx.lineTo(cylX + cylW - 2, waterTop + 5);
        ctx.lineTo(cylX + 2, waterTop + 5);
        ctx.closePath(); ctx.fill();

        // Dropped object in water
        if (droppedObj && objects[droppedObj]) {
          const obj = objects[droppedObj];
          const objY = cylY + cylH - 30;
          ctx.fillStyle = obj.color;
          if (obj.shape === 'ring') {
            ctx.beginPath(); ctx.ellipse(cylX + cylW / 2, objY, 15, 8, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.beginPath(); ctx.ellipse(cylX + cylW / 2, objY, 6, 3, 0, 0, Math.PI * 2); ctx.fill();
          } else if (obj.shape === 'cube') {
            ctx.fillRect(cylX + cylW / 2 - 12, objY - 12, 24, 24);
          } else {
            ctx.beginPath(); ctx.arc(cylX + cylW / 2, objY, 10, 0, Math.PI * 2); ctx.fill();
          }
        }

        // Water level indicator
        ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 14px Inter';
        ctx.fillText(`${totalVol} ${language==='uk' ? 'мл' : 'ml'}`, cylX + cylW + 15, waterTop + 4);
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cylX + cylW, waterTop); ctx.lineTo(cylX + cylW + 12, waterTop); ctx.stroke();

        // Scales (right side)
        const scX = cx + 120, scY = cy + 80;
        ctx.fillStyle = '#334155';
        ctx.fillRect(scX - 60, scY, 120, 10);
        ctx.fillRect(scX - 40, scY + 10, 80, 5);
        ctx.fillRect(scX - 20, scY + 15, 40, 30);
        ctx.fillStyle = '#1e293b'; ctx.fillRect(scX - 55, scY - 5, 110, 8);

        // Display on scale
        ctx.fillStyle = '#22c55e'; ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        const dispMass = droppedObj && objects[droppedObj] ? objects[droppedObj].mass : 0;
        ctx.fillText(`${dispMass.toFixed(1)} ${language==='uk' ? 'г' : 'g'}`, scX, scY - 15);
        ctx.textAlign = 'left';

        // Object on scale platform
        if (droppedObj && objects[droppedObj]) {
          const obj = objects[droppedObj];
          ctx.fillStyle = obj.color;
          if (obj.shape === 'ring') {
            ctx.beginPath(); ctx.ellipse(scX, scY - 30, 15, 8, 0, 0, Math.PI * 2); ctx.fill();
          } else if (obj.shape === 'cube') {
            ctx.fillRect(scX - 12, scY - 42, 24, 24);
          } else {
            ctx.beginPath(); ctx.arc(scX, scY - 32, 10, 0, Math.PI * 2); ctx.fill();
          }
        }

        // Object selection buttons
        ctx.textAlign = 'center';
        const btnY = cy - 160;
        ['gold', 'wood', 'iron', 'glass'].forEach((key, i) => {
          const obj = objects[key];
          const btnX = cx - 150 + i * 100;
          const isSelected = droppedObj === key;
          ctx.fillStyle = isSelected ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.08)';
          ctx.strokeStyle = isSelected ? '#38bdf8' : 'rgba(255,255,255,0.15)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(btnX - 40, btnY - 20, 80, 40, 10);
          ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#fff'; ctx.font = '11px Inter';
          ctx.fillText(obj.name, btnX, btnY + 3);
        });

        // Results panel
        if (droppedObj && objects[droppedObj]) {
          const obj = objects[droppedObj];
          const pX = cx + 100, pY = cy - 100;
          ctx.fillStyle = 'rgba(0,0,0,0.5)';
          ctx.beginPath(); ctx.roundRect(pX - 10, pY, 200, 130, 12); ctx.fill();
          ctx.fillStyle = '#fff'; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'left';
          ctx.fillText(obj.name, pX + 5, pY + 25);
          ctx.font = '13px Inter'; ctx.fillStyle = '#94a3b8';
          ctx.fillText(`m = ${obj.mass} ${language==='uk' ? 'г' : 'g'}`, pX + 5, pY + 50);
          ctx.fillText(`V = ${obj.vol} ${language==='uk' ? 'мл' : 'ml'} = ${obj.vol} ${language==='uk' ? 'см³' : 'cm³'}`, pX + 5, pY + 70);
          ctx.fillStyle = '#fde047'; ctx.font = 'bold 16px Inter';
          ctx.fillText(`\u03C1 = ${(obj.mass / obj.vol * 1000).toFixed(0)} ${language==='uk' ? 'кг/м³' : 'kg/m\u00B3'}`, pX + 5, pY + 100);
          ctx.fillStyle = '#64748b'; ctx.font = '11px Inter';
          ctx.fillText(`(${obj.rho} ${language==='uk' ? 'кг/м³' : 'kg/m\u00B3'})`, pX + 5, pY + 118);
        }
        ctx.textAlign = 'left';

      } else if (activeExperiment === 3) {
        // ============ MAGNETIC PROPERTIES ============
        const mags = magnetsRef.current;
        if (mags.length < 2) { time++; animationId = requestAnimationFrame(render); return; }

        // Update filings orientation
        filingsRef.current.forEach(f => {
          let bx2 = 0, by2 = 0;
          mags.forEach(mag => {
            const cosA = Math.cos(mag.angle), sinA = Math.sin(mag.angle);
            const dx = f.x - mag.x, dy = f.y - mag.y;
            const r2 = dx * dx + dy * dy;
            const r = Math.sqrt(r2);
            if (r < 30) return;
            const mDotR = dx * cosA + dy * sinA;
            const weight = 1000 / (r2 * r);
            bx2 += ((3 * dx * mDotR) / r2 - cosA) * weight;
            by2 += ((3 * dy * mDotR) / r2 - sinA) * weight;
          });
          if (Math.abs(bx2) > 0.001 || Math.abs(by2) > 0.001) {
            const target = Math.atan2(by2, bx2);
            f.angle += (target - f.angle) * 0.15;
          }
        });

        // Draw filings
        filingsRef.current.forEach(f => {
          let maxI = 0;
          mags.forEach(mag => {
            const d = Math.hypot(f.x - mag.x, f.y - mag.y);
            const intensity = Math.min(1, 3000 / (d * d));
            if (intensity > maxI) maxI = intensity;
          });
          ctx.strokeStyle = `rgba(203, 213, 225, ${maxI * 0.7 + 0.05})`;
          ctx.lineWidth = 1.5;
          const len = 6;
          ctx.beginPath();
          ctx.moveTo(f.x - Math.cos(f.angle) * len, f.y - Math.sin(f.angle) * len);
          ctx.lineTo(f.x + Math.cos(f.angle) * len, f.y + Math.sin(f.angle) * len);
          ctx.stroke();
        });

        // Draw magnets
        mags.forEach(mag => {
          ctx.save();
          ctx.translate(mag.x, mag.y);
          ctx.rotate(mag.angle);
          const mW = 100, mH = 30;
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(0, -mH / 2, mW / 2, mH);
          ctx.fillStyle = '#3b82f6';
          ctx.fillRect(-mW / 2, -mH / 2, mW / 2, mH);
          ctx.fillStyle = '#fff'; ctx.font = 'bold 16px Inter'; ctx.textAlign = 'center';
          ctx.fillText('N', mW / 4, 5);
          ctx.fillText('S', -mW / 4, 5);
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
          ctx.strokeRect(-mW / 2, -mH / 2, mW, mH);
          ctx.restore();
        });
        ctx.textAlign = 'left';
      }

      time++;
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationId); };
  }, [activeExperiment, grade6Params, resetTrigger, droppedObj, language]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const cx = canvasRef.current.width / 2, cy = canvasRef.current.height / 2;

    if (activeExperiment === 2) {
      // Object selection buttons
      const btnY = cy - 160;
      ['gold', 'wood', 'iron', 'glass'].forEach((key, i) => {
        const btnX = cx - 150 + i * 100;
        if (mx > btnX - 40 && mx < btnX + 40 && my > btnY - 20 && my < btnY + 20) {
          setDroppedObj(prev => prev === key ? null : key);
        }
      });
    }
    if (activeExperiment === 3) {
      magnetsRef.current.forEach((mag, i) => {
        if (Math.abs(mx - mag.x) < 50 && Math.abs(my - mag.y) < 20) setDragging(i);
      });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging === null || activeExperiment !== 3) return;
    const rect = canvasRef.current.getBoundingClientRect();
    magnetsRef.current[dragging].x = e.clientX - rect.left;
    magnetsRef.current[dragging].y = e.clientY - rect.top;
  };

  const handleMouseUp = () => setDragging(null);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)' }}>
      <canvas ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', cursor: dragging !== null ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
