import { Priority } from "@/constants";
import { useTasks } from "@/context/TaskContext";
import { getPriorityColor } from "@/utils/taskHelpers";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const priorityOptions: Priority[] = ["High", "Medium", "Low"];

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks(); // useContext: fungsi untuk menambah tugas ke daftar utama

  // useState: menampung input user pada form
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");

  // useRef: referensi ke TextInput agar fokus bisa dipindah tanpa memicu re-render
  const courseRef = useRef<TextInput>(null);
  const deadlineRef = useRef<TextInput>(null);

  // canGoBack: cek dulu apakah ada halaman sebelumnya. Jika tidak, replace ke Home.
  function goBackSafely() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  function handleSave() {
    if (!title.trim() || !course.trim() || !deadline.trim()) {
      Alert.alert("Peringatan", "Semua kolom harus diisi!");
      return;
    }

    addTask({
      title: title.trim(),
      course: course.trim(),
      deadline: deadline.trim(),
      priority,
    });

    // Langsung kembali ke Home; teks "Daftar diperbarui" muncul di sana (lihat useEffect di index.tsx)
    goBackSafely();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Tugas Baru</Text>

      <TextInput
        placeholder="Judul Tugas"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        returnKeyType="next"
        onSubmitEditing={() => courseRef.current?.focus()}
      />
      <TextInput
        ref={courseRef}
        placeholder="Mata Kuliah"
        style={styles.input}
        value={course}
        onChangeText={setCourse}
        returnKeyType="next"
        onSubmitEditing={() => deadlineRef.current?.focus()}
      />
      <TextInput
        ref={deadlineRef}
        placeholder="Deadline (contoh: Besok)"
        style={styles.input}
        value={deadline}
        onChangeText={setDeadline}
      />

      <Text style={styles.label}>Prioritas</Text>
      <View style={styles.priorityRow}>
        {priorityOptions.map((option) => (
          <Pressable
            key={option}
            onPress={() => setPriority(option)}
            style={[
              styles.priorityButton,
              {
                backgroundColor:
                  priority === option ? getPriorityColor(option) : "#e2e8f0",
              },
            ]}
          >
            <Text
              style={{
                color: priority === option ? "#fff" : "#334155",
                fontWeight: "600",
              }}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <Button title="Simpan Tugas" onPress={handleSave} />

      <View style={{ marginTop: 15 }}>
        {/* router.back: kembali ke halaman sebelumnya */}
        <Button title="Kembali" color="#64748b" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f8fafc",
  },
  label: { fontSize: 14, color: "#475569", marginBottom: 8 },
  priorityRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
