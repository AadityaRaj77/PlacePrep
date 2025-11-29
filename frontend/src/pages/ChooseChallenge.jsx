import { motion } from "framer-motion";
import API from "../services/api";

export default function ChooseChallenge(){
  const cards = [
    {id:'apt', title:'Aptitude Round', tags:['Quantitative','Logical','Verbal'], difficulty:'Medium'},
    {id:'code', title:'Coding Round', tags:['DSA','Algorithms'], difficulty:'Medium'},
    {id:'hr', title:'HR & Behavioral', tags:['Behavioral','Situational'], difficulty:'Medium'},
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Choose Your Challenge</h1>
      <p className="text-sm muted mb-6">Select a round to start your practice session.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map(c=>(
          <motion.div key={c.id} whileHover={{y:-6}} className="card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center">🔹</div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
              </div>
              <div className="flex gap-2 flex-wrap mb-4">{c.tags.map(t=> <span key={t} className="pill">{t}</span>)}</div>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1 bg-slate-800 rounded text-sm">Easy</button>
                <button className="px-3 py-1 bg-slate-700 rounded text-sm">Medium</button>
                <button className="px-3 py-1 bg-slate-800 rounded text-sm">Hard</button>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="btn-gradient px-4 py-2 rounded-lg">Start Practice</button>
              <button className="btn-gradient-alt px-4 py-2 rounded-lg">Customize</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
