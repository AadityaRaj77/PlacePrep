import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const logged = !!localStorage.getItem('token');
  return (
    <nav className="bg-slate-800 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold">PrepDash</Link>
      <div className="flex gap-3 items-center">
        <Link to="/resume" className="px-3 py-2 rounded bg-slate-700">Resume</Link>
        {logged ? <button onClick={()=>{ localStorage.removeItem('token'); location.href='/'; }} className="px-3 py-2 rounded bg-pink-600">Logout</button> : <Link to="/login" className="px-3 py-2 rounded bg-slate-700">Login</Link>}
      </div>
    </nav>
  );
}
