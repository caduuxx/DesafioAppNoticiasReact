import { useNavigate } from 'react-router-dom';
import type { ArticleAPI as Article } from '../services/newsApi';
import { useNews } from '../context/NewsContext';

interface NewsCardProps {
  article: Article;
  onReadMore: () => void;
}

const NewsCard = ({ article, onReadMore }: NewsCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useNews();

  const isFavorited = isFavorite(article.url);

  const handleFavorite = () => {
    if (isFavorited) removeFavorite(article);
    else addFavorite(article);
  };

  return (
    <div className="post">
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="post-image" />
      )}

      <div className="post-body">
        <div className="post-header">
          <span className="post-source">{article.source?.name}</span>
          <span className="post-time">{new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
        </div>

        <h2 className="post-title">{article.title}</h2>
        <p className="post-desc">{article.description || 'Conteúdo não disponível.'}</p>

        <div className="post-actions">
          <button
            className={`favorite-btn ${isFavorited ? 'liked' : ''}`}
            onClick={handleFavorite}
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorited ? (
              <i className="bx bxs-bookmarks"></i>
            ) : (
              <i className="bx bx-bookmarks"></i>
            )}
          </button>

          <button
            className="read-more-btn"
            onClick={onReadMore}
          >
            Ler Mais
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
