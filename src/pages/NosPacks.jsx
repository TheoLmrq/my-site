import { useNavigate } from 'react-router-dom';

function NosPacks() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      padding: '120px 40px 40px 40px', 
      minHeight: '100vh',
      background: '#0A0A0A',
      color: '#fff',
      textAlign: 'center',
      position: 'relative'
    }}>
      {/* Bouton retour */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '100px',
          left: '40px',
          background: 'transparent',
          border: '2px solid #E32626',
          color: '#E32626',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#E32626';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#E32626';
        }}
      >
        ← Retour
      </button>

      <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px' }}>
        Nos packs
      </h1>
      <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.6)' }}>
        Contenu à venir...
      </p>
    </div>
  );
}

export default NosPacks;
