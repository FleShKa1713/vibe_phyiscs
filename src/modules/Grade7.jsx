import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/useStore';
import Matter from 'matter-js';

export default function Grade7() {
  const { activeExperiment, grade7Params, showVectors, resetTrigger } = useStore();
  const canvasRef = useRef(null);
  const matterContainerRef = useRef(null);

  // --- Архімед refs ---
  const draggingRef = useRef(false);
  const blockYRef = useRef(-80);
  const blockXRef = useRef(0);
  const velYRef = useRef(0);

  // --- Машинка refs ---
  const timeRef = useRef(0);
  const carAbsPosRef = useRef(0);
  const graphDataRef = useRef([]); // {t, s}
  const totalDistRef = useRef(0);

  // --- Matter.js refs (Важіль) ---
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const beamRef = useRef(null);
  const leftWeightRef = useRef(null);
  const rightWeightRef = useRef(null);

  const [, forceRender] = useState({});

  useEffect(() => {
    blockYRef.current = -80;
    blockXRef.current = 0;
    velYRef.current = 0;
    timeRef.current = 0;
    carAbsPosRef.current = 0;
    graphDataRef.current = [];
    totalDistRef.current = 0;
    forceRender({});
  }, [activeExperiment, resetTrigger]);

  // ==========================================
  // CUSTOM CANVAS RENDER (Досліди 1, 2, 4)
  // ==========================================
  useEffect(() => {
    if (activeExperiment === 3) return; // Exp 3 is Matter.js
    
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

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;

      if (activeExperiment === 1) {
        // --- Дослід 1: Закон Архімеда ---
        const waterY = H * 0.45;
        const size = (grade7Params.archimedesObjectSize || 100);
        const rhoBody = grade7Params.archimedesObjectDensity || 500;
        const rhoLiq = grade7Params.archimedesLiquidDensity || 1000;

        const skyGrad = ctx.createLinearGradient(0, 0, 0, waterY);
        skyGrad.addColorStop(0, '#0c1222');
        skyGrad.addColorStop(1, '#1a2744');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, waterY);

        const waterGrad = ctx.createLinearGradient(0, waterY, 0, H);
        waterGrad.addColorStop(0, 'rgba(59, 130, 246, 0.55)');
        waterGrad.addColorStop(1, 'rgba(30, 64, 175, 0.85)');
        ctx.fillStyle = waterGrad;
        ctx.beginPath();
        ctx.moveTo(0, waterY);
        for (let x = 0; x <= W; x += 8) {
          ctx.lineTo(x, waterY + Math.sin(x * 0.025 + timeRef.current * 0.04) * 5);
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H);
        ctx.fill();

        if (!draggingRef.current) {
          let equilibriumY;
          if (rhoBody >= rhoLiq) {
            equilibriumY = H - waterY - size - 10;
          } else {
            equilibriumY = -size * (1 - rhoBody / rhoLiq);
          }

          const diff = equilibriumY - blockYRef.current;
          velYRef.current += diff * 0.02;
          velYRef.current *= 0.88;
          blockYRef.current += velYRef.current;

          if (blockYRef.current < -waterY + 5) {
            blockYRef.current = -waterY + 5;
            velYRef.current = 0;
          }
          const bottomLimit = H - waterY - size - 5;
          if (blockYRef.current > bottomLimit) {
            blockYRef.current = bottomLimit;
            velYRef.current = 0;
          }
        } else {
          velYRef.current = 0;
        }

        const bx = W / 2 + blockXRef.current - size / 2;
        const by = waterY + blockYRef.current;

        const submergedTop = Math.max(by, waterY);
        const submergedBottom = Math.min(by + size, H);
        const submergedDepth = Math.max(0, submergedBottom - submergedTop);
        const submergedRatio = submergedDepth / size;

        const blockGrad = ctx.createLinearGradient(bx, by, bx, by + size);
        blockGrad.addColorStop(0, '#f59e0b');
        blockGrad.addColorStop(1, '#b45309');
        ctx.fillStyle = blockGrad;
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 2;
        ctx.fillRect(bx, by, size, size);
        ctx.strokeRect(bx, by, size, size);

        if (submergedRatio > 0 && submergedRatio < 1) {
          ctx.setLineDash([4, 4]);
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
          ctx.beginPath();
          ctx.moveTo(bx, waterY);
          ctx.lineTo(bx + size, waterY);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(10, 10, 200, 75);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.strokeRect(10, 10, 200, 75);
        ctx.fillStyle = '#fff'; ctx.font = '13px Inter';
        ctx.fillText(`ρ тіла: ${rhoBody} кг/м³`, 20, 30);
        ctx.fillText(`ρ рідини: ${rhoLiq} кг/м³`, 20, 48);
        ctx.fillText(`Занурення: ${(submergedRatio * 100).toFixed(0)}%`, 20, 66);
        ctx.fillText(rhoBody >= rhoLiq ? '→ ТОНЕ' : '→ ПЛАВАЄ', 20, 80);

        if (showVectors) {
          const cx = bx + size / 2;
          const cy = by + size / 2;
          const arrowScale = 50;

          const drawArrow = (x1, y1, x2, y2, color, label) => {
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
            ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.stroke();
            const a = Math.atan2(y2 - y1, x2 - x1);
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - 10 * Math.cos(a - 0.4), y2 - 10 * Math.sin(a - 0.4));
            ctx.lineTo(x2 - 10 * Math.cos(a + 0.4), y2 - 10 * Math.sin(a + 0.4));
            ctx.fillStyle = color; ctx.fill();
            ctx.font = 'bold 13px Inter';
            ctx.fillText(label, x2 + 8, y2 + 4);
          };

          const fgLen = (rhoBody / 1000) * arrowScale;
          drawArrow(cx, cy, cx, cy + fgLen, '#ef4444', 'F тяж');

          if (submergedRatio > 0.01) {
            const faLen = (rhoLiq / 1000) * submergedRatio * arrowScale;
            drawArrow(cx, cy, cx, cy - faLen, '#22c55e', 'F Арх');
          }
        }

      } else if (activeExperiment === 2) {
        // --- Дослід 2: Рівномірний рух ---
        const cy = H / 2;
        const v = grade7Params.kinematicsVelocity ?? 5;
        const carScale = (grade7Params.kinematicsCarSize || 1.0) * 1.5;
        const carW = 60 * carScale;
        const carH = 30 * carScale;

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, W, cy - 60);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, cy - 60, W, 120);
        ctx.fillStyle = '#14532d';
        ctx.fillRect(0, cy + 60, W, H - cy - 60);
        
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 4;
        ctx.setLineDash([25, 25]);
        ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
        ctx.setLineDash([]);

        if (v !== 0) {
          carAbsPosRef.current += v * 2;
        }
        let carX = ((carAbsPosRef.current % (W + carW)) + (W + carW)) % (W + carW) - carW;

        const chassisY = cy - carH * 0.1;
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.roundRect(carX + 2, chassisY - carH * 0.15, carW - 4, carH * 0.55, [4, 4, 2, 2]);
        ctx.fill();

        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.moveTo(carX + carW * 0.2, chassisY - carH * 0.15);
        ctx.lineTo(carX + carW * 0.28, chassisY - carH * 0.65);
        ctx.lineTo(carX + carW * 0.72, chassisY - carH * 0.65);
        ctx.lineTo(carX + carW * 0.85, chassisY - carH * 0.15);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#7dd3fc';
        ctx.beginPath();
        ctx.moveTo(carX + carW * 0.3, chassisY - carH * 0.12);
        ctx.lineTo(carX + carW * 0.35, chassisY - carH * 0.55);
        ctx.lineTo(carX + carW * 0.5, chassisY - carH * 0.55);
        ctx.lineTo(carX + carW * 0.5, chassisY - carH * 0.12);
        ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(carX + carW * 0.52, chassisY - carH * 0.12);
        ctx.lineTo(carX + carW * 0.52, chassisY - carH * 0.55);
        ctx.lineTo(carX + carW * 0.68, chassisY - carH * 0.55);
        ctx.lineTo(carX + carW * 0.8, chassisY - carH * 0.12);
        ctx.closePath(); ctx.fill();

        ctx.fillStyle = '#fde047';
        ctx.fillRect(carX + carW - 4, chassisY - carH * 0.05, 4, 8);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(carX, chassisY - carH * 0.05, 3, 8);

        ctx.fillStyle = '#111';
        ctx.beginPath(); ctx.arc(carX + carW * 0.22, chassisY + carH * 0.4, 8 * carScale, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#444'; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(carX + carW * 0.78, chassisY + carH * 0.4, 8 * carScale, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#444'; ctx.lineWidth = 2; ctx.stroke();

        if (showVectors && v > 0) {
          ctx.beginPath();
          ctx.moveTo(carX + carW, cy);
          ctx.lineTo(carX + carW + v * 10, cy);
          ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 3; ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(carX + carW + v * 10, cy);
          ctx.lineTo(carX + carW + v * 10 - 8, cy - 5);
          ctx.lineTo(carX + carW + v * 10 - 8, cy + 5);
          ctx.fillStyle = '#22c55e'; ctx.fill();
          ctx.font = 'bold 12px Inter';
          ctx.fillText(`v = ${v} м/с`, carX + carW + v * 10 + 5, cy + 4);
        }
        if (v === 0) {
          ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 14px Inter';
          ctx.fillText('v = 0 м/с', carX + carW + 10, cy - 15);
        }

        totalDistRef.current += Math.abs(v * 2);
        graphDataRef.current.push({ t: timeRef.current, s: totalDistRef.current });
        if (graphDataRef.current.length > 600) graphDataRef.current.shift();

        const gW = 300, gH = 180, gP = 35;
        const gx = 25, gy = 25; // Переміщено вище та зроблено більшим

        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.fillRect(gx, gy, gW, gH);
        ctx.strokeRect(gx, gy, gW, gH);

        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx + gP, gy + 15);
        ctx.lineTo(gx + gP, gy + gH - gP);
        ctx.lineTo(gx + gW - 15, gy + gH - gP);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = '12px Inter';
        ctx.fillText('S (м)', gx + 5, gy + 20);
        ctx.fillText('t (с)', gx + gW - 25, gy + gH - gP + 18);
        ctx.font = 'bold 12px Inter';
        ctx.fillText('Графік шляху S(t)', gx + gP + 10, gy + 18);
        
        // Позначки на осях
        ctx.font = '10px Inter';
        ctx.fillText('0', gx + gP - 12, gy + gH - gP + 12);
        ctx.fillText('v = ' + v.toFixed(1), gx + gW/2, gy + gH - 10);

        const data = graphDataRef.current;
        if (data.length > 2) {
          const t0 = data[0].t, tN = data[data.length - 1].t;
          const s0 = data[0].s, sN = data[data.length - 1].s;
          const tRange = Math.max(tN - t0, 1);
          const sRange = Math.max(sN - s0, 1);

          ctx.beginPath();
          ctx.strokeStyle = '#4ade80';
          ctx.lineWidth = 2.5;
          for (let i = 0; i < data.length; i++) {
            const px = gx + gP + ((data[i].t - t0) / tRange) * (gW - gP - 25);
            const py = gy + gH - gP - ((data[i].s - s0) / sRange) * (gH - gP - 25);
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }

      } else if (activeExperiment === 4) {
        // --- Дослід 4: Гідростатичний тиск (Закон Паскаля) ---
        const cy = H / 2;
        const cx = W / 2;
        const tankW = 120;
        const tankH = 300;
        const tankX = cx - 150;
        const tankY = cy - tankH / 2 + 50;

        // Фон
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, W, H);
        
        // Підлога
        ctx.fillStyle = '#334155';
        ctx.fillRect(0, tankY + tankH, W, H - (tankY + tankH));

        // Малюємо бак
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(tankX, tankY);
        ctx.lineTo(tankX, tankY + tankH);
        ctx.lineTo(tankX + tankW, tankY + tankH);
        ctx.lineTo(tankX + tankW, tankY);
        ctx.stroke();

        // Вода в баці
        const waterLvl = (grade7Params.tankWaterLevel || 100) / 100; // 0..1
        const wHeight = tankH * waterLvl;
        const wTop = tankY + tankH - wHeight;
        
        ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.fillRect(tankX + 2, wTop, tankW - 4, wHeight);

        // Отвори (h1, h2, h3) від дна:
        const holes = [
          { y: tankY + tankH * 0.25, color: '#f87171' },
          { y: tankY + tankH * 0.5, color: '#facc15' },
          { y: tankY + tankH * 0.75, color: '#4ade80' },
        ];

        holes.forEach((hole, idx) => {
          // Малюємо отвір
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(tankX + tankW - 2, hole.y - 4, 6, 8);

          // Обчислення Торрічеллі
          const depth = hole.y - wTop; // глибина від поверхні
          if (depth > 0) {
            // v = sqrt(2gh). Відстань польоту x = v * t = sqrt(2gh) * sqrt(2 * H_fall / g) = 2 * sqrt(h * H_fall)
            const H_fall = tankY + tankH - hole.y; // висота падіння до землі
            const range = 2 * Math.sqrt(depth * H_fall);
            
            // Малюємо струмінь (параболу)
            ctx.beginPath();
            ctx.moveTo(tankX + tankW, hole.y);
            // Вершина параболи в отворі
            // y(x) = (g / 2v^2) * x^2 + hole.y
            const v_sq = depth * 2; // g cancels out
            
            for(let x = 0; x <= range; x += 5) {
              const y = hole.y + (x * x) / (2 * v_sq);
              if (y > tankY + tankH) break;
              ctx.lineTo(tankX + tankW + x, y);
            }
            
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
            ctx.lineWidth = 4;
            ctx.stroke();

            // Відмалюємо дальність
            if (showVectors) {
              const hitX = tankX + tankW + range;
              ctx.fillStyle = hole.color;
              ctx.beginPath();
              ctx.arc(hitX, tankY + tankH, 4, 0, Math.PI * 2);
              ctx.fill();
              ctx.font = '12px Inter';
              ctx.fillText(`P${idx+1}`, hitX - 8, tankY + tankH + 15);
            }
          }
        });

        // Інфо
        ctx.fillStyle = '#fff';
        ctx.font = '14px Inter';
        ctx.fillText(`Рівень води: ${Math.round(waterLvl * 100)}%`, tankX - 20, tankY - 15);
      }

      timeRef.current++;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [activeExperiment, grade7Params, showVectors, resetTrigger]);

  // ==========================================
  // MATTER.JS RENDER (Дослід 3: Важіль)
  // ==========================================
  useEffect(() => {
    if (activeExperiment !== 3) {
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        Matter.Runner.stop(runnerRef.current);
        renderRef.current.canvas.remove();
        renderRef.current = null;
        engineRef.current = null;
      }
      return;
    }

    if (!matterContainerRef.current) return;

    // Ініціалізація Matter.js
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    
    const render = Matter.Render.create({
      element: matterContainerRef.current,
      engine: engine,
      options: {
        width: matterContainerRef.current.clientWidth,
        height: matterContainerRef.current.clientHeight,
        wireframes: false,
        background: '#0f172a',
        pixelRatio: window.devicePixelRatio,
      }
    });
    renderRef.current = render;

    const W = render.options.width;
    const H = render.options.height;
    const cx = W / 2;
    const cy = H / 2;

    // Опора (трикутник)
    const fOffset = grade7Params.leverFulcrumOffset || 0;
    const fulcrum = Matter.Bodies.polygon(cx + fOffset, cy + 50, 3, 40, {
      isStatic: true,
      render: { fillStyle: '#94a3b8' },
      angle: -Math.PI / 2
    });

    // Балка
    const beamLength = 600;
    const beam = Matter.Bodies.rectangle(cx, cy + 30, beamLength, 20, {
      render: { fillStyle: '#b45309' },
      mass: 2, // легка балка
      friction: 1.0,
      restitution: 0,
      collisionFilter: { group: -1 }
    });
    beamRef.current = beam;

    // Шарнір між опорою та балкою
    const constraint = Matter.Constraint.create({
      bodyA: fulcrum,
      bodyB: beam,
      pointA: { x: 0, y: -20 },
      pointB: { x: fOffset, y: 0 },
      stiffness: 1,
      length: 0,
      render: { visible: true, strokeStyle: '#fff' }
    });

    // Тягарці
    const lPos = Math.max(1, Math.min(5, grade7Params.leverLeftPos || 3));
    const rPos = Math.max(1, Math.min(5, grade7Params.leverRightPos || 3));
    
    // Маси (візуально різні розміри)
    const lMass = grade7Params.leverLeftMass || 5;
    const rMass = grade7Params.leverRightMass || 5;
    
    const lSize = 20 + lMass * 2;
    const rSize = 20 + rMass * 2;

    // Відстані від центру (max 280)
    const lDist = - (lPos / 5) * 280;
    const rDist = (rPos / 5) * 280;

    const leftWeight = Matter.Bodies.rectangle(cx + lDist, cy + 20 - lSize / 2, lSize, lSize, {
      mass: lMass,
      render: { fillStyle: '#ef4444' },
      friction: 1.0,
      restitution: 0,
      collisionFilter: { group: -1 }
    });
    leftWeightRef.current = leftWeight;

    const rightWeight = Matter.Bodies.rectangle(cx + rDist, cy + 20 - rSize / 2, rSize, rSize, {
      mass: rMass,
      render: { fillStyle: '#3b82f6' },
      friction: 1.0,
      restitution: 0,
      collisionFilter: { group: -1 }
    });
    rightWeightRef.current = rightWeight;

    const leftAttach = Matter.Constraint.create({
      bodyA: beam,
      bodyB: leftWeight,
      pointA: { x: lDist, y: -10 - lSize / 2 },
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0,
      render: { visible: false }
    });

    const rightAttach = Matter.Constraint.create({
      bodyA: beam,
      bodyB: rightWeight,
      pointA: { x: rDist, y: -10 - rSize / 2 },
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0,
      render: { visible: false }
    });

    // Противага для стабільності важеля (робить центр мас нижчим за точку опори)
    const counterweight = Matter.Bodies.rectangle(cx, cy + 130, 20, 20, {
      mass: 20, // Достатня маса для стабільності
      collisionFilter: { group: -1 },
      render: { visible: false } // приховано
    });
    
    const cwAttach = Matter.Constraint.create({
      bodyA: beam,
      bodyB: counterweight,
      pointA: { x: fOffset, y: 100 },
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0,
      render: { visible: false }
    });

    // Підлога щоб балка не падала в безкінечність
    const ground = Matter.Bodies.rectangle(cx, H + 30, W, 60, {
      isStatic: true,
      render: { fillStyle: '#1e293b' }
    });

    // Mouse constraint для перетягування тягарців!
    const mouse = Matter.Mouse.create(render.canvas);
    mouse.pixelRatio = window.devicePixelRatio;
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    Matter.Composite.add(engine.world, [
      fulcrum, beam, constraint, 
      leftWeight, rightWeight, ground, mouseConstraint,
      leftAttach, rightAttach, counterweight, cwAttach
    ]);

    Matter.Render.run(render);
    
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // Додатковий рендер для UI (вектори і текст)
    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      
      // Малюємо поділки на балці
      ctx.save();
      ctx.translate(beam.position.x, beam.position.y);
      ctx.rotate(beam.angle);
      
      ctx.fillStyle = '#fff';
      ctx.font = '12px Inter';
      for(let i = -5; i <= 5; i++) {
        if(i === 0) continue;
        const x = (i / 5) * 280;
        ctx.fillRect(x - 2, -10, 4, 20);
        ctx.fillText(Math.abs(i), x - 4, -15);
      }
      ctx.restore();

      // UI панель
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(10, 10, 250, 80);
      ctx.fillStyle = '#fff'; ctx.font = '14px Inter';
      
      const m1 = leftWeight.mass.toFixed(1);
      const m2 = rightWeight.mass.toFixed(1);
      // Приблизна відстань (розраховується відносно центру балки)
      const d1 = (Math.abs(leftWeight.position.x - beam.position.x) / (280/5)).toFixed(1);
      const d2 = (Math.abs(rightWeight.position.x - beam.position.x) / (280/5)).toFixed(1);
      
      const torque1 = (m1 * d1).toFixed(1);
      const torque2 = (m2 * d2).toFixed(1);

      ctx.fillText(`Лівий момент: ${m1} кг × ${d1} = ${torque1}`, 20, 30);
      ctx.fillText(`Правий момент: ${m2} кг × ${d2} = ${torque2}`, 20, 50);

      if (Math.abs(torque1 - torque2) < 0.5) {
        ctx.fillStyle = '#4ade80';
        ctx.fillText('РІВНОВАГА', 20, 75);
      } else {
        ctx.fillStyle = '#f87171';
        ctx.fillText('НЕМАЄ РІВНОВАГИ', 20, 75);
      }
    });

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
    };
  }, [activeExperiment, resetTrigger]);

  // Оновлення мас тягарців якщо змінились параметри
  useEffect(() => {
    if (activeExperiment === 3 && leftWeightRef.current && rightWeightRef.current) {
      Matter.Body.setMass(leftWeightRef.current, grade7Params.leverLeftMass || 5);
      Matter.Body.setMass(rightWeightRef.current, grade7Params.leverRightMass || 5);
      
      // Візуально масштабуємо розмір
      const lSize = 20 + (grade7Params.leverLeftMass || 5) * 2;
      const rSize = 20 + (grade7Params.leverRightMass || 5) * 2;
      
      // Reset scale is tricky in matter.js, it's easier to just let user change mass, but scale doesn't auto update.
      // We'll leave the initial scale based on initial mass to save complexity.
    }
  }, [grade7Params.leverLeftMass, grade7Params.leverRightMass, activeExperiment]);


  // --- Обробка миші (Архімед) ---
  const handleMouseDown = (e) => {
    if (activeExperiment !== 1) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const W = canvasRef.current.width, H = canvasRef.current.height;
    const waterY = H * 0.45;
    const size = grade7Params.archimedesObjectSize || 100;

    const bx = W / 2 + blockXRef.current - size / 2;
    const by = waterY + blockYRef.current;

    if (mx > bx && mx < bx + size && my > by && my < by + size) {
      draggingRef.current = true;
    }
  };

  const handleMouseMove = (e) => {
    if (!draggingRef.current || activeExperiment !== 1) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const W = canvasRef.current.width, H = canvasRef.current.height;
    const waterY = H * 0.45;
    const size = grade7Params.archimedesObjectSize || 100;

    blockXRef.current = e.clientX - rect.left - W / 2;
    blockYRef.current = e.clientY - rect.top - waterY;
  };

  const handleMouseUp = () => { draggingRef.current = false; };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#020617' }}>
      {/* Custom Canvas for Exps 1, 2, 4 */}
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: activeExperiment === 3 ? 'none' : 'block' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {/* Matter.js Container for Exp 3 */}
      <div 
        ref={matterContainerRef} 
        style={{ width: '100%', height: '100%', display: activeExperiment === 3 ? 'block' : 'none', position: 'absolute', top: 0, left: 0 }} 
      />
    </div>
  );
}
