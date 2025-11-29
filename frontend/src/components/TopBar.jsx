import { useEffect, useState } from "react";

export default function TopBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6">
      <h2 className="text-sm text-slate-300">Dashboard</h2>

      {user && (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">{user.name}</div>
        </div>
      )}
    </header>
  );
}
