import { initialTasks, Priority, TaskItem } from "@/constants";
import React, { createContext, useContext, useState } from "react";

// MODUL 2 (2.4 useContext): daftar tugas dibagikan lewat Context,
// sehingga halaman Home, Tambah Tugas, dan Detail memakai data yang sama
// tanpa harus meneruskan props (prop drilling).

// Bentuk data tugas baru yang diisi dari form (id & isCompleted dibuat otomatis)
type NewTask = {
  title: string;
  course: string;
  deadline: string;
  priority: Priority;
  note?: string;
};

type TaskContextType = {
  tasks: TaskItem[];
  addTask: (task: NewTask) => void;
  toggleTask: (id: string) => void;
};

// createContext: nilai default null = "belum ada Provider"
const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  // useState (Modul 2, 2.1): state utama daftar tugas
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  function addTask(task: NewTask) {
    const newTask: TaskItem = {
      ...task,
      id: Date.now().toString(),
      isCompleted: false,
    };
    // tugas baru ditaruh paling atas
    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }

  return (
    // Semua komponen di dalam Provider ini bisa membaca value
    <TaskContext.Provider value={{ tasks, addTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook agar pemakaian di halaman lebih singkat: const { tasks } = useTasks();
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks harus dipakai di dalam <TaskProvider>");
  }
  return context;
}
