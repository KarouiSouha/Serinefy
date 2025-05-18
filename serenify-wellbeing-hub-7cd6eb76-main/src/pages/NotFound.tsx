
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-serenity-50 dark:bg-serenity-900">
        <div className="text-center px-6 py-16">
          <h1 className="text-6xl font-bold mb-4 text-serenity-800 dark:text-serenity-100">404</h1>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-serenity-100 dark:bg-serenity-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-serenity-500 dark:text-serenity-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <p className="text-xl text-serenity-600 dark:text-serenity-300 mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>
          <Button asChild className="rounded-full">
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
