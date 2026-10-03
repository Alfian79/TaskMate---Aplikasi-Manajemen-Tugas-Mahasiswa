export interface TaskItem {
  id: string;
  title: string;
  course: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  isCompleted: boolean;
}

export const initialTasks: TaskItem[] = [
  {
    id: '1',
    title: 'Demo Praktikum Machine Learning',
    course: 'Pemrograman Machine Learning',
    deadline: 'Besok, 13.00',
    priority: 'High',
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Demo Praktikum Mobile',
    course: 'Pemrograman Mobile',
    deadline: '2 Hari lagi',
    priority: 'Medium',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Project TKI & TKC',
    course: 'Temu Kembali Informasi & Citra',
    deadline: 'Minggu Depan',
    priority: 'Low',
    isCompleted: true,
  },
];
