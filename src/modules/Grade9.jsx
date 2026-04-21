import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/useStore';

export default function Grade9() {
  const { activeExperiment, grade9Params, showVectors, resetTrigger } = useStore();
  const canvasRef = useRef(null);

  const [laserPos, setLaserPos] = useState({ x: 100, y: 350, angle: 0 });
  const [lensPos, setLensPos] = useState({ x: 500, y: 200, width: 60, height: 300 });
  const [lensAngle, setLensAngle] = useState(0);
  const [waveGenY, setWaveGenY] = useState(null);
  const [draggingItem, setDraggingItem] = useState(null);

  useEffect(() => {
    setWaveGenY(null);
    setLensAngle(0);
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

    const effectiveWaveGenY = waveGenY ?? canvas.height / 2;
    if (waveGenY === null) setWaveGenY(canvas.height / 2);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeExperiment === 1) {
        // Background Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.02)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
        for (let i = 0; i < canvas.height; i += 50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

        const lcx = lensPos.x + lensPos.width / 2;
        const lcy = lensPos.y + lensPos.height / 2;
        const lensType = grade9Params.lensType;
        const n = grade9Params.lensRefractiveIndex;

        // Оптична вісь
        ctx.setLineDash([5, 10]);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, lcy); ctx.lineTo(canvas.width, lcy); ctx.stroke();
        ctx.setLineDash([]);

        // Малюємо лінзу з поворотом
        ctx.save();
        ctx.translate(lcx, lcy);
        ctx.rotate(lensAngle);

        ctx.beginPath();
        const hw = lensPos.width / 2;
        const hh = lensPos.height / 2;

        // Динамічна зміна кривизни в залежності від показника заломлення n (1.0 до 3.0)
        // Обмежуємо curveFactor щоб лінза не складалася сама в себе
        const curveFactor = Math.min((n - 1) / 2, 0.6);
        
        if (lensType === 'prism') {
          ctx.rect(-hw, -hh, lensPos.width, lensPos.height);
        } else if (lensType === 'convex') {
          // Випуклість обмежена щоб контрольні точки не перетинались
          const bulge = hw * (1 + curveFactor * 2.5);
          ctx.moveTo(0, -hh);
          ctx.bezierCurveTo(bulge, -hh * 0.5, bulge, hh * 0.5, 0, hh);
          ctx.bezierCurveTo(-bulge, hh * 0.5, -bulge, -hh * 0.5, 0, -hh);
          ctx.closePath();
        } else if (lensType === 'concave') {
          // Увігнутість — контрольні точки всередину, але обмежені
          const indent = hw * curveFactor * 1.2;
          ctx.moveTo(-hw, -hh);
          ctx.lineTo(hw, -hh);
          ctx.bezierCurveTo(hw - indent, -hh * 0.3, hw - indent, hh * 0.3, hw, hh);
          ctx.lineTo(-hw, hh);
          ctx.bezierCurveTo(-hw + indent, hh * 0.3, -hw + indent, -hh * 0.3, -hw, -hh);
          ctx.closePath();
        }

        const lensGrad = ctx.createLinearGradient(-hw, -hh, hw, hh);
        lensGrad.addColorStop(0, 'rgba(200, 230, 255, 0.45)');
        lensGrad.addColorStop(1, 'rgba(100, 200, 255, 0.12)');
        ctx.fillStyle = lensGrad;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15; ctx.shadowColor = '#38bdf8';
        ctx.fill(); ctx.stroke();
        ctx.shadowBlur = 0;

        // Індикатор обертання лінзи (світлий кружечок нагорі)
        ctx.beginPath();
        ctx.arc(0, -hh - 15, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.stroke();

        ctx.restore();

        // Фокусні точки (тільки для лінз)
        if (lensType !== 'prism') {
          const f = (lensPos.height / 2) / Math.max(0.1, n - 1);
          const cosA = Math.cos(lensAngle);
          const sinA = Math.sin(lensAngle);
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath(); ctx.arc(lcx + f * cosA, lcy + f * sinA, 5, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(lcx - f * cosA, lcy - f * sinA, 5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '14px Inter';
          ctx.fillText('F', lcx + f * cosA - 4, lcy + f * sinA - 12);
          ctx.fillText("F'", lcx - f * cosA - 6, lcy - f * sinA - 12);
        }

        // Лазер
        ctx.save();
        ctx.translate(laserPos.x, laserPos.y);
        ctx.rotate(laserPos.angle);
        ctx.fillStyle = '#334155';
        ctx.fillRect(-30, -30, 60, 60);
        ctx.fillStyle = grade9Params.laserColor;
        ctx.shadowBlur = 10; ctx.shadowColor = grade9Params.laserColor;
        for (let j = 0; j < 5; j++) ctx.fillRect(30, (j - 2) * 10 - 2, 8, 4);
        ctx.shadowBlur = 0;
        
        // Індикатор обертання лазера
        ctx.beginPath(); ctx.arc(45, 0, 5, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill();
        ctx.restore();

        // Промені
        const rayDirX = Math.cos(laserPos.angle);
        const rayDirY = Math.sin(laserPos.angle);
        const numRays = 5;

        for (let i = 0; i < numRays; i++) {
          const offset = (i - 2) * 10;
          const startX = laserPos.x + Math.cos(laserPos.angle + Math.PI / 2) * offset;
          const startY = laserPos.y + Math.sin(laserPos.angle + Math.PI / 2) * offset;

          if (lensType === 'prism') {
            let rx = startX, ry = startY, dx = rayDirX, dy = rayDirY;
            const cosA = Math.cos(lensAngle), sinA = Math.sin(lensAngle);
            
            const isInsidePrism = (px, py) => {
              const lx = (px - lcx) * cosA + (py - lcy) * sinA;
              const ly = -(px - lcx) * sinA + (py - lcy) * cosA;
              return lx >= -hw && lx <= hw && ly >= -hh && ly <= hh;
            };

            ctx.beginPath(); ctx.moveTo(rx, ry);
            let inside = false;
            const stepSize = 2;
            for (let s = 0; s < 1500 && rx > 0 && rx < canvas.width && ry > 0 && ry < canvas.height; s++) {
              rx += dx * stepSize; ry += dy * stepSize;
              const nowInside = isInsidePrism(rx, ry);
              if (nowInside !== inside) {
                ctx.lineTo(rx, ry);
                const eps = 3;
                let nx = (isInsidePrism(rx - eps, ry) ? 1 : 0) - (isInsidePrism(rx + eps, ry) ? 1 : 0);
                let ny = (isInsidePrism(rx, ry - eps) ? 1 : 0) - (isInsidePrism(rx, ry + eps) ? 1 : 0);
                const nLen = Math.hypot(nx, ny);
                if (nLen > 0) {
                  nx /= nLen; ny /= nLen;
                  const n1 = inside ? n : 1.0;
                  const n2 = inside ? 1.0 : n;
                  let dot = dx * nx + dy * ny;
                  if (dot > 0) { nx = -nx; ny = -ny; dot = -dot; }
                  const ratio = n1 / n2;
                  const cosI = -dot;
                  const sinT2 = ratio * ratio * (1 - cosI * cosI);
                  if (sinT2 <= 1) {
                    const cosT = Math.sqrt(1 - sinT2);
                    dx = ratio * dx + (ratio * cosI - cosT) * nx;
                    dy = ratio * dy + (ratio * cosI - cosT) * ny;
                    const dL = Math.hypot(dx, dy); dx /= dL; dy /= dL;
                  } else {
                    dx -= 2 * dot * nx; dy -= 2 * dot * ny;
                  }
                }
                inside = nowInside;
                ctx.strokeStyle = grade9Params.laserColor; ctx.lineWidth = 2; ctx.stroke();
                ctx.globalAlpha = 0.2; ctx.lineWidth = 6; ctx.stroke(); ctx.globalAlpha = 1;
                ctx.beginPath(); ctx.moveTo(rx, ry);
              }
            }
            ctx.lineTo(rx, ry);
            ctx.strokeStyle = grade9Params.laserColor; ctx.lineWidth = 2; ctx.stroke();
            ctx.globalAlpha = 0.2; ctx.lineWidth = 6; ctx.stroke(); ctx.globalAlpha = 1;

          } else {
            const f = (lensPos.height / 2) / Math.max(0.1, n - 1);
            const cosA = Math.cos(lensAngle), sinA = Math.sin(lensAngle);
            const lensNx = cosA;
            const denom = rayDirX * cosA + rayDirY * sinA;
            
            if (Math.abs(denom) < 0.001) {
              ctx.beginPath(); ctx.moveTo(startX, startY);
              ctx.lineTo(startX + rayDirX * 2000, startY + rayDirY * 2000);
              ctx.strokeStyle = grade9Params.laserColor; ctx.lineWidth = 2; ctx.stroke();
              continue;
            }
            
            const t = ((lcx - startX) * cosA + (lcy - startY) * sinA) / denom;
            if (t < 0) {
              ctx.beginPath(); ctx.moveTo(startX, startY);
              ctx.lineTo(startX + rayDirX * 2000, startY + rayDirY * 2000);
              ctx.strokeStyle = grade9Params.laserColor; ctx.lineWidth = 2; ctx.stroke();
              continue;
            }
            
            const hitX = startX + rayDirX * t;
            const hitY = startY + rayDirY * t;
            
            const perpX = -sinA;
            const perpY = cosA;
            const yFromCenter = (hitX - lcx) * perpX + (hitY - lcy) * perpY;
            
            if (Math.abs(yFromCenter) > hh) {
              ctx.beginPath(); ctx.moveTo(startX, startY);
              ctx.lineTo(startX + rayDirX * 2000, startY + rayDirY * 2000);
              ctx.strokeStyle = grade9Params.laserColor; ctx.lineWidth = 2; ctx.stroke();
              continue;
            }
            
            ctx.beginPath(); ctx.moveTo(startX, startY); ctx.lineTo(hitX, hitY);
            ctx.strokeStyle = grade9Params.laserColor; ctx.lineWidth = 2; ctx.stroke();
            ctx.globalAlpha = 0.2; ctx.lineWidth = 6; ctx.stroke(); ctx.globalAlpha = 1;
            
            let newDx, newDy;
            const deflection = yFromCenter / f;
            if (lensType === 'convex') {
              newDx = rayDirX - deflection * perpX;
              newDy = rayDirY - deflection * perpY;
            } else {
              newDx = rayDirX + deflection * perpX;
              newDy = rayDirY + deflection * perpY;
            }
            
            ctx.beginPath(); ctx.moveTo(hitX, hitY);
            const endX = hitX + newDx * 2000;
            const endY = hitY + newDy * 2000;
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = grade9Params.laserColor; ctx.lineWidth = 2; ctx.stroke();
            ctx.globalAlpha = 0.2; ctx.lineWidth = 6; ctx.stroke(); ctx.globalAlpha = 1;
          }
        }

      } else if (activeExperiment === 3) {
        // Дослід 3: Дзеркала
        ctx.strokeStyle = 'rgba(255,255,255,0.02)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
        for (let i = 0; i < canvas.height; i += 50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

        const lcx = lensPos.x + lensPos.width / 2;
        const lcy = lensPos.y + lensPos.height / 2;
        const mType = grade9Params.mirrorType || 'flat';

        // Оптична вісь
        ctx.setLineDash([5, 10]);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, lcy); ctx.lineTo(canvas.width, lcy); ctx.stroke();
        ctx.setLineDash([]);

        // Малюємо дзеркало з поворотом
        ctx.save();
        ctx.translate(lcx, lcy);
        ctx.rotate(lensAngle);

        const hh = lensPos.height / 2;
        const radius = hh * 1.5; // Радіус кривизни
        const f = radius / 2; // Фокус

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();

        if (mType === 'flat') {
          ctx.moveTo(0, -hh);
          ctx.lineTo(0, hh);
        } else if (mType === 'concave') {
          // Увігнуте (центр кривизни зліва)
          ctx.arc(-radius + 20, 0, radius, -Math.asin(hh/radius), Math.asin(hh/radius));
        } else if (mType === 'convex') {
          // Опукле (центр кривизни зправа)
          ctx.arc(radius - 20, 0, radius, Math.PI - Math.asin(hh/radius), Math.PI + Math.asin(hh/radius));
        }
        ctx.stroke();

        // Задня частина дзеркала (штрихування)
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        for (let y = -hh; y <= hh; y += 10) {
          if (mType === 'flat') {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(10, y + 10); ctx.stroke();
          } else if (mType === 'concave') {
            const dx = -radius + 20 + Math.sqrt(radius*radius - y*y);
            ctx.beginPath(); ctx.moveTo(dx, y); ctx.lineTo(dx + 10, y + 10); ctx.stroke();
          } else {
            const dx = radius - 20 - Math.sqrt(radius*radius - y*y);
            ctx.beginPath(); ctx.moveTo(dx, y); ctx.lineTo(dx + 10, y + 10); ctx.stroke();
          }
        }

        // Індикатор обертання
        ctx.beginPath();
        ctx.arc(0, -hh - 15, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fill();
        ctx.strokeStyle = '#38bdf8'; ctx.stroke();
        ctx.restore();

        // Фокусні точки
        if (mType !== 'flat') {
          const sign = mType === 'concave' ? -1 : 1;
          const focusDist = f - 20; // приблизно
          const cosA = Math.cos(lensAngle), sinA = Math.sin(lensAngle);
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath(); ctx.arc(lcx + sign * focusDist * cosA, lcy + sign * focusDist * sinA, 5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '14px Inter';
          ctx.fillText('F', lcx + sign * focusDist * cosA - 4, lcy + sign * focusDist * sinA - 12);
        }

        // Лазер
        ctx.save();
        ctx.translate(laserPos.x, laserPos.y);
        ctx.rotate(laserPos.angle);
        ctx.fillStyle = '#334155';
        ctx.fillRect(-30, -30, 60, 60);
        ctx.fillStyle = grade9Params.laserColor || '#ef4444';
        ctx.shadowBlur = 10; ctx.shadowColor = grade9Params.laserColor || '#ef4444';
        for (let j = 0; j < 5; j++) ctx.fillRect(30, (j - 2) * 10 - 2, 8, 4);
        ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(45, 0, 5, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill();
        ctx.restore();

        // Промені
        const rayDirX = Math.cos(laserPos.angle);
        const rayDirY = Math.sin(laserPos.angle);

        for (let i = 0; i < 5; i++) {
          const offset = (i - 2) * 10;
          const startX = laserPos.x + Math.cos(laserPos.angle + Math.PI / 2) * offset;
          const startY = laserPos.y + Math.sin(laserPos.angle + Math.PI / 2) * offset;

          let rx = startX, ry = startY, dx = rayDirX, dy = rayDirY;
          const cosA = Math.cos(lensAngle), sinA = Math.sin(lensAngle);
          
          ctx.beginPath(); ctx.moveTo(rx, ry);
          let hit = false;

          for (let s = 0; s < 1500; s++) {
            rx += dx * 2; ry += dy * 2;
            
            // Локальні координати дзеркала
            const lx = (rx - lcx) * cosA + (ry - lcy) * sinA;
            const ly = -(rx - lcx) * sinA + (ry - lcy) * cosA;

            if (ly >= -hh && ly <= hh) {
              let surfaceX = 0;
              let normalLx = -1, normalLy = 0; // Нормаль завжди дивиться "вліво" в локальних координатах

              if (mType === 'flat') {
                surfaceX = 0;
                normalLx = -1; normalLy = 0;
              } else if (mType === 'concave') {
                surfaceX = -radius + 20 + Math.sqrt(Math.max(0, radius*radius - ly*ly));
                // Нормаль вказує до центру кривизни
                normalLx = -Math.sqrt(Math.max(0, radius*radius - ly*ly)) / radius;
                normalLy = -ly / radius;
              } else {
                surfaceX = radius - 20 - Math.sqrt(Math.max(0, radius*radius - ly*ly));
                // Нормаль від центру кривизни
                normalLx = -Math.sqrt(Math.max(0, radius*radius - ly*ly)) / radius;
                normalLy = ly / radius; // Знаки треба ретельно підбирати для правильного відбиття
              }

              if (Math.abs(lx - surfaceX) < 2) {
                // Відбивання!
                hit = true;
                ctx.lineTo(rx, ry);
                
                // Переводимо локальну нормаль у глобальну
                let nx = normalLx * cosA - normalLy * sinA;
                let ny = normalLx * sinA + normalLy * cosA;
                
                // Перевірка напрямку нормалі (вона має бути назустріч променю)
                if (dx * nx + dy * ny > 0) { nx = -nx; ny = -ny; }

                // Вектор відбивання: R = D - 2(D·N)N
                const dot = dx * nx + dy * ny;
                dx = dx - 2 * dot * nx;
                dy = dy - 2 * dot * ny;
                
                // Нормалізуємо щоб уникнути помилок округлення
                const m = Math.hypot(dx, dy);
                dx /= m; dy /= m;
                
                // Зсув щоб не застрягти
                rx += dx * 3; ry += dy * 3;
                break;
              }
            }
          }
          if (hit) {
            ctx.lineTo(rx + dx * 2000, ry + dy * 2000);
          } else {
            ctx.lineTo(startX + dx * 2000, startY + dy * 2000);
          }
          
          ctx.strokeStyle = grade9Params.laserColor || '#ef4444'; ctx.lineWidth = 2; ctx.stroke();
          ctx.globalAlpha = 0.2; ctx.lineWidth = 6; ctx.stroke(); ctx.globalAlpha = 1;
        }

      } else if (activeExperiment === 4) {
        // Дослід 4: Ефект Доплера
        const cy = canvas.height / 2;
        const vSound = 340; // швидкість звуку
        const vSource = grade9Params.dopplerSpeed || 0;
        
        // Зберігаємо хвилі в масиві
        if (!window.dopplerWaves) window.dopplerWaves = [];
        
        // Джерело рухається
        if (!window.sourceX) window.sourceX = 0;
        window.sourceX += (vSource / vSound) * 3; // Масштаб швидкості
        if (window.sourceX > canvas.width + 100) window.sourceX = -100;
        
        // Викидаємо нову хвилю кожні N кадрів
        if (time % 15 === 0) {
          window.dopplerWaves.push({ x: window.sourceX, y: cy, radius: 0 });
        }
        
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Оновлюємо та малюємо хвилі
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        window.dopplerWaves.forEach((wave, idx) => {
          wave.radius += 3; // Швидкість звуку в пікселях на кадр
          ctx.globalAlpha = Math.max(0, 1 - wave.radius / 600); // Затухання
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.globalAlpha = 1;
        
        // Видаляємо старі хвилі
        window.dopplerWaves = window.dopplerWaves.filter(w => w.radius < 600);

        // Джерело звуку
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(window.sourceX, cy, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 15; ctx.shadowColor = '#ef4444'; ctx.fill(); ctx.shadowBlur = 0;
        
        // Вектор швидкості
        if (showVectors && vSource > 0) {
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(window.sourceX, cy); ctx.lineTo(window.sourceX + vSource * 0.2, cy); ctx.stroke();
          ctx.fillStyle = '#22c55e';
          ctx.beginPath(); ctx.moveTo(window.sourceX + vSource * 0.2 + 8, cy); 
          ctx.lineTo(window.sourceX + vSource * 0.2, cy - 4); ctx.lineTo(window.sourceX + vSource * 0.2, cy + 4); ctx.fill();
          
          ctx.font = '14px Inter';
          ctx.fillText(`v = ${vSource} м/с (Mach ${(vSource/vSound).toFixed(2)})`, window.sourceX - 30, cy - 20);
        }

      } else if (activeExperiment === 2) {
        // Дослід 2: Хвилі
        const amplitude = grade9Params.waveAmplitude * 60; // Збільшено
        const frequency = grade9Params.waveFrequency * 0.05;
        const cy = effectiveWaveGenY;

        const sourceY = cy + Math.sin(time * frequency) * amplitude;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, sourceY - 30, 30, 60);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(20, sourceY - 8, 10, 16);

        ctx.beginPath();
        ctx.moveTo(30, sourceY);
        for (let x = 30; x < canvas.width; x += 5) {
          ctx.lineTo(x, cy + Math.sin(0.02 * x - time * frequency) * amplitude);
        }
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 6;
        ctx.shadowBlur = 20; ctx.shadowColor = '#38bdf8'; ctx.stroke(); ctx.shadowBlur = 0;

        ctx.fillStyle = '#fde047';
        for (let x = 120; x < canvas.width; x += 120) {
          const y = cy + Math.sin(0.02 * x - time * frequency) * amplitude;
          ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill();
        }
      }

      time++;
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationId); };
  }, [activeExperiment, grade9Params, laserPos, lensPos, lensAngle, waveGenY, showVectors, resetTrigger]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const lcx = lensPos.x + lensPos.width / 2;
    const lcy = lensPos.y + lensPos.height / 2;

    if (activeExperiment === 1 || activeExperiment === 3) {
      // Rotate lens via handle
      const cosA = Math.cos(lensAngle), sinA = Math.sin(lensAngle);
      const hx = lcx + (-lensPos.height/2 - 15) * -sinA;
      const hy = lcy + (-lensPos.height/2 - 15) * cosA;
      if (Math.hypot(mx - hx, my - hy) < 25) { setDraggingItem('lens-rotate'); return; }

      // Rotate laser via handle
      const lx = laserPos.x + Math.cos(laserPos.angle) * 45;
      const ly = laserPos.y + Math.sin(laserPos.angle) * 45;
      if (Math.hypot(mx - lx, my - ly) < 25) { setDraggingItem('laser-angle'); return; }

      // Center of lens/mirror
      if (mx > lensPos.x - 30 && mx < lensPos.x + lensPos.width + 30 && my > lensPos.y && my < lensPos.y + lensPos.height) {
        setDraggingItem('lens'); return;
      }
      
      // Center of laser
      if (Math.hypot(mx - laserPos.x, my - laserPos.y) < 40) {
        setDraggingItem('laser'); return;
      }
    } else if (activeExperiment === 2) {
      const genY = waveGenY ?? canvasRef.current.height / 2;
      if (mx < 80 && my > genY - 80 && my < genY + 80) {
        setDraggingItem('wavegen');
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!draggingItem) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (activeExperiment === 1 || activeExperiment === 3) {
      const lcx = lensPos.x + lensPos.width / 2;
      const lcy = lensPos.y + lensPos.height / 2;
      if (draggingItem === 'lens') setLensPos(prev => ({ ...prev, x: mx - prev.width / 2, y: my - prev.height / 2 }));
      else if (draggingItem === 'lens-rotate') setLensAngle(Math.atan2(my - lcy, mx - lcx) + Math.PI/2);
      else if (draggingItem === 'laser') setLaserPos(prev => ({ ...prev, x: mx, y: my }));
      else if (draggingItem === 'laser-angle') setLaserPos(prev => ({ ...prev, angle: Math.atan2(my - laserPos.y, mx - laserPos.x) }));
    } else if (activeExperiment === 2) {
      if (draggingItem === 'wavegen') setWaveGenY(my);
    }
  };

  const handleMouseUp = () => setDraggingItem(null);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#09090b' }}>
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block', cursor: draggingItem ? 'grabbing' : 'auto' }}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
