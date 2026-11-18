import { TaskProvider } from "@/context/TaskContext";
import { Stack } from "expo-router";

// MODUL 2 (2.7 Layout Page & 3.2 Stack) + MODUL 4: layout untuk area yang dilindungi login.
// Folder "(app)" adalah route group: tidak muncul di URL, jadi "/" tetap Home, "/add" tetap Tambah Tugas.
// TaskProvider ada di sini (bukan di root) supaya daftar tugas ikut hilang saat user keluar.
export default function AppLayout() {
  return (
    <TaskProvider>
      <Stack>
        {/* Halaman Utama TaskMate -> route "/" */}
        <Stack.Screen name="index" options={{ title: "TaskMate - Home" }} />
        {/* Form Tambah Tugas -> route "/add" */}
        <Stack.Screen name="add" options={{ title: "Tambah Tugas" }} />
        {/* Dynamic route -> "/task/1", "/task/2", dst. (judul diatur di halamannya) */}
        <Stack.Screen name="task/[id]" options={{ title: "Detail Tugas" }} />
      </Stack>
    </TaskProvider>
  );
}
