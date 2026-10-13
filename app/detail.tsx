import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function AddTaskScreen() {
  const router = useRouter();

  // State untuk menampung input user pada form
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSave = () => {
    if (!title || !course || !deadline) {
      Alert.alert("Peringatan", "Semua kolom harus diisi!");
      return;
    }

    // Simulasi penyimpanan data atau mengirim parameter kembali
    // Pada praktik nyata state global/context, data dimasukkan ke array utama.
    Alert.alert("Sukses", "Tugas baru berhasil ditambahkan!", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Tugas Baru</Text>
      
      <TextInput 
        placeholder="Judul Tugas" 
        style={styles.input} 
        value={title}
        onChangeText={setTitle}
      />
      <TextInput 
        placeholder="Mata Kuliah" 
        style={styles.input} 
        value={course}
        onChangeText={setCourse}
      />
      <TextInput 
        placeholder="Deadline (contoh: Besok)" 
        style={styles.input} 
        value={deadline}
        onChangeText={setDeadline}
      />

      <Button title="Simpan Tugas" onPress={handleSave} />

      <View style={{ marginTop: 15 }}>
        <Button title="Kembali" color="#64748b" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
  input: { borderWidth: 1, borderColor: "#cbd5e1", padding: 12, borderRadius: 8, marginBottom: 12, backgroundColor: "#f8fafc" },
});