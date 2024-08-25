import { useState, useEffect } from 'preact/hooks';

const AccessButton = ({ id, isActive, onClick }: { id: number; isActive: boolean; onClick: (id: number) => void }) => (
  <button
    class={`w-24 h-24 rounded-md border-4 ${
      isActive ? 'border-green-500 bg-green-300' : 'border-red-500 bg-red-300'
    } flex items-center justify-center text-4xl font-bold cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95`}
    onClick={() => onClick(id)}
  >
    {id}
  </button>
);

export default function AccessSystem() {
  const [activeButtons, setActiveButtons] = useState<number[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [message, setMessage] = useState('SYSTEM LOCKED');

  const handleButtonClick = (id: number) => {
    setActiveButtons(prev => {
      if (prev.includes(id)) {
        return prev.filter(buttonId => buttonId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    if (activeButtons.length === 3) {
      if (activeButtons.join(',') === '1,2,3') {
        setIsUnlocked(true);
        setMessage('ACCESS GRANTED');
      } else {
        setActiveButtons([]);
        setMessage('INCORRECT SEQUENCE');
        setTimeout(() => setMessage('SYSTEM LOCKED'), 2000);
      }
    } else {
      setIsUnlocked(false);
      setMessage('SYSTEM LOCKED');
    }
  }, [activeButtons]);

  return (
    <section class="relative h-screen w-screen overflow-hidden bg-gray-900 text-green-500 font-mono flex flex-col items-center justify-center">
      <h1 class="text-6xl font-bold mb-8 animate-pulse">{message}</h1>
      
      <div class="flex space-x-4 mb-8">
        <AccessButton id={1} isActive={activeButtons.includes(1)} onClick={handleButtonClick} />
        <AccessButton id={2} isActive={activeButtons.includes(2)} onClick={handleButtonClick} />
        <AccessButton id={3} isActive={activeButtons.includes(3)} onClick={handleButtonClick} />
      </div>
      
      <div class={`w-32 h-32 rounded-full flex items-center justify-center text-6xl ${
        isUnlocked ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}>
        {isUnlocked ? '🔓' : '🔒'}
      </div>
      
      <p class="mt-8 text-xl animate-bounce">
        {isUnlocked ? 'System Unlocked' : 'Enter the correct sequence'}
      </p>

      <div class="absolute bottom-4 left-4 flex items-center text-yellow-500">
        <span class="mr-2">⚠️</span>
        <span>Warning: Unauthorized access attempt detected</span>
      </div>
      
      <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
      <div class="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" />
    </section>
  );
}