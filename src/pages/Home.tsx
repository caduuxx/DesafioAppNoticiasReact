import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import BottomNav from '../components/BottomNav';
import { fetchEverything } from '../services/newsApi';
import type { ArticleAPI } from '../services/newsApi';

const categories = ['Geral', 'Tech', 'Esportes', 'Negócios', 'Saúde', 'Entretenimento'];

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<ArticleAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentNav, setCurrentNav] = useState('home');

  const loadArticles = async (reset = false) => {
    setLoading(true);
    setError(null);
    try {
      const query = searchTerm || category || 'brasil';
      const data = await fetchEverything(query, category, page, 10);
      if (reset) {
        setArticles(data);
      } else {
        setArticles(prev => [...prev, ...data]);
      }
    } catch (err: any) {
      setError('Erro ao carregar feed: ' + err.message);
      // Fallback mock se existir
      try {
        const res = await fetch('/mock/news.json');
        if (res.ok) {
          const mock = await res.json() as any;
          setArticles(reset ? mock.articles : [...articles, ...mock.articles]);
        }
      } catch {}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles(true);
  }, []);

  useEffect(() => {
    const reset = page === 1;
    loadArticles(reset);
  }, [searchTerm, category, page]);

  const handleScroll = useCallback(() => {
    if (loading || articles.length === 0) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      setPage(p => p + 1);
    }
  }, [loading, articles.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setCategory('');
    setPage(1);
  };

  const handleCategory = (cat: string) => {
    setCategory(cat.toLowerCase() === category.toLowerCase() ? '' : cat.toLowerCase());
    setSearchTerm('');
    setPage(1);
  };

  const handleNav = (page: string) => {
    setCurrentNav(page);
    if (page === 'favorites') navigate('/favorites');
    if (page === 'search') navigate('/search');
  };

  return (
    <div id="root">
      <Header onSearch={handleSearch} />

      <div className="stories">
        <button 
          className={`story ${!category ? 'active' : ''}`} 
          onClick={() => handleCategory('')}
          aria-label="Mostrar todas as categorias"
        >
          🏠 Todas
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`story ${category === cat.toLowerCase() ? 'active' : ''}`}
            onClick={() => handleCategory(cat)}
            aria-label={`Filtrar categoria ${cat}`}
          >
            {cat.substring(0, 4)}
          </button>
        ))}
      </div>

      <div className="feed" role="feed" aria-busy={loading}>
        {error && (
          <div className="error-msg" role="alert">
            {error} <button onClick={() => loadArticles(true)}>Recarregar</button>
          </div>
        )}

        {loading && page === 1 && (
          <div className="loading" aria-live="polite" aria-label="Carregando notícias">
            <div className="spinner" />
            Carregando seu feed...
          </div>
        )}

        {articles.map((article, index) => (
          <div key={`${article.url}-${index}`} className="post" role="article" tabIndex={0}>
            <NewsCard article={article} />
          </div>
        ))}

        {loading && page > 1 && (
          <div className="loading" aria-live="polite" aria-label="Carregando mais notícias">
            <div className="spinner" />
            Mais posts chegando...
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div className="error-msg" role="alert">
            Nenhum post no feed. Tente buscar!
          </div>
        )}
      </div>

      <BottomNav currentPage={currentNav} onNavChange={handleNav} />
    </div>
  );
};

export default Home;
