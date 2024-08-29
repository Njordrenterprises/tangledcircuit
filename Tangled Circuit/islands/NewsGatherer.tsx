import { useState, useEffect } from "preact/hooks";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

export default function NewsGatherer({ onNavigateBack, shouldLoad }: { onNavigateBack: () => void, shouldLoad: boolean }) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      fetchNews();
    }
  }, [shouldLoad]);

  const fetchNews = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/news?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setArticles(prevArticles => [...prevArticles, ...data.articles]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onNavigateBack();
    }, 500);
  };

  return (
    <div class={`fixed inset-0 bg-gray-900 overflow-hidden transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      <div class="flex h-full">
        <div class="w-1/3 overflow-y-auto p-4 border-r border-gray-700">
          <h2 class="text-2xl font-bold mb-4 text-green-500">Contents</h2>
          {articles.map((article, index) => (
            <div
              key={index}
              class="mb-2 cursor-pointer text-green-300 hover:text-green-100"
              onClick={() => setSelectedArticle(article)}
            >
              {article.title}
            </div>
          ))}
          <button
            onClick={fetchNews}
            class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
        <div class="w-2/3 p-4">
          {selectedArticle ? (
            <div>
              <h2 class="text-2xl font-bold mb-4 text-green-500">{selectedArticle.title}</h2>
              <p class="mb-4 text-green-300">{selectedArticle.description}</p>
              <iframe
                src={selectedArticle.url}
                class="w-full h-[calc(100vh-200px)] border-none"
                title={selectedArticle.title}
              />
            </div>
          ) : (
            <div class="text-green-500">Select an article to view its content.</div>
          )}
        </div>
      </div>
      <button
        onClick={handleExit}
        class="absolute top-4 right-4 text-green-500 hover:text-green-300"
      >
        Exit
      </button>
    </div>
  );
}