import React from 'react';
import useStore from '../store/useStore';

export default function ControlPanel() {
  const { 
    activeGrade, activeExperiment,
    grade7Params, setGrade7Params,
    grade8Params, setGrade8Params,
    grade9Params, setGrade9Params,
    grade10Params, setGrade10Params,
    grade11Params, setGrade11Params,
    showVectors, toggleVectors,
    triggerReset
  } = useStore();

  const renderSliders = () => {
    switch (activeGrade) {
      case 7:
        if (activeExperiment === 1) {
          return (
            <>
              <div className="slider-group">
                <label>Густина рідини: {grade7Params.archimedesLiquidDensity} кг/м³</label>
                <input type="range" min="500" max="1500" step="10" value={grade7Params.archimedesLiquidDensity} 
                  onChange={(e) => setGrade7Params({ archimedesLiquidDensity: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Густина тіла: {grade7Params.archimedesObjectDensity} кг/м³</label>
                <input type="range" min="100" max="2000" step="10" value={grade7Params.archimedesObjectDensity} 
                  onChange={(e) => setGrade7Params({ archimedesObjectDensity: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Розмір тіла: {grade7Params.archimedesObjectSize} px</label>
                <input type="range" min="50" max="150" step="5" value={grade7Params.archimedesObjectSize} 
                  onChange={(e) => setGrade7Params({ archimedesObjectSize: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 2) {
          return (
            <>
              <div className="slider-group">
                <label>Швидкість (м/с): {grade7Params.kinematicsVelocity}</label>
                <input type="range" min="0" max="20" step="1" value={grade7Params.kinematicsVelocity} 
                  onChange={(e) => setGrade7Params({ kinematicsVelocity: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Розмір машинки: {grade7Params.kinematicsCarSize.toFixed(1)}x</label>
                <input type="range" min="0.5" max="2.0" step="0.1" value={grade7Params.kinematicsCarSize} 
                  onChange={(e) => setGrade7Params({ kinematicsCarSize: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 3) {
          return (
            <>
              <div className="slider-group">
                <label>Маса лівого тягарця: {grade7Params.leverLeftMass} кг</label>
                <input type="range" min="1" max="15" step="0.5" value={grade7Params.leverLeftMass} 
                  onChange={(e) => setGrade7Params({ leverLeftMass: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Маса правого тягарця: {grade7Params.leverRightMass} кг</label>
                <input type="range" min="1" max="15" step="0.5" value={grade7Params.leverRightMass} 
                  onChange={(e) => setGrade7Params({ leverRightMass: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Позиція лівого (L): {grade7Params.leverLeftPos}</label>
                <input type="range" min="1" max="5" step="1" value={grade7Params.leverLeftPos} 
                  onChange={(e) => setGrade7Params({ leverLeftPos: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Позиція правого (R): {grade7Params.leverRightPos}</label>
                <input type="range" min="1" max="5" step="1" value={grade7Params.leverRightPos} 
                  onChange={(e) => setGrade7Params({ leverRightPos: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Зсув опори (Δx): {grade7Params.leverFulcrumOffset}</label>
                <input type="range" min="-100" max="100" step="10" value={grade7Params.leverFulcrumOffset} 
                  onChange={(e) => setGrade7Params({ leverFulcrumOffset: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 4) {
          return (
            <>
              <div className="slider-group">
                <label>Рівень води в баці: {grade7Params.tankWaterLevel}%</label>
                <input type="range" min="10" max="100" step="1" value={grade7Params.tankWaterLevel} 
                  onChange={(e) => setGrade7Params({ tankWaterLevel: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        }
        return null;
      case 8:
        if (activeExperiment === 1) {
          return (
            <>
              <div className="slider-group">
                <label>Напруга (В): {grade8Params.circuitVoltage}</label>
                <input type="range" min="0" max="24" step="1" value={grade8Params.circuitVoltage} 
                  onChange={(e) => setGrade8Params({ circuitVoltage: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Опір (Ом): {grade8Params.circuitResistance}</label>
                <input type="range" min="1" max="50" step="1" value={grade8Params.circuitResistance} 
                  onChange={(e) => setGrade8Params({ circuitResistance: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 2) {
          return (
            <>
              <div className="slider-group">
                <label>Додати енергію (Тепло): {grade8Params.thermalEnergy}</label>
                <input type="range" min="0" max="1000" step="10" value={grade8Params.thermalEnergy} 
                  onChange={(e) => setGrade8Params({ thermalEnergy: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Питома теплоємність: {grade8Params.heatCapacity}</label>
                <input type="range" min="1000" max="5000" step="100" value={grade8Params.heatCapacity} 
                  onChange={(e) => setGrade8Params({ heatCapacity: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 3) {
          return (
            <>
              <div className="slider-group">
                <label>Температура джерела (°C): {grade8Params.heatSourceTemp}</label>
                <input type="range" min="0" max="100" step="1" value={grade8Params.heatSourceTemp} 
                  onChange={(e) => setGrade8Params({ heatSourceTemp: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group" style={{ marginTop: '10px' }}>
                <label>Матеріал стрижня:</label>
                <select 
                  value={grade8Params.thermalMaterial || 'copper'}
                  onChange={(e) => setGrade8Params({ thermalMaterial: e.target.value })}
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid #3b82f6', borderRadius: '6px' }}
                >
                  <option value="copper">Мідь (Висока теплопровідність)</option>
                  <option value="iron">Залізо (Середня теплопровідність)</option>
                  <option value="glass">Скло (Низька теплопровідність)</option>
                  <option value="wood">Дерево (Ізолятор)</option>
                </select>
              </div>
            </>
          );
        } else if (activeExperiment === 4) {
          return (
            <>
              <div className="slider-group">
                <label>Кількість магнітів: {grade8Params.magnetCount}</label>
                <input type="range" min="1" max="3" step="1" value={grade8Params.magnetCount} 
                  onChange={(e) => setGrade8Params({ magnetCount: parseInt(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Кут повороту магніту (°): {grade8Params.magnetAngle}</label>
                <input type="range" min="0" max="360" step="5" value={grade8Params.magnetAngle} 
                  onChange={(e) => setGrade8Params({ magnetAngle: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        }
        return null;
      case 9:
        if (activeExperiment === 1) {
          return (
            <>
              <div className="slider-group">
                <label>Тип оптичного елемента:</label>
                <select 
                  value={grade9Params.lensType}
                  onChange={(e) => setGrade9Params({ lensType: e.target.value })}
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid #3b82f6', borderRadius: '6px' }}
                >
                  <option value="convex">Випукла лінза (Збиральна)</option>
                  <option value="concave">Увігнута лінза (Розсіювальна)</option>
                  <option value="prism">Прямокутна призма</option>
                </select>
              </div>
              <div className="slider-group" style={{ marginTop: '10px' }}>
                <label>Показник заломлення лінзи: {grade9Params.lensRefractiveIndex.toFixed(2)}</label>
                <input type="range" min="1" max="2.5" step="0.1" value={grade9Params.lensRefractiveIndex} 
                  onChange={(e) => setGrade9Params({ lensRefractiveIndex: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  Колір лазера:
                  <input type="color" value={grade9Params.laserColor} 
                    onChange={(e) => setGrade9Params({ laserColor: e.target.value })} 
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', height: '24px' }}/>
                </label>
              </div>
            </>
          );
        } else if (activeExperiment === 2) {
          return (
            <>
              <div className="slider-group">
                <label>Частота хвилі: {grade9Params.waveFrequency}</label>
                <input type="range" min="1" max="10" step="0.5" value={grade9Params.waveFrequency} 
                  onChange={(e) => setGrade9Params({ waveFrequency: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Амплітуда: {grade9Params.waveAmplitude.toFixed(1)}</label>
                <input type="range" min="0.1" max="3" step="0.1" value={grade9Params.waveAmplitude} 
                  onChange={(e) => setGrade9Params({ waveAmplitude: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 3) {
          return (
            <>
              <div className="slider-group">
                <label>Тип дзеркала:</label>
                <select 
                  value={grade9Params.mirrorType}
                  onChange={(e) => setGrade9Params({ mirrorType: e.target.value })}
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid #3b82f6', borderRadius: '6px' }}
                >
                  <option value="flat">Плоске дзеркало</option>
                  <option value="convex">Опукле дзеркало</option>
                  <option value="concave">Увігнуте дзеркало</option>
                </select>
              </div>
            </>
          );
        } else if (activeExperiment === 4) {
          return (
            <>
              <div className="slider-group">
                <label>Швидкість джерела: {grade9Params.dopplerSpeed} м/с</label>
                <input type="range" min="0" max="600" step="10" value={grade9Params.dopplerSpeed} 
                  onChange={(e) => setGrade9Params({ dopplerSpeed: parseFloat(e.target.value) })} />
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '-5px' }}>Швидкість звуку: 340 м/с</p>
            </>
          );
        }
        return null;
      case 10:
        if (activeExperiment === 1) {
          return (
            <>
              <div className="slider-group">
                <label>Гравітація: {grade10Params.gravity.toFixed(2)}</label>
                <input type="range" min="0" max="20" step="0.5" value={grade10Params.gravity} 
                  onChange={(e) => setGrade10Params({ gravity: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Пружність: {grade10Params.restitution.toFixed(2)}</label>
                <input type="range" min="0" max="1" step="0.1" value={grade10Params.restitution} 
                  onChange={(e) => setGrade10Params({ restitution: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 2) {
          return (
            <>
              <div className="slider-group">
                <label>Температура Газу (K): {grade10Params.gasTemperature}</label>
                <input type="range" min="100" max="1000" step="10" value={grade10Params.gasTemperature} 
                  onChange={(e) => setGrade10Params({ gasTemperature: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Об'єм камери: {grade10Params.gasVolume}</label>
                <input type="range" min="50" max="200" step="10" value={grade10Params.gasVolume} 
                  onChange={(e) => setGrade10Params({ gasVolume: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Маса частинок (у.о.): {grade10Params.particleMass}</label>
                <input type="range" min="1" max="10" step="1" value={grade10Params.particleMass} 
                  onChange={(e) => setGrade10Params({ particleMass: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 3) {
          return (
            <>
              <div className="slider-group">
                <label>Кут гармати (°): {grade10Params.cannonAngle}</label>
                <input type="range" min="0" max="90" step="1" value={grade10Params.cannonAngle} 
                  onChange={(e) => setGrade10Params({ cannonAngle: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Початкова швидкість: {grade10Params.cannonSpeed} м/с</label>
                <input type="range" min="5" max="50" step="1" value={grade10Params.cannonSpeed} 
                  onChange={(e) => setGrade10Params({ cannonSpeed: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Опір повітря (k): {grade10Params.airResistance.toFixed(2)}</label>
                <input type="range" min="0" max="0.5" step="0.01" value={grade10Params.airResistance} 
                  onChange={(e) => setGrade10Params({ airResistance: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 4) {
          return (
            <>
              <div className="slider-group">
                <label>Об'єм газу (V): {grade10Params.gasPistonVolume}</label>
                <input type="range" min="30" max="200" step="1" value={grade10Params.gasPistonVolume} 
                  onChange={(e) => setGrade10Params({ gasPistonVolume: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        }
        return null;
      case 11:
        if (activeExperiment === 1) {
          return (
            <>
              <div className="slider-group">
                <label>Магнітне поле (B): {grade11Params.magneticFieldZ.toFixed(2)}</label>
                <input type="range" min="-0.2" max="0.2" step="0.01" value={grade11Params.magneticFieldZ} 
                  onChange={(e) => setGrade11Params({ magneticFieldZ: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Початкова швидкість (v): {grade11Params.particleVelocity.toFixed(1)}</label>
                <input type="range" min="1" max="15" step="0.5" value={grade11Params.particleVelocity} 
                  onChange={(e) => setGrade11Params({ particleVelocity: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 2) {
          return (
            <div className="slider-group">
              <label>Ймовірність розпаду: {grade11Params.decayProbability.toFixed(3)}</label>
              <input type="range" min="0.001" max="0.1" step="0.001" value={grade11Params.decayProbability} 
                onChange={(e) => setGrade11Params({ decayProbability: parseFloat(e.target.value) })} />
            </div>
          );
        } else if (activeExperiment === 3) {
          return (
            <>
              <div className="slider-group">
                <label>Кількість витків котушки: {grade11Params.inductionCoilTurns}</label>
                <input type="range" min="100" max="1000" step="50" value={grade11Params.inductionCoilTurns} 
                  onChange={(e) => setGrade11Params({ inductionCoilTurns: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Швидкість магніту: {grade11Params.magnetSpeed} м/с</label>
                <input type="range" min="0" max="50" step="1" value={grade11Params.magnetSpeed} 
                  onChange={(e) => setGrade11Params({ magnetSpeed: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 4) {
          return (
            <>
              <div className="slider-group">
                <label>Довжина хвилі (λ): {grade11Params.photonWavelength} нм</label>
                <input type="range" min="200" max="800" step="10" value={grade11Params.photonWavelength} 
                  onChange={(e) => setGrade11Params({ photonWavelength: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>Робота виходу (A): {grade11Params.workFunction.toFixed(1)} еВ</label>
                <input type="range" min="1.0" max="5.0" step="0.1" value={grade11Params.workFunction} 
                  onChange={(e) => setGrade11Params({ workFunction: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        }
        return null;
      default: return null;
    }
  };

  return (
    <div className="glass-panel" style={{
      position: 'absolute',
      right: '20px',
      top: '20px',
      width: '300px',
      padding: '20px',
      zIndex: 10
    }}>
      <h3 style={{ marginBottom: '15px', color: '#3b82f6' }}>
        Параметри ({activeGrade} Клас)
      </h3>
      
      {renderSliders()}
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={toggleVectors} style={{
          flex: 1, padding: '8px', background: showVectors ? '#3b82f6' : 'transparent',
          border: '1px solid #3b82f6', color: '#fff',
          borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s'
        }}>
          {showVectors ? 'Сховати вектори' : 'Показати вектори'}
        </button>
        <button onClick={triggerReset} style={{
          flex: 1, padding: '8px', background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
          borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s'
        }}>
          Скинути
        </button>
      </div>

      <style>{`
        .slider-group {
          margin-bottom: 15px;
        }
        .slider-group label {
          display: block;
          font-size: 14px;
          margin-bottom: 8px;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
