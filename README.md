# 📱 TaskMate - Aplikasi Manajemen Tugas Mahasiswa

> **Tugas Praktikum Pemrograman Mobile - Modul 1 (Sintaks & UI Dasar)**  
> **Laboratorium Informatika - Universitas Muhammadiyah Malang**

---

## 📌 Deskripsi Aplikasi
**TaskMate** adalah aplikasi mobile berbasis React Native (Expo) yang dirancang untuk membantu mahasiswa mengelola dan memantau tugas-tugas perkuliahan secara terorganisir. Aplikasi ini menerapkan konsep sintaks dasar TypeScript, penggunaan komponen UI React Native, perulangan data dinamis, serta kombinasi styling.

---

## 👥 Anggota Kelompok
**Kelompok:** [Kelompok 4]  
**Kelas:** [Pemrograman Mobile E]

| No | Nama Lengkap | NIM | Peran & Tanggung Jawab |
|:--:|:---|:---:|:---|
| 1 | **Dino Alfian Zamri** | 202310370311329 | **Data & Looping Specialist:** Project Setup, Inisialisasi GitHub, Struktur Data TypeScript (`interface` & *Array of Objects*), serta Perulangan Data Dinamis (`.map()` / `<FlatList>`). |
| 2 | **M Fajar Nurilham Jaya** | 202310370311317 | **UI & Logic Specialist:** Penyusunan Komponen UI (`View`, `Text`, `Pressable`, `@expo/vector-icons`), *Custom Functions* Logika Aplikasi, dan Penerapan *Inline & External Styling*. |

---

## 🛠️ Implementasi Materi Modul 1

Aplikasi ini memenuhi seluruh kriteria teknis penilaian Modul 1:

1. **TypeScript Interface & Array of Objects (`5.5`)**[cite: 40 - 41]:
   - Menggunakan `interface TaskItem` untuk mendefinisikan tipe data tugas (id, title, course, deadline, status, priority).
   - Menyimpan daftar tugas dalam *Array of Objects*.
2. **Custom Function & Loop Rendering (`5.3` & `5.4`)**[cite: 30 - 38]:
   - Menggunakan fungsi kustom (`renderTaskCard` / `getPriorityColor`) untuk mengolah dan menampilkan item tugas.
   - Menggunakan perulangan `.map()` atau `<FlatList>` dengan unique `key` prop.
3. **Kombinasi Inline & External Styling (`3.1` - `3.3`)**[cite: 13 - 18]:
   - *External Styling*: Menggunakan `StyleSheet.create()` di file lokal/terpisah untuk konsistensi kartu dan kontainer.
   - *Inline Styling*: Digunakan untuk penyesuaian dinamis (misalnya warna status tugas/prioritas berdasarkan logika kondisi).
4. **Library & Packages (`4`)**[cite: 20]:
   - Menggunakan `@expo/vector-icons` (`Ionicons` / `MaterialCommunityIcons`) untuk melengkapi ikon interaktif UI.

---

## 🔐 Implementasi Materi Modul 4 (Database & Autentikasi)

Modul 4 menambahkan login ke TaskMate memakai **Supabase Auth**. Titik pentingnya:

1. **Secure Token Storage** (`lib/supabase.ts`):
   - Klien Supabase dibuat satu kali (*singleton*). Token sesi disimpan lewat adapter **`expo-secure-store`** (Keychain iOS / Keystore Android), bukan AsyncStorage.
   - URL dan Publishable key dibaca dari file `.env` (`EXPO_PUBLIC_...`), tidak ditulis langsung di kode.
2. **Supabase Auth Flow** (`app/(auth)/login.tsx`):
   - Mode **Daftar** memakai `signUp` (nama lengkap dikirim sebagai metadata `full_name`), mode **Masuk** memakai `signInWithPassword`.
   - Email di-`trim()`, tombol dinonaktifkan dan menampilkan `ActivityIndicator` saat loading, serta error ditampilkan lewat `Alert`.
   - **Keluar** (`signOut`) ada di halaman Home.
3. **Global AuthContext** (`context/AuthContext.tsx`):
   - `getSession()` memulihkan sesi saat aplikasi dibuka, `onAuthStateChange()` memperbarui status saat login, logout, atau token diperbarui.
4. **Route Guard** (`app/_layout.tsx`):
   - Memakai `useSegments()`: belum login diarahkan ke `/(auth)/login`, sudah login diarahkan ke Home.
   - Selama sesi diperiksa (`isLoading`), guard menunggu dan spinner ditampilkan agar layar tidak berkedip.

Struktur rute: `app/(auth)/` untuk layar publik dan `app/(app)/` untuk layar yang dilindungi login.

### Menyiapkan file `.env`
File `.env` **sengaja tidak di-push** (berisi kredensial, dan repositori ini publik). Salin contohnya lalu isi:

```bash
cp .env.example .env        # Windows (CMD): copy .env.example .env
```

Di dashboard Supabase, matikan **Authentication → Providers → Email → "Confirm email"** agar akun baru bisa langsung masuk saat pengujian.

---

## 🚀 Cara Jalankan Project

### 1. Prasyarat
- Node.js (versi LTS direkomendasikan)
- Aplikasi **Expo Go** terpasang di smartphone Android / iOS

### 2. Langkah Instalasi & Menjalankan

```bash
# 1. Clone repositori ini
git clone [https://github.com/Alfian79/TaskMate-Aplikasi-Manajemen-Tugas-Mahasiswa.git](https://github.com/Alfian79/TaskMate-Aplikasi-Manajemen-Tugas-Mahasiswa.git)

# 2. Masuk ke direktori project
cd TaskMate-Aplikasi-Manajemen-Tugas-Mahasiswa

# 3. Install semua dependency
npm install

# 4. Buat file .env dari contoh, lalu isi URL & Publishable key Supabase (lihat bagian Modul 4)
cp .env.example .env

# 5. Jalankan Expo Development Server
npx expo start --go

# 6. Setelah server berjalan, pindai (scan) QR Code yang muncul di terminal menggunakan aplikasi Expo Go atau kamera ponsel Anda.
```
