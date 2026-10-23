import { NewTask, TaskItem } from "@/constants";
import { ApiTodo, ApiTodosResponse } from "@/types/api";
import { delay } from "@/utils/delay";

// MODUL 3 (Bab 2 API Call & Praktik services/): semua fungsi yang berhubungan
// dengan server dikumpulkan di sini, terpisah dari tampilan (app/).

const TODOS_URL = "https://dummyjson.com/todos";

// Mengubah SATU todo dari API (ApiTodo) menjadi bentuk milik TaskMate (TaskItem).
// API tidak punya course/deadline/priority, jadi diisi nilai bawaan.
function mapTodoToTask(todo: ApiTodo): TaskItem {
  return {
    id: `server-${todo.id}`, // awalan "server-" agar tidak bentrok dengan id tugas lokal
    title: todo.todo,
    course: "Impor dari Server",
    deadline: "Belum ditentukan",
    priority: "Medium",
    isCompleted: todo.completed,
  };
}

// ASYNC FUNCTION (custom) + fetch (pre-built async function).
// HTTP GET ke endpoint, hasil JSON dimasukkan ke objek bertipe ApiTodosResponse (interface),
// lalu dipetakan ke array TaskItem. Mengembalikan Promise<TaskItem[]>.
export async function fetchRemoteTasks(limit: number = 5): Promise<TaskItem[]> {
  const response = await fetch(`${TODOS_URL}?limit=${limit}`); // tunggu server membalas

  // fetch tidak otomatis gagal untuk error HTTP (404/500), jadi dicek manual
  if (!response.ok) {
    throw new Error(`Server bermasalah (kode ${response.status})`);
  }

  const data: ApiTodosResponse = await response.json(); // tunggu isi JSON selesai dibaca
  return data.todos.map(mapTodoToTask);
}

// PROMISE dengan resolve() dan reject() (Modul 3, 1.3):
// mensimulasikan "menyimpan tugas ke server" yang butuh waktu.
// - resolve(task)  -> berhasil, mengirim kembali tugas yang disimpan
// - reject(Error)  -> gagal (di sini: judul tugas sudah ada)
export function saveTaskToServer(
  task: NewTask,
  existingTitles: string[],
): Promise<NewTask> {
  return new Promise<NewTask>((resolve, reject) => {
    delay(800).then(() => {
      const isDuplicate = existingTitles.some(
        (title) => title.toLowerCase() === task.title.toLowerCase(),
      );

      if (isDuplicate) {
        reject(new Error(`Tugas "${task.title}" sudah ada di daftar.`));
      } else {
        resolve(task);
      }
    });
  });
}
