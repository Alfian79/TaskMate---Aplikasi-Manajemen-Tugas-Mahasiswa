// MODUL 3 (Praktik, types/api.ts): bentuk data yang dikirim oleh API eksternal.
// API yang dipakai: DummyJSON -> GET https://dummyjson.com/todos
// Dokumentasi: https://dummyjson.com/docs/todos

// INTERFACE: bentuk SATU todo mentah dari server (belum sama dengan TaskItem milik kita)
export interface ApiTodo {
  id: number;
  todo: string; // isi/judul todo
  completed: boolean;
  userId?: number; // opsional: tidak selalu dikirim server
}

// INTERFACE: bentuk seluruh response (JSON) dari endpoint /todos
export interface ApiTodosResponse {
  todos: ApiTodo[]; // array of objects
  total: number;
  skip: number;
  limit: number;
}
