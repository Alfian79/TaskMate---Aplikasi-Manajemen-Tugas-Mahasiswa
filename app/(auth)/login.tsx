import { supabase } from "@/lib/supabase";
import { useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

// MODUL 4 (3.1 & 3.2): layar Daftar / Masuk terhubung ke Supabase Auth.
export default function LoginScreen() {
  // useState: input form + mode (daftar atau masuk) + status loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  // useRef: pindah fokus antar kolom tanpa menutup keyboard
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  async function handleAuth() {
    if (loading) return; // cegah submit ganda

    // .trim(): keyboard HP sering menambah spasi di akhir email
    const cleanEmail = email.trim();
    const cleanName = fullName.trim();

    if (!cleanEmail || !password || (isRegistering && !cleanName)) {
      Alert.alert("Peringatan", "Semua kolom harus diisi!");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Peringatan", "Kata sandi minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        // DAFTAR: nama lengkap dikirim sebagai metadata user (options.data)
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: { data: { full_name: cleanName } },
        });
        if (error) throw error;

        if (data.session) {
          // "Confirm email" dimatikan -> langsung login, route guard akan memindahkan ke Home
          Alert.alert("Berhasil", `Akun dibuat. Selamat datang, ${cleanName}!`);
        } else {
          // "Confirm email" masih aktif -> user harus klik tautan di email dulu
          Alert.alert(
            "Cek email kamu",
            "Akun dibuat. Klik tautan verifikasi di email, lalu masuk.",
          );
          setIsRegistering(false);
        }
      } else {
        // MASUK: Supabase menyimpan sesi (access + refresh token) ke SecureStore
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (error) throw error;
        // tidak perlu router.push: route guard di app/_layout.tsx yang mengarahkan ke Home
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Terjadi kesalahan.";
      Alert.alert(
        isRegistering ? "Gagal mendaftar" : "Gagal masuk",
        message === "Invalid login credentials"
          ? "Email atau kata sandi salah."
          : message,
      );
    } finally {
      setLoading(false); // tombol aktif kembali, sukses maupun gagal
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.brand}>TaskMate</Text>
        <Text style={styles.subtitle}>
          {isRegistering
            ? "Buat akun untuk mulai mencatat tugas kuliahmu"
            : "Masuk untuk melihat daftar tugasmu"}
        </Text>

        {isRegistering ? (
          <TextInput
            placeholder="Nama Lengkap"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            returnKeyType="next"
            editable={!loading}
            onSubmitEditing={() => emailRef.current?.focus()}
          />
        ) : null}

        <TextInput
          ref={emailRef}
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // keyboard dengan tombol @
          autoCapitalize="none" // huruf pertama tidak otomatis kapital
          autoCorrect={false}
          returnKeyType="next"
          editable={!loading}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Kata sandi (minimal 6 karakter)"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          returnKeyType="done"
          editable={!loading}
          onSubmitEditing={handleAuth}
        />

        <Pressable
          onPress={handleAuth}
          disabled={loading} // nonaktif saat loading
          style={[styles.button, loading && styles.buttonDisabled]}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegistering ? "Daftar" : "Masuk"}
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => setIsRegistering((prev) => !prev)}
          disabled={loading}
          style={styles.switchRow}
        >
          <Text style={styles.switchText}>
            {isRegistering
              ? "Sudah punya akun? Masuk di sini"
              : "Belum punya akun? Daftar di sini"}
          </Text>
        </Pressable>

        <View style={{ height: 20 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#f1f5f9" },
  container: { flexGrow: 1, justifyContent: "center", padding: 24 },
  brand: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#ffffff", fontWeight: "600", fontSize: 16 },
  switchRow: { alignItems: "center", marginTop: 18 },
  switchText: { color: "#2563eb", fontSize: 14 },
});
