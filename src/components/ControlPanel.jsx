import React from 'react';
import useStore from '../store/useStore';
import translations from '../locales/translations';

export default function ControlPanel() {
  const { 
    activeGrade, activeExperiment,
    grade6Params, setGrade6Params,
    grade7Params, setGrade7Params,
    grade8Params, setGrade8Params,
    grade9Params, setGrade9Params,
    grade10Params, setGrade10Params,
    grade11Params, setGrade11Params,
    showVectors, toggleVectors,
    triggerReset, language
  } = useStore();

  const t = translations[language];

  const renderSliders = () => {
    switch (activeGrade) {
      case 6:
        if (activeExperiment === 1) {
          return (
            <>
              <div className="slider-group">
                <label>{language === 'uk' ? 'Температура' : 'Teplota'}: {grade6Params.matterTemperature} °C</label>
                <input type="range" min="-50" max="500" step="5" value={grade6Params.matterTemperature} 
                  onChange={(e) => setGrade6Params({ matterTemperature: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 3) {
          return (
            <>
              <div className="slider-group">
                <label>{language === 'uk' ? 'Другий магніт' : 'Druhý magnet'}: {grade6Params.magnet2Enabled ? 'ON' : 'OFF'}</label>
                <button className="toggle-btn" onClick={() => setGrade6Params({ magnet2Enabled: !grade6Params.magnet2Enabled })}>
                  {grade6Params.magnet2Enabled 
                    ? (language === 'uk' ? 'Сховати' : 'Skrýt') 
                    : (language === 'uk' ? 'Показати' : 'Zobrazit')}
                </button>
              </div>
            </>
          );
        }
        return null;
      case 7:
        if (activeExperiment === 1) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.densityLiq}: {grade7Params.archimedesLiquidDensity} кг/м³</label>
                <input type="range" min="500" max="1500" step="10" value={grade7Params.archimedesLiquidDensity} 
                  onChange={(e) => setGrade7Params({ archimedesLiquidDensity: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.densityObj}: {grade7Params.archimedesObjectDensity} кг/м³</label>
                <input type="range" min="100" max="2000" step="10" value={grade7Params.archimedesObjectDensity} 
                  onChange={(e) => setGrade7Params({ archimedesObjectDensity: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.objSize}: {grade7Params.archimedesObjectSize} px</label>
                <input type="range" min="50" max="150" step="5" value={grade7Params.archimedesObjectSize} 
                  onChange={(e) => setGrade7Params({ archimedesObjectSize: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 2) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.velocityLabel} (м/с): {grade7Params.kinematicsVelocity}</label>
                <input type="range" min="0" max="20" step="1" value={grade7Params.kinematicsVelocity} 
                  onChange={(e) => setGrade7Params({ kinematicsVelocity: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.carSize}: {grade7Params.kinematicsCarSize.toFixed(1)}x</label>
                <input type="range" min="0.5" max="2.0" step="0.1" value={grade7Params.kinematicsCarSize} 
                  onChange={(e) => setGrade7Params({ kinematicsCarSize: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 3) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.massLeft}: {grade7Params.leverLeftMass} кг</label>
                <input type="range" min="1" max="15" step="0.5" value={grade7Params.leverLeftMass} 
                  onChange={(e) => setGrade7Params({ leverLeftMass: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.massRight}: {grade7Params.leverRightMass} кг</label>
                <input type="range" min="1" max="15" step="0.5" value={grade7Params.leverRightMass} 
                  onChange={(e) => setGrade7Params({ leverRightMass: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.posLeft}: {grade7Params.leverLeftPos}</label>
                <input type="range" min="1" max="5" step="1" value={grade7Params.leverLeftPos} 
                  onChange={(e) => setGrade7Params({ leverLeftPos: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.posRight}: {grade7Params.leverRightPos}</label>
                <input type="range" min="1" max="5" step="1" value={grade7Params.leverRightPos} 
                  onChange={(e) => setGrade7Params({ leverRightPos: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.fulcrumOffset}: {grade7Params.leverFulcrumOffset}</label>
                <input type="range" min="-100" max="100" step="10" value={grade7Params.leverFulcrumOffset} 
                  onChange={(e) => setGrade7Params({ leverFulcrumOffset: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 4) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.waterLevel}: {grade7Params.tankWaterLevel}%</label>
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
                <label>{t.ui.voltage}: {grade8Params.circuitVoltage}</label>
                <input type="range" min="0" max="24" step="1" value={grade8Params.circuitVoltage} 
                  onChange={(e) => setGrade8Params({ circuitVoltage: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.resistance}: {grade8Params.circuitResistance}</label>
                <input type="range" min="1" max="50" step="1" value={grade8Params.circuitResistance} 
                  onChange={(e) => setGrade8Params({ circuitResistance: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 2) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.addEnergy}: {grade8Params.thermalEnergy}</label>
                <input type="range" min="0" max="1000" step="10" value={grade8Params.thermalEnergy} 
                  onChange={(e) => setGrade8Params({ thermalEnergy: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.heatCap}: {grade8Params.heatCapacity}</label>
                <input type="range" min="1000" max="5000" step="100" value={grade8Params.heatCapacity} 
                  onChange={(e) => setGrade8Params({ heatCapacity: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 3) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.sourceTemp}: {grade8Params.heatSourceTemp}</label>
                <input type="range" min="0" max="100" step="1" value={grade8Params.heatSourceTemp} 
                  onChange={(e) => setGrade8Params({ heatSourceTemp: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group" style={{ marginTop: '10px' }}>
                <label>{t.ui.material}:</label>
                <select 
                  value={grade8Params.thermalMaterial || 'copper'}
                  onChange={(e) => setGrade8Params({ thermalMaterial: e.target.value })}
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid #3b82f6', borderRadius: '6px' }}
                >
                  <option value="copper">{t.ui.copper}</option>
                  <option value="iron">{t.ui.iron}</option>
                  <option value="glass">{t.ui.glass}</option>
                  <option value="wood">{t.ui.wood}</option>
                </select>
              </div>
            </>
          );
        } else if (activeExperiment === 4) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.magnets}: {grade8Params.magnetCount}</label>
                <input type="range" min="1" max="3" step="1" value={grade8Params.magnetCount} 
                  onChange={(e) => setGrade8Params({ magnetCount: parseInt(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.magnetAngle}: {grade8Params.magnetAngle}</label>
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
                <label>{t.ui.optElement}:</label>
                <select 
                  value={grade9Params.lensType}
                  onChange={(e) => setGrade9Params({ lensType: e.target.value })}
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid #3b82f6', borderRadius: '6px' }}
                >
                  <option value="convex">{t.ui.convex}</option>
                  <option value="concave">{t.ui.concave}</option>
                  <option value="prism">{t.ui.prism}</option>
                </select>
              </div>
              <div className="slider-group" style={{ marginTop: '10px' }}>
                <label>{t.ui.refrIndex}: {grade9Params.lensRefractiveIndex.toFixed(2)}</label>
                <input type="range" min="1" max="2.5" step="0.1" value={grade9Params.lensRefractiveIndex} 
                  onChange={(e) => setGrade9Params({ lensRefractiveIndex: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {t.ui.laserColor}:
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
                <label>{t.ui.frequency}: {grade9Params.waveFrequency}</label>
                <input type="range" min="1" max="10" step="0.5" value={grade9Params.waveFrequency} 
                  onChange={(e) => setGrade9Params({ waveFrequency: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.amplitude}: {grade9Params.waveAmplitude.toFixed(1)}</label>
                <input type="range" min="0.1" max="3" step="0.1" value={grade9Params.waveAmplitude} 
                  onChange={(e) => setGrade9Params({ waveAmplitude: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 3) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.mirrorType}:</label>
                <select 
                  value={grade9Params.mirrorType}
                  onChange={(e) => setGrade9Params({ mirrorType: e.target.value })}
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid #3b82f6', borderRadius: '6px' }}
                >
                  <option value="flat">{t.ui.flatMirror}</option>
                  <option value="convex">{t.ui.convexMirror}</option>
                  <option value="concave">{t.ui.concaveMirror}</option>
                </select>
              </div>
            </>
          );
        } else if (activeExperiment === 4) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.sourceSpeed}: {grade9Params.dopplerSpeed} м/с</label>
                <input type="range" min="0" max="600" step="10" value={grade9Params.dopplerSpeed} 
                  onChange={(e) => setGrade9Params({ dopplerSpeed: parseFloat(e.target.value) })} />
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '-5px' }}>{t.ui.soundSpeed}: 340 м/с</p>
            </>
          );
        }
        return null;
      case 10:
        if (activeExperiment === 1) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.gravity}: {grade10Params.gravity.toFixed(2)}</label>
                <input type="range" min="0" max="20" step="0.5" value={grade10Params.gravity} 
                  onChange={(e) => setGrade10Params({ gravity: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.elasticity}: {grade10Params.restitution.toFixed(2)}</label>
                <input type="range" min="0" max="1" step="0.1" value={grade10Params.restitution} 
                  onChange={(e) => setGrade10Params({ restitution: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 2) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.temperature}: {grade10Params.gasTemperature}</label>
                <input type="range" min="100" max="1000" step="10" value={grade10Params.gasTemperature} 
                  onChange={(e) => setGrade10Params({ gasTemperature: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.volume}: {grade10Params.gasVolume}</label>
                <input type="range" min="50" max="200" step="10" value={grade10Params.gasVolume} 
                  onChange={(e) => setGrade10Params({ gasVolume: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.particleMass}: {grade10Params.particleMass}</label>
                <input type="range" min="1" max="10" step="1" value={grade10Params.particleMass} 
                  onChange={(e) => setGrade10Params({ particleMass: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 3) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.cannonAngle}: {grade10Params.cannonAngle}</label>
                <input type="range" min="0" max="90" step="1" value={grade10Params.cannonAngle} 
                  onChange={(e) => setGrade10Params({ cannonAngle: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.cannonSpeed}: {grade10Params.cannonSpeed} м/с</label>
                <input type="range" min="5" max="50" step="1" value={grade10Params.cannonSpeed} 
                  onChange={(e) => setGrade10Params({ cannonSpeed: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.airRes}: {grade10Params.airResistance.toFixed(2)}</label>
                <input type="range" min="0" max="0.5" step="0.01" value={grade10Params.airResistance} 
                  onChange={(e) => setGrade10Params({ airResistance: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 4) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.pistonVol}: {grade10Params.gasPistonVolume}</label>
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
                <label>{t.ui.magField}: {grade11Params.magneticFieldZ.toFixed(2)}</label>
                <input type="range" min="-0.2" max="0.2" step="0.01" value={grade11Params.magneticFieldZ} 
                  onChange={(e) => setGrade11Params({ magneticFieldZ: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.velocityLabel} (v): {grade11Params.particleVelocity.toFixed(1)}</label>
                <input type="range" min="1" max="15" step="0.5" value={grade11Params.particleVelocity} 
                  onChange={(e) => setGrade11Params({ particleVelocity: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 2) {
          return (
            <div className="slider-group">
              <label>{t.ui.decayProb}: {grade11Params.decayProbability.toFixed(3)}</label>
              <input type="range" min="0.001" max="0.1" step="0.001" value={grade11Params.decayProbability} 
                onChange={(e) => setGrade11Params({ decayProbability: parseFloat(e.target.value) })} />
            </div>
          );
        } else if (activeExperiment === 3) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.coilTurns}: {grade11Params.inductionCoilTurns}</label>
                <input type="range" min="100" max="1000" step="50" value={grade11Params.inductionCoilTurns} 
                  onChange={(e) => setGrade11Params({ inductionCoilTurns: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.velocityLabel} {t.ui.magnets}: {grade11Params.magnetSpeed} м/с</label>
                <input type="range" min="0" max="50" step="1" value={grade11Params.magnetSpeed} 
                  onChange={(e) => setGrade11Params({ magnetSpeed: parseFloat(e.target.value) })} />
              </div>
            </>
          );
        } else if (activeExperiment === 4) {
          return (
            <>
              <div className="slider-group">
                <label>{t.ui.wavelength}: {grade11Params.photonWavelength} нм</label>
                <input type="range" min="200" max="800" step="10" value={grade11Params.photonWavelength} 
                  onChange={(e) => setGrade11Params({ photonWavelength: parseFloat(e.target.value) })} />
              </div>
              <div className="slider-group">
                <label>{t.ui.workFunc}: {grade11Params.workFunction.toFixed(1)} еВ</label>
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
      top: '70px',
      width: '300px',
      padding: '20px',
      zIndex: 10
    }}>
      <h3 style={{ marginBottom: '15px', color: '#3b82f6' }}>
        {t.ui.params} ({activeGrade} {language === 'uk' ? 'Клас' : 'Třída'})
      </h3>
      
      {renderSliders()}
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={toggleVectors} style={{
          flex: 1, padding: '8px', background: showVectors ? '#3b82f6' : 'transparent',
          border: '1px solid #3b82f6', color: '#fff',
          borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s', fontSize: '12px'
        }}>
          {showVectors ? t.ui.hideVectors : t.ui.showVectors}
        </button>
        <button onClick={triggerReset} style={{
          flex: 1, padding: '8px', background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
          borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s', fontSize: '12px'
        }}>
          {t.ui.reset}
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
