import React from 'react';
import { X, BookOpen, ExternalLink } from 'lucide-react';
import useStore from '../store/useStore';

const theoryContent = {
  7: {
    1: {
      title: "Закон Архімеда",
      formulas: [
        { name: "Виштовхувальна сила", expr: "F_A = ρ_р · g · V_зан" },
        { name: "Умова плавання", expr: "ρ_тіла < ρ_рідини → тіло плаває" },
        { name: "Умова потопання", expr: "ρ_тіла > ρ_рідини → тіло тоне" }
      ],
      description: "Тіло, занурене в рідину, зазнає дії виштовхувальної сили, яка дорівнює вазі витісненої рідини. Якщо F_A > mg — тіло спливає, якщо F_A < mg — тоне.",
      wiki: "https://uk.wikipedia.org/wiki/Закон_Архімеда"
    },
    2: {
      title: "Рівномірний прямолінійний рух",
      formulas: [
        { name: "Шлях", expr: "S = v · t" },
        { name: "Швидкість", expr: "v = S / t" },
        { name: "Середня швидкість", expr: "v_сер = S_заг / t_заг" }
      ],
      description: "Рух, при якому тіло за рівні проміжки часу проходить однакові відстані. Графік S(t) — пряма лінія, нахил якої дорівнює швидкості. Зміна нахилу вказує на зміну швидкості.",
      wiki: "https://uk.wikipedia.org/wiki/Рівномірний_прямолінійний_рух"
    },
    3: {
      title: "Правило моментів (Важіль)",
      formulas: [
        { name: "Правило моментів", expr: "F₁ · d₁ = F₂ · d₂" },
        { name: "Момент сили", expr: "M = F · d" }
      ],
      description: "Важіль перебуває в рівновазі, якщо момент сили, що обертає його за годинниковою стрілкою, дорівнює моменту сили, що обертає його проти годинникової стрілки.",
      wiki: "https://uk.wikipedia.org/wiki/Важіль"
    },
    4: {
      title: "Гідростатичний тиск (Закон Паскаля)",
      formulas: [
        { name: "Гідростатичний тиск", expr: "P = ρ · g · h" },
        { name: "Закон Паскаля", expr: "P₁ = P₂" }
      ],
      description: "Тиск, створюваний рідиною, залежить від її густини та висоти стовпа. Чим глибше, тим більший тиск, і з тим більшою швидкістю витікає рідина з отвору.",
      wiki: "https://uk.wikipedia.org/wiki/Закон_Паскаля"
    }
  },
  8: {
    1: {
      title: "Закон Ома для ділянки кола",
      formulas: [
        { name: "Закон Ома", expr: "I = U / R" },
        { name: "Потужність", expr: "P = U · I = I² · R" },
        { name: "Опір провідника", expr: "R = ρ · l / S" }
      ],
      description: "Сила струму (I) прямо пропорційна напрузі (U) та обернено пропорційна опору (R). Збільшення напруги збільшує яскравість лампочки, а збільшення опору — зменшує.",
      wiki: "https://uk.wikipedia.org/wiki/Закон_Ома"
    },
    2: {
      title: "Теплові явища. Агрегатні стани",
      formulas: [
        { name: "Нагрівання", expr: "Q = c · m · Δt" },
        { name: "Плавлення", expr: "Q = λ · m" },
        { name: "Пароутворення", expr: "Q = L · m" }
      ],
      description: "Під час плавлення та кипіння вся підведена теплота йде на руйнування зв'язків між молекулами, тому температура не змінюється (горизонтальні ділянки на графіку T(Q)).",
      wiki: "https://uk.wikipedia.org/wiki/Агрегатний_стан_речовини"
    },
    3: {
      title: "Теплопровідність",
      formulas: [
        { name: "Закон Фур'є", expr: "Q / t = k · A · ΔT / L" }
      ],
      description: "Процес передачі внутрішньої енергії від більш нагрітих частин тіла до менш нагрітих через хаотичний рух мікрочастинок (атомів, молекул). Різні матеріали мають різну теплопровідність.",
      wiki: "https://uk.wikipedia.org/wiki/Теплопровідність"
    },
    4: {
      title: "Магнітне поле",
      formulas: [
        { name: "Магнітна індукція", expr: "B = μ₀ · I / (2πr)" },
        { name: "Сила Ампера", expr: "F = I · B · l · sinα" }
      ],
      description: "Навколо постійних магнітів та провідників зі струмом існує магнітне поле. Силові лінії магнітного поля завжди замкнені і виходять з північного полюса, входячи в південний.",
      wiki: "https://uk.wikipedia.org/wiki/Магнітне_поле"
    }
  },
  9: {
    1: {
      title: "Заломлення світла (Закон Снелліуса)",
      formulas: [
        { name: "Закон Снелліуса", expr: "n₁ · sin α = n₂ · sin β" },
        { name: "Абсолютний показник", expr: "n = c / v" },
        { name: "Фокусна відстань лінзи", expr: "1/f = (n-1)(1/R₁ + 1/R₂)" }
      ],
      description: "Випукла лінза збирає паралельні промені у фокусі (F). Увігнута — розсіює, створюючи уявний фокус. Показник заломлення визначає, наскільки сильно змінюється напрямок променя.",
      wiki: "https://uk.wikipedia.org/wiki/Закон_Снелліуса"
    },
    2: {
      title: "Механічні хвилі",
      formulas: [
        { name: "Швидкість хвилі", expr: "v = λ · ν" },
        { name: "Довжина хвилі", expr: "λ = v · T" },
        { name: "Рівняння хвилі", expr: "y = A·sin(kx − ωt)" }
      ],
      description: "Хвиля переносить енергію без перенесення речовини. Частинки середовища коливаються вгору-вниз (жовті точки), але не рухаються вздовж напрямку поширення хвилі.",
      wiki: "https://uk.wikipedia.org/wiki/Механічна_хвиля"
    },
    3: {
      title: "Закони відбивання світла",
      formulas: [
        { name: "Закон відбивання", expr: "α = β" },
        { name: "Формула дзеркала", expr: "1/F = 1/d + 1/f" }
      ],
      description: "Кут падіння дорівнює куту відбивання. Для плоского дзеркала зображення пряме та уявне. Увігнуті дзеркала можуть збирати промені у фокусі, а випуклі розсіюють їх.",
      wiki: "https://uk.wikipedia.org/wiki/Відбиття_світла"
    },
    4: {
      title: "Ефект Доплера",
      formulas: [
        { name: "Зміна частоти", expr: "ν' = ν · (v / (v ± v_дж))" }
      ],
      description: "Зміна частоти і довжини хвилі, що сприймається спостерігачем, внаслідок руху джерела хвиль. Попереду джерела хвилі стискаються (вищий тон), а позаду — розтягуються.",
      wiki: "https://uk.wikipedia.org/wiki/Ефект_Доплера"
    }
  },
  10: {
    1: {
      title: "Закони Ньютона. Динаміка",
      formulas: [
        { name: "Другий закон Ньютона", expr: "F = m · a" },
        { name: "Сила тяжіння", expr: "F = m · g" },
        { name: "Третій закон Ньютона", expr: "F₁₂ = −F₂₁" }
      ],
      description: "Прискорення тіла прямо пропорційне силі і обернено пропорційне масі. При зіткненні кульок виконується закон збереження імпульсу: m₁v₁ + m₂v₂ = const.",
      wiki: "https://uk.wikipedia.org/wiki/Закони_Ньютона"
    },
    2: {
      title: "Ідеальний газ (МКТ)",
      formulas: [
        { name: "Рівняння стану", expr: "PV = νRT" },
        { name: "Тиск газу", expr: "P = nkT = ⅓ρ<v²>" },
        { name: "Середня кін. енергія", expr: "Eк = ³⁄₂ kT" }
      ],
      description: "Тиск створюється ударами молекул об стінки. Зростає з температурою (молекули швидші) та зменшенням об'єму (частіші удари).",
      wiki: "https://uk.wikipedia.org/wiki/Молекулярно-кінетична_теорія"
    },
    3: {
      title: "Балістичний рух",
      formulas: [
        { name: "Рівняння траєкторії", expr: "y(x) = x·tanα - (gx²) / (2v₀²cos²α)" },
        { name: "Дальність польоту", expr: "L = v₀²·sin(2α) / g" }
      ],
      description: "Тіло, кинуте під кутом до горизонту, рухається по параболі. Рух розкладається на рівномірний по горизонталі та рівноприскорений по вертикалі. Опір повітря спотворює параболу.",
      wiki: "https://uk.wikipedia.org/wiki/Балістика"
    },
    4: {
      title: "Робота газу (Ізотермічний процес)",
      formulas: [
        { name: "Робота газу", expr: "A = P · ΔV" },
        { name: "Закон Бойля-Маріотта", expr: "P₁V₁ = P₂V₂ (при T=const)" }
      ],
      description: "Газ виконує роботу при зміні свого об'єму. На P-V діаграмі робота дорівнює площі під графіком. При ізотермічному процесі температура стала, і тиск обернено пропорційний об'єму.",
      wiki: "https://uk.wikipedia.org/wiki/Ізотермічний_процес"
    }
  },
  11: {
    1: {
      title: "Сила Лоренца",
      formulas: [
        { name: "Сила Лоренца", expr: "F = qvB·sinα" },
        { name: "Радіус кривизни", expr: "r = mv / (qB)" },
        { name: "Період обертання", expr: "T = 2πm / (qB)" }
      ],
      description: "Магнітне поле відхиляє заряджені частинки перпендикулярно до їхньої швидкості, змушуючи рухатися по колу. Позитивні та негативні заряди відхиляються у протилежні боки.",
      wiki: "https://uk.wikipedia.org/wiki/Сила_Лоренца"
    },
    2: {
      title: "Радіоактивний розпад",
      formulas: [
        { name: "Закон розпаду", expr: "N(t) = N₀ · 2^(−t/T½)" },
        { name: "Активність", expr: "A = λN = (ln2/T½)·N" },
        { name: "Енергія зв'язку", expr: "E = Δm · c²" }
      ],
      description: "Радіоактивний розпад — випадковий процес для кожного ядра, але статистично передбачуваний. За один період напіврозпаду (T½) розпадається рівно половина ядер.",
      wiki: "https://uk.wikipedia.org/wiki/Радіоактивний_розпад"
    },
    3: {
      title: "Електромагнітна індукція",
      formulas: [
        { name: "Закон Фарадея", expr: "ε = -ΔΦ / Δt" },
        { name: "Магнітний потік", expr: "Φ = B · S · cosα" }
      ],
      description: "Закон Фарадея: змінне магнітне поле створює вихрове електричне поле. При русі магніту крізь котушку виникає індукційний струм. Чим швидше рух, тим більша електрорушійна сила.",
      wiki: "https://uk.wikipedia.org/wiki/Електромагнітна_індукція"
    },
    4: {
      title: "Фотоефект",
      formulas: [
        { name: "Рівняння Ейнштейна", expr: "hν = A_вих + (m·v²)/2" },
        { name: "Енергія фотона", expr: "E = hc / λ" }
      ],
      description: "Явище виривання електронів з металу під дією світла. Фотоефект має червону межу — максимальну довжину хвилі (мінімальну енергію фотона), при якій фотоефект ще можливий.",
      wiki: "https://uk.wikipedia.org/wiki/Фотоефект"
    }
  }
};

export default function TheoryPanel() {
  const { theoryOpen, toggleTheory, activeGrade, activeExperiment } = useStore();

  if (!theoryOpen) {
    return (
      <button 
        onClick={toggleTheory}
        className="glass-panel"
        style={{
          position: 'absolute',
          bottom: '100px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '1px solid #10b981',
          color: '#10b981',
          zIndex: 100,
          boxShadow: '0 0 15px rgba(0,0,0,0.5), inset 0 0 10px #10b981'
        }}
        title="Довідник Фізика"
      >
        <BookOpen size={28} />
      </button>
    );
  }

  const current = theoryContent[activeGrade]?.[activeExperiment];

  return (
    <div className="glass-panel" style={{
      position: 'absolute',
      bottom: '100px',
      right: '20px',
      width: '370px',
      maxHeight: '450px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      overflow: 'hidden',
      border: '1px solid #10b981',
      boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
    }}>
      <div style={{
        padding: '12px 15px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: `rgba(0,0,0,0.3)`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={18} color={'#10b981'} />
          <h3 style={{ fontSize: '15px', margin: 0, color: '#fff' }}>Довідник Фізика</h3>
        </div>
        <button onClick={toggleTheory} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {current ? (
          <>
            <h4 style={{ color: '#10b981', margin: 0, fontSize: '17px' }}>{current.title}</h4>
            
            {current.formulas.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(16, 185, 129, 0.08)',
                padding: '8px 12px',
                borderRadius: '8px',
                borderLeft: '3px solid #10b981'
              }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '3px' }}>{f.name}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '15px', letterSpacing: '1px', color: '#fff' }}>
                  {f.expr}
                </div>
              </div>
            ))}

            <p style={{ color: 'var(--text-primary)', lineHeight: '1.5', fontSize: '13px', margin: 0 }}>
              {current.description}
            </p>

            <a 
              href={current.wiki} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#38bdf8',
                fontSize: '13px',
                textDecoration: 'none',
                marginTop: '5px'
              }}
            >
              <ExternalLink size={14} />
              Детальніше на Вікіпедії
            </a>
          </>
        ) : (
          <p style={{ color: '#94a3b8' }}>Оберіть дослід для перегляду теорії.</p>
        )}
      </div>
    </div>
  );
}
