import { useState, useEffect } from "preact/hooks";

export default function Header({ children }: { children?: preact.ComponentChildren }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = currentTime.toLocaleString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <header class="bg-gray-900 text-green-500 p-4 flex flex-col items-center border-b-2 border-green-500 relative">
      <div class="w-full flex justify-between items-center mb-2">
        <h1 class="text-2xl font-bold">The Tangled Circuit Web</h1>
        <div class="text-right">
          <div>{formattedDateTime}</div>
        </div>
      </div>
      {children}
    </header>
  );
}
