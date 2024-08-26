import { useState, useEffect, useRef } from "preact/hooks";

interface NewsItem {
  title: string;
  description: string;
  url: string;
}

const API_KEY = '10d0be7630124a1c92ae7a5767803387';
const ITEMS_PER_PAGE = 10;

export default function NewsGatherer({ onNavigateBack }: { onNavigateBack: () => void }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const loadMoreNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=artificial+intelligence&apiKey=${API_KEY}&page=${page}&pageSize=${ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      const newNews = data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
      }));
      setNews((prevNews) => [...prevNews, ...newNews]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    loadMoreNews();
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      loadMoreNews();
    }
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    requestAnimationFrame(() => {
      onNavigateBack();
    });
  };

  return (
    <div class="flex flex-col items-center min-h-screen p-4 bg-gray-900 text-white" onClick={handleClick}>
      <h1 class="text-3xl font-bold mb-6">Latest AI News</h1>
      {news.map((item, index) => (
        <div key={index} class="w-full max-w-2xl bg-gray-800 rounded-lg p-4 mb-4">
          <h2 class="text-xl font-semibold mb-2">{item.title}</h2>
          <p class="mb-2">{item.description}</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">Read more</a>
        </div>
      ))}
      <div ref={loader} class="w-full h-10" />
    </div>
  );
}