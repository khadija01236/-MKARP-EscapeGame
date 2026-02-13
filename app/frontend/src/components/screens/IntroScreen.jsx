export function IntroScreen({ onStart, onReturn }) {
  return (
    <div
      style={{
        textAlign: 'center',
        paddingTop: '100px',
        border: '2px dashed #00ff00',
        margin: '50px',
        paddingBottom: '70px',
      }}
    >
      <h1 style={{ fontSize: '2.6rem', color: '#00ff00', textShadow: '0 0 10px #00ff00' }}>
        BRIEFING — INCIDENT K-RAMP
      </h1>
      <div
        style={{
          maxWidth: '900px',
          margin: '30px auto 0',
          color: '#fff',
          fontSize: '1.2rem',
          lineHeight: 1.6,
          opacity: 0.95,
        }}
      >
        <p style={{ margin: 0 }}>
          Une IA de maintenance a corrompu les modules critiques. Dans{' '}
          <span style={{ fontWeight: 'bold' }}>10 minutes</span>, le réacteur passe en autodestruction.
        </p>
        <p style={{ marginTop: '18px' }}>
          Ton job : appliquer des patches ultra courts validés par tests unitaires. Chaque niveau débloqué te donne un flag.
        </p>
        <p style={{ marginTop: '18px' }}>
          Si le chrono tombe à zéro :{' '}
          <span style={{ fontWeight: 'bold', color: '#ff6666' }}>BOOM</span>.
        </p>
      </div>

      <div style={{ marginTop: '45px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <button
          onClick={onStart}
          style={{
            padding: '18px 55px',
            backgroundColor: '#00ff00',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.3rem',
          }}
        >
          COMMENCER
        </button>
        <button
          onClick={onReturn}
          style={{
            padding: '18px 40px',
            backgroundColor: '#000',
            color: '#00ff00',
            fontWeight: 'bold',
            border: '1px solid #00ff00',
            cursor: 'pointer',
            fontSize: '1.1rem',
          }}
        >
          RETOUR
        </button>
      </div>
    </div>
  );
}
