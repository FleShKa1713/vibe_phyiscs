import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/useStore';

export default function Grade11() {
  const { activeExperiment, grade11Params, showVectors, resetTrigger } = useStore();
  const canvasRef = useRef(null);
  const atomsRef = useRef([]);
  const particlesRef = useRef([]);

  const [dragging, setDragging] = useState(false);
  const [emitterY, setEmitterY] = useState(0);

  useEffect(() => {
    if (canvasRef.current && activeExperiment === 1) {
      setEmitterY(canvasRef.current.height / 2);
    }
  }, [activeExperiment, resetTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      if (activeExperiment === 1 && emitterY === 0) setEmitterY(canvas.height / 2);
    };
    window.addEventListener('resize', resize);
    resize();

    let time = 0;

    if (activeExperiment === 2) {
      const cols = 20;
      const rows = 15;
      const spacing = 40;
      const startX = canvas.width / 2 - (cols * spacing) / 2;
      const startY = canvas.height / 2 - (rows * spacing) / 2;

      atomsRef.current = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          atomsRef.current.push({
            x: startX + c * spacing + (Math.random() * 10 - 5),
            y: startY + r * spacing + (Math.random() * 10 - 5),
            decayed: false,
            orbitOffset: Math.random() * Math.PI * 2
          });
        }
      }
      particlesRef.current = [];
    } else {
      particlesRef.current = [];
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeExperiment === 1) {
        // Дослід 1: Сила Лоренца
        const currentParams = useStore.getState().grade11Params;
        const bField = currentParams.magneticFieldZ;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const step = 60;
        for (let x = step/2; x < canvas.width; x += step) {
          for (let y = step/2; y < canvas.height; y += step) {
            if (Math.abs(bField) > 0.01) {
              const symbol = bField > 0 ? '⊙' : '⊗';
              ctx.fillText(symbol, x, y);
            } else {
               ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
            }
          }
        }

        // Випромінювач частинок
        const eGrad = ctx.createLinearGradient(0, emitterY-20, 30, emitterY+20);
        eGrad.addColorStop(0, '#475569'); eGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = eGrad;
        ctx.shadowBlur = 10; ctx.shadowColor = '#000';
        ctx.fillRect(0, emitterY - 20, 30, 40);
        ctx.shadowBlur = 0;
        
        if (Math.random() < 0.05) {
          particlesRef.current.push({
            x: 30, y: emitterY + (Math.random() * 10 - 5),
            vx: currentParams.particleVelocity, vy: 0,
            charge: Math.random() > 0.5 ? 1 : -1,
            mass: 1, history: []
          });
        }

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          const Fx = p.charge * p.vy * bField;
          const Fy = -p.charge * p.vx * bField;

          p.vx += Fx / p.mass; p.vy += Fy / p.mass;
          p.x += p.vx; p.y += p.vy;

          p.history.push({ x: p.x, y: p.y });
          if (p.history.length > 50) p.history.shift();

          if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
            particlesRef.current.splice(i, 1); continue;
          }

          if (p.history.length > 1) {
            ctx.beginPath(); ctx.moveTo(p.history[0].x, p.history[0].y);
            for (let j = 1; j < p.history.length; j++) ctx.lineTo(p.history[j].x, p.history[j].y);
            ctx.strokeStyle = p.charge > 0 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.4)';
            ctx.lineWidth = 2; ctx.stroke();
          }

          ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          const color = p.charge > 0 ? '#ef4444' : '#3b82f6';
          ctx.fillStyle = color;
          ctx.shadowBlur = 10; ctx.shadowColor = color;
          ctx.fill(); ctx.shadowBlur = 0;

          if (showVectors && Math.abs(bField) > 0.01) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + Fx * 20, p.y + Fy * 20);
            ctx.strokeStyle = '#22c55e'; ctx.stroke();
          }
        }
      } else if (activeExperiment === 2) {
        // Дослід 2: Радіоактивність
        const currentParams = useStore.getState().grade11Params;
        let remaining = 0;
        atomsRef.current.forEach(atom => {
          if (!atom.decayed) {
            remaining++;
            if (Math.random() < currentParams.decayProbability / 60) {
              atom.decayed = true;
              particlesRef.current.push({
                x: atom.x, y: atom.y,
                vx: (Math.random() - 0.5) * 15, vy: (Math.random() - 0.5) * 15,
                life: 1.0, type: Math.random() > 0.5 ? 'alpha' : 'beta',
                history: []
              });
            }
          }
        });

        atomsRef.current.forEach(atom => {
          ctx.beginPath(); ctx.arc(atom.x, atom.y, 6, 0, Math.PI * 2);
          if (atom.decayed) {
            ctx.fillStyle = '#334155'; ctx.fill();
          } else {
            const radGrad = ctx.createRadialGradient(atom.x, atom.y, 1, atom.x, atom.y, 6);
            radGrad.addColorStop(0, '#34d399'); radGrad.addColorStop(1, '#059669');
            ctx.fillStyle = radGrad;
            ctx.shadowColor = '#10b981'; ctx.shadowBlur = 15; ctx.fill(); ctx.shadowBlur = 0;
            
            // Електрон
            const ex = atom.x + Math.cos(time * 0.1 + atom.orbitOffset) * 12;
            const ey = atom.y + Math.sin(time * 0.1 + atom.orbitOffset) * 12;
            ctx.beginPath(); ctx.arc(ex, ey, 2, 0, Math.PI * 2); ctx.fillStyle = '#60a5fa'; ctx.fill();
          }
        });

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx; p.y += p.vy; p.life -= 0.02;
          p.history.push({x: p.x, y: p.y});
          if (p.history.length > 10) p.history.shift();

          if (p.life <= 0) { particlesRef.current.splice(i, 1); continue; }
          
          if (p.history.length > 1) {
            ctx.beginPath(); ctx.moveTo(p.history[0].x, p.history[0].y);
            for (let j = 1; j < p.history.length; j++) ctx.lineTo(p.history[j].x, p.history[j].y);
            ctx.strokeStyle = p.type === 'alpha' ? `rgba(239, 68, 68, ${p.life*0.5})` : `rgba(234, 179, 8, ${p.life*0.5})`;
            ctx.lineWidth = p.type === 'alpha' ? 3 : 1; ctx.stroke();
          }

          ctx.beginPath(); ctx.arc(p.x, p.y, p.type === 'alpha' ? 4 : 2, 0, Math.PI * 2);
          const pColor = p.type === 'alpha' ? `rgba(239, 68, 68, ${p.life})` : `rgba(234, 179, 8, ${p.life})`;
          ctx.fillStyle = pColor;
          ctx.shadowBlur = 10; ctx.shadowColor = pColor;
          ctx.fill(); ctx.shadowBlur = 0;
        }

        const graphWidth = 200, graphHeight = 100;
        const gx = canvas.width - graphWidth - 40, gy = canvas.height - graphHeight - 40;
        ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(gx, gy, graphWidth, graphHeight);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)'; ctx.strokeRect(gx, gy, graphWidth, graphHeight);

        const ratio = remaining / atomsRef.current.length;
        ctx.beginPath(); ctx.arc(gx + graphWidth * (1 - ratio), gy + graphHeight * (1 - ratio), 4, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981'; ctx.shadowBlur = 10; ctx.shadowColor = '#10b981'; ctx.fill(); ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff'; ctx.font = '12px Inter'; ctx.fillText(`Активні ядра: ${remaining}`, gx + graphWidth/2, gy + 20);
      } else if (activeExperiment === 3) {
        // Дослід 3: Електромагнітна індукція
        const currentParams = useStore.getState().grade11Params;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Рух магніту
        const speedMultiplier = currentParams.magnetSpeed * 0.001;
        const magnetX = cx + Math.sin(time * speedMultiplier) * 300;
        const magnetV = Math.cos(time * speedMultiplier) * 300 * speedMultiplier;

        // Котушка
        const coilWidth = 150;
        const coilHeight = 100;
        const turns = currentParams.inductionCoilTurns;
        const turnSpacing = coilWidth / Math.min(turns, 50); // Візуалізуємо макс 50 витків

        // Індукційний струм (похідна від потоку)
        // Потік: Gaussian e^(-(x-cx)^2 / w^2)
        const w = 150;
        const flux = Math.exp(-Math.pow(magnetX - cx, 2) / (w * w));
        const dFluxDx = -2 * (magnetX - cx) / (w * w) * flux;
        const dFluxDt = dFluxDx * magnetV;
        
        // EMF = -N * dFlux/dt
        // Для візуалізації нормуємо
        const emf = -turns * dFluxDt * 20; 
        
        // Малюємо дріт від котушки до гальванометра
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx - coilWidth/2, cy + coilHeight/2);
        ctx.lineTo(cx - coilWidth/2, cy + 150);
        ctx.lineTo(cx + coilWidth/2, cy + 150);
        ctx.lineTo(cx + coilWidth/2, cy + coilHeight/2);
        ctx.stroke();

        // Гальванометр
        const galvX = cx;
        const galvY = cy + 150;
        ctx.fillStyle = '#334155';
        ctx.beginPath(); ctx.arc(galvX, galvY, 40, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 4; ctx.stroke();
        
        ctx.fillStyle = '#fff';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('A', galvX, galvY + 20);

        // Стрілка гальванометра
        ctx.save();
        ctx.translate(galvX, galvY);
        // Обмежуємо кут стрілки
        const maxAngle = Math.PI / 4;
        let angle = emf * 0.05;
        if (angle > maxAngle) angle = maxAngle;
        if (angle < -maxAngle) angle = -maxAngle;
        
        if (!window.galvAngle) window.galvAngle = 0;
        window.galvAngle += (angle - window.galvAngle) * 0.15; // Smoothing
        
        ctx.rotate(window.galvAngle);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(0, -30); ctx.stroke();
        ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI*2); ctx.fill();
        ctx.restore();

        // Візуалізація електронів у дроті
        if (Math.abs(emf) > 0.1) {
           ctx.fillStyle = '#3b82f6';
           const eSpeed = emf * 0.5;
           for (let i = 0; i < 5; i++) {
             // Проста анімація вздовж дроту
             let pos = (time * Math.abs(eSpeed) + i * 40) % 200;
             let px, py;
             if (pos < 50) { px = cx - coilWidth/2; py = cy + coilHeight/2 + pos; }
             else if (pos < 150) { px = cx - coilWidth/2 + (pos - 50); py = cy + 150; }
             else { px = cx + coilWidth/2; py = cy + 150 - (pos - 150); }
             
             // Реверс напрямку
             if (emf < 0) {
               if (pos < 50) { px = cx + coilWidth/2; py = cy + coilHeight/2 + pos; }
               else if (pos < 150) { px = cx + coilWidth/2 - (pos - 50); py = cy + 150; }
               else { px = cx - coilWidth/2; py = cy + 150 - (pos - 150); }
             }
             
             ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI*2); ctx.fill();
           }
        }

        // Задня частина витків
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 3;
        for (let i = 0; i <= coilWidth; i += turnSpacing) {
          ctx.beginPath();
          ctx.ellipse(cx - coilWidth/2 + i, cy, turnSpacing/2, coilHeight/2, 0, Math.PI/2, Math.PI*1.5);
          ctx.stroke();
        }

        // Магніт (проходить крізь котушку)
        const mWidth = 120;
        const mHeight = 40;
        ctx.save();
        ctx.translate(magnetX, cy);
        
        ctx.fillStyle = '#ef4444'; // N
        ctx.fillRect(0, -mHeight/2, mWidth/2, mHeight);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 16px Inter'; ctx.fillText('N', mWidth/4, 0);

        ctx.fillStyle = '#3b82f6'; // S
        ctx.fillRect(-mWidth/2, -mHeight/2, mWidth/2, mHeight);
        ctx.fillStyle = '#fff'; ctx.fillText('S', -mWidth/4, 0);
        
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
        ctx.strokeRect(-mWidth/2, -mHeight/2, mWidth, mHeight);
        ctx.restore();

        // Передня частина витків (перекриває магніт)
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        for (let i = 0; i <= coilWidth; i += turnSpacing) {
          ctx.beginPath();
          ctx.ellipse(cx - coilWidth/2 + i, cy, turnSpacing/2, coilHeight/2, 0, -Math.PI/2, Math.PI/2);
          ctx.stroke();
        }
        
        // Інфо
        ctx.fillStyle = '#fff';
        ctx.fillText(`I = ${emf.toFixed(2)} у.о.`, galvX, galvY - 50);

      } else if (activeExperiment === 4) {
        // Дослід 4: Фотоефект
        const currentParams = useStore.getState().grade11Params;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const wl = currentParams.photonWavelength;
        const workFunc = currentParams.workFunction;
        
        // Енергія фотона: E = hc / λ. Для нм та еВ: E ≈ 1240 / λ
        const photonEnergy = 1240 / wl;
        
        // Колір лазера/світла на основі довжини хвилі
        let r = 0, g = 0, b = 0;
        if (wl >= 380 && wl < 440) { r = -(wl - 440) / (440 - 380); b = 1; }
        else if (wl >= 440 && wl < 490) { g = (wl - 440) / (490 - 440); b = 1; }
        else if (wl >= 490 && wl < 510) { g = 1; b = -(wl - 510) / (510 - 490); }
        else if (wl >= 510 && wl < 580) { r = (wl - 510) / (580 - 510); g = 1; }
        else if (wl >= 580 && wl < 645) { r = 1; g = -(wl - 645) / (645 - 580); }
        else if (wl >= 645 && wl <= 780) { r = 1; }
        
        const intensity = wl > 700 ? 0.3 : 1;
        const lightColor = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${intensity})`;
        const isUV = wl < 400;

        // Катод (метал)
        const plateX = cx - 150;
        const plateY = cy;
        const plateWidth = 20;
        const plateHeight = 150;
        
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(plateX - plateWidth/2, plateY - plateHeight/2, plateWidth, plateHeight);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
        ctx.strokeRect(plateX - plateWidth/2, plateY - plateHeight/2, plateWidth, plateHeight);

        // Анод (сітка)
        const anodeX = cx + 150;
        ctx.strokeStyle = '#475569';
        ctx.beginPath(); ctx.moveTo(anodeX, plateY - plateHeight/2); ctx.lineTo(anodeX, plateY + plateHeight/2); ctx.stroke();
        for(let y = plateY - plateHeight/2 + 10; y < plateY + plateHeight/2; y += 15) {
          ctx.beginPath(); ctx.moveTo(anodeX - 5, y); ctx.lineTo(anodeX + 5, y); ctx.stroke();
        }

        // Лампа (випромінює фотони)
        const lampX = cx - 250;
        const lampY = cy - 200;
        
        ctx.fillStyle = '#334155';
        ctx.fillRect(lampX - 20, lampY - 20, 40, 40);
        ctx.beginPath(); ctx.arc(lampX, lampY, 15, 0, Math.PI*2); 
        ctx.fillStyle = lightColor;
        ctx.shadowBlur = 20; ctx.shadowColor = lightColor; ctx.fill(); ctx.shadowBlur = 0;

        // Керування частинками
        if (!window.photoParticles) window.photoParticles = { photons: [], electrons: [] };
        
        // Генерація фотонів
        if (time % 5 === 0) {
           const targetY = plateY + (Math.random() - 0.5) * plateHeight * 0.8;
           const angle = Math.atan2(targetY - lampY, plateX - lampX);
           window.photoParticles.photons.push({
             x: lampX, y: lampY,
             vx: Math.cos(angle) * 8, vy: Math.sin(angle) * 8,
             targetY: targetY
           });
        }

        // Оновлення та малювання фотонів
        ctx.strokeStyle = isUV ? '#a855f7' : lightColor;
        ctx.lineWidth = 2;
        for (let i = window.photoParticles.photons.length - 1; i >= 0; i--) {
          const p = window.photoParticles.photons[i];
          ctx.beginPath();
          // Хвиляста лінія для фотона
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 2 + Math.cos(time) * 3, p.y + p.vy * 2 + Math.sin(time) * 3);
          ctx.stroke();

          p.x += p.vx; p.y += p.vy;

          // Зіткнення з металом
          if (p.x >= plateX - plateWidth/2) {
             window.photoParticles.photons.splice(i, 1);
             // Фотоефект: якщо енергія більша за роботу виходу
             if (photonEnergy > workFunc) {
               // Кінетична енергія E_k = E - A
               const ek = photonEnergy - workFunc;
               // Швидкість пропорційна sqrt(E_k)
               const v = Math.sqrt(ek) * 3;
               window.photoParticles.electrons.push({
                 x: plateX + plateWidth/2,
                 y: p.y,
                 vx: v, vy: (Math.random() - 0.5) * v * 0.2
               });
             }
          }
        }

        // Оновлення та малювання електронів
        ctx.fillStyle = '#3b82f6';
        ctx.shadowBlur = 10; ctx.shadowColor = '#3b82f6';
        for (let i = window.photoParticles.electrons.length - 1; i >= 0; i--) {
          const e = window.photoParticles.electrons[i];
          ctx.beginPath(); ctx.arc(e.x, e.y, 3, 0, Math.PI*2); ctx.fill();
          e.x += e.vx; e.y += e.vy;
          
          if (e.x > anodeX) {
            window.photoParticles.electrons.splice(i, 1);
          }
        }
        ctx.shadowBlur = 0;

        // Текст інфо
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'left';
        ctx.font = '16px Inter';
        ctx.fillText(`E_фотона = ${photonEnergy.toFixed(2)} еВ`, 20, 40);
        ctx.fillText(`A_виходу = ${workFunc.toFixed(2)} еВ`, 20, 65);
        
        if (photonEnergy > workFunc) {
          ctx.fillStyle = '#22c55e';
          ctx.fillText(`E_кін = ${(photonEnergy - workFunc).toFixed(2)} еВ`, 20, 90);
          ctx.fillText('Струм: ЙДЕ', 20, 115);
        } else {
          ctx.fillStyle = '#ef4444';
          ctx.fillText('E_кін = 0 еВ', 20, 90);
          ctx.fillText('Струм: НЕМАЄ', 20, 115);
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
  }, [activeExperiment, grade11Params, showVectors, resetTrigger, emitterY]);

  const handleMouseDown = (e) => {
    if (activeExperiment !== 1) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (mx < 50 && my > emitterY - 30 && my < emitterY + 30) {
      setDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging || activeExperiment !== 1) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const my = e.clientY - rect.top;
    setEmitterY(my);
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block', cursor: dragging ? 'grabbing' : 'auto' }} 
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
      />
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'rgba(255,255,255,0.7)', pointerEvents: 'none' }}>
        <p>{activeExperiment === 1 
          ? "Перетягуйте випромінювач частинок вгору або вниз." 
          : activeExperiment === 2
          ? "Змінюйте ймовірність розпаду для симуляції періоду напіврозпаду."
          : activeExperiment === 3
          ? "Змінюйте швидкість магніту та кількість витків котушки."
          : "Змінюйте довжину хвилі світла та роботу виходу металу."}
        </p>
      </div>
    </div>
  );
}
