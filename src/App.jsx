import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import logo from "./assets/logo.jpg";
import Header from "./components/Header/Header";
import CurrentUserInfo from "./components/UserBar/CurrentUserInfo";
import UserBar from "./components/UserBar/UserBar";
import BreedComparatorPage from "./pages/BreedComparatorPage"; // Import the new page
import CatDetailPage from "./pages/CatDetailPage";
import CatsPage from "./pages/CatsPage";
import DogDetailPage from "./pages/DogDetailPage";
import DogsPage from "./pages/DogsPage";
import FavoritesPage from "./pages/FavoritesPage";

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <img
      className="w-1/3 max-w-xs rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
      src={logo}
      alt="logo"
    />
    <h1 className="mt-6 text-3xl font-bold text-gray-800">
      Bienvenido a devops: {<CurrentUserInfo />}
    </h1>
    <p className="mt-2 text-lg text-gray-600">
      Explora las funcionalidades que hemos preparado para ti.
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <UserBar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gatos" element={<CatsPage />} />
            <Route path="/gatos/:breedId" element={<CatDetailPage />} />
            <Route path="/perros" element={<DogsPage />} />
            <Route path="/perros/:breedId" element={<DogDetailPage />} />
            <Route path="favoritos" element={<FavoritesPage />} />
            <Route path="/matcher" element={<BreedComparatorPage />} />
            <Route path="/comparador" element={<BreedComparatorPage />} />{" "}
            {/* Add the new route */}
          </Routes>
        </main>
        <ToastContainer
          autoClose={3000}
          pauseOnHover
          position="top-right"
          closeOnClick
          closeButton
          limit={4}
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;
