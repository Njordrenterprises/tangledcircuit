import { useState, useEffect, useRef } from "preact/hooks";

interface Image {
  key: string;
  src: string;
  alt: string;
  animation: string;
}

const animations = [
  'animate-wiggle',
  'animate-float',
  'animate-pulse-slow',
  'animate-spin-slow',
];

const IMAGES_PER_PAGE = 6;

export default function ImageGallery({ onNavigateBack, shouldLoad: initialShouldLoad }: { onNavigateBack: () => void, shouldLoad: boolean }) {
  const [images, setImages] = useState<Image[]>([]);
  const loader = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const loadMoreImages = async () => {
    try {
      const response = await fetch('/api/images');
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const imageNames: string[] = await response.json();
      const newImages = Array.from({ length: IMAGES_PER_PAGE }, () => {
        const randomIndex = Math.floor(Math.random() * imageNames.length);
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000);
        const key = `${timestamp}-${randomNum}`;
        return {
          key,
          src: `/images/${imageNames[randomIndex]}`,
          alt: `Tech image ${imageNames[randomIndex].split('.')[0]}`,
          animation: animations[Math.floor(Math.random() * animations.length)],
        };
      });
      setImages((prevImages) => {
        const uniqueNewImages = newImages.filter(newImg => 
          !prevImages.some(prevImg => prevImg.key === newImg.key)
        );
        return [...prevImages, ...uniqueNewImages];
      });
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onNavigateBack();
    }, 500);
  };

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
    if (shouldLoad && images.length === 0) {
      loadMoreImages();
    }
  }, [shouldLoad]);

  useEffect(() => {
    setShouldLoad(initialShouldLoad);
  }, [initialShouldLoad]);

  const handleObserver = async (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      await loadMoreImages();
    }
  };

  return (
    <div 
      class={`fixed inset-0 bg-gray-900 overflow-y-auto transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`} 
      onClick={handleExit}
    >
      <div class="min-h-screen p-4">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.key} class={`aspect-square ${image.animation}`}>
              <img
                src={image.src}
                alt={image.alt}
                class="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
        <div ref={loader} class="w-full h-10" />
      </div>
    </div>
  );
}