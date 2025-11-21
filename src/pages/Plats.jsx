import { Link, useNavigate } from 'react-router-dom';
import { dishes } from '../data/dishes';

function Plats() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
      {/* Bouton retour */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
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

      <h1 style={{ fontSize: '48px', fontWeight: '900', fontFamily: 'Bison, sans-serif', fontStyle: 'italic', textAlign: 'center', marginBottom: '60px', marginTop: '60px' }}>
        NOS PLATS
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '30px' 
      }}>
        {dishes.map((dish) => (
          <Link 
            key={dish.id} 
            to={`/plats/${dish.slug}`}
            style={{ 
              textDecoration: 'none', 
              color: 'inherit',
              background: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(227, 38, 38, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ 
              aspectRatio: '1',
              background: '#F5F5F5',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src={dish.image} 
                alt={dish.name}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400/E32626/FFFFFF?text=Plat+Fitchen';
                }}
              />
              {dish.badges && dish.badges.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: '#E32626',
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: '50px',
                  fontSize: '11px',
                  fontWeight: '700',
                  textTransform: 'uppercase'
                }}>
                  {dish.badges[0]}
                </div>
              )}
            </div>
            
            <div style={{ padding: '25px' }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '800',
                fontFamily: 'Bison, sans-serif',
                fontStyle: 'italic',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>
                {dish.name}
              </h3>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '15px',
                paddingTop: '15px',
                borderTop: '1px solid #E0E0E0',
                fontSize: '14px',
                color: '#666'
              }}>
                <span><strong>{dish.nutrition.calories}</strong> kcal</span>
                <span><strong>{dish.nutrition.protein}g</strong> protéines</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Plats;
