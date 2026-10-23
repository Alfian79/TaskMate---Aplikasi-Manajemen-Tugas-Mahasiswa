import { initialTasks, NewTask, TaskItem } from "@/constants";
import { fetchRemoteTasks } from "@/services/taskService";
import React, { createContext, useContext, useState } from "react";

// MODUL 2 (2.4 useContext): daftar tugas dibagikan lewat Context,
// sehingga halaman Home, Tambah Tugas, dan Detail memakai data yang sama
// tanpa harus meneruskan props (prop drilling).

type TaskContextType = {
  tasks: TaskItem[];
  addTask: (task: NewTask) => void;
  toggleTask: (id: string) => void;
  // MODUL 3: state & fungsi untuk mengambil data dari API eksternal
  isLoading: boolean; // true selama menunggu respons server
  error: string | null; // pesan error jika pengambilan data gagal
  importRemoteTasks: () => Promise<void>;
};

// createContext: nilai default null = "belum ada Provider"
const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  // useState (Modul 2, 2.1): state utama daftar tugas
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  // MODUL 3: state untuk memantau proses pengambilan data dari server
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ASYNC FUNCTION + async/await + try...catch (Modul 3):
  // mengambil tugas dari API eksternal lalu menambahkannya ke daftar.
  async function importRemoteTasks() {
    setIsLoading(true); // mulai loading
    setError(null); // bersihkan error lama

    try {
      const remoteTasks = await fetchRemoteTasks(5); // tunggu data dari server
      // tambahkan hanya tugas yang id-nya belum ada (supaya tidak dobel saat diimpor ulang)
      setTasks((prev) => {
        const newOnes = remoteTasks.filter(
          (remote) => !prev.some((task) => task.id === remote.id),
        );
        return [...newOnes, ...prev];
      });
    } catch (e) {
      // error dari jaringan atau dari throw new Error di service
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setIsLoading(false); // loading selalu dimatikan, sukses maupun gagal
    }
  }

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
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        isLoading,
        error,
        importRemoteTasks,
      }}
    >
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
