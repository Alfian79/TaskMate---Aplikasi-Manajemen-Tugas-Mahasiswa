import { StyleSheet } from "react-native";

// EXTERNAL STYLING (Modul 1, 3.2)
// Style statis ditulis di file terpisah ini, lalu di-import di app/index.tsx.
// Style yang nilainya berubah-ubah (warna prioritas, status selesai) ditulis inline.
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: "#2563eb",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 5, // warna garisnya diatur inline sesuai prioritas
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e293b",
  },
  courseText: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  deadlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  deadlineText: {
    fontSize: 12,
    color: "#4f44ef",
    marginLeft: 4,
  },
  noteText: {
    fontSize: 12,
    color: "#475569",
    marginTop: 6,
  },
  badge: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
});
