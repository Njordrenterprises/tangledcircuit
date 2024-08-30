import { useState } from "preact/hooks";
import AccessSystem from "../islands/AccessSystem.tsx";
import HomeNavigation from "../islands/HomeNavigation.tsx";
import ImageGallery from "../islands/ImageGallery.tsx";
import AIChat from "./AIchat.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

type View = 'access' | 'home' | 'gallery' | 'chat';

export default function WelcomeIsland() {
  const [currentView, setCurrentView] = useState<View>('access');
  const [galleryKey, setGalleryKey] = useState(0);
  const [chatKey, setChatKey] = useState(0);

  const transitionTo = (newView: View) => {
    setCurrentView(newView);
    if (newView === 'gallery') {
      setGalleryKey(prevKey => prevKey + 1);
    } else if (newView === 'chat') {
      setChatKey(prevKey => prevKey + 1);
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
        transitionTo('chat');
        break;
      default:
        console.log(`Navigation option ${index} not implemented yet`);
    }
  };

  const handleNavigateBack = () => {
    transitionTo('home');
  };

  return (
    <div class="w-screen h-screen bg-gray-900 relative overflow-hidden flex flex-col">
      <Header />
      <div class="flex-grow relative overflow-hidden">
        <div class={`absolute inset-0 transition-all duration-500 ${currentView === 'access' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <AccessSystem onUnlock={handleUnlock} />
        </div>
        <div class={`absolute inset-0 transition-all duration-500 ${currentView === 'home' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <HomeNavigation onNavigate={handleNavigation} />
        </div>
        <div class={`absolute inset-0 transition-all duration-500 ${currentView === 'gallery' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <ImageGallery key={galleryKey} onNavigateBack={handleNavigateBack} shouldLoad={currentView === 'gallery'} />
        </div>
        <div class={`absolute inset-0 transition-all duration-500 ${currentView === 'chat' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <AIChat key={chatKey} onNavigateBack={handleNavigateBack} />
        </div>
      </div>
      <Footer />
    </div>
  );
}