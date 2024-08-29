import { useState, useEffect } from "preact/hooks";

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <header class="bg-gray-900 text-green-500 p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">The Tangled Circuit Web</h1>
      <div class="text-right">
        <div>{formattedDate}</div>
        <div>{formattedTime}</div>
      </div>
    </header>
  );
}
