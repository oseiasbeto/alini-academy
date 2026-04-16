export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  modules: number;
  image: string;
  category: string;
}

export interface Exam {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface ExamResult {
  examId: string;
  examTitle: string;
  score: number;
  total: number;
  passed: boolean;
  date: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  registeredAt: string;
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Introdução à Programação",
    description: "Aprenda os fundamentos da programação com Python. Ideal para iniciantes que desejam entrar no mundo da tecnologia.",
    duration: "8 semanas",
    modules: 12,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    category: "Tecnologia",
  },
  {
    id: "2",
    title: "Marketing Digital",
    description: "Domine as estratégias de marketing digital, redes sociais e publicidade online para impulsionar o seu negócio.",
    duration: "6 semanas",
    modules: 10,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop",
    category: "Negócios",
  },
  {
    id: "3",
    title: "Design Gráfico",
    description: "Crie designs profissionais usando ferramentas modernas. Do conceito à execução de projetos visuais.",
    duration: "10 semanas",
    modules: 15,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    category: "Design",
  },
  {
    id: "4",
    title: "Gestão de Projectos",
    description: "Metodologias ágeis e tradicionais para gerenciar projetos com eficiência e alcançar resultados.",
    duration: "5 semanas",
    modules: 8,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    category: "Negócios",
  },
  {
    id: "5",
    title: "Excel Avançado",
    description: "Fórmulas avançadas, tabelas dinâmicas, macros e automação para dominar o Excel profissionalmente.",
    duration: "4 semanas",
    modules: 8,
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&h=250&fit=crop",
    category: "Tecnologia",
  },
  {
    id: "6",
    title: "Inglês para Negócios",
    description: "Comunicação profissional em inglês para reuniões, apresentações e correspondência empresarial.",
    duration: "12 semanas",
    modules: 20,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    category: "Idiomas",
  },
];

export const sampleExam: Exam = {
  id: "exam-1",
  courseId: "1",
  title: "Prova Final - Introdução à Programação",
  passingScore: 60,
  questions: [
    {
      id: "q1",
      text: "Qual é a função usada para exibir texto na tela em Python?",
      options: ["display()", "print()", "show()", "write()"],
      correctIndex: 1,
    },
    {
      id: "q2",
      text: "Qual tipo de dado é usado para armazenar números inteiros?",
      options: ["float", "str", "int", "bool"],
      correctIndex: 2,
    },
    {
      id: "q3",
      text: "O que é uma variável em programação?",
      options: [
        "Um tipo de função",
        "Um espaço na memória para armazenar dados",
        "Uma linha de código",
        "Um erro do programa",
      ],
      correctIndex: 1,
    },
    {
      id: "q4",
      text: "Qual operador é usado para comparar igualdade em Python?",
      options: ["=", "==", "===", "!="],
      correctIndex: 1,
    },
    {
      id: "q5",
      text: "O que significa 'loop' em programação?",
      options: [
        "Uma condição",
        "Uma repetição de código",
        "Um tipo de variável",
        "Um comentário",
      ],
      correctIndex: 1,
    },
  ],
};

export const examResults: ExamResult[] = [
  {
    examId: "exam-1",
    examTitle: "Prova Final - Introdução à Programação",
    score: 4,
    total: 5,
    passed: true,
    date: "2026-04-10",
  },
  {
    examId: "exam-2",
    examTitle: "Prova Parcial - Marketing Digital",
    score: 3,
    total: 5,
    passed: true,
    date: "2026-04-05",
  },
];

export const pendingStudents: Student[] = [
  { id: "s1", name: "João Silva", email: "joao@email.com", status: "pending", registeredAt: "2026-04-14" },
  { id: "s2", name: "Maria Santos", email: "maria@email.com", status: "pending", registeredAt: "2026-04-13" },
  { id: "s3", name: "Pedro Neto", email: "pedro@email.com", status: "approved", registeredAt: "2026-04-10" },
  { id: "s4", name: "Ana Costa", email: "ana@email.com", status: "rejected", registeredAt: "2026-04-09" },
];
