import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

// MODUL 4 (4.1 AuthContext): "markas komando" status login untuk seluruh aplikasi.
// Satu tempat yang tahu siapa user yang login, sehingga layar lain tidak perlu
// membaca SecureStore sendiri-sendiri.

type AuthContextType = {
  session: Session | null; // null = belum login
  user: User | null;
  isLoading: boolean; // true selama sesi lama sedang dipulihkan dari SecureStore
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. REHIDRASI saat aplikasi dibuka: tanya Supabase apakah ada sesi tersimpan
    //    (Supabase membacanya dari SecureStore lewat storage adapter).
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
      })
      .catch(() => {
        setSession(null); // gagal membaca sesi -> anggap belum login
      })
      .finally(() => {
        setIsLoading(false); // selesai memeriksa, spinner boleh hilang
      });

    // 2. BERLANGGANAN perubahan: dipanggil setiap login, logout, atau token diperbarui
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setIsLoading(false);
    });

    // cleanup: berhenti berlangganan saat provider dilepas
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // Keluar: membatalkan sesi di cloud & menghapus token dari SecureStore.
  // onAuthStateChange otomatis mengubah session menjadi null -> route guard mengunci aplikasi.
  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, isLoading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook: const { user, signOut } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  }
  return context;
}
