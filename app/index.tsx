import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { initialTasks, Priority, TaskItem } from "../constants/tasksData";
import { styles } from "../styles";

// CUSTOM FUNCTION 1: menentukan warna berdasarkan prioritas (if / else if)
function getPriorityColor(priority: Priority): string {
  if (priority === "High") {
    return "#ef4444"; // merah
  } else if (priority === "Medium") {
    return "#f59e0b"; // oranye
  }
  return "#4022c5"; // hijau (Low)
}

// CUSTOM FUNCTION 2: menghitung jumlah tugas selesai (primitive loop for...of)
function countCompleted(tasks: TaskItem[]): number {
  let total = 0;
  for (const task of tasks) {
    if (task.isCompleted) {
      total = total + 1;
    }
  }
  return total;
}

// CUSTOM FUNCTION 3: function bawaan Alert dibungkus function kita sendiri
function showTaskDetail(task: TaskItem) {
  const status = task.isCompleted ? "Sudah selesai" : "Belum selesai";
  Alert.alert(
    task.title,
    `${task.course}\nDeadline: ${task.deadline}\nStatus: ${status}`,
  );
}

// CUSTOM FUNCTION 4: membuat kartu tugas, cukup isi parameter (Modul 1, 5.3.B)
function renderTaskCard(task: TaskItem) {
  return (
    <Pressable
      key={task.id} // key unik untuk setiap item di dalam loop
      onPress={() => showTaskDetail(task)} // inline function
      // INLINE STYLING: nilai bergantung pada data (prioritas & status)
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
                textDecorationLine: task.isCompleted ? "line-through" : "none",
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

          {/* properti opsional: tampil hanya jika note ada (ternary) */}
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

export default function HomeScreen() {
  const completed = countCompleted(initialTasks);

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
              {completed} dari {initialTasks.length} tugas selesai
            </Text>
          </View>
        </View>

        <TextInput placeholder="Cari tugas..." style={styles.searchInput} />

        <Button
          title="Tambah Tugas"
          onPress={() =>
            Alert.alert("Info", "Fitur tambah tugas dibuat di modul berikutnya")
          }
        />
      </View>

      {/* LOOP: .map() memanggil custom function untuk setiap tugas */}
      {initialTasks.map((task) => renderTaskCard(task))}
    </ScrollView>
  );
}
