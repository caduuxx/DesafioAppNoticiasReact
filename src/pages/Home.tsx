import { useState, useEffect, useCallback } from 'react';
import NewsCard from '../components/NewsCard';
import SearchBar from '../components/SearchBar';
import { fetchEverything } from '../services/newsApi';  // Use everything por default
import type { ArticleAPI } from '../services/newsApi';

const categories = ['technology', 'business', 'sports', 'health', 'entertainment'];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');  // Inicial vazio, mas fetch usa default 'brasil'
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<ArticleAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async (reset = false) => {
    setLoading(true);
    setError(null);
    try {
      // Sempre use fetchEverything (com default 'brasil' se query vazia)
      const data = await fetchEverything(searchTerm || category, category, page, 5);  // 5 para teste rápido
      console.log('✅ Carregados:', data.length, 'artigos');
      
      if (reset || page === 1) {
        setArticles(data);
      } else {
        setArticles(prev => [...prev, ...data]);
      }
    } catch (err: any) {
      console.error('❌ Erro:', err);
      setError('Falha na API: ' + (err.message || 'Verifique a conexão'));
      // Fallback: Use mock se public/mock/news.json existir
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

  // Carrega inicial (com default 'brasil')
  useEffect(() => {
    loadArticles(true);
  }, []);

  // Recarrega na mudança
  useEffect(() => {
    const reset = page === 1;
    loadArticles(reset);
  }, [searchTerm, category, page]);

  // Scroll infinito
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 300 && !loading && articles.length > 0) {
      setPage(prev => prev + 1);
    }
  }, [loading, articles.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSearch = (query: string) => {
    setSearchTerm(query.trim() || 'brasil');  // Fallback se vazio
    setCategory('');
    setPage(1);
  };

  const handleCategory = (cat: string) => {
    setCategory(cat === category ? '' : cat);
    setSearchTerm('');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Notícias do Brasil</h1>
      
      <SearchBar onSearch={handleSearch} />

      <div className="flex gap-2 mt-4 flex-wrap justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-4 py-2 rounded-full border-2 transition-colors text-sm font-medium ${
              category === cat
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {error && (
        <div className="text-center mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error} <button onClick={() => loadArticles(true)} className="underline ml-2">Tentar Novamente</button>
        </div>
      )}

      {loading && page === 1 && <p className="text-center text-gray-600 mb-4">Carregando notícias...</p>}

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article, index) => (
          <NewsCard key={`${article.url}-${index}`} article={article} />
        ))}
      </div>

      {loading && page > 1 && <p className="text-center text-gray-600">Carregando mais...</p>}
      {!loading && articles.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Nenhuma notícia encontrada. Busque algo!</p>
      )}

      {articles.length > 0 && (
        <p className="text-center text-xs text-gray-400 mt-4">Mostrando {articles.length} notícias</p>
      )}
    </div>
  );
};

export default Home;
