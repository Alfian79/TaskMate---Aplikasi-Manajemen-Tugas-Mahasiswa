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

# 4. Jalankan Expo Development Server
npx expo start --go

# 5. Setelah server berjalan, pindai (scan) QR Code yang muncul di terminal menggunakan aplikasi Expo Go atau kamera ponsel Anda.
