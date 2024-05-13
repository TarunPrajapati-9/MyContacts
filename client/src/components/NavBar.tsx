import { Link } from "react-router-dom";
import navItems from "../constants/navItems";

const NavBar = () => {
  return (
    <div className="navbar flex items-center justify-between mb-3">
      {/* Logo */}
      <div className="flex-1">
        <img
          src="/logo.svg"
          alt="logo"
          className="pointer-events-none select-none px-5 mt-3"
          height={150}
          width={243}
        />
      </div>

      {/* Sidebar Toggle (Mobile) */}
      <div className="block md:hidden p-2">
        <img
          src="./assets/icons/toggle.svg"
          alt="toggle"
          className="h-14 w-14"
        />
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
            placeholder="Search"
            className="input input-bordered pr-10 w-24 md:w-auto rounded-badge bg-transparent"
          />
          <img
            src="./assets/icons/search.png"
            alt="Search Icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 w-9 h-9 text-gray-400 cursor-pointer hover:opacity-80"
          />
        </div>
        <div role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Profile" src="./assets/icons/profile.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
