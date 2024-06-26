import { Link, useLocation } from "react-router-dom";
import navItems from "../constants/navItems";
import { useState, useRef, useEffect } from "react";
import ProfileModel from "./Models/ProfileModel";

interface NavBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ searchQuery, setSearchQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileModel, setProfileModel] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (
    e: React.MouseEvent | React.TouchEvent | React.KeyboardEvent
  ) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeSidebar = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", closeSidebar);
    return () => {
      document.body.removeEventListener("click", closeSidebar);
    };
  }, [sidebarRef]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      toggleMenu(event);
    }
  };

  const profileClick = () => {
    setProfileModel(true);
  };

  const profileClose = () => {
    setProfileModel(false);
  };

  let imagePath: string;
  if (localStorage.getItem("photo")) {
    imagePath = localStorage.getItem("photo") as string; // Type assertion for clarity
  } else {
    imagePath = "./assets/icons/profile.svg";
  }

  const location = useLocation();
  const isContactsPage = location.pathname === "/contacts";

  return (
    <>
      <div className="navbar flex items-center justify-between mb-3">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="logo"
              className="pointer-events-none select-none px-5 mt-3"
              height={150}
              width={243}
            />
          </Link>
        </div>

        {/* Centered NavItems */}
        <div className="hidden md:flex flex-grow text-center justify-center">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) => (
              <li key={item.name} className="inline-block ml-6">
                <Link
                  to={item.link}
                  className="font-navItems text-3xl hover:bg-transparent hover:opacity-80"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: Search bar and profile icon */}
        <div className="hidden md:flex items-center">
          <div className="form-control relative mr-4">
            <input
              type="text"
              placeholder="Search Contacts"
              className="input input-bordered pr-10 w-24 md:w-auto rounded-badge bg-transparent"
              value={searchQuery}
              onChange={handleSearchInputChange}
              disabled={!isContactsPage}
            />
            <img
              src="./assets/icons/search.png"
              alt="Search Icon"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 w-9 h-9 text-gray-400"
            />
          </div>
          <div
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={profileClick}
          >
            <div className="w-10 rounded-full pointer-events-none">
              <img alt="Profile" src={imagePath} />
            </div>
          </div>
        </div>
        {/* Sidebar Toggle (Mobile) */}
        <div className="block md:hidden p-2">
          <img
            src="./assets/icons/toggle.svg"
            alt="toggle"
            onClick={toggleMenu}
          />
        </div>
      </div>

      {profileModel && (
        <ProfileModel isOpen={profileModel} onClose={profileClose} />
      )}

      {isOpen && (
        <div
          className="h-50 w-72 absolute top-0 right-0 z-50 bg-base-100"
          ref={sidebarRef}
        >
          <div className="flex flex-col justify-center p-4 mb-4 items-center">
            <div
              role="button"
              className="btn btn-ghost btn-circle avatar w-1/3 h-1/3"
            >
              <img alt="Profile" src={imagePath} onClick={profileClick} />
            </div>

            <ul className="menu menu-horizontal px-1 p-8">
              {navItems.map((item) => (
                <li key={item.name} className="inline-block ml-6">
                  <Link
                    to={item.link}
                    className="font-navItems text-3xl hover:bg-transparent hover:opacity-80"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <div className="form-control relative mr-4 p-5">
                <input
                  type="text"
                  placeholder="Search Contacts"
                  className="input input-bordered w-full rounded-badge bg-transparent"
                  value={searchQuery}
                  disabled={!isContactsPage}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleKeyPress}
                />
                <img
                  src="./assets/icons/search.png"
                  alt="Search Icon"
                  className="absolute top-1/2 right-6 transform -translate-y-1/2 w-9 h-9 text-gray-400 cursor-pointer hover:opacity-80"
                  onClick={toggleMenu}
                />
              </div>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
