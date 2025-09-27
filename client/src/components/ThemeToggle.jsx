import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="ml-4 px-3 py-1 rounded-md 
                 bg-gray-200 text-gray-800 
                 dark:bg-gray-700 dark:text-gray-200 transition"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
