// TYPE (Modul 1, 5.5.B): union type, hanya boleh salah satu dari tiga nilai ini
export type Priority = "High" | "Medium" | "Low";

// INTERFACE (Modul 1, 5.5.B): bentuk/struktur satu objek tugas
export interface TaskItem {
  readonly id: string; // readonly: tidak bisa diubah setelah objek dibuat
  title: string;
  course: string;
  deadline: string;
  priority: Priority;
  isCompleted: boolean;
  note?: string; // tanda "?" = properti opsional
}

// ARRAY OF OBJECTS (Modul 1, 5.5.A)
export const initialTasks: TaskItem[] = [
  {
    id: "1",
    title: "Demo Praktikum Machine Learning",
    course: "Pemrograman Machine Learning",
    deadline: "Besok, 13.00",
    priority: "High",
    isCompleted: false,
    note: "Siapkan laptop dan project",
  },
  {
    id: "2",
    title: "Demo Praktikum Mobile",
    course: "Pemrograman Mobile",
    deadline: "2 Hari lagi",
    priority: "Medium",
    isCompleted: false,
  },
  {
    id: "3",
    title: "Project TKI & TKC",
    course: "Temu Kembali Informasi & Citra",
    deadline: "Minggu Depan",
    priority: "Low",
    isCompleted: true,
  },
  {
    id: "4",
    title: "Test",
    course: "test",
    deadline: "Minggu Depan",
    priority: "Low",
    isCompleted: true,
  },
];
