import { useEffect, useState } from "react";
import API from "../services/api";

export default function TestResult(){
  const [res, setRes] = useState(null);
  useEffect(()=>{
    const id = location.pathname.split('/').pop();
    API.get(`/results/${id}`).then(r=>setRes(r.data)).catch(()=> {
      setRes({ score:180, total:200, correct:45, incorrect:5, time:'55:20', strengths:['Percentages','Profit & Loss','Time & Work'], weaknesses:['Permutations','Probability']});
    });
  },[]);

  if(!res) return <div>Loading...</div>;
  const pct = Math.round((res.score/res.total)*100);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Test Results: Quantitative Aptitude Mock 1</h1>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="card p-6">
          <div className="text-sm muted">Overall Score</div>
          <div className="text-3xl font-bold mt-3">{res.score} / {res.total}</div>
          <div className="mt-3 text-sm text-emerald-400">Excellent Work!</div>
        </div>

        <div className="card p-6 flex items-center justify-center">
          <div className="h-36 w-36 rounded-full border border-[var(--inner-border)] flex items-center justify-center">
            <div className="text-2xl font-bold">{pct}%</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="card p-4">Correct Answers <div className="text-xl font-bold mt-2">{res.correct}</div></div>
          <div className="card p-4">Incorrect Answers <div className="text-xl font-bold mt-2">{res.incorrect}</div></div>
          <div className="card p-4">Time Taken <div className="text-xl font-bold mt-2">{res.time}</div></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card p-4">
          <h4 className="font-semibold mb-3">Your Strengths</h4>
          {res.strengths?.map((s,i)=> <div key={i} className="flex items-center justify-between py-2"><div>{s}</div><div className="w-32 h-2 bg-slate-800 rounded"><div className="h-full bg-emerald-500" style={{width:`${60 + i*10}%`}}/></div></div>)}
        </div>

        <div className="card p-4">
          <h4 className="font-semibold mb-3">Areas for Improvement</h4>
          {res.weaknesses?.map((w,i)=> <div key={i} className="flex items-center justify-between py-2"><div>{w}</div><div className="w-32 h-2 bg-slate-800 rounded"><div className="h-full bg-pink-500" style={{width:`${20 + i*10}%`}}/></div></div>)}
        </div>

        <div className="card p-4">
          <h4 className="font-semibold mb-3">Recommended Learning Path</h4>
          <div className="space-y-3">
            <div className="bg-slate-900 p-3 rounded">Mastering Permutations <div className="text-xs muted">Video • 20m</div></div>
            <div className="bg-slate-900 p-3 rounded">Intro to Probability <div className="text-xs muted">Article • 15m</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
