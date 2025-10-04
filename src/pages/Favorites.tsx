import { useNavigate } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import Header from "../components/Header";
import { useNews } from "../context/NewsContext";

const Favorites = () => {
  const { favorites, setCurrentArticle } = useNews();
  const navigate = useNavigate();

  const handleReadMore = (article: any) => {
    setCurrentArticle(article);
    navigate("/details");
  };

  if (favorites.length === 0) {
    return (
      <div>
        <Header />
        <p className="text-center mt-10 text-gray-500">Nenhuma notícia favoritada.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="feed">
        {favorites.map((article, index) => (
          <div key={index} className="post">
            <NewsCard article={article} onReadMore={() => handleReadMore(article)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
