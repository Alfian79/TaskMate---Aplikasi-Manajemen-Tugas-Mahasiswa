import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

// MODUL 4 (4.2 Navigation Guard): penjaga rute di root layout.
function RootNavigator() {
  const { session, isLoading } = useAuth();
  const segments = useSegments(); // jalur rute aktif, mis. ["(auth)", "login"] atau ["(app)"]
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // tunggu sampai sesi selesai dipulihkan (cegah layar berkedip)

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      // belum login tetapi mencoba masuk ke area pribadi -> usir ke login
      router.replace("/(auth)/login");
    } else if (session && inAuthGroup) {
      // sudah login tetapi masih di layar login -> arahkan ke Home
      router.replace("/");
    }
  }, [session, isLoading, segments, router]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>

      {/* Perisai pemuatan: menutupi layar selama sesi belum selesai diperiksa */}
      {isLoading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : null}
    </>
  );
}

// AuthProvider membungkus semua halaman agar useAuth() bisa dipakai di mana saja.
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
  },
});
