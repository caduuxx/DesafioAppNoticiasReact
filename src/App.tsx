import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import { NewsProvider } from "./context/NewsContext";
import Header from "./components/Header";

function App() {
  return (
    <NewsProvider>
      <BrowserRouter>
        <Header />
        <main className="p-4 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </BrowserRouter>
    </NewsProvider>
  );
}

export default App;
