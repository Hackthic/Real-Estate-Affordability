import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleToggleTheme = () => {
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, setIsDarkMode, handleToggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("ThemeProvider must be used inside it's context");
  }

  return context;
};
