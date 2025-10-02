import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

// Páginas
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
