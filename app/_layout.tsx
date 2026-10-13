import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Halaman Utama TaskMate */}
      <Stack.Screen 
        name="index" 
        options={{ title: "TaskMate - Home" }} 
      />
      {/* Halaman Form Tambah Tugas */}
      <Stack.Screen 
        name="detail" 
        options={{ title: "Tambah Tugas" }} 
      />
    </Stack>
  );
}
