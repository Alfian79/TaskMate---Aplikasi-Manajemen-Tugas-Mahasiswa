import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { initialTasks } from '../constants/tasksData';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>TaskMate - Daftar Tugas</Text>
      
      {initialTasks.map((task) => (
        <View key={task.id} style={styles.card}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.courseText}>Mata Kuliah: {task.course}</Text>
          <Text style={styles.deadlineText}>Deadline: {task.deadline}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Prioritas: {task.priority}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', marginTop: 30 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  taskTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  courseText: { fontSize: 14, color: '#64748b', marginTop: 4 },
  deadlineText: { fontSize: 12, color: '#ef4444', marginTop: 2 },
  badge: { marginTop: 10, backgroundColor: '#e2e8f0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5, alignSelf: 'flex-start' },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#475569' },
});
