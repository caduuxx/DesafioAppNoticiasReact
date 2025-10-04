import { useLocation, useNavigate } from 'react-router-dom';
import type { ArticleAPI as Article } from '../services/newsApi';
import { useNews } from '../context/NewsContext';
import Header from '../components/Header'; // Header global no detalhe também

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addFavorite, removeFavorite, isFavorite, currentArticle, setCurrentArticle } = useNews();

  // Pega artigo do location.state OU do contexto (caso refresh)
  const state = location.state as { article: Article } | undefined;
  const article = state?.article || currentArticle;

  // Se artigo veio do location, atualiza o currentArticle no contexto
  if (state?.article && currentArticle?.url !== state.article.url) {
    setCurrentArticle(state.article);
  }

  if (!article) {
    return (
      <div className="text-center mt-10 p-4">
        <p className="text-gray-500 mb-4">Notícia não encontrada.</p>
        <button
          className="back-btn"
          onClick={() => navigate('/')}
        >
          Voltar à Home
        </button>
      </div>
    );
  }

  const isFavorited = isFavorite(article.url);
  const handleFavorite = () => {
    if (isFavorited) removeFavorite(article);
    else addFavorite(article);
  };

  return (
    <div>
      {/* Header no detalhe também */}
      <Header />

      <div className="details-page">
        {article.urlToImage && (
          <img src={article.urlToImage} alt={article.title} className="details-image" />
        )}
        <div className="details-body">
          <h1 className="details-title">{article.title}</h1>
          <p className="details-meta">
            {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
          </p>
          <p className="details-content">
            {article.content || article.description || 'Conteúdo não disponível.'}
          </p>

          <div className="post-actions">
            <button
              className={`favorite-btn ${isFavorited ? 'liked' : ''}`}
              onClick={handleFavorite}
            >
              <i className={`bx ${isFavorited ? 'bxs-bookmarks' : 'bx-bookmarks'}`}></i>
              {isFavorited ? ' Favorito' : ' Favoritar'}
            </button>

            <button
              className="read-more-btn"
              onClick={() => navigate('/')}
            >
              Voltar à Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
