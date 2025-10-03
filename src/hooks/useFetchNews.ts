import { useState, useEffect } from 'react';
import type { ArticleAPI } from '../services/newsApi';
import { fetchTopHeadlines, fetchEverything } from '../services/newsApi';

export const useFetchNews = (query?: string, category?: string, page: number = 1, useEverything = false) => {
  const [articles, setArticles] = useState<ArticleAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchFn = useEverything ? fetchEverything : fetchTopHeadlines;
        const data = await fetchFn(query, category, page);
        setArticles(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar notícias');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query, category, page, useEverything]);

  return { articles, loading, error };
};
