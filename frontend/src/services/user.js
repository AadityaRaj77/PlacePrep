import API from "./api";

export async function refreshUser() {
  try {
    const res = await API.get("/auth/me");
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data.user;
  } catch {
    return null;
  }
}
