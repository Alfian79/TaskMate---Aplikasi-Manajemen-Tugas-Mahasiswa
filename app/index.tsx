import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
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
import { useRouter } from "expo-router";
import { initialTasks, Priority, TaskItem } from "../constants/tasksData";
import { styles } from "../styles";

// CUSTOM FUNCTION 1: menentukan warna berdasarkan prioritas
function getPriorityColor(priority: Priority): string {
  if (priority === "High") {
    return "#ef4444"; // merah
  } else if (priority === "Medium") {
    return "#f59e0b"; // oranye
  }
  return "#4022c5"; // hijau/biru (Low)
}

// CUSTOM FUNCTION 2: menghitung jumlah tugas selesai
function countCompleted(tasks: TaskItem[]): number {
  let total = 0;
  for (const task of tasks) {
    if (task.isCompleted) {
      total = total + 1;
    }
  }
  return total;
}

// CUSTOM FUNCTION 3: menampilkan detail tugas via Alert
function showTaskDetail(task: TaskItem) {
  const status = task.isCompleted ? "Sudah selesai" : "Belum selesai";
  Alert.alert(
    task.title,
    `${task.course}\nDeadline: ${task.deadline}\nStatus: ${status}`,
  );
}

export default function HomeScreen() {
  const router = useRouter();

  // 1. MENGGUNAKAN USESTATE: Menyimpan daftar tugas agar dinamis
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");

  // 2. MENGGUNAKAN USEEFFECT: Dijalankan sekali saat komponen pertama kali dimuat (Mounting)
  useEffect(() => {
    console.log("HomeScreen berhasil dimuat. Total tugas awal:", tasks.length);
  }, []); // Array dependensi kosong berarti berjalan sekali di awal

  // useEffect tambahan untuk memantau perubahan pada daftar tugas
  useEffect(() => {
    console.log("Daftar tugas diperbarui! Jumlah saat ini:", tasks.length);
  }, [tasks]); // Dijalankan setiap kali state 'tasks' berubah

  const completed = countCompleted(tasks);

  // Filter tugas berdasarkan pencarian (searchQuery)
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CUSTOM FUNCTION 4: membuat kartu tugas
  function renderTaskCard(task: TaskItem) {
    return (
      <Pressable
        key={task.id}
        onPress={() => showTaskDetail(task)}
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

        {/* Input Pencarian yang terhubung ke state searchQuery */}
        <TextInput 
          placeholder="Cari tugas..." 
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Button
          title="Tambah Tugas"
          onPress={() => router.push("/detail" as any)}
        />
      </View>

      {/* LOOP: Menampilkan data dari state filteredTasks */}
      {filteredTasks.map((task) => renderTaskCard(task))}
    </ScrollView>
  );
}
