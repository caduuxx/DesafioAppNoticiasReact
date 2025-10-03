import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import type { ArticleAPI } from '../services/newsApi';

interface Props {
  article: ArticleAPI;
}

const NewsCard = ({ article }: Props) => {
  const { addFavorite, removeFavorite, isFavorite } = useNews();
  const isFavorited = isFavorite(article.url);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // evita navegação ao clicar no coração
    if (isFavorited) removeFavorite(article);
    else addFavorite(article);
  };

  return (
    <Link to="/details" state={{ article }} className="post" aria-label={`Ver detalhes da notícia: ${article.title}`}>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="post-image" draggable={false} />
      )}
      <div className="post-body">
        <div className="post-header">
          <span className="post-source">{article.source?.name || 'Fonte Desconhecida'}</span>
          <span className="post-time">{new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
        </div>
        <h2 className="post-title">{article.title}</h2>
        {article.description && <p className="post-desc">{article.description}</p>}

        <div className="post-actions">
          <button
            onClick={handleFavorite}
            className={`like-btn ${isFavorited ? 'liked' : ''}`}
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorited ? '♥' : '♡'}
          </button>
          <span className="read-more">Ler mais</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
