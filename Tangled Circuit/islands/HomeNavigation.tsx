import { useState } from "preact/hooks";

const NavigationSquare = ({ index }: { index: number }) => {
  const [isClicked, setIsClicked] = useState(false);

  const baseClasses = "w-48 h-48 m-4 cursor-pointer transition-all duration-300 ease-in-out";
  const hoverClasses = "hover:brightness-115";
  
  const uniqueClasses = [
    "bg-gradient-to-br from-red-500 to-yellow-500 border-4 border-red-700 rounded-lg",
    "bg-gradient-to-tl from-blue-500 to-green-500 border-4 border-blue-700 rounded-full",
    "bg-gradient-to-tr from-purple-500 to-pink-500 border-4 border-purple-700 rounded-3xl",
    "bg-gradient-to-bl from-yellow-500 to-green-500 border-4 border-yellow-700 rounded-none"
  ][index];

  const animationClasses = [
    "animate-wiggle",
    "animate-float",
    "animate-pulse-slow",
    "animate-spin-slow"
  ][index];

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${hoverClasses}
        ${uniqueClasses}
        ${isClicked ? 'animate-shrink-spiral' : animationClasses}
      `}
      onClick={handleClick}
    />
  );
};

export default function HomeNavigation() {
  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen bg-gray-900">
      {[0, 1, 2, 3].map((index) => (
        <NavigationSquare key={index} index={index} />
      ))}
    </div>
  );
}