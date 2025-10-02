import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import { fetchTopHeadlines } from "../services/newsApi";
import type { ArticleAPI } from "../services/newsApi"; // ← type-only import

const categories = ["technology", "business", "sports", "health", "entertainment"];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<ArticleAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função de busca de notícias
  const loadArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTopHeadlines(searchTerm, category, page);
      setArticles((prev) => (page === 1 ? data : [...prev, ...data]));
    } catch (err) {
      setError("Erro ao carregar notícias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, category, page]);

  // Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const handleSearch = (query: string) => {
    setPage(1);
    setSearchTerm(query);
  };

  const handleCategory = (cat: string) => {
    setPage(1);
    setCategory(cat === category ? "" : cat);
  };

  return (
    <div>
      {/* SearchBar */}
      <SearchBar onSearch={handleSearch} />

      {/* Filtro por categorias */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-3 py-1 rounded-full border ${
              category === cat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading / Erro */}
      {loading && <p className="text-center mt-4">Carregando notícias...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {/* Lista de notícias */}
      <div className="mt-4 space-y-4">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>

      {!loading && !error && articles.length === 0 && (
        <p className="text-center mt-4 text-gray-500">Nenhuma notícia encontrada.</p>
      )}
    </div>
  );
};

export default Home;
