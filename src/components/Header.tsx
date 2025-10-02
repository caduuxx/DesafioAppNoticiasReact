import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo / Nome do App */}
      <h1 className="text-xl font-bold">
        <Link to="/">NotíciasApp</Link>
      </h1>

      {/* Menu de Navegação */}
      <nav className="flex gap-6">
        <Link
          to="/"
          className="hover:text-gray-200 transition-colors"
        >
          Início
        </Link>
        <Link
          to="/favorites"
          className="hover:text-gray-200 transition-colors"
        >
          Favoritos
        </Link>
      </nav>
    </header>
  );
};

export default Header;
