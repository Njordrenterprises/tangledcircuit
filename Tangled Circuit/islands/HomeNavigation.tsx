import { useState } from "preact/hooks";

const NavigationButton = ({ index, onClick, label }: { index: number; onClick: () => void; label: string }) => {
  const [isClicked, setIsClicked] = useState(false);

  const baseClasses = "w-full h-full cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center";
  const hoverClasses = "hover:brightness-115 hover:shadow-[0_0_20px_#00ff00]";
  
  const shapeClasses = index === 0
    ? "rounded-lg"
    : "rounded-full";

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      onClick();
    }, 400);
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${hoverClasses}
        ${shapeClasses}
        bg-gradient-to-br from-green-900 to-green-700 border-4 border-green-500
        ${isClicked ? 'animate-shrink-spiral' : `animate-grow-shrink-${index + 1} animate-gentle-wind-${index + 1}`}
      `}
      onClick={handleClick}
    >
      <span className="text-green-300 font-mono text-2xl sm:text-3xl font-bold">
        {label}
      </span>
    </div>
  );
};

export default function HomeNavigation({ onNavigate }: { onNavigate: (index: number) => void }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-between h-full bg-gray-900 p-4">
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md space-y-8 my-8">
        <div className="w-full aspect-square max-h-[40vh]">
          <NavigationButton index={0} onClick={() => onNavigate(1)} label="DENO CHAT" />
        </div>
        <div className="w-4/5 aspect-square max-h-[35vh]">
          <NavigationButton index={1} onClick={() => onNavigate(0)} label="DAS ART" />
        </div>
      </div>
    </div>
  );
}