"use client";

import { useEffect, useState } from "react";
import { api, setToken } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setToken(token);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const res = await api.get("/tasks");
    setTasks(res.data);
    setLoading(false);
  };

  const addTask = async () => {
    if (!title) return;
    setLoading(true);
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    setLoading(true);
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-100 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your daily tasks easily
            </p>
          </div>

          <button
            onClick={logout}
            className="text-red-500 font-semibold hover:text-red-700 hover:underline"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-sm text-blue-600">Total Tasks</p>
            <h3 className="text-2xl font-bold text-blue-700">
              {tasks.length}
            </h3>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <p className="text-sm text-green-600">Active Tasks</p>
            <h3 className="text-2xl font-bold text-green-700">
              {filteredTasks.length}
            </h3>
          </div>

          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
            <p className="text-sm text-purple-600">Status</p>
            <h3 className="text-lg font-semibold text-purple-700">
              On Track ✅
            </h3>
          </div>
        </div>

        {/* Add Task */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 px-4 py-3 rounded-xl border
                       text-gray-800 placeholder-gray-500
                       focus:ring-4 focus:ring-indigo-300 focus:outline-none"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={addTask}
            className="px-6 rounded-xl bg-indigo-600 text-white font-semibold
                       hover:bg-indigo-700 active:scale-95 shadow"
          >
            Add
          </button>
        </div>

        {/* Search */}
        <input
          className="w-full px-4 py-3 rounded-xl border mb-6
                     text-gray-800 placeholder-gray-500
                     focus:ring-4 focus:ring-purple-300 focus:outline-none"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400 mb-4">
            Loading...
          </p>
        )}

        {/* Empty State */}
        {!loading && filteredTasks.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg font-medium">No tasks found 🚫</p>
            <p className="text-sm mt-1">
              Add a task to get started
            </p>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center
                         bg-slate-50 border rounded-xl px-4 py-3
                         hover:shadow-md hover:scale-[1.01]"
            >
              <span className="font-medium text-gray-800">
                {task.title}
              </span>

              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 font-medium hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
