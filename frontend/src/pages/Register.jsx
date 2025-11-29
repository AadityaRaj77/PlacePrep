import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      nav("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={submit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-[340px]"
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          className="w-full mb-3 p-2 rounded bg-slate-800"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 rounded bg-slate-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 rounded bg-slate-800"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-indigo-600 py-2 rounded">
          Create Account
        </button>

        <p className="text-xs mt-4 text-center">
          Already user? <Link to="/login" className="text-indigo-400">Login</Link>
        </p>
      </form>
    </div>
  );
}
