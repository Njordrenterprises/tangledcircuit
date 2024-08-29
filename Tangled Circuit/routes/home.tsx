import HomeNavigation from "../islands/HomeNavigation.tsx";

export default function Home() {
  const handleNavigation = (index: number) => {
    // You can add navigation logic here if needed
    console.log(`Navigating to index: ${index}`);
  };

  return <HomeNavigation onNavigate={handleNavigation} />;
}