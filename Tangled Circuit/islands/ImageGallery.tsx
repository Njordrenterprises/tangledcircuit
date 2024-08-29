import { useState, useEffect, useRef } from "preact/hooks";

interface Image {
  key: string;
  src: string;
  alt: string;
  animation: string;
}

const animations = ['animate-gentle-wind-1', 'animate-gentle-wind-2', 'animate-gentle-wind-3', 'animate-gentle-wind-4'];

const IMAGES_PER_PAGE = 10;

export default function ImageGallery({ onNavigateBack, shouldLoad: initialShouldLoad }: { onNavigateBack: () => void, shouldLoad: boolean }) {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMoreImages = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/images?page=${page}&limit=${IMAGES_PER_PAGE}`);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      const newImages = data.images.map((imageName: string) => ({
        key: `${Date.now()}-${Math.random()}`,
        src: `/images/${imageName}`,
        alt: `Tech image ${imageName.split('.')[0]}`,
        animation: animations[Math.floor(Math.random() * animations.length)],
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        loadMoreImages();
      }
    }
  };

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onNavigateBack();
    }, 500);
  };

  useEffect(() => {
    if (shouldLoad && images.length === 0) {
      loadMoreImages();
    }
  }, [shouldLoad]);

  useEffect(() => {
    setShouldLoad(initialShouldLoad);
  }, [initialShouldLoad]);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      class={`fixed inset-0 bg-gray-900 overflow-y-auto transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`} 
      onClick={handleExit}
    >
      <div class="min-h-screen p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.key} class={`aspect-square ${image.animation} transform-gpu`}>
              <img
                src={image.src}
                alt={image.alt}
                class="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
        {isLoading && <div class="w-full h-10 mt-4 text-center">Loading...</div>}
      </div>
    </div>
  );
}