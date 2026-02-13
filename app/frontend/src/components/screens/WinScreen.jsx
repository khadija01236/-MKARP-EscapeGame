import { Fragment } from 'react';
import { formatTime } from '../../utils/time.js';

export function WinScreen({ score, totalTimeSeconds, perLevelSummary, onReturn }) {
  return (
    <div
      style={{
        textAlign: 'center',
        paddingTop: '100px',
        border: '2px dashed #00ff00',
        margin: '50px',
        paddingBottom: '50px',
      }}
    >
      <h1 style={{ fontSize: '4rem', color: '#00ff00', textShadow: '0 0 10px #00ff00' }}>MISSION RÉUSSIE</h1>
      <p style={{ fontSize: '2rem' }}>ACCÈS TOTAL OBTENU</p>

      <div
        style={{
          border: '2px solid #00ff00',
          display: 'inline-block',
          padding: '26px 30px',
          marginTop: '20px',
          backgroundColor: '#000',
          textAlign: 'left',
          minWidth: '520px',
        }}
      >
        <div style={{ fontSize: '1.7rem', margin: 0, color: '#00ff00', fontWeight: 'bold' }}>SCORE : {score}/10</div>
        <div style={{ fontSize: '1.2rem', marginTop: '10px', color: '#fff' }}>TEMPS TOTAL : {formatTime(totalTimeSeconds)}</div>

        <div style={{ marginTop: '18px', color: '#fff', opacity: 0.95 }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>TEMPS PAR NIVEAU</div>
          {perLevelSummary.length === 0 ? (
            <div style={{ opacity: 0.9 }}>Aucun niveau enregistré.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 20px' }}>
              {perLevelSummary.map((row) => (
                <Fragment key={row.level}>
                  <div>
                    NIVEAU {row.level.toString().padStart(2, '0')} : {formatTime(row.duration)}
                  </div>
                  <div style={{ opacity: 0.9 }}>VALIDÉ À : {formatTime(row.at)}</div>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      <br />

      <button
        onClick={onReturn}
        style={{
          marginTop: '15px',
          padding: '12px 40px',
          backgroundColor: '#000',
          color: '#00ff00',
          fontWeight: 'bold',
          border: '1px solid #00ff00',
          cursor: 'pointer',
          fontSize: '1.1rem',
        }}
      >
        RETOUR À L'ACCUEIL
      </button>
    </div>
  );
}
