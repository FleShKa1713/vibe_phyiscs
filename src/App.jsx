import React from 'react';
import useStore from './store/useStore';
import ControlPanel from './components/ControlPanel';
import AITutor from './components/AITutor';
import TheoryPanel from './components/TheoryPanel';
import Grade7 from './modules/Grade7';
import Grade8 from './modules/Grade8';
import Grade9 from './modules/Grade9';
import Grade10 from './modules/Grade10';
import Grade11 from './modules/Grade11';
import { BookOpen, Droplets, Zap, Eye, Rocket, Atom } from 'lucide-react';

function App() {
  const { activeGrade, setActiveGrade, activeExperiment, setActiveExperiment } = useStore();

  const expNames = {
    7: { 1: 'Закон Архімеда', 2: 'Рівномірний рух', 3: 'Важіль', 4: 'Закон Паскаля' },
    8: { 1: 'Електричне коло', 2: 'Агрегатні стани', 3: 'Теплопровідність', 4: 'Магнітне поле' },
    9: { 1: 'Оптика (Лінзи)', 2: 'Хвилі', 3: 'Відбивання', 4: 'Ефект Доплера' },
    10: { 1: 'Динаміка', 2: 'Ідеальний газ', 3: 'Балістика', 4: 'P-V Діаграма' },
    11: { 1: 'Сила Лоренца', 2: 'Радіоактивність', 3: 'Індукція Фарадея', 4: 'Фотоефект' },
  };

  const expHints = {
    7: { 
      1: '🖱 Перетягніть брусок у воду. Змінюйте густину тіла та рідини.', 
      2: '🚗 Спостерігайте за графіком S(t). Змінюйте швидкість під час руху!',
      3: '⚖️ Додавайте тягарці на ліве та праве плече важеля. Слідкуйте за балансом моментів сил.',
      4: '💧 Чим глибше отвір, тим з більшою швидкістю вилітає струмінь (Закон Торрічеллі).'
    },
    8: { 
      1: '⚡ Змінюйте напругу та опір. Перетягуйте елементи.', 
      2: '🔥 Рухайте повзунок енергії — лід розтане, вода закипить!',
      3: '🔥 Збільшуйте температуру зліва і спостерігайте за поширенням кінетичної енергії атомів.',
      4: '🧲 Обертайте магніт і спостерігайте, як залізні ошурки шикуються вздовж ліній магнітного поля.'
    },
    9: { 
      1: '🔬 Перетягуйте лінзу та лазер. Обертайте за край. Вибирайте тип лінзи.', 
      2: '🌊 Перетягуйте генератор. Змінюйте частоту та амплітуду.',
      3: '🪞 Перемикайте типи дзеркал (плоске, опукле, увігнуте). Знайдіть фокус увігнутого дзеркала.',
      4: '🔊 Рухайте джерело звуку. Подолайте звуковий бар\'єр для утворення конуса Маха!'
    },
    10: { 
      1: '🏀 Перетягуйте кульки. Змінюйте гравітацію та пружність.', 
      2: '🌡 Змінюйте температуру та об\'єм — спостерігайте за тиском.',
      3: '🎯 Налаштуйте кут та початкову швидкість гармати. Увімкніть опір повітря для реалістичної траєкторії.',
      4: '📈 Змінюйте об\'єм газу під поршнем і спостерігайте за малюванням ізотерми на P-V діаграмі.'
    },
    11: { 
      1: '🧲 Перетягуйте випромінювач. Змінюйте магнітне поле.', 
      2: '☢ Змінюйте ймовірність розпаду ядер.',
      3: '🧲 Рухайте магніт крізь котушку дроту. Спостерігайте за індукційним струмом на амперметрі.',
      4: '💡 Змінюйте колір (енергію) світла. Червоне світло не вибиває електрони, а ультрафіолетове — легко!'
    },
  };

  const renderModule = () => {
    switch (activeGrade) {
      case 7: return <Grade7 />;
      case 8: return <Grade8 />;
      case 9: return <Grade9 />;
      case 10: return <Grade10 />;
      case 11: return <Grade11 />;
      default: return <Grade7 />;
    }
  };

  const navItems = [
    { grade: 7, label: '7 Клас', icon: <Droplets size={24} /> },
    { grade: 8, label: '8 Клас', icon: <Zap size={24} /> },
    { grade: 9, label: '9 Клас', icon: <Eye size={24} /> },
    { grade: 10, label: '10 Клас', icon: <Rocket size={24} /> },
    { grade: 11, label: '11 Клас', icon: <Atom size={24} /> },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', overflow: 'hidden', backgroundColor: 'var(--bg-color)' }}>
      {/* Sidebar Navigation */}
      <nav className="glass-panel" style={{
        width: '90px',
        height: 'calc(100vh - 40px)',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        gap: '20px',
        zIndex: 20
      }}>
        <div style={{ marginBottom: '20px', color: '#fff' }}>
          <BookOpen size={32} />
        </div>
        {navItems.map(item => (
          <button 
            key={item.grade}
            onClick={() => setActiveGrade(item.grade)}
            style={{
              background: 'none',
              border: 'none',
              color: activeGrade === item.grade ? `var(--accent-mechanics)` : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s',
              transform: activeGrade === item.grade ? 'scale(1.1)' : 'scale(1)'
            }}
            title={item.label}
          >
            <div style={{
              padding: '12px',
              borderRadius: '12px',
              background: activeGrade === item.grade ? `rgba(255,255,255,0.1)` : 'transparent',
              boxShadow: activeGrade === item.grade ? `0 0 15px var(--accent-mechanics)` : 'none',
            }}>
              {item.icon}
            </div>
            <span style={{ fontSize: '11px', fontWeight: activeGrade === item.grade ? 'bold' : 'normal' }}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top bar — experiment tabs with names */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '10px'
        }}>
          {[1, 2, 3, 4].map(num => (
            <button 
              key={num}
              className="glass-panel"
              onClick={() => setActiveExperiment(num)}
              style={{
                padding: '8px 18px',
                cursor: 'pointer',
                background: activeExperiment === num ? 'rgba(59, 130, 246, 0.4)' : 'var(--panel-bg)',
                color: '#fff',
                border: `1px solid ${activeExperiment === num ? '#3b82f6' : 'var(--panel-border)'}`,
                fontSize: '13px'
              }}
            >
              {expNames[activeGrade]?.[num] || `Дослід ${num}`}
            </button>
          ))}
        </div>

        {/* Hint — bottom left, non-intrusive */}
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '15px',
          zIndex: 10,
          maxWidth: '310px',
          padding: '7px 11px',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.07)',
          pointerEvents: 'none'
        }}>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '11px', lineHeight: '1.4' }}>
            {expHints[activeGrade]?.[activeExperiment] || ''}
          </p>
        </div>

        <div style={{ flex: 1, position: 'relative' }}>
          {renderModule()}
        </div>
        
        <ControlPanel />
        <TheoryPanel />
        <AITutor />
      </main>
    </div>
  );
}

export default App;
