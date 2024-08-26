import { useState, useEffect, useRef } from "preact/hooks";

interface Image {
  src: string;
  alt: string;
}

export default function ImageGallery({ onNavigateBack }: { onNavigateBack: () => void }) {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const loadMoreImages = () => {
    const newImages = Array.from({ length: 6 }, (_, i) => ({
      src: `https://picsum.photos/400/300?random=${images.length + i + 1}`,
      alt: `Random image ${images.length + i + 1}`,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    loadMoreImages();
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      loadMoreImages();
    }
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    requestAnimationFrame(() => {
      onNavigateBack();
    });
  };

  return (
    <div class="flex flex-wrap justify-center items-center min-h-screen p-2" onClick={handleClick}>
      {images.map((image, index) => (
        <div key={index} class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
          <img
            src={image.src}
            alt={image.alt}
            class="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
      ))}
      <div ref={loader} class="w-full h-10" />
    </div>
  );
}