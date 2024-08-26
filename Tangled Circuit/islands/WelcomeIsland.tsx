import { useState, useEffect } from "preact/hooks";
import AccessSystem from "../islands/AccessSystem.tsx";
import HomeNavigation from "../islands/HomeNavigation.tsx";
import ImageGallery from "../islands/ImageGallery.tsx";
import NewsGatherer from "../islands/NewsGatherer.tsx";

type View = 'access' | 'home' | 'gallery' | 'news';

export default function WelcomeIsland() {
  const [currentView, setCurrentView] = useState<View>('access');
  const [previousView, setPreviousView] = useState<View | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [galleryKey, setGalleryKey] = useState(0);
  const [newsKey, setNewsKey] = useState(0);

  const transitionTo = (newView: View) => {
    setPreviousView(currentView);
    setIsTransitioning(true);
    setCurrentView(newView);
    if (newView === 'gallery') {
      setGalleryKey(prevKey => prevKey + 1);
    } else if (newView === 'news') {
      setNewsKey(prevKey => prevKey + 1);
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    });
  };

  const handleUnlock = () => {
    transitionTo('home');
  };

  const handleNavigation = (index: number) => {
    if (index === 0) {
      transitionTo('gallery');
    } else if (index === 1) {
      transitionTo('news');
    }
    // Add more conditions for other squares as needed
  };

  const handleNavigateBack = () => {
    transitionTo('home');
  };

  return (
    <div class="w-screen h-screen flex justify-center items-center bg-gray-900">
      <div class={`absolute inset-0 transition-opacity duration-1000 ${currentView === 'access' || previousView === 'access' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <AccessSystem onUnlock={handleUnlock} />
      </div>
      <div class={`absolute inset-0 transition-opacity duration-1000 ${currentView === 'home' || previousView === 'home' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <HomeNavigation onNavigate={handleNavigation} />
      </div>
      <div class={`absolute inset-0 transition-opacity duration-1000 ${currentView === 'gallery' || previousView === 'gallery' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <ImageGallery key={galleryKey} onNavigateBack={handleNavigateBack} />
      </div>
      <div class={`absolute inset-0 transition-opacity duration-1000 ${currentView === 'news' || previousView === 'news' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <NewsGatherer key={newsKey} onNavigateBack={handleNavigateBack} />
      </div>
    </div>
  );
}