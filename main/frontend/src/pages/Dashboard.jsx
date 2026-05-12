import { useEffect, useState } from "react";
import API from "../api";
import {
  Plus,
  Trash2,
  CheckCircle,
  Moon,
  Sun,
  LayoutGrid,
  Pencil,
} from "lucide-react";

import "../App.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Learning");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPriority, setEditPriority] = useState("");

  const getTasks = async () => {
    const res = await API.get("tasks/");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    await API.post("tasks/", {
      title,
      category,
      priority,
      due_date: new Date().toISOString().split("T")[0],
      completed: false,
    });

    setTitle("");
    getTasks();
  };

  const toggleTask = async (task) => {
    await API.put(`tasks/${task.id}/`, {
      ...task,
      completed: !task.completed,
    });

    getTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`tasks/${id}/`);
    getTasks();
  };

  const startEditing = (task) => {
    setEditingTask(task.id);

    setEditTitle(task.title);
    setEditCategory(task.category);
    setEditPriority(task.priority);
  };

  const saveEdit = async (task) => {
    await API.put(`tasks/${task.id}/`, {
      ...task,
      title: editTitle,
      category: editCategory,
      priority: editPriority,
    });

    setEditingTask(null);

    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  const completedCount = tasks.filter((t) => t.completed).length;

  const progress =
    tasks.length > 0
      ? (completedCount / tasks.length) * 100
      : 0;

  return (
        <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-slate-900"}`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-6">
        
        {/* Sidebar / Stats Card */}
        <aside className={`md:w-1/4 p-6 rounded-3xl shadow-xl h-fit sticky top-6 ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-100"}`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <LayoutGrid className="text-blue-500" /> SmartStudy
            </h2>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="space-y-6">
            <div className="relative flex flex-col items-center">
               <div className="text-center">
                  <p className="text-sm opacity-60">Daily Progress</p>
                  <p className="text-4xl font-black text-blue-500">{Math.round(progress)}%</p>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-slate-700/50">
                <p className="text-xs opacity-60">Total</p>
                <p className="text-xl font-bold">{tasks.length}</p>
              </div>
              <div className="p-3 rounded-2xl bg-green-50 dark:bg-slate-700/50">
                <p className="text-xs opacity-60">Done</p>
                <p className="text-xl font-bold">{completedCount}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Input Area */}
          <div className={`p-4 rounded-3xl shadow-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"}`}>
            <div className="flex flex-col lg:flex-row gap-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="What's your focus today?"
                className={`flex-1 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50 border-gray-200"}`}
              />
              <div className="flex gap-3 items-center">
  {/* Dropdown */}
  <div className="relative">
    <select 
      value={category} 
      onChange={(e) => setCategory(e.target.value)} 
      className={`appearance-none cursor-pointer px-4 py-3 pr-10 rounded-2xl font-bold text-sm transition-all outline-none border-2 
        ${darkMode 
          ? "bg-slate-700 border-slate-600 text-blue-400 hover:border-blue-500" 
          : "bg-blue-50 border-blue-100 text-blue-600 hover:border-blue-300 shadow-sm"
        }`}
    >
      <option value="Learning">📚 Learning</option>
      <option value="Coding">💻 Coding</option>
      <option value="Practice">🎯 Practice</option>
    </select>
    {/* Custom arrow */}
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
  {/* Priority Dropdown */}
<div className="relative">
  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className={`appearance-none cursor-pointer px-4 py-3 pr-10 rounded-2xl font-bold text-sm transition-all outline-none border-2
      ${
        darkMode
          ? priority === "High"
            ? "bg-red-900/30 border-red-500 text-red-300"
            : priority === "Medium"
            ? "bg-yellow-900/30 border-yellow-500 text-yellow-300"
            : "bg-green-900/30 border-green-500 text-green-300"
          : priority === "High"
          ? "bg-red-50 border-red-200 text-red-600"
          : priority === "Medium"
          ? "bg-yellow-50 border-yellow-200 text-yellow-600"
          : "bg-green-50 border-green-200 text-green-600"
      }`}
  >
    <option value="High">🔥 High</option>
    <option value="Medium">⚡ Medium</option>
    <option value="Low">🌱 Low</option>
  </select>

  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
    <svg
      className="fill-current h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
</div>

  {/* Button with high contrast */}
  <button 
    onClick={addTask} 
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-500/40 transition-all hover:shadow-blue-500/60 active:scale-95 font-bold"
  >
    <Plus size={22} strokeWidth={3} />
    <span>Add Task</span>
  </button>
</div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Learning", "Coding", "Practice"].map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border
  ${
    filter === type
      ? darkMode
        ? "bg-blue-600 text-white border-blue-500 shadow-md"
        : "bg-blue-500 text-white border-blue-500 shadow-md"
      : darkMode
      ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
      : "bg-white text-slate-700 border-gray-200 hover:bg-gray-100"
  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Task List Grid */}
          <div className="grid gap-4">
            {tasks.filter(task => filter === "All" || task.category === filter).length === 0 && (
    <div className="flex flex-col items-center justify-center p-20 opacity-40">
      <LayoutGrid size={48} className="mb-4" />
      <p className="text-lg font-medium">No tasks found in this category.</p>
    </div>
  )}
            {tasks
              .filter(task => filter === "All" || task.category === filter)
              .map(task => (
                <div
                  key={task.id}
                  className={`group flex items-center justify-between p-5 rounded-3xl border transition-all hover:scale-[1.01] ${
  task.completed ? "opacity-50 grayscale" : "shadow-sm"
} ${
  darkMode 
    ? "bg-slate-800 border-slate-700" 
    : task.priority === "High" ? "bg-red-50/30 border-red-100" : "bg-white border-gray-100"
}`}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleTask(task)}
                      className={`p-2 rounded-full transition ${task.completed ? "text-green-500 bg-green-500/10" : "text-gray-400 bg-gray-100 dark:bg-slate-700"}`}
                    >
                      <CheckCircle size={24} />
                    </button>
                    <div>
  {editingTask === task.id ? (
    <div className="space-y-2">
      <input
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className={`px-3 py-2 rounded-xl border outline-none w-full ${
          darkMode
            ? "bg-slate-700 border-slate-600 text-white"
            : "bg-white border-gray-200"
        }`}
      />

      <div className="flex gap-2">
        <select
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
          className={`px-3 py-2 rounded-xl border ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white"
              : "bg-white border-gray-200"
          }`}
        >
          <option value="Learning">📚 Learning</option>
          <option value="Coding">💻 Coding</option>
          <option value="Practice">🎯 Practice</option>
        </select>

        <select
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
          className={`px-3 py-2 rounded-xl border ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white"
              : "bg-white border-gray-200"
          }`}
        >
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">🌱 Low</option>
        </select>
      </div>

      <button
        onClick={() => saveEdit(task)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
      >
        Save
      </button>
    </div>
  ) : (
    <>
      <h3
        className={`font-bold ${
          task.completed ? "line-through text-gray-500" : "text-lg"
        }`}
      >
        {task.title}
      </h3>

      <div className="flex gap-2 mt-1">
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border ${
            darkMode
              ? "bg-slate-700/50 border-slate-600 text-slate-300"
              : "bg-blue-50 border-blue-100 text-blue-600"
          }`}
        >
          {task.category}
        </span>

        <span
          className={`text-xs px-2 py-1 rounded-lg font-bold uppercase
            ${
              task.priority === "High"
                ? "text-red-500 bg-red-50"
                : task.priority === "Medium"
                ? "text-yellow-500 bg-yellow-50"
                : "text-green-500 bg-green-50"
            }`}
        >
          {task.priority}
        </span>
      </div>
    </>
  )}
</div>
                  </div>

                  <button
  onClick={() => startEditing(task)}
  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition"
>
  <Pencil size={20} />
</button>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => deleteTask(task.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>

  );
}

export default Dashboard;