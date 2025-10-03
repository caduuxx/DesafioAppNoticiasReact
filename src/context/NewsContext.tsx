// src/context/NewsContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { ArticleAPI } from "../services/newsApi";
import type { ReactNode } from "react";

interface NewsContextType {
  favorites: ArticleAPI[];
  addFavorite: (article: ArticleAPI) => void;
  removeFavorite: (article: ArticleAPI) => void;
  isFavorite: (url: string) => boolean;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const useNews = () => {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error("useNews deve ser usado dentro de NewsProvider");
  return ctx;
};

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<ArticleAPI[]>(() => {
    try {
      const raw = localStorage.getItem("news:favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("news:favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const addFavorite = (article: ArticleAPI) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.url === article.url)) return prev;
      return [article, ...prev];
    });
  };

  const removeFavorite = (article: ArticleAPI) =>
    setFavorites((prev) => prev.filter((a) => a.url !== article.url));

  const isFavorite = (url: string) => favorites.some((f) => f.url === url);

  return (
    <NewsContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </NewsContext.Provider>
  );
};
