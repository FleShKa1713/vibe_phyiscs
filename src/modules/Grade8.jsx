import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/useStore';

export default function Grade8() {
  const { activeExperiment, grade8Params, resetTrigger } = useStore();
  const canvasRef = useRef(null);
  
  const [dragging, setDragging] = useState(null);
  const [batPos, setBatPos] = useState({ x: -200, y: -40 });
  const [resPos, setResPos] = useState({ x: -50, y: -130 });

  // Дослід 3 (Атоми)
  const atomsRef = useRef(null);
  const magnetPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setBatPos({ x: -200, y: -40 });
    setResPos({ x: -50, y: -130 });
    atomsRef.current = null; // Скидаємо стан атомів
  }, [activeExperiment, resetTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeExperiment === 1) {
        // Blueprint background
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 30) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
        for (let i = 0; i < canvas.height; i += 30) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const current = grade8Params.circuitVoltage / grade8Params.circuitResistance;
        
        // Дроти
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 6;
        ctx.strokeRect(cx - 180, cy - 120, 360, 240);

        // Батарейка (збільшена)
        const bx = cx + batPos.x, by = cy + batPos.y;
        const batGrad = ctx.createLinearGradient(bx, by, bx + 50, by);
        batGrad.addColorStop(0, '#1e293b'); batGrad.addColorStop(1, '#334155');
        ctx.fillStyle = batGrad;
        ctx.shadowBlur = 10; ctx.shadowColor = '#000';
        ctx.fillRect(bx, by, 50, 75);
        ctx.fillStyle = '#ef4444'; ctx.fillRect(bx, by - 12, 50, 12);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff'; ctx.font = 'bold 16px Inter'; ctx.fillText(`${grade8Params.circuitVoltage}В`, bx - 50, by + 40);

        // Резистор (збільшений)
        const rx = cx + resPos.x, ry = cy + resPos.y;
        const resGrad = ctx.createLinearGradient(rx, ry, rx, ry + 25);
        resGrad.addColorStop(0, '#f59e0b'); resGrad.addColorStop(1, '#b45309');
        ctx.fillStyle = resGrad;
        ctx.fillRect(rx, ry, 100, 25);
        ctx.fillStyle = '#111'; ctx.fillRect(rx + 20, ry, 6, 25); ctx.fillRect(rx + 50, ry, 6, 25); ctx.fillRect(rx + 75, ry, 6, 25);
        ctx.fillStyle = '#fff'; ctx.font = '15px Inter'; ctx.fillText(`${grade8Params.circuitResistance}Ом`, rx + 20, ry - 10);

        // Лампочка (збільшена)
        const lx = cx + 180, ly = cy;
        const brightness = Math.min(current * 50, 255);
        
        // Цоколь
        ctx.fillStyle = '#64748b';
        ctx.fillRect(lx - 10, ly + 22, 20, 15);
        ctx.fillStyle = '#475569';
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(lx - 12, ly + 25 + i * 5, 24, 3);
        }
        
        // Колба
        ctx.beginPath();
        ctx.moveTo(lx - 10, ly + 22);
        ctx.bezierCurveTo(lx - 35, ly + 12, lx - 35, ly - 35, lx, ly - 40);
        ctx.bezierCurveTo(lx + 35, ly - 35, lx + 35, ly + 12, lx + 10, ly + 22);
        ctx.closePath();
        
        const bulbGrad = ctx.createRadialGradient(lx, ly - 5, 5, lx, ly - 5, 40);
        bulbGrad.addColorStop(0, `rgba(253, 224, 71, ${brightness / 200})`);
        bulbGrad.addColorStop(0.6, `rgba(253, 224, 71, ${brightness / 400})`);
        bulbGrad.addColorStop(1, `rgba(200, 200, 200, 0.15)`);
        ctx.fillStyle = bulbGrad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 2; ctx.stroke();
        
        // Світіння
        if (brightness > 20) {
          ctx.shadowBlur = brightness * 1.2; ctx.shadowColor = '#fde047';
          ctx.beginPath(); ctx.arc(lx, ly - 5, 35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253, 224, 71, ${brightness / 600})`; ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        // Нитка
        ctx.strokeStyle = brightness > 30 ? `rgba(255, 200, 50, ${brightness / 200})` : '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(lx - 6, ly + 22);
        ctx.lineTo(lx - 5, ly); ctx.lineTo(lx, ly + 10); ctx.lineTo(lx + 5, ly); ctx.lineTo(lx + 6, ly + 22);
        ctx.stroke();

        // Електрони
        if (current > 0) {
          ctx.fillStyle = '#3b82f6';
          const speed = current * 2.5;
          for (let e = 0; e < 4; e++) {
            const pos = ((time * speed + e * 300) % 1200);
            let ex, ey;
            if (pos < 360) { ex = cx - 180 + pos; ey = cy - 120; }
            else if (pos < 600) { ex = cx + 180; ey = cy - 120 + (pos - 360); }
            else if (pos < 960) { ex = cx + 180 - (pos - 600); ey = cy + 120; }
            else { ex = cx - 180; ey = cy + 120 - (pos - 960); }
            ctx.shadowBlur = 8; ctx.shadowColor = '#3b82f6';
            ctx.beginPath(); ctx.arc(ex, ey, 6, 0, Math.PI * 2); ctx.fill();
          }
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = '#3b82f6'; ctx.font = 'bold 20px Inter';
        ctx.fillText(`I = ${current.toFixed(2)} А`, cx - 60, cy + 10);

      } else if (activeExperiment === 2) {
        // Дослід 2: Агрегатні стани
        const cx = canvas.width / 2;
        const cy = canvas.height / 2 + 50;

        const energy = grade8Params.thermalEnergy;
        let temp = -20; let state = 'лід';
        
        if (energy < 200) { temp = -20 + (energy / 200) * 20; state = 'лід'; }
        else if (energy < 400) { temp = 0; state = 'плавлення'; }
        else if (energy < 700) { temp = 0 + ((energy - 400) / 300) * 100; state = 'вода'; }
        else if (energy < 900) { temp = 100; state = 'кипіння'; }
        else { temp = 100 + ((energy - 900) / 100) * 50; state = 'пара'; }

        // Пальник (збільшений)
        if (energy > 0) {
          for (let i = 0; i < 9; i++) {
            const h = 25 + Math.random() * 35 * (energy / 1000);
            const fx = cx - 40 + i * 10;
            const sway = Math.sin(time * 0.5 + i) * 6;
            ctx.fillStyle = `rgba(249, 115, 22, ${0.5 + Math.random() * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(fx, cy + 85);
            ctx.quadraticCurveTo(fx + sway, cy + 85 - h * 0.6, fx + 4 + sway, cy + 85 - h);
            ctx.quadraticCurveTo(fx + 8 + sway, cy + 85 - h * 0.6, fx + 8, cy + 85);
            ctx.fill();
          }
          ctx.fillStyle = '#475569';
          ctx.fillRect(cx - 50, cy + 85, 100, 8);
        }

        // Колба (збільшена)
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - 55, cy - 110);
        ctx.lineTo(cx - 55, cy + 25);
        ctx.quadraticCurveTo(cx - 55, cy + 75, cx, cy + 75);
        ctx.quadraticCurveTo(cx + 55, cy + 75, cx + 55, cy + 25);
        ctx.lineTo(cx + 55, cy - 110);
        ctx.stroke();

        // Вміст — кліпуємо всередині ємності
        const fillTop = cy - 30;
        const fillLeft = cx - 52;
        const fillRight = cx + 52;
        const fillW = fillRight - fillLeft;

        // Шлях ємності для кліпування (повторює форму колби)
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx - 52, cy - 110);
        ctx.lineTo(cx - 52, cy + 25);
        ctx.quadraticCurveTo(cx - 52, cy + 72, cx, cy + 72);
        ctx.quadraticCurveTo(cx + 52, cy + 72, cx + 52, cy + 25);
        ctx.lineTo(cx + 52, cy - 110);
        ctx.closePath();
        ctx.clip();

        // Дно колби (заповнене) — тепер всередині кліпу
        const fillBottom = cy + 72;
        const fillH = fillBottom - fillTop;

        // Вода
        if (state !== 'лід') {
          const r = Math.min(200, Math.max(30, (temp / 100) * 200));
          const b = Math.max(50, 246 - (temp / 100) * 150);
          const waterGrad = ctx.createLinearGradient(0, fillTop, 0, fillBottom);
          waterGrad.addColorStop(0, `rgba(${r}, 130, ${b}, 0.5)`);
          waterGrad.addColorStop(1, `rgba(${r}, 64, ${b}, 0.85)`);
          ctx.fillStyle = waterGrad;
          ctx.fillRect(fillLeft, fillTop, fillW, fillH);

          const waveAmp = state === 'кипіння' ? 6 : 2;
          ctx.beginPath(); ctx.moveTo(fillLeft, fillTop);
          for (let x = fillLeft; x <= fillRight; x += 5) {
            ctx.lineTo(x, fillTop + Math.sin(x * 0.15 + time * 0.1) * waveAmp);
          }
          ctx.lineTo(fillRight, fillBottom); ctx.lineTo(fillLeft, fillBottom); ctx.closePath();
          ctx.fill();
        }

        // Кубики льоду
        if (state === 'лід' || state === 'плавлення') {
          ctx.fillStyle = 'rgba(147, 197, 253, 0.9)';
          ctx.strokeStyle = 'rgba(255,255,255,0.4)';
          ctx.lineWidth = 2;
          const maxS = 30;
          const iceS = state === 'лід' ? maxS : maxS * (1 - (energy - 200) / 200);
          
          if (iceS > 4) {
            const centerY = (fillTop + fillBottom) / 2;
            const positions = [
              { x: cx - 20, y: centerY - iceS * 0.5 },
              { x: cx + 10, y: centerY - iceS * 0.3 },
              { x: cx - 5, y: centerY + iceS * 0.2 }
            ];
            positions.forEach(pos => {
              ctx.beginPath();
              ctx.rect(pos.x - iceS / 2, pos.y - iceS / 2, iceS, iceS);
              ctx.fill(); ctx.stroke();
              ctx.fillStyle = 'rgba(255,255,255,0.3)';
              ctx.fillRect(pos.x - iceS / 2 + 3, pos.y - iceS / 2 + 3, iceS / 3, iceS / 3);
              ctx.fillStyle = 'rgba(147, 197, 253, 0.9)';
            });
          }
        }

        // Бульбашки
        if ((state === 'вода' && temp > 80) || state === 'кипіння') {
          const numB = state === 'кипіння' ? 20 : 6;
          ctx.fillStyle = 'rgba(255,255,255,0.5)';
          for (let i = 0; i < numB; i++) {
            const bx = fillLeft + 8 + (i * 137 % (fillW - 16));
            const by = fillBottom - ((time * (1.5 + (i % 3) * 0.5)) % (fillH));
            if (by > fillTop) {
              ctx.beginPath(); ctx.arc(bx, by + Math.sin(time * 0.1 + i) * 3, 3 + i % 3, 0, Math.PI * 2); ctx.fill();
            }
          }
        }

        // Зняти кліп ємності для пари та термометра
        ctx.restore();

        // Пара
        if (state === 'пара' || state === 'кипіння' || (state === 'вода' && temp > 70)) {
          const numS = state === 'пара' ? 35 : (state === 'кипіння' ? 18 : 6);
          for (let i = 0; i < numS; i++) {
            const px = cx - 40 + (i * 97 % 80) + Math.sin(time * 0.04 + i) * 20;
            const py = cy - 50 - ((time * (1 + i % 2 * 0.5)) % 160);
            const size = 10 + Math.abs(cy - 50 - py) * 0.1;
            const alpha = Math.max(0, 0.25 - Math.abs(cy - 50 - py) * 0.002);
            ctx.fillStyle = `rgba(203, 213, 225, ${alpha})`;
            ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2); ctx.fill();
          }
        }

        // Термометр
        const thX = cx + 90;
        ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(thX, cy - 120, 10, 200);
        ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.strokeRect(thX, cy - 120, 10, 200);
        ctx.fillStyle = '#ef4444';
        const tHeight = Math.max(0, (temp + 20) / 170 * 200);
        ctx.fillRect(thX, cy + 80 - tHeight, 10, tHeight);
        ctx.beginPath(); ctx.arc(thX + 5, cy + 80, 10, 0, Math.PI * 2); ctx.fill();
        
        ctx.fillStyle = '#94a3b8'; ctx.font = '12px Inter';
        ctx.fillText('100°', thX + 20, cy - 110);
        ctx.fillText('0°', thX + 20, cy - 10);
        ctx.fillText('-20°', thX + 20, cy + 85);

        ctx.fillStyle = '#fff'; ctx.font = 'bold 18px Inter';
        ctx.fillText(`${temp.toFixed(0)} °C`, cx - 140, cy + 100);
      } else if (activeExperiment === 3) {
        // Дослід 3: Теплопровідність
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Ініціалізація атомів
        if (!atomsRef.current) {
          atomsRef.current = Array.from({length: 40}, (_, i) => ({
            baseX: cx - 200 + i * 10,
            baseY: cy,
            temp: 0
          }));
        }

        const sourceTemp = grade8Params.heatSourceTemp || 0;
        const atoms = atomsRef.current;
        const mat = grade8Params.thermalMaterial || 'copper';
        let alpha = 0.05;
        if (mat === 'copper') alpha = 0.1;
        else if (mat === 'iron') alpha = 0.02;
        else if (mat === 'glass') alpha = 0.005;
        else if (mat === 'wood') alpha = 0.001;

        // Оновлення температур (рівняння теплопровідності)
        atoms[0].temp = sourceTemp; // Лівий кінець
        for (let i = 1; i < atoms.length - 1; i++) {
          atoms[i].temp += (atoms[i-1].temp + atoms[i+1].temp - 2 * atoms[i].temp) * alpha;
        }
        atoms[atoms.length - 1].temp += (atoms[atoms.length - 2].temp - atoms[atoms.length - 1].temp) * alpha;
        
        // Охолодження середовищем
        for (let i = 1; i < atoms.length; i++) {
          atoms[i].temp *= 0.999;
        }

        // Відмальовка
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Вогонь зліва
        if (sourceTemp > 0) {
          const fx = cx - 220;
          for (let i = 0; i < 5; i++) {
            const h = 20 + Math.random() * 40 * (sourceTemp / 100);
            const sway = Math.sin(time * 0.5 + i) * 10;
            ctx.fillStyle = `rgba(249, 115, 22, ${0.5 + Math.random() * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(fx - 10 + i * 8, cy + 20);
            ctx.quadraticCurveTo(fx + sway, cy + 20 - h * 0.6, fx - 5 + i*8 + sway, cy + 20 - h);
            ctx.quadraticCurveTo(fx + 5 + i*8 + sway, cy + 20 - h * 0.6, fx + i*8, cy + 20);
            ctx.fill();
          }
        }

        // Малювання атомів
        for (let i = 0; i < atoms.length; i++) {
          const a = atoms[i];
          const tRatio = Math.min(1, Math.max(0, a.temp / 100));
          
          // Колір: синій (0) -> червоний (100)
          const r = Math.floor(59 + tRatio * (239 - 59));
          const g = Math.floor(130 - tRatio * 86);
          const b = Math.floor(246 - tRatio * 202);
          
          // Вібрація (Броунівський рух)
          const vibX = (Math.random() - 0.5) * tRatio * 8;
          const vibY = (Math.random() - 0.5) * tRatio * 8;

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.beginPath();
          ctx.arc(a.baseX + vibX, a.baseY + vibY, 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Термометри та значення
        ctx.fillStyle = '#fff';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        
        const tLeft = atoms[0].temp.toFixed(1);
        const tMid = atoms[Math.floor(atoms.length / 2)].temp.toFixed(1);
        const tRight = atoms[atoms.length - 1].temp.toFixed(1);

        ctx.fillText(`T₁ = ${tLeft}°C`, cx - 200, cy - 30);
        ctx.fillText(`T₂ = ${tMid}°C`, cx, cy - 30);
        ctx.fillText(`T₃ = ${tRight}°C`, cx + 190, cy - 30);

        // Вказівки
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath(); ctx.moveTo(cx - 200, cy - 25); ctx.lineTo(cx - 200, cy - 10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy - 25); ctx.lineTo(cx, cy - 10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + 190, cy - 25); ctx.lineTo(cx + 190, cy - 10); ctx.stroke();

        // Графік температури нижче
        const gx = cx - 200;
        const gy = cy + 100;
        const gW = 400;
        const gH = 100;

        ctx.strokeStyle = '#334155';
        ctx.strokeRect(gx, gy, gW, gH);
        
        ctx.beginPath();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        for (let i = 0; i < atoms.length; i++) {
          const px = gx + (i / (atoms.length - 1)) * gW;
          const py = gy + gH - (atoms[i].temp / 100) * gH;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '12px Inter';
        ctx.fillText('Графік розподілу температури вздовж стрижня', gx, gy - 10);

      } else if (activeExperiment === 4) {
        const magnets = [];
        const count = grade8Params.magnetCount || 1;
        const baseAngle = grade8Params.magnetAngle || 0;
        
        // Генеруємо позиції для кількох магнітів
        for (let i = 0; i < count; i++) {
          if (i === 0) {
            magnets.push({
              x: canvas.width / 2 + magnetPosRef.current.x,
              y: canvas.height / 2 + magnetPosRef.current.y,
              angleDeg: baseAngle
            });
          } else {
            // Інші магніти просто зміщені, якщо не перетягнуті (ми поки не підтримуємо незалежне перетягування для простоти, або можна просто розмістити їх симетрично)
            magnets.push({
              x: canvas.width / 2 + magnetPosRef.current.x + i * 150 - 75,
              y: canvas.height / 2 + magnetPosRef.current.y + (i%2===0? 80 : -80),
              angleDeg: baseAngle + i * 45
            });
          }
        }

        // Малюємо ошурки (сітка векторів)
        ctx.lineWidth = 1.5;
        const step = 30;
        for (let x = 0; x <= canvas.width; x += step) {
          for (let y = 0; y <= canvas.height; y += step) {
            let sumBx = 0;
            let sumBy = 0;
            let maxIntensity = 0;

            for (const mag of magnets) {
              const alpha = mag.angleDeg * Math.PI / 180;
              const cosA = Math.cos(alpha);
              const sinA = Math.sin(alpha);
              const dx = x - mag.x;
              const dy = y - mag.y;
              const r2 = dx * dx + dy * dy;
              const r = Math.sqrt(r2);
              
              if (r < 40) continue; // Уникаємо центру магніту

              const mDotR = dx * cosA + dy * sinA;
              const Bx = (3 * dx * mDotR) / r2 - cosA;
              const By = (3 * dy * mDotR) / r2 - sinA;

              // Сумуємо поля (обернено пропорційно кубу відстані)
              const weight = 1000 / (r2 * r);
              sumBx += Bx * weight;
              sumBy += By * weight;
              
              const intensity = Math.min(1, 4000 / r2);
              if (intensity > maxIntensity) maxIntensity = intensity;
            }

            const bMag = Math.sqrt(sumBx * sumBx + sumBy * sumBy);
            if (bMag > 0) {
              sumBx /= bMag;
              sumBy /= bMag;
            }

            // Колір залежить від відстані
            ctx.strokeStyle = `rgba(203, 213, 225, ${maxIntensity * 0.8 + 0.1})`;
            
            const len = 10;
            ctx.beginPath();
            ctx.moveTo(x - sumBx * len/2, y - sumBy * len/2);
            ctx.lineTo(x + sumBx * len/2, y + sumBy * len/2);
            ctx.stroke();

            // Стрілочка
            const headAngle = Math.atan2(sumBy, sumBx);
            ctx.beginPath();
            ctx.moveTo(x + sumBx * len/2, y + sumBy * len/2);
            ctx.lineTo(x + sumBx * len/2 - 4 * Math.cos(headAngle - 0.5), y + sumBy * len/2 - 4 * Math.sin(headAngle - 0.5));
            ctx.lineTo(x + sumBx * len/2 - 4 * Math.cos(headAngle + 0.5), y + sumBy * len/2 - 4 * Math.sin(headAngle + 0.5));
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fill();
          }
        }

        // Магніти
        for (const mag of magnets) {
          ctx.save();
          ctx.translate(mag.x, mag.y);
          ctx.rotate(mag.angleDeg * Math.PI / 180);

          const mWidth = 100;
          const mHeight = 30;

          // Північний (N) - червоний
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(0, -mHeight/2, mWidth/2, mHeight);
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 16px Inter';
          ctx.fillText('N', mWidth/4, 5);

          // Південний (S) - синій
          ctx.fillStyle = '#3b82f6';
          ctx.fillRect(-mWidth/2, -mHeight/2, mWidth/2, mHeight);
          ctx.fillStyle = '#fff';
          ctx.fillText('S', -mWidth/4, 5);
          
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
          ctx.strokeRect(-mWidth/2, -mHeight/2, mWidth, mHeight);
          ctx.restore();
        }
      }

      time++;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [activeExperiment, grade8Params, resetTrigger, batPos, resPos, dragging]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = canvasRef.current.width / 2;
    const cy = canvasRef.current.height / 2;

    if (activeExperiment === 1) {
      const bx = cx + batPos.x, by = cy + batPos.y;
      if (mx > bx && mx < bx + 50 && my > by - 12 && my < by + 75) setDragging('battery');

      const rx = cx + resPos.x, ry = cy + resPos.y;
      if (mx > rx && mx < rx + 100 && my > ry && my < ry + 25) setDragging('resistor');
    } else if (activeExperiment === 4) {
      const magX = cx + magnetPosRef.current.x;
      const magY = cy + magnetPosRef.current.y;
      if (Math.abs(mx - magX) < 50 && Math.abs(my - magY) < 15) setDragging('magnet');
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const cx = canvasRef.current.width / 2;
    const cy = canvasRef.current.height / 2;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (activeExperiment === 1) {
      if (dragging === 'battery') setBatPos({ x: mx - cx - 25, y: my - cy - 37 });
      else if (dragging === 'resistor') setResPos({ x: mx - cx - 50, y: my - cy - 12 });
    } else if (activeExperiment === 4 && dragging === 'magnet') {
      magnetPosRef.current = { x: mx - cx, y: my - cy };
    }
  };

  const handleMouseUp = () => setDragging(null);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: activeExperiment === 1 ? '#0f172a' : 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)' }}>
      <canvas ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block', cursor: dragging ? 'grabbing' : 'grab' }} 
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
