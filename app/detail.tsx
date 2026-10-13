import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function AddTaskScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Tambah Tugas</Text>
      
      <TextInput placeholder="Judul Tugas" style={styles.input} />
      <TextInput placeholder="Mata Kuliah" style={styles.input} />
      <TextInput placeholder="Deadline (contoh: Besok)" style={styles.input} />

      <Button title="Simpan Tugas" onPress={() => {
        // Logika simpan sementara, lalu kembali ke halaman sebelumnya
        router.back();
      }} />

      <View style={{ marginTop: 15 }}>
        <Button title="Kembali" color="#64748b" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#cbd5e1", padding: 12, borderRadius: 8, marginBottom: 12 },
});
