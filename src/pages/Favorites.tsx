import NewsCard from "../components/NewsCard";
import { useNews } from "../context/NewsContext";

const Favorites = () => {
  const { favorites } = useNews();

  if (favorites.length === 0) {
    return <p className="text-center mt-10 text-gray-500">Nenhuma notícia favoritada.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Favoritos</h2>
      <div className="space-y-4">
        {favorites.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
