import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import useStore from '../store/useStore';

export default function Grade10() {
  const { activeExperiment, grade10Params, showVectors, resetTrigger } = useStore();
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const gasParticlesRef = useRef([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    if (activeExperiment === 1) {
      const engine = Matter.Engine.create();
      engineRef.current = engine;
      engine.world.gravity.y = grade10Params.gravity / 9.8;

      const render = Matter.Render.create({
        element: sceneRef.current,
        engine: engine,
        options: {
          width: sceneRef.current.clientWidth,
          height: sceneRef.current.clientHeight,
          wireframes: false,
          background: 'transparent',
          pixelRatio: window.devicePixelRatio,
        }
      });
      renderRef.current = render;

      const width = render.options.width;
      const height = render.options.height;
      
      const ground = Matter.Bodies.rectangle(width / 2, height + 30, width, 60, { 
        isStatic: true, 
        render: { fillStyle: '#0f172a' } 
      });
      const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height, { 
        isStatic: true, render: { fillStyle: 'transparent' } 
      });
      const rightWall = Matter.Bodies.rectangle(width + 30, height / 2, 60, height, { 
        isStatic: true, render: { fillStyle: 'transparent' } 
      });

      Matter.Composite.add(engine.world, [ground, leftWall, rightWall]);

      const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
      for (let i = 0; i < 6; i++) {
        const x = 100 + Math.random() * (width - 200);
        const y = 50 + Math.random() * (height / 3);
        const radius = 30 + Math.random() * 30; // Збільшено розмір кульок
        
        const body = Matter.Bodies.circle(x, y, radius, {
          restitution: grade10Params.restitution,
          friction: grade10Params.friction,
          render: { 
            fillStyle: colors[i % colors.length],
            strokeStyle: 'rgba(255,255,255,0.5)',
            lineWidth: 2
          }
        });
        body.customColor = colors[i % colors.length];
        body.customRadius = radius;
        Matter.Composite.add(engine.world, body);
      }

      const mouse = Matter.Mouse.create(render.canvas);
      // КРИТИЧНО: встановлюємо pixelRatio для миші, щоб вона працювала на High-DPI екранах
      mouse.pixelRatio = window.devicePixelRatio;

      const mouseConstraint = Matter.MouseConstraint.create(engine, { 
        mouse: mouse,
        constraint: { 
          stiffness: 0.2,
          render: { visible: false }
        }
      });
      Matter.Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      // Малюємо сітку фону
      Matter.Events.on(render, 'beforeRender', () => {
        const ctx = render.context;
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        ctx.lineWidth = 1;
        for(let i=0; i<width; i+=40) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,height); ctx.stroke(); }
        for(let i=0; i<height; i+=40) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(width,i); ctx.stroke(); }
        ctx.restore();
      });

      // Світіння та вектори
      Matter.Events.on(render, 'afterRender', () => {
        const ctx = render.context;
        const allBodies = Matter.Composite.allBodies(engine.world);
        
        allBodies.forEach(body => {
          if (!body.isStatic && body.customColor) {
            ctx.beginPath();
            ctx.arc(body.position.x, body.position.y, body.customRadius + 5, 0, 2 * Math.PI);
            ctx.fillStyle = `${body.customColor}33`;
            ctx.fill();

            if (showVectors) {
              const vx = body.velocity.x, vy = body.velocity.y;
              if (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
                ctx.beginPath(); 
                ctx.moveTo(body.position.x, body.position.y); 
                ctx.lineTo(body.position.x + vx * 5, body.position.y + vy * 5);
                ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2; ctx.stroke();
                // Підпис з уникненням накладання
                ctx.fillStyle = '#22c55e'; ctx.font = '12px Inter';
                ctx.fillText('v⃗', body.position.x + vx * 5 + 5, body.position.y + vy * 5 - 5);
              }
              const fg = body.mass * engine.world.gravity.y * 10;
              ctx.beginPath(); 
              ctx.moveTo(body.position.x, body.position.y);
              ctx.lineTo(body.position.x, body.position.y + fg);
              ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.stroke();
              ctx.fillStyle = '#ef4444'; ctx.font = '12px Inter';
              ctx.fillText('mg⃗', body.position.x + 5, body.position.y + fg + 10);
            }
          }
        });
      });

      Matter.Render.run(render);
      const runner = Matter.Runner.create();
      runnerRef.current = runner;
      Matter.Runner.run(runner, engine);

      return () => {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        if (engineRef.current) Matter.Engine.clear(engineRef.current);
        if (render.canvas) render.canvas.remove();
      };
    } else if (activeExperiment === 2) {
      // Дослід 2: Ідеальний газ
      const canvas = document.createElement('canvas');
      canvas.width = sceneRef.current.clientWidth;
      canvas.height = sceneRef.current.clientHeight;
      sceneRef.current.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      let animationId;

      if (gasParticlesRef.current.length === 0) {
        for (let i = 0; i < 120; i++) {
          gasParticlesRef.current.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 100,
            y: canvas.height / 2 + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5), vy: (Math.random() - 0.5)
          });
        }
      }
      
      let pressure = 0;
      let time = 0;

      const renderGas = () => {
        const currentParams = useStore.getState().grade10Params;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        
        // Збільшено об'єм газу для кращої видимості
        const boxSize = 100 + currentParams.gasVolume * 4;
        const halfBox = boxSize / 2;
        
        // Фон циліндра
        ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
        ctx.fillRect(cx - halfBox, cy - halfBox, boxSize, boxSize);
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 4;
        ctx.strokeRect(cx - halfBox, cy - halfBox, boxSize, boxSize);

        const tempSpeed = Math.sqrt(currentParams.gasTemperature) / 10;
        let hits = 0;
        const r = Math.min(255, (currentParams.gasTemperature - 100) * 0.5);
        const b = Math.max(0, 255 - (currentParams.gasTemperature - 100) * 0.5);
        const color = `rgb(${r}, 50, ${b})`;
        const pSize = currentParams.particleMass * 3; // Збільшені молекули

        gasParticlesRef.current.forEach(p => {
          const speed = Math.hypot(p.vx, p.vy) || 1;
          p.vx = (p.vx / speed) * tempSpeed;
          p.vy = (p.vy / speed) * tempSpeed;
          p.x += p.vx; p.y += p.vy;

          if (p.x < cx - halfBox + pSize) { p.x = cx - halfBox + pSize; p.vx *= -1; hits++; }
          if (p.x > cx + halfBox - pSize) { p.x = cx + halfBox - pSize; p.vx *= -1; hits++; }
          if (p.y < cy - halfBox + pSize) { p.y = cy - halfBox + pSize; p.vy *= -1; hits++; }
          if (p.y > cy + halfBox - pSize) { p.y = cy + halfBox - pSize; p.vy *= -1; hits++; }

          ctx.beginPath(); ctx.arc(p.x, p.y, pSize, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        });

        if (time % 10 === 0) {
           pressure = (hits * currentParams.gasTemperature) / currentParams.gasVolume;
        }

        ctx.fillStyle = '#fff'; ctx.font = 'bold 18px Inter';
        ctx.fillText(`Тиск P = ${pressure.toFixed(1)} у.о.`, cx - 80, cy - halfBox - 25);
        ctx.fillStyle = '#94a3b8'; ctx.font = '14px Inter';
        ctx.fillText(`Температура: ${currentParams.gasTemperature}°C | Об'єм: ${currentParams.gasVolume}`, cx - 120, cy - halfBox - 5);
        ctx.fillText('Закон Шарля / Гей-Люссака / Бойля-Маріотта (МКТ)', cx - 160, cy + halfBox + 30);
        ctx.fillText('Броунівський рух: швидкість молекул залежить від температури', cx - 180, cy + halfBox + 50);

        time++;
        animationId = requestAnimationFrame(renderGas);
      };

      renderGas();
      return () => {
        cancelAnimationFrame(animationId);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    } else if (activeExperiment === 3) {
      // Дослід 3: Балістика (Matter.js)
      const engine = Matter.Engine.create();
      engineRef.current = engine;
      engine.world.gravity.y = 1;

      const render = Matter.Render.create({
        element: sceneRef.current,
        engine: engine,
        options: {
          width: sceneRef.current.clientWidth,
          height: sceneRef.current.clientHeight,
          wireframes: false,
          background: 'transparent',
          pixelRatio: window.devicePixelRatio,
        }
      });
      renderRef.current = render;

      const width = render.options.width;
      const height = render.options.height;
      
      const ground = Matter.Bodies.rectangle(width / 2, height - 20, width * 2, 40, { 
        isStatic: true, 
        render: { fillStyle: '#166534' } // Темно зелена земля
      });

      // Ландшафт: пагорб посередині
      const hill = Matter.Bodies.polygon(width / 2, height - 40, 3, 80, { 
        isStatic: true, 
        render: { fillStyle: '#14532d' }, // ще темніший
        angle: Math.PI / 6
      });

      // Цілі (мішені)
      const target1 = Matter.Bodies.rectangle(width - 150, height - 60, 40, 40, { isStatic: true, render: { fillStyle: '#eab308' } });
      const target2 = Matter.Bodies.rectangle(width - 250, height - 100, 30, 60, { isStatic: true, render: { fillStyle: '#a855f7' } });
      const target3 = Matter.Bodies.rectangle(width - 80, height - 180, 50, 20, { isStatic: true, render: { fillStyle: '#3b82f6' } });

      Matter.Composite.add(engine.world, [ground, hill, target1, target2, target3]);

      // Гарамата
      const cannonX = 100;
      const cannonY = height - 40;

      let cannonTimer = 0;
      let lastAirResistance = grade10Params.airResistance;

      Matter.Events.on(render, 'beforeRender', () => {
        const ctx = render.context;
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        ctx.lineWidth = 1;
        for(let i=0; i<width; i+=40) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,height); ctx.stroke(); }
        for(let i=0; i<height; i+=40) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(width,i); ctx.stroke(); }
        ctx.restore();
      });

      Matter.Events.on(render, 'afterRender', () => {
        const currentParams = useStore.getState().grade10Params;
        const ctx = render.context;
        const angleRad = -currentParams.cannonAngle * Math.PI / 180;
        
        ctx.save();
        ctx.translate(cannonX, cannonY);
        
        // Малюємо основу гармати
        ctx.fillStyle = '#64748b';
        ctx.beginPath(); ctx.arc(0, 0, 25, Math.PI, 0); ctx.fill();

        // Малюємо дуло
        ctx.rotate(angleRad);
        ctx.fillStyle = '#475569';
        ctx.fillRect(0, -10, 60, 20);
        ctx.restore();

        // Додаємо інформативний текст
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px Inter';
        ctx.fillText('Спробуйте влучити в мішені, змінюючи кут, швидкість та опір!', 20, 30);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px Inter';
        ctx.fillText(`Кут: ${currentParams.cannonAngle}°, Швидкість: ${currentParams.cannonSpeed} м/с, Опір: k=${currentParams.airResistance}`, 20, 50);
      });

      Matter.Events.on(engine, 'beforeUpdate', () => {
        const currentParams = useStore.getState().grade10Params;
        cannonTimer++;
        
        // Оновлюємо опір повітря для всіх кульок
        if (lastAirResistance !== currentParams.airResistance) {
          lastAirResistance = currentParams.airResistance;
          Matter.Composite.allBodies(engine.world).forEach(b => {
            if (!b.isStatic) b.frictionAir = lastAirResistance;
          });
        }

        if (cannonTimer > 60) {
          cannonTimer = 0;
          const angleRad = currentParams.cannonAngle * Math.PI / 180;
          const speed = currentParams.cannonSpeed;
          
          const startX = cannonX + Math.cos(angleRad) * 60;
          const startY = cannonY - Math.sin(angleRad) * 60;

          const projectile = Matter.Bodies.circle(startX, startY, 8, {
            restitution: 0.5,
            frictionAir: currentParams.airResistance,
            render: { fillStyle: '#ef4444' }
          });
          
          Matter.Body.setVelocity(projectile, {
            x: Math.cos(angleRad) * speed * 0.4,
            y: -Math.sin(angleRad) * speed * 0.4
          });

          Matter.Composite.add(engine.world, projectile);
        }
        
        // Видалення снарядів, що вилетіли за екран
        Matter.Composite.allBodies(engine.world).forEach(b => {
          if (b.position.x > width + 100 || b.position.y > height + 100) {
            Matter.Composite.remove(engine.world, b);
          }
        });
      });

      Matter.Render.run(render);
      const runner = Matter.Runner.create();
      runnerRef.current = runner;
      Matter.Runner.run(runner, engine);

      return () => {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        if (engineRef.current) Matter.Engine.clear(engineRef.current);
        if (render.canvas) render.canvas.remove();
      };

    } else if (activeExperiment === 4) {
      // Дослід 4: P-V Діаграма (Ізотермічний процес)
      const canvas = document.createElement('canvas');
      canvas.width = sceneRef.current.clientWidth;
      canvas.height = sceneRef.current.clientHeight;
      sceneRef.current.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      let animationId;
      
      const pvData = [];

      const renderGasWork = () => {
        const currentParams = useStore.getState().grade10Params;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 4;
        const cy = canvas.height / 2;
        
        // Циліндр
        const cWidth = 200;
        const cHeight = 300;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx - cWidth/2, cy - cHeight/2);
        ctx.lineTo(cx - cWidth/2, cy + cHeight/2);
        ctx.lineTo(cx + cWidth/2, cy + cHeight/2);
        ctx.lineTo(cx + cWidth/2, cy - cHeight/2);
        ctx.stroke();

        // Поршень
        const volRatio = currentParams.gasPistonVolume / 200; // max vol = 200
        const pistonY = cy + cHeight/2 - cHeight * volRatio;
        
        ctx.fillStyle = '#64748b';
        ctx.fillRect(cx - cWidth/2 + 2, pistonY - 20, cWidth - 4, 20);
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(cx - 10, pistonY - 100, 20, 80);

        // Газ під поршнем
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fillRect(cx - cWidth/2 + 2, pistonY, cWidth - 4, cy + cHeight/2 - pistonY - 2);

        // Тиск (P ~ 1/V для ізотермічного процесу T=const)
        const constT = 10000;
        const pressure = constT / currentParams.gasPistonVolume;

        // Зберігаємо дані для графіка
        pvData.push({ v: currentParams.gasPistonVolume, p: pressure });
        if (pvData.length > 500) pvData.shift(); // Обмеження точок

        // Малюємо P-V діаграму з правого боку
        const gx = canvas.width / 2 + 50;
        const gy = canvas.height / 2 + 100;
        const gWidth = 350;
        const gHeight = 250;

        ctx.strokeStyle = '#64748b'; // Осі координат
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Вісь P
        ctx.moveTo(gx, gy - gHeight - 20); ctx.lineTo(gx, gy); 
        // Вісь V
        ctx.lineTo(gx + gWidth + 20, gy);
        ctx.stroke();

        // Стрілки на осях
        ctx.fillStyle = '#64748b';
        ctx.beginPath(); ctx.moveTo(gx, gy - gHeight - 20); ctx.lineTo(gx - 5, gy - gHeight - 10); ctx.lineTo(gx + 5, gy - gHeight - 10); ctx.fill();
        ctx.beginPath(); ctx.moveTo(gx + gWidth + 20, gy); ctx.lineTo(gx + gWidth + 10, gy - 5); ctx.lineTo(gx + gWidth + 10, gy + 5); ctx.fill();

        ctx.fillStyle = '#fff'; ctx.font = '14px Inter';
        ctx.fillText('V (Об\'єм)', gx + gWidth + 10, gy + 5);
        ctx.fillText('P (Тиск)', gx - 10, gy - gHeight - 10);

        // Теоретична крива P = const/V
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        for (let v = 30; v <= 200; v += 5) {
          const px = gx + (v / 200) * gWidth;
          const py = gy - ((constT / v) / 350) * gHeight;
          if (v === 30) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Поточна точка
        const currentPx = gx + (currentParams.gasPistonVolume / 200) * gWidth;
        const currentPy = gy - (pressure / 350) * gHeight;

        ctx.beginPath(); ctx.arc(currentPx, currentPy, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444'; ctx.fill();

        // Проєкції поточної точки на осі
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath(); ctx.moveTo(currentPx, currentPy); ctx.lineTo(currentPx, gy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(currentPx, currentPy); ctx.lineTo(gx, currentPy); ctx.stroke();
        ctx.setLineDash([]);

        // Історія (шлейф точок)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
        pvData.forEach(pt => {
          const pxx = gx + (pt.v / 200) * gWidth;
          const pyy = gy - (pt.p / 350) * gHeight;
          ctx.beginPath(); ctx.arc(pxx, pyy, 2, 0, Math.PI*2); ctx.fill();
        });

        // Інфо текст
        ctx.fillStyle = '#fff'; ctx.font = 'bold 18px Inter';
        ctx.fillText(`Об'єм = ${currentParams.gasPistonVolume}`, cx - 50, cy + cHeight/2 + 40);
        ctx.fillText(`Тиск = ${pressure.toFixed(1)}`, cx - 50, cy + cHeight/2 + 65);
        ctx.fillStyle = '#f59e0b'; ctx.font = '14px Inter';
        ctx.fillText('P = const / V (Ізотермічний процес T=const)', gx + 80, gy - gHeight + 20);
        ctx.fillStyle = '#94a3b8'; ctx.font = '12px Inter';
        ctx.fillText('Робота газу дорівнює площі під графіком', gx + 80, gy - gHeight + 40);

        animationId = requestAnimationFrame(renderGasWork);
      };

      renderGasWork();
      return () => {
        cancelAnimationFrame(animationId);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    }
  }, [activeExperiment, resetTrigger]);

  useEffect(() => {
    if (activeExperiment === 1 && engineRef.current) {
      engineRef.current.world.gravity.y = grade10Params.gravity / 9.8;
      Matter.Composite.allBodies(engineRef.current.world).forEach(body => {
        if (!body.isStatic) body.restitution = grade10Params.restitution;
      });
    }
  }, [grade10Params, activeExperiment]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)' }}>
      <div ref={sceneRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
