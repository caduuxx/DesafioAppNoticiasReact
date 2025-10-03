import React from 'react';

interface BottomNavProps {
  currentPage: string;
  onNavChange: (page: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavChange }) => {
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Navegação principal">
      <button
        className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
        onClick={() => onNavChange('home')}
        aria-current={currentPage === 'home' ? 'page' : undefined}
        aria-label="Página inicial"
      >
        <span className="nav-icon" aria-hidden="true">🏠</span>
        Home
      </button>

      <button
        className={`nav-item ${currentPage === 'search' ? 'active' : ''}`}
        onClick={() => onNavChange('search')}
        aria-current={currentPage === 'search' ? 'page' : undefined}
        aria-label="Buscar notícias"
      >
        <span className="nav-icon" aria-hidden="true">🔍</span>
        Buscar
      </button>

      <button
        className={`nav-item ${currentPage === 'favorites' ? 'active' : ''}`}
        onClick={() => onNavChange('favorites')}
        aria-current={currentPage === 'favorites' ? 'page' : undefined}
        aria-label="Favoritos"
      >
        <span className="nav-icon" aria-hidden="true">❤️</span>
        Favoritos
      </button>
    </nav>
  );
};

export default BottomNav;
