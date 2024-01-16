import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import SettingsPage from "./pages/SettingsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Navigation from "./components/Navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import FavoritesPage from "./pages/FavouritesPage";
import { QueryClient, QueryClientProvider } from "react-query";
import "./styles/SearchBar.css";
import './styles/Global.css'; 

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    console.log("Stored favorites from localStorage:", storedFavorites);

    try {
      return JSON.parse(storedFavorites) || [];
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = (signedInUser) => {
    setUser(signedInUser);
  };

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign Out failed:", error);
    }
  };

  const updateFavorites = (newFavorites) => {
    const favoritesArray = Array.isArray(newFavorites)
      ? newFavorites
      : [newFavorites];

    console.log("Type of newFavorites:", typeof favoritesArray);
    console.log("Content of newFavorites:", favoritesArray);

    setFavorites(favoritesArray);
    localStorage.setItem("favorites", JSON.stringify(favoritesArray));
  };

  const handleAddToFavorites = (newFavorite) => {
    const newFavoritesArray = [...favorites, newFavorite];

    console.log("Type of newFavorites:", typeof newFavoritesArray);
    console.log("Content of newFavorites:", newFavoritesArray);

    setFavorites(newFavoritesArray);
    localStorage.setItem("favorites", JSON.stringify(newFavoritesArray));
  };

  const handleRemoveFromFavorites = (recipeToRemove) => {
    const updatedFavorites = favorites.filter(
      (recipe) => recipe.title !== recipeToRemove.title
    );
    updateFavorites(updatedFavorites);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navigation isAuthenticated={user !== null} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={<RecipeListPage onAddToFavorites={handleAddToFavorites} />}
          />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/signin"
            element={<SignInPage onSignIn={handleSignIn} />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
              />
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
