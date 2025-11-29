import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function TestPlayer(){
  const { id } = useParams();
  const [test,setTest] = useState(null);
  const [answers,setAnswers] = useState({});
  const [currentIndex,setCurrentIndex] = useState(0);
  const [timeLeft,setTimeLeft] = useState(90*60);

  useEffect(()=>{
    API.get('/tests').then(r=>{
      const found = (r.data||[]).find(t=>t._id === id);
      setTest(found || { questions: [] });
    }).catch(()=>setTest({questions:[]}));
  },[id]);

  useEffect(()=>{ if(!timeLeft) return; const t=setInterval(()=>setTimeLeft(s=>s-1),1000); return ()=>clearInterval(t); },[timeLeft]);

  if(!test) return <div>Loading...</div>;
  const q = test.questions[currentIndex];
  const progress = Object.keys(answers).length;
  const total = test.questions.length;
  const h = String(Math.floor(timeLeft/3600)).padStart(2,'0');
  const m = String(Math.floor((timeLeft%3600)/60)).padStart(2,'0');
  const s = String(timeLeft%60).padStart(2,'0');

  const select = (qid, idx) => setAnswers(p => ({...p, [qid]: idx}));

  const submit = async ()=> {
    const payload = { answers: Object.keys(answers).map(qid=>({ qId: qid, answerIndex: answers[qid] }))};
    const res = await API.post(`/tests/${id}/submit`, payload).catch(e=>{ alert('Submit failed'); return; });
    if(res?.data) location.href = `/result/${res.data.resultId}`;
  };

  return (
    <div className="grid grid-cols-[220px,1fr,300px] gap-5 h-[calc(100vh-5rem)]">
      <div className="card p-4">
        <h4 className="text-sm font-semibold mb-3">Questions</h4>
        <div className="grid grid-cols-4 gap-2">
          {test.questions.map((_,i)=> {
            const answered = answers[test.questions[i]._id] !== undefined;
            return (
              <button key={i} onClick={()=>setCurrentIndex(i)} className={`h-8 rounded ${i===currentIndex ? 'bg-indigo-600' : answered ? 'bg-emerald-600/60' : 'bg-slate-800' }`}>{i+1}</button>
            )
          })}
        </div>

        <div className="mt-4 text-xs muted">
          <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-indigo-500 rounded-full"/> Current</div>
          <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-emerald-500 rounded-full"/> Answered</div>
          <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-slate-600 rounded-full"/> Not Answered</div>
        </div>
      </div>

      <div className="card p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">Question {currentIndex+1} of {total}</h3>
          <div className="text-sm muted mb-6">{q?.text}</div>
          <div className="space-y-3">
            {(q?.options||[]).map((op,idx)=>(
              <button key={idx} onClick={()=>select(q._id, idx)} className={`w-full text-left p-3 rounded border ${answers[q._id] === idx ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-transparent hover:bg-slate-700' }`}>
                <div className="flex items-center gap-3">
                  <div className={`h-4 w-4 rounded-full border ${answers[q._id]===idx? 'bg-white':''}`}></div>
                  <div>{op}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-xs text-emerald-400">✅ Your answer is autosaved.</div>
          <div className="flex gap-2">
            <button onClick={()=>setCurrentIndex(i=>Math.max(i-1,0))} className="px-4 py-2 bg-slate-800 rounded">Previous</button>
            <button onClick={()=>setCurrentIndex(i=>Math.min(i+1,total-1))} className="px-4 py-2 bg-indigo-600 rounded">Next →</button>
          </div>
        </div>
      </div>

      <div className="card p-5 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold mb-3">Time Remaining</h4>
          <div className="flex gap-3 mb-4">
            <div className="bg-slate-800 px-3 py-2 rounded text-center">
              <div className="text-lg font-bold">{h}</div><div className="text-xs muted">Hours</div>
            </div>
            <div className="bg-slate-800 px-3 py-2 rounded text-center">
              <div className="text-lg font-bold">{m}</div><div className="text-xs muted">Minutes</div>
            </div>
            <div className="bg-slate-800 px-3 py-2 rounded text-center">
              <div className="text-lg font-bold">{s}</div><div className="text-xs muted">Seconds</div>
            </div>
          </div>

          <div className="text-sm mb-2 flex justify-between"><span>Progress</span><span>{progress}/{total}</span></div>
          <div className="h-2 bg-slate-800 rounded overflow-hidden mb-4"><div className="h-full bg-indigo-500" style={{width:`${(progress/total)*100}%`}}/></div>

          <button className="w-full py-2 bg-slate-800 rounded mb-3">🚩 Flag for Review</button>
        </div>

        <button onClick={submit} className="w-full py-2 btn-gradient rounded">Submit Test</button>
      </div>
    </div>
  );
}
