import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import 'boxicons/css/boxicons.min.css';

const Header = () => {
  const navigate = useNavigate();
  const { favorites, searchTerm, setSearchTerm } = useNews();
  const hasFavorites = favorites.length > 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (!q) return;
    navigate('/', { state: { query: q } });
  };

  return (
    <header className="app-header" role="banner">
      <div className="header-container">
        <Link to="/" className="logo" aria-label="Ir para a home">NotificaFy</Link>

        <form onSubmit={handleSearch} className="search-wrapper" role="search" aria-label="Busca de notícias">
          <i className="bx bx-search search-icon" aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar notícias..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Campo de busca"
          />
        </form>

        <button
          className="header-fav"
          onClick={() => navigate('/favorites')}
          aria-label="Página de favoritos"
          title="Favoritos"
        >
          <i className={`bx ${hasFavorites ? 'bxs-bookmarks' : 'bx-bookmarks'}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;
