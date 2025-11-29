import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tests, setTests] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      nav("/login");
      return;
    }

    setUser(JSON.parse(stored));

    API.get("/tests")
      .then((res) => setTests(res.data || []))
      .catch(() => setTests([]));
  }, [nav]);

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  if (!user) return null;

  return (
    <div className="p-6">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-bold">
            Welcome, <span className="text-indigo-400">{user.name}</span>
          </h1>
          <p className="text-xs text-slate-400">{user.email}</p>
        </div>

        <button
          onClick={logout}
          className="px-3 py-1 text-xs rounded bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 p-4 rounded">
          <p className="text-xs text-slate-400">Tests Available</p>
          <h2 className="text-xl font-bold">{tests.length}</h2>
        </div>
        <div className="bg-slate-900 p-4 rounded">
          <p className="text-xs text-slate-400">Status</p>
          <h2 className="text-xl font-bold">Active</h2>
        </div>
        <div className="bg-slate-900 p-4 rounded">
          <p className="text-xs text-slate-400">Account</p>
          <h2 className="text-xl font-bold">Verified</h2>
        </div>
      </div>

      {/* TEST LIST */}
      <h2 className="text-lg mb-3 font-semibold">Mock Tests</h2>
      {tests.length === 0 ? (
        <p className="text-sm text-slate-400">No tests available</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {tests.map((t) => (
            <div key={t._id} className="bg-slate-900 p-4 rounded">
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-xs text-slate-400">{t.description}</p>
              <Link
                to={`/test/${t._id}`}
                className="inline-block mt-3 text-xs bg-indigo-600 px-3 py-1 rounded"
              >
                Start
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
