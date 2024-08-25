import { useState, useEffect } from "preact/hooks";

export default function WelcomeIsland() {
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);

  useEffect(() => {
    const resetClickTimeout = setTimeout(() => {
      setClickedIndex(-1);
    }, 500);

    return () => clearTimeout(resetClickTimeout);
  }, [clickedIndex]);

  return (
    <div class="card-container">
      {['page-1', 'page-2', 'page-3', 'page-4'].map((page, index) => (
        <a
          href={`/${page}`}
          key={index}
          class={`card card-${index + 1} ${clickedIndex === index ? 'clicked' : ''} ${hoverIndex === index ? 'hovered' : ''}`}
          onClick={() => setClickedIndex(index)}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(-1)}
        >
          <div class="card-content">{page}</div>
        </a>
      ))}
    </div>
  );
}