import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// MODUL 3 (Praktik, components/Loading.tsx): tampilan "sedang memuat" yang bisa dipakai ulang.
type LoadingProps = {
  message?: string;
};

export default function Loading({ message = "Memuat data..." }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingVertical: 20 },
  text: { marginTop: 8, color: "#64748b", fontSize: 14 },
});
