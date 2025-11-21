import { useNavigate, Link } from 'react-router-dom';

const packs = [
  {
    id: 1,
    slug: 'pack-actifs-5',
    name: 'Pack Actifs x5',
    subtitle: 'Pour une semaine',
    description: 'Parfait pour découvrir nos plats ou compléter vos repas de la semaine',
    icon: '📦'
  },
  {
    id: 2,
    slug: 'pack-actifs-7',
    name: 'Pack Actifs x7',
    subtitle: '1 repas par jour',
    description: 'Un repas sain et équilibré chaque jour de la semaine',
    icon: '📦'
  },
  {
    id: 3,
    slug: 'pack-full-day',
    name: 'Pack Full Day',
    subtitle: '2 repas + 2 barres protéinées',
    description: 'La solution complète pour une journée équilibrée',
    icon: '📦'
  }
];

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
      <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '60px' }}>
        Choisissez le pack qui correspond à vos besoins
      </p>

      {/* Grid de packs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {packs.map((pack) => (
          <Link
            key={pack.id}
            to={`/nos-packs/${pack.slug}`}
            style={{
              textDecoration: 'none',
              background: '#FAFAFA',
              borderRadius: '20px',
              padding: '40px 30px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '2px solid transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              minHeight: '320px',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.borderColor = '#E32626';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(227, 38, 38, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '64px' }}>{pack.icon}</div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#0A0A0A',
              margin: 0,
              fontFamily: 'Bison, sans-serif',
              fontStyle: 'italic'
            }}>
              {pack.name}
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#E32626',
              fontWeight: '600',
              margin: 0
            }}>
              {pack.subtitle}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#666',
              margin: 0,
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
              {pack.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NosPacks;
