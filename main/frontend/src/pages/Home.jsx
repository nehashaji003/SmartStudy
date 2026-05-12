import { useNavigate } from "react-router-dom";
import { LayoutGrid, ArrowRight, Sparkles, BookOpen, Clock } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#fafafa] flex items-center justify-center px-6 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-3xl text-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8 animate-bounce-slow">
          <Sparkles size={16} className="text-blue-600" />
          <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
            Next Gen Learning
          </span>
        </div>

        {/* Logo with Floating Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white p-6 rounded-[2rem] shadow-2xl flex items-center justify-center border border-slate-100">
              <LayoutGrid size={48} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Title & Tagline */}
        <h1 className="text-7xl font-black text-slate-900 tracking-tight mb-6">
          Smart<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Study</span>
        </h1>

        <p className="text-xl text-slate-500 max-w-xl mx-auto leading-relaxed mb-10 font-medium">
          Elevate your academic workflow with an intuitive interface designed for deep focus and peak organization.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="group relative bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:bg-slate-800 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] flex items-center gap-3 active:scale-95"
          >
            Open Planner
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
        </div>

        {/* Soft "Trust" Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200/60 flex flex-wrap justify-center gap-8 text-slate-400">
          <div className="flex items-center gap-2">
            <BookOpen size={18} /> <span className="text-sm font-medium">Smart Scheduling</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} /> <span className="text-sm font-medium">Focus Timer</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;