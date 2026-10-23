import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import { TaskItem } from "@/constants";
import { useTasks } from "@/context/TaskContext";
import { styles } from "@/styles";
import { countCompleted, getPriorityColor } from "@/utils/taskHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  // useContext (lewat useTasks): daftar tugas diambil dari Context, bukan state lokal
  // MODUL 3: isLoading, error, dan importRemoteTasks untuk mengambil data dari API
  const { tasks, isLoading, error, importRemoteTasks } = useTasks();

  // 1. useState: menyimpan teks pencarian dan status tampil/tidaknya teks "Daftar diperbarui"
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpdated, setShowUpdated] = useState(false);

  // useRef: mengingat jumlah tugas sebelumnya tanpa memicu re-render
  const prevCount = useRef(tasks.length);

  // 2. useEffect: dijalankan sekali saat komponen pertama kali dimuat
  useEffect(() => {
    console.log("HomeScreen berhasil dimuat.");
  }, []);

  // useEffect dengan dependency: dijalankan setiap kali jumlah tugas berubah.
  // Jika jumlahnya bertambah (ada tugas baru), tampilkan teks "Daftar diperbarui" selama 2 detik.
  useEffect(() => {
    console.log("Jumlah tugas saat ini:", tasks.length);

    if (tasks.length <= prevCount.current) {
      prevCount.current = tasks.length;
      setShowUpdated(false);
      return;
    }

    prevCount.current = tasks.length;
    setShowUpdated(true);
    const timer = setTimeout(() => setShowUpdated(false), 2000);

    // cleanup: batalkan timer jika efek dijalankan ulang atau halaman ditutup
    return () => clearTimeout(timer);
  }, [tasks.length]);

  // 3. useMemo: hasil filter & hitungan disimpan, dihitung ulang hanya jika dependency berubah
  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [tasks, searchQuery],
  );
  const completed = useMemo(() => countCompleted(tasks), [tasks]);

  // CUSTOM FUNCTION: membuat kartu tugas
  function renderTaskCard(task: TaskItem) {
    return (
      <Pressable
        key={task.id}
        // router.push: buka halaman detail (dynamic route) dengan membawa id
        onPress={() =>
          router.push({ pathname: "/task/[id]", params: { id: task.id } })
        }
        style={[
          styles.card,
          {
            borderLeftColor: getPriorityColor(task.priority),
            opacity: task.isCompleted ? 0.6 : 1,
          },
        ]}
      >
        <View style={styles.cardTop}>
          <Ionicons
            name={task.isCompleted ? "checkmark-circle" : "ellipse-outline"}
            size={28}
            color={task.isCompleted ? "#4322c5" : "#94a3b8"}
          />

          <View style={styles.cardBody}>
            <Text
              style={[
                styles.taskTitle,
                {
                  textDecorationLine: task.isCompleted
                    ? "line-through"
                    : "none",
                },
              ]}
            >
              {task.title}
            </Text>
            <Text style={styles.courseText}>Mata Kuliah: {task.course}</Text>

            <View style={styles.deadlineRow}>
              <Ionicons name="time-outline" size={14} color="#ef4444" />
              <Text style={styles.deadlineText}>Deadline: {task.deadline}</Text>
            </View>

            {task.note ? (
              <Text style={styles.noteText}>Catatan: {task.note}</Text>
            ) : null}

            <View
              style={[
                styles.badge,
                { backgroundColor: getPriorityColor(task.priority) },
              ]}
            >
              <Text style={styles.badgeText}>Prioritas: {task.priority}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Image
            source={{ uri: "https://picsum.photos/100" }}
            style={styles.logo}
          />
          <View>
            <Text style={styles.headerTitle}>TaskMate</Text>
            <Text style={styles.headerSubtitle}>
              {completed} dari {tasks.length} tugas selesai
            </Text>
          </View>
        </View>

        {/* Input pencarian yang terhubung ke state searchQuery */}
        <TextInput
          placeholder="Cari tugas..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* router.push: pindah ke halaman form tambah tugas */}
        <Button title="Tambah Tugas" onPress={() => router.push("/add")} />

        {/* MODUL 3: tombol mengambil tugas dari API eksternal (dinonaktifkan saat loading) */}
        <View style={{ marginTop: 10 }}>
          <Button
            title="Impor Tugas dari Server"
            color="#0f766e"
            onPress={importRemoteTasks}
            disabled={isLoading}
          />
        </View>

        {/* MODUL 3: tampilan sesuai kondisi - sedang memuat / gagal */}
        {isLoading ? <Loading message="Mengambil tugas dari server..." /> : null}
        {error ? (
          <ErrorMessage message={error} onRetry={importRemoteTasks} />
        ) : null}

        {/* Muncul sebentar setelah tugas baru ditambahkan (diatur oleh useEffect) */}
        {showUpdated ? (
          <Text
            style={{
              textAlign: "center",
              color: "#15803d",
              fontWeight: "600",
              marginTop: 10,
            }}
          >
            Daftar diperbarui
          </Text>
        ) : null}
      </View>

      {/* LOOP: menampilkan data hasil filter */}
      {filteredTasks.length === 0 ? (
        <Text style={{ textAlign: "center", color: "#64748b", marginTop: 20 }}>
          Tidak ada tugas yang cocok.
        </Text>
      ) : (
        filteredTasks.map((task) => renderTaskCard(task))
      )}
    </ScrollView>
  );
}
