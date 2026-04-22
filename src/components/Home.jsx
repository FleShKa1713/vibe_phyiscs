import React from 'react';
import useStore from '../store/useStore';
import translations from '../locales/translations';

export default function Home() {
  const { setView, setActiveGrade, language } = useStore();
  const t = translations[language].landing;
  const grades = [7, 8, 9, 10, 11];

  const getGradeDesc = (grade) => {
    switch(grade) {
      case 7: return t.grade7Desc;
      case 8: return t.grade8Desc;
      case 9: return t.grade9Desc;
      case 10: return t.grade10Desc;
      case 11: return t.grade11Desc;
      default: return "";
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <button 
            className="cta-button"
            onClick={() => {
               setActiveGrade(7);
               setView('experiment');
            }}
          >
            {t.startBtn}
          </button>
        </div>
        <div className="hero-visual">
          <div className="sphere sphere-1"></div>
          <div className="sphere sphere-2"></div>
          <div className="sphere sphere-3"></div>
        </div>
      </section>

      {/* Grades Grid */}
      <section className="grades-section">
        <h2 className="section-title">{t.gradesTitle}</h2>
        <div className="grades-grid">
          {grades.map(grade => (
            <div 
              key={grade} 
              className="grade-card"
              onClick={() => setActiveGrade(grade)}
            >
              <div className="grade-number">{grade}</div>
              <h3 className="grade-title">{translations[language].grades[grade]}</h3>
              <p className="grade-desc">{getGradeDesc(grade)}</p>
              <div className="card-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <p>{t.footerText} © 2024</p>
      </footer>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: #020617;
          color: white;
          font-family: 'Outfit', 'Inter', sans-serif;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        .hero {
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10%;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 40%),
                      radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 40%);
        }

        .hero-content {
          max-width: 600px;
          z-index: 10;
          animation: fadeInUp 1s ease-out;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(to right, #fff, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #94a3b8;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .cta-button {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
          border: none;
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4);
        }

        .cta-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 20px 35px -10px rgba(37, 99, 235, 0.6);
        }

        .hero-visual {
          position: relative;
          width: 400px;
          height: 400px;
        }

        .sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.6;
          animation: float 10s infinite ease-in-out;
        }

        .sphere-1 {
          width: 300px; height: 300px;
          background: #38bdf8;
          top: -50px; right: -50px;
        }

        .sphere-2 {
          width: 200px; height: 200px;
          background: #818cf8;
          bottom: -20px; left: -20px;
          animation-delay: -2s;
        }

        .sphere-3 {
          width: 150px; height: 150px;
          background: #c084fc;
          top: 50%; left: 50%;
          animation-delay: -5s;
        }

        .grades-section {
          padding: 8rem 10%;
          background: #020617;
        }

        .section-title {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 4rem;
          font-weight: 700;
        }

        .grades-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .grade-card {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 2.5rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .grade-card:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: #38bdf8;
          transform: translateY(-10px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .grade-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s;
        }

        .grade-card:hover::before {
          opacity: 1;
        }

        .grade-number {
          font-size: 4rem;
          font-weight: 900;
          opacity: 0.1;
          position: absolute;
          top: -10px;
          right: 10px;
          transition: all 0.4s;
        }

        .grade-card:hover .grade-number {
          opacity: 0.3;
          transform: scale(1.2);
          color: #38bdf8;
        }

        .grade-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          position: relative;
        }

        .grade-desc {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 2rem;
          position: relative;
        }

        .card-arrow {
          font-size: 1.5rem;
          color: #38bdf8;
          transition: transform 0.3s;
        }

        .grade-card:hover .card-arrow {
          transform: translateX(10px);
        }

        .home-footer {
          padding: 4rem 10%;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: #475569;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @media (max-width: 768px) {
          .hero { padding: 0 5%; flex-direction: column; justify-content: center; text-align: center; }
          .hero-visual { display: none; }
          .hero-content { margin-top: 5rem; }
        }
      `}</style>
    </div>
  );
}
