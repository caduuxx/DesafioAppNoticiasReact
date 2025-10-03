  import { useLocation, useNavigate } from 'react-router-dom';
  import type { ArticleAPI as Article } from '../services/newsApi';
  import { useNews } from '../context/NewsContext';  // Para favoritos nos detalhes

  const Details = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { article: Article } | undefined;
    const article = state?.article;
    const { addFavorite, removeFavorite, isFavorite } = useNews();

    if (!article) {
      return (
        <div className="text-center mt-10 p-4">
          <p className="text-gray-500 mb-4">Notícia não encontrada. Volte à lista e clique em uma notícia.</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => navigate('/')}  // Volta para home em vez de -1 (mais seguro)
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
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-4">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            {article.content || article.description || 'Conteúdo não disponível.'}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium block mb-4"
          >
            Ler no site original
          </a>

          {/* Botão de Favorito nos Detalhes */}
          <button
            onClick={handleFavorite}
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            className={`p-2 rounded-full transition-colors mb-4 ${
              isFavorited ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {isFavorited ? '♥ Remover Favorito' : '♡ Adicionar aos Favoritos'}
          </button>

          <div className="mt-6">
            <button
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
              onClick={() => navigate('/')}
            >
              Voltar à Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default Details;
  