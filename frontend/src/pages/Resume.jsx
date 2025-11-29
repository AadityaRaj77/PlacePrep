import { useEffect, useState } from "react";
import API from "../services/api";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);

  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (u.name) setFullName(u.name);
        if (u.email) setEmailId(u.email);
      } catch {
      }
    }

    API.get("/resume/me")
      .then((res) => {
        if (res.data.resumeUrl) setResumeUrl(res.data.resumeUrl);
      })
      .catch(() => {});
  }, []);

  const upload = async () => {
    if (!file) return alert("Select a file first");
    const form = new FormData();
    form.append("resume", file);
    try {
      const res = await API.post("/resume/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResumeUrl(res.data.url);
      alert("Resume uploaded");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.msg || "Upload failed");
    }
  };

  return (
    <div className="grid grid-cols-[minmax(0,2fr),minmax(0,1.2fr)] gap-6">
      {/* LEFT: upload + contact info */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Manage Your Resume</h1>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-5">
          <div className="border border-dashed border-slate-600 rounded-xl p-5 flex flex-col items-center text-sm">
            <p className="text-slate-300 mb-3">Upload your latest resume</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-xs"
            />
            <button
              onClick={upload}
              className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-xs"
            >
              Upload Resume
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-3">
            Contact Information <span className="text-[10px] text-emerald-400">(auto-filled from profile)</span>
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Full name
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-emerald-500/70 text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Email
              </label>
              <input
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-emerald-500/70 text-sm"
                placeholder="you@college.edu"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 text-sm"
                placeholder="+91-XXXXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Portfolio / LinkedIn
              </label>
              <input
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 text-sm"
                placeholder="https://"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-sm font-semibold mb-2">Profile Summary</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-xs">
              {fullName ? fullName.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div className="text-sm font-medium">{fullName || "Your Name"}</div>
              <div className="text-xs text-slate-400">{emailId || "you@college.edu"}</div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Make sure your contact information matches your resume header. This
            is what recruiters will use to reach you.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-sm font-semibold mb-2">Resume Preview</h3>
          {resumeUrl ? (
            <>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-400 underline"
              >
                Open uploaded resume
              </a>
              <div className="mt-3 h-40 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-xs text-slate-500">
                Inline preview not implemented. Use the link above to view the file.
              </div>
            </>
          ) : (
            <p className="text-xs text-slate-400">
              No resume uploaded yet. Upload a PDF or DOC/DOCX file.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
