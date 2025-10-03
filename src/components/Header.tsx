import { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <header>
      <Link to="/" className="logo">NewsGram</Link>
      <form onSubmit={handleSearch} className="search-wrapper" role="search" aria-label="Busca de notícias">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          placeholder="Buscar notícias"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Campo de busca"
        />
      </form>
      <Link to="/favorites" className="nav-icon" aria-label="Favoritos">❤️</Link>
    </header>
  );
};

export default Header;
