import { Fragment } from 'react';
import { formatTime } from '../../utils/time.js';

export function LoseScreen({ score, finalTimeSeconds, perLevelSummary, onReturn }) {
  return (
    <div
      style={{
        textAlign: 'center',
        paddingTop: '120px',
        border: '2px dashed #ff0000',
        margin: '50px',
        paddingBottom: '80px',
      }}
    >
      <h1 style={{ fontSize: '3.2rem', color: '#ff0000', textShadow: '0 0 10px #ff0000' }}>MISSION ÉCHOUÉE</h1>
      <p style={{ fontSize: '1.5rem', color: '#fff', marginTop: '25px' }}>T-00:00 — Autodestruction déclenchée.</p>

      <div
        style={{
          border: '2px solid #ff0000',
          display: 'inline-block',
          padding: '22px 26px',
          marginTop: '18px',
          backgroundColor: '#000',
          textAlign: 'left',
          minWidth: '520px',
        }}
      >
        <div style={{ fontSize: '1.5rem', margin: 0, color: '#ff0000', fontWeight: 'bold' }}>SCORE : {score}/10</div>
        <div style={{ fontSize: '1.2rem', marginTop: '10px', color: '#fff' }}>TEMPS FINAL : {formatTime(finalTimeSeconds)}</div>

        <div style={{ marginTop: '16px', color: '#fff', opacity: 0.95 }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>NIVEAUX VALIDÉS</div>
          {perLevelSummary.length === 0 ? (
            <div style={{ opacity: 0.9 }}>Aucun niveau validé.</div>
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

      <p style={{ fontSize: '1.1rem', color: '#fff', opacity: 0.9, marginTop: '18px' }}>
        Le système a explosé. Reviens à l'accueil pour relancer une tentative.
      </p>

      <button
        onClick={onReturn}
        style={{
          marginTop: '50px',
          padding: '18px 55px',
          backgroundColor: '#ff0000',
          color: '#000',
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.3rem',
        }}
      >
        RETOUR À L'ACCUEIL
      </button>
    </div>
  );
}
