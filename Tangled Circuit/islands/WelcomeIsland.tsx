import { useState, useEffect } from "preact/hooks";
import AccessSystem from "../islands/AccessSystem.tsx";
import HomeNavigation from "../islands/HomeNavigation.tsx";

export default function WelcomeIsland() {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (isUnlocking) {
      setTimeout(() => setIsUnlocked(true), 1000);
    }
  }, [isUnlocking]);

  return (
    <div class="w-screen h-screen flex justify-center items-center bg-gray-900">
      <div class={`absolute inset-0 transition-opacity duration-1000 ${isUnlocking ? 'opacity-0' : 'opacity-100'}`}>
        <AccessSystem onUnlock={() => setIsUnlocking(true)} />
      </div>
      <div class={`absolute inset-0 transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <HomeNavigation />
      </div>
    </div>
  );
}