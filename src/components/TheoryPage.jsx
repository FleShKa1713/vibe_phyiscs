import React from 'react';
import useStore from '../store/useStore';
import { theoryContent } from '../locales/translations';
import { ArrowLeft, Play, ExternalLink } from 'lucide-react';

export default function TheoryPage() {
  const { activeGrade, activeTheoryExp, setView, setActiveExperiment, language } = useStore();
  
  const theory = theoryContent[language][activeGrade][activeTheoryExp];
  
  if (!theory) return <div style={{color: 'white'}}>Theory not found</div>;

  return (
    <div className="theory-page-container">
      <div className="content-wrapper">
        <header className="theory-header">
          <button className="back-btn" onClick={() => setView('grade-overview')}>
            <ArrowLeft size={24} />
          </button>
          <div className="header-text">
            <span className="breadcrumb">{language === 'uk' ? 'Теорія' : 'Teorie'} / {activeGrade} {language === 'uk' ? 'Клас' : 'Třída'}</span>
            <h1 className="theory-title">{theory.title}</h1>
          </div>
          <button 
            className="launch-btn"
            onClick={() => {
              setActiveExperiment(activeTheoryExp);
              setView('experiment');
            }}
          >
            <Play size={20} fill="currentColor" />
            <span>{language === 'uk' ? 'Перейти до досліду' : 'Přejít k pokusu'}</span>
          </button>
        </header>

        <div className="theory-grid">
          <main className="main-content">
            <section className="theory-section card">
              <h2>{language === 'uk' ? 'Опис явища' : 'Popis jevu'}</h2>
              <p className="description-text">{theory.description}</p>
            </section>

            <section className="theory-section card">
              <h2>{language === 'uk' ? 'Основні формули' : 'Základní vzorce'}</h2>
              <div className="formulas-list">
                {theory.formulas.map((f, i) => (
                  <div key={i} className="formula-item">
                    <span className="formula-name">{f.name}:</span>
                    <code className="formula-expr">{f.expr}</code>
                  </div>
                ))}
              </div>
            </section>

            <section className="theory-section card">
              <h2>{language === 'uk' ? 'Додаткові матеріали' : 'Doplňující materiály'}</h2>
              <a href={theory.wiki} target="_blank" rel="noopener noreferrer" className="wiki-btn">
                <ExternalLink size={20} />
                <span>{language === 'uk' ? 'Читати повну статтю на Вікіпедії' : 'Číst celý článek na Wikipedii'}</span>
              </a>
            </section>
          </main>

          <aside className="side-content">
             <div className="info-card">
               <h3>{language === 'uk' ? 'Ключові поняття' : 'Klíčové pojmy'}</h3>
               <ul className="tags">
                 {theory.title.split(' ').map((word, i) => (
                   <li key={i}>{word}</li>
                 ))}
               </ul>
             </div>
             
             <div className="tip-card">
               <p><strong>{language === 'uk' ? 'Порада:' : 'Tip:'}</strong> {language === 'uk' ? 'Після прочитання теорії, обов\'язково спробуйте змінити параметри в симуляції, щоб побачити як вони впливають на результат.' : 'Po přečtení teorie si nezapomeňte vyzkoušet měnit parametry v simulaci, abyste viděli, jak ovlivňují výsledek.'}</p>
             </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .theory-page-container {
          min-height: 100vh;
          background: #020617;
          color: white;
          font-family: 'Inter', sans-serif;
          padding: 40px 10%;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          animation: fadeIn 0.8s ease-out;
        }

        .theory-header {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 60px;
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.1);
        }

        .header-text { flex: 1; }

        .breadcrumb {
          font-size: 0.9rem;
          color: #38bdf8;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .theory-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-top: 5px;
        }

        .launch-btn {
          background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
          border: none;
          color: white;
          padding: 14px 24px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.4);
        }

        .launch-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 30px -10px rgba(37, 99, 235, 0.6);
        }

        .theory-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }

        .card {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 30px;
          border-radius: 20px;
          margin-bottom: 30px;
          backdrop-filter: blur(10px);
        }

        h2 {
          font-size: 1.4rem;
          color: #38bdf8;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .description-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #cbd5e1;
        }

        .formula-item {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(0, 0, 0, 0.2);
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 15px;
        }

        .formula-name {
          font-weight: 600;
          color: #94a3b8;
        }

        .formula-expr {
          font-family: 'Courier New', monospace;
          font-size: 1.3rem;
          color: #fff;
          font-weight: 700;
        }

        .wiki-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #38bdf8;
          text-decoration: none;
          font-weight: 600;
          padding: 10px 0;
          transition: color 0.3s;
        }

        .wiki-btn:hover { color: #7dd3fc; }

        .side-content > div {
          background: rgba(30, 41, 59, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.03);
          padding: 25px;
          border-radius: 20px;
          margin-bottom: 20px;
        }

        .info-card h3 { font-size: 1.1rem; margin-bottom: 15px; color: #94a3b8; }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          list-style: none;
        }

        .tags li {
          background: rgba(56, 189, 248, 0.1);
          color: #38bdf8;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .tip-card {
          border-left: 4px solid #f59e0b !important;
          color: #cbd5e1;
          font-style: italic;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .theory-grid { grid-template-columns: 1fr; }
          .theory-header { flex-wrap: wrap; }
          .launch-btn { width: 100%; order: 3; }
        }
      `}</style>
    </div>
  );
}
