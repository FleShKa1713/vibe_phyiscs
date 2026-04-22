import React from 'react';
import useStore from '../store/useStore';
import translations from '../locales/translations';
import { Play, BookOpen, ArrowLeft } from 'lucide-react';

export default function GradeOverview() {
  const { activeGrade, setView, setActiveExperiment, setActiveTheoryExp, language } = useStore();
  const t = translations[language];
  const experiments = [1, 2, 3, 4];

  return (
    <div className="overview-container">
      <header className="overview-header">
        <button className="back-btn" onClick={() => setView('home')}>
          <ArrowLeft size={24} />
          <span>{language === 'uk' ? 'До класів' : 'Zpět do tříd'}</span>
        </button>
        <h1 className="overview-title">{t.grades[activeGrade]}</h1>
      </header>

      <div className="experiments-grid">
        {experiments.map(exp => (
          <div key={exp} className="exp-card glass-panel">
            <div className="exp-info">
              <span className="exp-number">0{exp}</span>
              <h2 className="exp-title">{t.expNames[activeGrade][exp]}</h2>
              <p className="exp-summary">{t.expHints[activeGrade][exp]}</p>
            </div>
            
            <div className="exp-actions">
              <button 
                className="action-btn theory"
                onClick={() => setActiveTheoryExp(exp)}
              >
                <BookOpen size={20} />
                {language === 'uk' ? 'Читати теорію' : 'Číst teorii'}
              </button>
              <button 
                className="action-btn simulation"
                onClick={() => {
                  setActiveExperiment(exp);
                  setView('experiment');
                }}
              >
                <Play size={20} />
                {language === 'uk' ? 'Запустити дослід' : 'Spustit pokus'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .overview-container {
          min-height: 100vh;
          background: #020617;
          color: white;
          padding: 40px 10%;
          font-family: 'Inter', sans-serif;
        }

        .overview-header {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-bottom: 60px;
          animation: fadeInDown 0.6s ease-out;
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          padding: 10px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateX(-5px);
        }

        .overview-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(to right, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .experiments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          animation: fadeInUp 0.8s ease-out;
        }

        .exp-card {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          transition: all 0.3s;
          position: relative;
          border: 1px solid rgba(56, 189, 248, 0.1);
        }

        .exp-card:hover {
          border-color: rgba(56, 189, 248, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
        }

        .exp-number {
          font-size: 0.9rem;
          font-weight: 700;
          color: #38bdf8;
          letter-spacing: 2px;
          margin-bottom: 15px;
          display: block;
        }

        .exp-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .exp-summary {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .exp-actions {
          display: flex;
          gap: 15px;
        }

        .action-btn {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .action-btn.theory {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .action-btn.theory:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .action-btn.simulation {
          background: #38bdf8;
          color: #020617;
        }

        .action-btn.simulation:hover {
          background: #7dd3fc;
          transform: scale(1.02);
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .overview-container { padding: 40px 5%; }
          .overview-header { flex-direction: column; align-items: flex-start; gap: 20px; }
          .experiments-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
