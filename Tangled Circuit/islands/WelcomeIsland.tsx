import { useState } from "preact/hooks";
import AccessSystem from "../islands/AccessSystem.tsx";
import HomeNavigation from "../islands/HomeNavigation.tsx";
import ImageGallery from "../islands/ImageGallery.tsx";
import NewsGatherer from "../islands/NewsGatherer.tsx";

type View = 'access' | 'home' | 'gallery' | 'news';

export default function WelcomeIsland() {
  const [currentView, setCurrentView] = useState<View>('access');
  const [galleryKey, setGalleryKey] = useState(0);
  const [newsKey, setNewsKey] = useState(0);

  const transitionTo = (newView: View) => {
    setCurrentView(newView);
    if (newView === 'gallery') {
      setGalleryKey(prevKey => prevKey + 1);
    } else if (newView === 'news') {
      setNewsKey(prevKey => prevKey + 1);
    }
  };

  const handleUnlock = () => {
    transitionTo('home');
  };

  const handleNavigation = (index: number) => {
    switch (index) {
      case 0:
        transitionTo('gallery');
        break;
      case 1:
        transitionTo('news');
        break;
      default:
        console.log(`Navigation option ${index} not implemented yet`);
    }
  };

  const handleNavigateBack = () => {
    transitionTo('home');
  };

  return (
    <div class="w-screen h-screen bg-gray-900 relative overflow-hidden">
      <div class={`absolute inset-0 transition-opacity duration-500 ${currentView === 'access' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <AccessSystem onUnlock={handleUnlock} />
      </div>
      <div class={`absolute inset-0 transition-opacity duration-500 ${currentView === 'home' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <HomeNavigation onNavigate={handleNavigation} />
      </div>
      <div class={`absolute inset-0 transition-opacity duration-500 ${currentView === 'gallery' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <ImageGallery key={galleryKey} onNavigateBack={handleNavigateBack} shouldLoad={currentView === 'gallery'} />
      </div>
      <div class={`absolute inset-0 transition-opacity duration-500 ${currentView === 'news' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <NewsGatherer key={newsKey} onNavigateBack={handleNavigateBack} shouldLoad={currentView === 'news'} />
      </div>
    </div>
  );
}