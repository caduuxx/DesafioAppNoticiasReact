import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react'; // <- import type-only
import type { ArticleAPI } from '../services/newsApi';

interface NewsContextProps {
  favorites: ArticleAPI[];
  addFavorite: (article: ArticleAPI) => void;
  removeFavorite: (article: ArticleAPI) => void;
  isFavorite: (url: string) => boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  currentArticle: ArticleAPI | null;
  setCurrentArticle: React.Dispatch<React.SetStateAction<ArticleAPI | null>>;
}

const NewsContext = createContext<NewsContextProps>({} as NewsContextProps);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<ArticleAPI[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentArticle, setCurrentArticle] = useState<ArticleAPI | null>(null);

  const addFavorite = (article: ArticleAPI) => setFavorites(prev => [...prev, article]);
  const removeFavorite = (article: ArticleAPI) =>
    setFavorites(prev => prev.filter(fav => fav.url !== article.url));
  const isFavorite = (url: string) => favorites.some(fav => fav.url === url);

  return (
    <NewsContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      searchTerm,
      setSearchTerm,
      currentArticle,
      setCurrentArticle
    }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
