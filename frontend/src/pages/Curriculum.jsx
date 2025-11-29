import { useEffect, useState } from "react";
import API from "../services/api";

export default function Curriculum(){
  const [sections,setSections] = useState([]);
  useEffect(()=> {
    API.get('/curriculum').then(r=>setSections(r.data||[])).catch(()=>setSections([
      { _id:'a', title:'Arrays & Hashing', completed:5, total:8, items:[{title:'Two Pointers', level:'Easy'},{title:'Sliding Window', level:'Medium'}]},
      { _id:'b', title:'Advanced Data Structures', completed:0, total:6, items:[]},
      { _id:'c', title:'System Design Basics', completed:1, total:4, items:[]},
    ]))
  },[]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Course Curriculum</h1>
      <div className="space-y-4">
        {sections.map(s=>(
          <details key={s._id} className="card p-4">
            <summary className="flex justify-between items-center cursor-pointer">
              <div>
                <div className="font-semibold">{s.title}</div>
                <div className="text-xs muted">{s.completed}/{s.total} Completed</div>
              </div>
              <div className="w-1/3">
                <div className="h-2 bg-slate-800 rounded">
                  <div className="h-full bg-sky-500" style={{width: `${(s.completed/s.total)*100 || 0}%`}}/>
                </div>
              </div>
            </summary>

            <div className="mt-4">
              {(s.items||[]).map((it,idx)=>(
                <div key={idx} className="flex items-center justify-between py-3 border-t border-[var(--inner-border)]">
                  <div>
                    <div className="font-medium">{it.title}</div>
                    <div className="text-xs muted">{it.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1 rounded bg-emerald-700 text-black">{it.level}</span>
                    <button className="btn-gradient-alt px-3 py-1 rounded text-sm">Watch Video</button>
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
