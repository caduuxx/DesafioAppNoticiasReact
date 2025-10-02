import { Link } from "react-router-dom";
import { useNews } from "../context/NewsContext";
import type { ArticleAPI as Article } from "../services/newsApi";
import { formatDate } from "../utils/formatDate";

interface NewsCardProps {
  article: Article;
}

const NewsCard = ({ article }: NewsCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useNews();
  const isFavorited = favorites.some((a) => a.url === article.url);

  const handleFavorite = () => {
    if (isFavorited) removeFavorite(article);
    else addFavorite(article);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md mb-4 hover:shadow-lg transition-shadow relative">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Botão de Favorito */}
      <button
        onClick={handleFavorite}
        aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
          isFavorited ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {isFavorited ? "♥" : "♡"}
      </button>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {article.source?.name} • {formatDate(article.publishedAt)}
        </p>
        <Link
          to="/details"
          state={{ article }}
          className="text-blue-600 hover:underline font-medium"
        >
          Ler mais
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
