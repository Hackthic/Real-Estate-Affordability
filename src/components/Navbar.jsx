import { useState } from "react";
import {
  RiMenu3Line,
  RiCloseLargeFill,
  RiSunLine,
  RiMoonClearLine,
} from "react-icons/ri";

import { NAV_LINKS } from "../lib/constants";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { isDarkMode, handleToggleTheme } = useTheme();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-3 mr-3">
      <nav
        className={`flex absolute top-8 rounded bg-white dark:bg-zinc-800 dark:text-white right-0 flex-col items-start gap-2 z-50 p-3 w-40 md:flex-row md:top-0 md:relative md:bg-transparent md:text-white md:w-full ${
          !isMobileNavOpen ? "hidden md:flex" : ""
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-blue-600 md:hover:bg-white md:px-2 md:rounded"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <button
        className="md:mt-0 mt-2 text-lg text-white cursor-pointer"
        onClick={handleToggleTheme}
      >
        {isDarkMode ? <RiSunLine /> : <RiMoonClearLine />}
      </button>
      <button
        className="md:hidden mt-2 text-lg text-white cursor-pointer"
        onClick={() => setIsMobileNavOpen((isOpen) => !isOpen)}
      >
        {isMobileNavOpen ? <RiCloseLargeFill /> : <RiMenu3Line />}
      </button>
    </div>
  );
}

export default Navbar;
