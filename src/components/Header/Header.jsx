import { NavLink } from "react-router-dom";
import { FaPaw } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-gray-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-row">
          <h1 className="text-2xl font-bold">Pet Plataform </h1>
          <FaPaw />
        </div>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-300 font-bold border-b-2 border-blue-300 text-decoration-line: underline"
                    : "font-bold"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gatos"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-300 font-bold border-b-2 border-blue-300 text-decoration-line: underline"
                    : "font-bold"
                }
              >
                Gatos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/perros"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-300 font-bold border-b-2 border-blue-300 text-decoration-line: underline"
                    : "font-bold"
                }
              >
                Perros
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favoritos"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-300 font-bold border-b-2 border-blue-300 text-decoration-line: underline"
                    : "font-bold"
                }
              >
                Favoritos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/matcher"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-300 font-bold border-b-2 border-blue-300 text-decoration-line: underline"
                    : "font-bold"
                }
              >
                Matcher
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
