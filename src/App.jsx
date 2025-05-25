import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CatsPage from "./pages/CatsPage";
import DogsPage from "./pages/DogsPage";
import CatDetailPage from "./pages/CatDetailPage";
import DogDetailPage from "./pages/DogDetailPage";
import UserBar from "./components/UserBar/UserBar";
import CurrentUserInfo from "./components/UserBar/CurrentUserInfo";
import FavoritesPage from "./pages/FavoritesPage";
import BreedComparatorPage from "./pages/BreedComparatorPage"; // Import the new page

const Home = () => <div className="p-4">Home Page</div>
const MatcherPage = () => <div className="p-4">Matcher Page</div>

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <UserBar />
                <CurrentUserInfo />
                <main className="container mx-auto mt-4">
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/gatos" element={<CatsPage/>}/>
                        <Route path="/gatos/:breedId" element={<CatDetailPage />} />
                        <Route path="/perros" element={<DogsPage/>}/>
                        <Route path="/perros/:breedId" element={<DogDetailPage />} />
                        <Route path="favoritos" element={<FavoritesPage />} />
                        <Route path="/matcher" element={<BreedComparatorPage/>}/>
                        <Route path="/comparador" element={<BreedComparatorPage />} /> {/* Add the new route */}
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;
