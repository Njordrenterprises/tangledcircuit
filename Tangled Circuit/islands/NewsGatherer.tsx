import { useState, useEffect, useRef } from "preact/hooks";

interface NewsItem {
  title: string;
  description: string;
  url: string;
}

const API_KEY = '10d0be7630124a1c92ae7a5767803387';
const ITEMS_PER_PAGE = 10;

export default function NewsGatherer({ onNavigateBack, shouldLoad: initialShouldLoad }: { onNavigateBack: () => void, shouldLoad: boolean }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const loadMoreNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=artificial+intelligence&apiKey=${API_KEY}&page=${page}&pageSize=${ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      console.log("Fetched news data:", data);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!data.articles || data.articles.length === 0) {
        console.warn("No articles found in the API response");
        return;
      }

      const newNews = data.articles.map((article: NewsItem) => ({
        title: article.title || "No title",
        description: article.description || "No description",
        url: article.url || "#",
      }));
      setNews((prevNews) => [...prevNews, ...newNews]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    if (shouldLoad && news.length === 0) {
      loadMoreNews();
    }
  }, [shouldLoad]);

  useEffect(() => {
    setShouldLoad(initialShouldLoad);
  }, [initialShouldLoad]);

  useEffect(() => {
    if (shouldLoad) {
      const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
      if (loader.current) {
        observer.observe(loader.current);
      }
      return () => observer.disconnect();
    }
  }, [shouldLoad]);

  useEffect(() => {
    console.log("NewsGatherer mounted, shouldLoad:", shouldLoad);
  }, []);

  useEffect(() => {
    console.log("shouldLoad changed:", shouldLoad);
  }, [shouldLoad]);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      loadMoreNews();
    }
  };

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onNavigateBack();
    }, 500);
  };

  const handleReadMore = (e: MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <div 
      class={`fixed inset-0 bg-gray-900 overflow-y-auto transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`} 
      onClick={handleExit}
    >
      <div class="min-h-screen p-4 flex flex-col items-center">
        <h1 class="text-3xl font-bold mb-6 text-white">Latest AI News</h1>
        {console.log("Current news state:", news)}
        {news.length === 0 ? (
          <p class="text-white">Loading news...</p>
        ) : (
          news.map((item, index) => (
            <div key={index} class="w-full max-w-2xl bg-gray-800 rounded-lg p-4 mb-4 text-white">
              <h2 class="text-xl font-semibold mb-2">{item.title}</h2>
              <p class="mb-2">{item.description}</p>
              <button
                onClick={(e) => handleReadMore(e, item.url)}
                class="text-blue-400 hover:underline"
              >
                Read more
              </button>
            </div>
          ))
        )}
        <div ref={loader} class="w-full h-10" />
      </div>
    </div>
  );
}