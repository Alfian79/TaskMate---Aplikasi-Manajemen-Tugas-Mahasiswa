// MODUL 3 (Praktik, utils/delay.ts): fungsi utility untuk "menunda" sebentar.
// Mengembalikan Promise yang baru selesai (resolve) setelah `ms` milidetik.
// Dipakai untuk mensimulasikan server yang lambat.
export function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms); // setelah ms milidetik, panggil resolve()
  });
}
