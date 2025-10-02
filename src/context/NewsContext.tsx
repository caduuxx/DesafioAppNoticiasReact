import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react"; // ← type-only import
import type { ArticleAPI } from "../services/newsApi"; // Padronizando com ArticleAPI

interface NewsContextType {
  favorites: ArticleAPI[];
  addFavorite: (article: ArticleAPI) => void;
  removeFavorite: (article: ArticleAPI) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) throw new Error("useNews deve ser usado dentro de NewsProvider");
  return context;
};

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsProvider = ({ children }: NewsProviderProps) => {
  const [favorites, setFavorites] = useState<ArticleAPI[]>([]);

  const addFavorite = (article: ArticleAPI) => {
    setFavorites((prev) => [...prev, article]);
  };

  const removeFavorite = (article: ArticleAPI) => {
    setFavorites((prev) => prev.filter((a) => a.url !== article.url));
  };

  return (
    <NewsContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </NewsContext.Provider>
  );
};
