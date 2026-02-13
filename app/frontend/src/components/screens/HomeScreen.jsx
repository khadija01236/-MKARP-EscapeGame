export function HomeScreen({ onLaunch }) {
  return (
    <div
      style={{
        textAlign: 'center',
        paddingTop: '120px',
        border: '2px dashed #00ff00',
        margin: '50px',
        paddingBottom: '80px',
      }}
    >
      <h1 style={{ fontSize: '3rem', color: '#00ff00', textShadow: '0 0 10px #00ff00' }}>
        BIENVENUE SUR L'ESCAPE GAME
      </h1>
      <p style={{ fontSize: '1.3rem', color: '#fff', marginTop: '25px' }}>
        Tu as 10 minutes pour réparer le système via des tests unitaires.
      </p>
      <button
        onClick={onLaunch}
        style={{
          marginTop: '50px',
          padding: '20px 60px',
          backgroundColor: '#00ff00',
          color: '#000',
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.4rem',
        }}
      >
        LANCER
      </button>
    </div>
  );
}
