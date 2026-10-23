import { Pressable, StyleSheet, Text, View } from "react-native";

// MODUL 3 (Praktik, components/ErrorMessage.tsx): tampilan pesan error + tombol coba lagi.
type ErrorMessageProps = {
  message: string;
  onRetry?: () => void; // opsional: kalau ada, tombol "Coba Lagi" ditampilkan
};

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      {onRetry ? (
        <Pressable onPress={onRetry} style={styles.button}>
          <Text style={styles.buttonText}>Coba Lagi</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fee2e2",
    borderRadius: 10,
    padding: 14,
    marginVertical: 10,
    alignItems: "center",
  },
  text: { color: "#b91c1c", fontSize: 14, textAlign: "center" },
  button: {
    marginTop: 10,
    backgroundColor: "#ef4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
