import { Link } from "@tanstack/react-router";
import { NAVIGATION } from "../../lib/constants";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userCredits, setUserCredits] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    setIsLoggedIn(!!accessToken);

    const storedUserName = localStorage.getItem("user_name");
    const storedUserCredits = localStorage.getItem("user_credits");
    const storedUserAvatar = localStorage.getItem("user_avatar");

    if (storedUserName && storedUserCredits && storedUserAvatar) {
      setUserName(storedUserName);
      setUserCredits(storedUserCredits);
      setUserAvatar(storedUserAvatar);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_credits");
    localStorage.removeItem("user_avatar");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div>
          <Link
            to="/"
            className="text-white text-lg lg:text-3xl font-extrabold tracking-tight"
          >
            <img
              className="w-auto h-20 mx-auto"
              src={logo}
              alt="Your Company"
            />
          </Link>
        </div>

        {userName && (
          <div className="hidden lg:flex items-center">
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <span className="text-white text-lg">{userName}</span>
              <div className="text-white text-sm">Credits: {userCredits}</div>
            </div>
          </div>
        )}

        <div className="lg:hidden ml-auto">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none text-transparent"
          >
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>
        </div>

        <div
          className={`lg:flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 ${
            isOpen ? "flex flex-col items-center" : "hidden"
          } justify-center mt-4 lg:mt-0`}
        >
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-white hover:text-blue-300 transition duration-300"
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
