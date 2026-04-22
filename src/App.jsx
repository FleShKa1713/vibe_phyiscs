import React from 'react';
import useStore from './store/useStore';
import ControlPanel from './components/ControlPanel';
import AITutor from './components/AITutor';
import TheoryPanel from './components/TheoryPanel';
import LanguageSwitcher from './components/LanguageSwitcher';
import Home from './components/Home';
import Grade7 from './modules/Grade7';
import Grade8 from './modules/Grade8';
import Grade9 from './modules/Grade9';
import Grade10 from './modules/Grade10';
import Grade11 from './modules/Grade11';
import { BookOpen, Droplets, Zap, Eye, Rocket, Atom, Home as HomeIcon } from 'lucide-react';
import translations from './locales/translations';

function App() {
  const { 
    view, 
    setView, 
    activeGrade, 
    setActiveGrade, 
    activeExperiment, 
    setActiveExperiment, 
    language 
  } = useStore();

  const t = translations[language];

  if (view === 'home') {
    return (
      <>
        <LanguageSwitcher />
        <Home />
      </>
    );
  }

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
    { grade: 7, label: t.grades[7], icon: <Droplets size={24} /> },
    { grade: 8, label: t.grades[8], icon: <Zap size={24} /> },
    { grade: 9, label: t.grades[9], icon: <Eye size={24} /> },
    { grade: 10, label: t.grades[10], icon: <Rocket size={24} /> },
    { grade: 11, label: t.grades[11], icon: <Atom size={24} /> },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', overflow: 'hidden', backgroundColor: 'var(--bg-color)' }}>
      <LanguageSwitcher />
      
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
        {/* Home Button */}
        <button 
          onClick={() => setView('home')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            marginBottom: '10px',
            transition: 'all 0.3s'
          }}
          title="Home"
        >
          <div style={{ padding: '12px', borderRadius: '12px' }}>
            <HomeIcon size={32} />
          </div>
        </button>

        <div style={{ width: '60%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '10px' }} />

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
              {t.expNames[activeGrade]?.[num] || `Дослід ${num}`}
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
            {t.expHints[activeGrade]?.[activeExperiment] || ''}
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
