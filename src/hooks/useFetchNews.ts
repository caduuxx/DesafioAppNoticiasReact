import { useState, useEffect } from "react";
import type { ArticleAPI } from "../services/newsApi";
import { fetchTopHeadlines } from "../services/newsApi";

export const useFetchNews = (query?: string, category?: string, page: number = 1) => {
  const [articles, setArticles] = useState<ArticleAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTopHeadlines(query, category, page);
        setArticles(data);
      } catch (err) {
        setError("Erro ao carregar notícias");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query, category, page]);

  return { articles, loading, error };
};
