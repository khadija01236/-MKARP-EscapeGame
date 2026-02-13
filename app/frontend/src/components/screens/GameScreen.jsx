import Editor from '@monaco-editor/react';
import { formatTime } from '../../utils/time.js';

export function GameScreen({
  levelString,
  timeLeftSeconds,
  currentLevelElapsedSeconds,
  briefing,
  code,
  onCodeChange,
  output,
  inputFlag,
  onInputFlagChange,
  onRunCode,
  onCheckFlag,
  onReturn,
}) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
          borderBottom: '2px solid #00ff00',
          marginBottom: '20px',
        }}
      >
        <span style={{ fontWeight: 'bold' }}>SYSTEM_K-RAMP v1.0.4 - [NIVEAU {levelString}]</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={onReturn}
            style={{
              backgroundColor: '#000',
              color: '#00ff00',
              border: '1px solid #00ff00',
              padding: '8px 14px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            RETOUR
          </button>
          <span style={{ color: '#fff', opacity: 0.9, fontWeight: 'bold' }}>
            TEMPS NIVEAU: {formatTime(currentLevelElapsedSeconds)}
          </span>
          <span
            style={{
              color: timeLeftSeconds < 60 ? '#ff0000' : '#00ff00',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            TEMPS RESTANT: {formatTime(timeLeftSeconds)}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '15px', border: '1px solid #00ff00', backgroundColor: '#000', padding: '12px 14px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>BRIEFING: {briefing.title}</div>
        <div style={{ color: '#fff', opacity: 0.9, lineHeight: 1.4 }}>{briefing.text}</div>
      </div>

      <div style={{ display: 'flex', gap: '20px', height: '65vh' }}>
        <div style={{ flex: 2, border: '1px solid #333', boxShadow: '0 0 15px rgba(0,255,0,0.1)' }}>
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(value) => onCodeChange(value ?? '')}
            options={{ fontSize: 16, minimap: { enabled: false } }}
          />
        </div>

        <div style={{ flex: 1, backgroundColor: '#000', padding: '15px', border: '1px solid #00ff00', overflowY: 'auto' }}>
          <h3 style={{ marginTop: 0, borderBottom: '1px solid #00ff00', paddingBottom: '5px' }}>CONSOLE_LOGS:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#00cc00', fontSize: '14px' }}>{output}</pre>
        </div>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onRunCode}
          className="btn-patch"
          style={{
            padding: '20px 40px',
            backgroundColor: '#00ff00',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem',
          }}
        >
          EXÉCUTER LE PATCH
        </button>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            backgroundColor: '#000',
            padding: '15px',
            border: '1px solid #00ff00',
          }}
        >
          <label style={{ fontSize: '0.9rem' }}>SAISIR LE FLAG DE DÉVERROUILLAGE :</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={inputFlag}
              onChange={(e) => onInputFlagChange(e.target.value)}
              placeholder="GG_PADAWAN"
              style={{
                backgroundColor: '#111',
                color: '#00ff00',
                border: '1px solid #00ff00',
                padding: '10px',
                width: '250px',
                outline: 'none',
              }}
            />
            <button
              onClick={onCheckFlag}
              style={{ backgroundColor: '#00ff00', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              VALIDER
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
