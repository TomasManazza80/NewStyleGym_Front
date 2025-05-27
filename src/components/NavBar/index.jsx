import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../images/logoG.png";
import authContext from "../../store/store";
import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function Index() {
  const [toggle, setToggle] = useState(false);
  const authCtx = useContext(authContext);
  const [role, setRole] = useState(null);
  const cartLength = useSelector((state) => state.cart.length);

  const signOutHandler = () => {
    localStorage.removeItem("token");
    authCtx.setToken(null);
    alert("Sign-out successful.");
    closeNavbar();
  };

  const isAdmin = async (email) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found!");
      return false;
    }

    try {
      const response = await axios.get(`${API_URL}/role/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.role === "admin";
    } catch (error) {
      console.error(`Error retrieving user role: ${error}`);
      return false;
    }
  };

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const closeNavbar = () => {
    setToggle(false);
  };

  

  const fetchUserRole = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const isAdminRole = await isAdmin(decoded.email);
      setRole(isAdminRole);
      authCtx.setToken(token);
    } catch (error) {
      console.error("Error decoding token or fetching role:", error);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  return (
    <>
      <div className="">
        <nav className="container m-auto flex fixed top-0 right-0 left-0 p-2 max-lg:flex justify-between items-center backdrop-blur-sm bg-white/30 z-10 shadow-sm">
          <div>
            <img src={logo} alt="logo"  className="h-[100px] w-auto" />
          </div>
          <div className="max-lg:hidden">
            <NavLink to="/" className="text-black p-3 m-2 font-bold">
              Inicio
            </NavLink>
            <NavLink to="/products" className="text-black p-3 m-2 font-bold">
              Pagos
            </NavLink>
            <NavLink to="/about" className="text-black p-3 m-2 font-bold">
              Información
            </NavLink>
            <NavLink to="/contact" className="text-black p-3 m-2 font-bold">
              Contacto
            </NavLink>
            {role && (
              <NavLink to="/admin" className="text-black p-3 m-2 font-bold">
                Panel de Administración
              </NavLink>
            )}
          </div>
          <div className="text-black max-lg:hidden">
            <NavLink to="/cart" className="p-2 m-2">
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="p-1 rounded-full">{cartLength}</span>
            </NavLink>
            {authCtx.token ? (
              <button
                onClick={signOutHandler}
                className="p-1 m-1 bg-black text-white"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="p-2 m-2 bg-black text-white">
                Login
              </NavLink>
            )}
          </div>
          {toggle ? (
            <div className="bg-white flex flex-col lg:hidden">
              <FontAwesomeIcon
                icon={faXmark}
                className="text-black cursor-pointer lg:hidden"
                onClick={toggleHandler}
              />
              <NavLink
                to="/"
                className="text-black p-3 m-2 font-bold"
                onClick={closeNavbar}
              >
                Inicio
              </NavLink>
              <NavLink
                to="/products"
                className="text-black p-3 m-2 font-bold"
                onClick={closeNavbar}
              >
                Mmembresía
                              </NavLink>
              <NavLink
                to="/about"
                className="text-black p-3 m-2 font-bold"
                onClick={closeNavbar}
              >
                Información
              </NavLink>
              <NavLink
                to="/contact"
                className="text-black p-3 m-2 font-bold"
                onClick={closeNavbar}
              >
                Contacto
              </NavLink>
              <NavLink to="/cart" className="p-2 m-2" onClick={closeNavbar}>
                <FontAwesomeIcon icon={faCartShopping} />
                <span className="p-1 rounded-full">{cartLength}</span>
              </NavLink>
              {authCtx.token ? (
                <button
                  onClick={signOutHandler}
                  className="p-2 m-2 bg-black text-white"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="p-2 m-2 bg-black text-white text-center"
                  onClick={closeNavbar}
                >
                  Login
                </NavLink>
              )}
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              className="text-black cursor-pointer lg:hidden"
              onClick={toggleHandler}
            />
          )}
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Index;