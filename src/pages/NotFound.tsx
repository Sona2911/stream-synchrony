
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gray-100 dark:bg-youtube-black dark:text-white">
      <div className="text-center max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-youtube-red">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          This page isn't available. Sorry about that.
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Try searching for something else, or go back to the homepage.
        </p>
        <Link to="/">
          <Button className="bg-youtube-red hover:bg-youtube-darkred">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
