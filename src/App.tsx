import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import { NewsProvider } from "./context/NewsContext";

function App() {
  return (
    <NewsProvider>
      <BrowserRouter>
        {/* Main content */}
        <main
          className="pt-24 mx-auto px-6"
          style={{
            maxWidth: "900px",
            minHeight: "100vh",
            paddingBottom: "80px", // espaço para bottom nav
          }}
        >
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
