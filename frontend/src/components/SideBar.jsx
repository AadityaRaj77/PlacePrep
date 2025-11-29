import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SideBar() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/challenge", label: "Mock Tests" },
    { to: "/curriculum", label: "Curriculum" },
    { to: "/resume", label: "Resume" },
  ];

  return (
    <aside className="w-64 bg-[#0d1416] border-r border-slate-800 p-6 flex flex-col">
      <div className="mb-8">
        <div className="text-lg font-bold">PlacePrep</div>
        <div className="text-xs text-slate-400">Placement Platform</div>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-slate-800" : "hover:bg-slate-800"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="mt-6 border-t border-slate-800 pt-4">
          <div className="text-sm font-semibold">{user.name}</div>
          <div className="text-xs text-slate-400">{user.email}</div>

          <button
            onClick={logout}
            className="mt-3 w-full text-xs bg-red-600 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}
