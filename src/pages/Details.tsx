import { useLocation, useNavigate } from "react-router-dom";
import type { ArticleAPI as Article } from "../services/newsApi";


const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { article: Article } | undefined;
  const article = state?.article;

  if (!article) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 mb-4">Notícia não encontrada.</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
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
          {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString("pt-BR")}
        </p>
        <p className="mb-4">{article.content || article.description}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          Ler no site original
        </a>

        <div className="mt-6">
          <button
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
