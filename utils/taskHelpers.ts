import { Priority, TaskItem } from "@/constants";

// CUSTOM FUNCTION (Modul 1): menentukan warna berdasarkan prioritas
// Dipindah ke file terpisah agar bisa dipakai di beberapa halaman (index, add, task/[id]).
export function getPriorityColor(priority: Priority): string {
  if (priority === "High") {
    return "#ef4444"; // merah
  } else if (priority === "Medium") {
    return "#f59e0b"; // oranye
  }
  return "#4022c5"; // biru keunguan (Low)
}

// CUSTOM FUNCTION (Modul 1): menghitung jumlah tugas selesai
export function countCompleted(tasks: TaskItem[]): number {
  let total = 0;
  for (const task of tasks) {
    if (task.isCompleted) {
      total = total + 1;
    }
  }
  return total;
}
