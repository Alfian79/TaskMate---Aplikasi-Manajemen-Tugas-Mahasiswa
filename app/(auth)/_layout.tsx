import { Stack } from "expo-router";

// MODUL 4: layout untuk layar publik (belum login). Header disembunyikan.
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
