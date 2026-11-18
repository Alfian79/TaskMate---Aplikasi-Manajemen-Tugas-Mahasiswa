import { useTasks } from "@/context/TaskContext";
import { getPriorityColor } from "@/utils/taskHelpers";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// MODUL 2 (2.5 Dynamic Route): satu file ini melayani /task/1, /task/2, dst.
export default function TaskDetailScreen() {
  const router = useRouter();

  // useLocalSearchParams: mengambil [id] dari URL, misal /task/2 -> id = "2"
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, toggleTask } = useTasks();

  // useMemo: cari tugas hanya saat tasks atau id berubah
  const task = useMemo(() => tasks.find((t) => t.id === id), [tasks, id]);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tugas tidak ditemukan</Text>
        {/* router.replace: ganti halaman ini dengan Home (tidak menumpuk riwayat) */}
        <Button title="Ke Beranda" onPress={() => router.replace("/")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Stack.Screen di dalam halaman: judul header mengikuti judul tugas */}
      <Stack.Screen options={{ title: task.title }} />

      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.text}>Mata Kuliah: {task.course}</Text>
      <Text style={styles.text}>Deadline: {task.deadline}</Text>
      <Text style={styles.text}>
        Status: {task.isCompleted ? "Sudah selesai" : "Belum selesai"}
      </Text>
      {task.note ? <Text style={styles.text}>Catatan: {task.note}</Text> : null}

      <View
        style={[
          styles.badge,
          { backgroundColor: getPriorityColor(task.priority) },
        ]}
      >
        <Text style={styles.badgeText}>Prioritas: {task.priority}</Text>
      </View>

      <Button
        title={task.isCompleted ? "Tandai Belum Selesai" : "Tandai Selesai"}
        onPress={() => toggleTask(task.id)}
      />

      <View style={{ marginTop: 15 }}>
        <Button title="Kembali" color="#64748b" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f1f5f9" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },
  text: { fontSize: 15, color: "#334155", marginBottom: 6 },
  badge: {
    alignSelf: "flex-start",
    marginVertical: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: { fontSize: 12, fontWeight: "600", color: "#ffffff" },
});
