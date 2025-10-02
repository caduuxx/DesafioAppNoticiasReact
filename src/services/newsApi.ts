const API_KEY = "SUA_CHAVE_AQUI"; // Cadastre-se no NewsAPI ou GNews
const BASE_URL = "https://newsapi.org/v2";

export interface ArticleAPI {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export const fetchTopHeadlines = async (
  query?: string,
  category?: string,
  page: number = 1
): Promise<ArticleAPI[]> => {
  try {
    let url = `${BASE_URL}/top-headlines?country=br&apiKey=${API_KEY}&page=${page}&pageSize=10`;
    if (query) url += `&q=${encodeURIComponent(query)}`;
    if (category) url += `&category=${category}`;

    const res = await fetch(url);

    if (!res.ok) {
      console.error("Erro HTTP:", res.status, res.statusText);
      throw new Error("Falha ao buscar notícias");
    }

    const data = await res.json();

    return data.articles as ArticleAPI[];
  } catch (error) {
    console.error("Erro fetchTopHeadlines:", error);
    return [];
  }
};
