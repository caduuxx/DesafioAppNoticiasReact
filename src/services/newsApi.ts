const KEY = import.meta.env.VITE_NEWS_API_KEY || '';
const BASE = 'https://newsapi.org/v2';

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

export interface NewsApiResult {
  status?: string;
  totalResults: number;
  articles: ArticleAPI[];
}

// Função helper para fetch com offline e cache (igual antes)
async function fetchUrl(url: string): Promise<NewsApiResult> {
  if (!navigator.onLine) {
    console.warn('Modo offline: Usando cache ou mock.');
    try {
      const cached = localStorage.getItem('news:cache');
      if (cached) return JSON.parse(cached);
    } catch {}
    try {
      const fallback = await fetch('/mock/news.json');
      if (fallback.ok) {
        const mock = await fallback.json() as NewsApiResult;
        localStorage.setItem('news:cache', JSON.stringify(mock));
        return mock;
      }
    } catch {}
    throw new Error('Offline e sem cache. Conecte-se para carregar.');
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      const err = new Error(`HTTP ${res.status}: ${body}`) as any;
      err.status = res.status;
      throw err;
    }
    const data = await res.json() as NewsApiResult;
    localStorage.setItem('news:cache', JSON.stringify(data));
    return data;
  } catch (err) {
    console.warn('API falhou, tentando mock:', err);
    try {
      const fallback = await fetch('/mock/news.json');
      if (fallback.ok) {
        const mock = await fallback.json() as NewsApiResult;
        console.info('Usando mock');
        return mock;
      }
    } catch {}
    throw err;
  }
}

// Mantém headlines para categorias específicas (mas use everything para geral)
export async function fetchTopHeadlines(
  query?: string,
  category?: string,
  page: number = 1,
  pageSize: number = 10
): Promise<ArticleAPI[]> {
  const url = new URL(`${BASE}/top-headlines`);
  url.searchParams.set('country', 'br');
  url.searchParams.set('page', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  if (query) url.searchParams.set('q', query);
  if (category) url.searchParams.set('category', category);
  if (KEY) url.searchParams.set('apiKey', KEY);

  const result = await fetchUrl(url.toString());
  console.log('📡 Top Headlines (BR):', result.totalResults, 'resultados');
  return result.articles || [];
}

// Principal: /everything para buscas amplas e notícias em PT-BR (use isso no Home!)
export async function fetchEverything(
  query: string = 'brasil',  // Default: 'brasil' para resultados iniciais no BR
  category?: string,
  page: number = 1,
  pageSize: number = 10
): Promise<ArticleAPI[]> {
  const url = new URL(`${BASE}/everything`);
  url.searchParams.set('language', 'pt');  // Português (BR/PT)
  url.searchParams.set('sortBy', 'publishedAt');  // Mais recentes
  url.searchParams.set('page', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  
  // Query: Combina busca + categoria
  const searchQuery = query || (category ? category : 'brasil');  // Fallback 'brasil' se vazio
  url.searchParams.set('q', searchQuery);
  
  if (KEY) url.searchParams.set('apiKey', KEY);

  const result = await fetchUrl(url.toString());
  console.log('📡 Everything (PT-BR, q="' + searchQuery + '"):', result.totalResults, 'resultados');
  return result.articles || [];
}
