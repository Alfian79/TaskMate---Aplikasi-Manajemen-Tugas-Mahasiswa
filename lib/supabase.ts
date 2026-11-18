import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { AppState, Platform } from "react-native";

// MODUL 4 (2.2 Storage Adapter): satu-satunya klien Supabase di seluruh aplikasi (singleton).
// Kredensial dibaca dari file .env (awalan EXPO_PUBLIC_), TIDAK ditulis langsung di kode.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// supabase-js dibuat untuk browser (localStorage). Di React Native tidak ada localStorage,
// jadi kita buat "adapter" yang menghubungkan Supabase ke expo-secure-store
// (Keychain iOS / Keystore Android) agar token sesi tersimpan terenkripsi.
const SecureStoreAdapter = {
  getItem: (key: string): Promise<string | null> => {
    // SecureStore tidak tersedia di web -> pakai localStorage (hanya untuk uji di browser)
    if (Platform.OS === "web") {
      return Promise.resolve(
        typeof localStorage !== "undefined" ? localStorage.getItem(key) : null,
      );
    }
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string): Promise<void> => {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") localStorage.setItem(key, value);
      return Promise.resolve();
    }
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string): Promise<void> => {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") localStorage.removeItem(key);
      return Promise.resolve();
    }
    return SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: SecureStoreAdapter, // token disimpan lewat SecureStore
    autoRefreshToken: true, // access token diperbarui otomatis memakai refresh token
    persistSession: true, // sesi bertahan walau aplikasi ditutup
    detectSessionInUrl: false, // tidak relevan di mobile
  },
});

// Refresh token hanya dijalankan saat aplikasi sedang aktif (hemat baterai & jaringan)
if (Platform.OS !== "web") {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
