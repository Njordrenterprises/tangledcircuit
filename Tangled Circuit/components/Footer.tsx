import { useState, useEffect } from "preact/hooks";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <footer class="bg-gray-900 text-green-500 p-4 flex justify-center items-center border-t-2 border-green-500">
      <div>© {currentYear} Njordr Enterprises Inc.</div>
    </footer>
  );
}
