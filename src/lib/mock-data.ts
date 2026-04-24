export interface CoursePdf {
  id: string;
  title: string;
  pages: number;
  module: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  modules: number;
  image: string;
  category: string;
  /** Preço total da inscrição em Kz */
  price: number;
  /** Mensalidade em Kz */
  monthlyFee: number;
  /** Duração do curso em meses (usado para mensalidades) */
  months: number;
  objectives: string[];
  audience: string[];
  syllabus: string[];
  pdfs: CoursePdf[];
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

const defaultPdfs = (courseId: string, modules: number): CoursePdf[] =>
  Array.from({ length: Math.min(modules, 6) }, (_, i) => ({
    id: `${courseId}-pdf-${i + 1}`,
    title: `Módulo ${i + 1} - Material de Estudo`,
    pages: 18 + i * 6,
    module: i + 1,
  }));

export const courses: Course[] = [
  {
    id: "1",
    title: "Introdução à Programação",
    description: "Aprenda os fundamentos da programação com Python. Ideal para iniciantes que desejam entrar no mundo da tecnologia.",
    duration: "8 semanas",
    modules: 12,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    category: "Tecnologia",
    price: 45000,
    monthlyFee: 15000,
    months: 3,
    objectives: [
      "Compreender os fundamentos da lógica de programação",
      "Escrever programas simples em Python",
      "Trabalhar com estruturas de dados básicas",
      "Resolver problemas reais com código",
    ],
    audience: [
      "Iniciantes sem experiência prévia em programação",
      "Estudantes que queiram entrar na área de tecnologia",
      "Profissionais que pretendem mudar de carreira",
    ],
    syllabus: [
      "Introdução à lógica de programação",
      "Variáveis, tipos de dados e operadores",
      "Estruturas de controlo (if/else, loops)",
      "Funções e modularização",
      "Listas, dicionários e tuplos",
      "Manipulação de ficheiros",
      "Projeto final integrador",
    ],
    pdfs: defaultPdfs("1", 12),
  },
  {
    id: "2",
    title: "Marketing Digital",
    description: "Domine as estratégias de marketing digital, redes sociais e publicidade online para impulsionar o seu negócio.",
    duration: "6 semanas",
    modules: 10,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop",
    category: "Negócios",
    price: 38000,
    monthlyFee: 13000,
    months: 2,
    objectives: [
      "Criar estratégias de marketing digital eficazes",
      "Gerir campanhas em redes sociais",
      "Aplicar técnicas de SEO e tráfego pago",
      "Analisar métricas e otimizar resultados",
    ],
    audience: [
      "Empreendedores e donos de pequenos negócios",
      "Profissionais de marketing que queiram atualizar-se",
      "Estudantes da área de comunicação",
    ],
    syllabus: [
      "Fundamentos do marketing digital",
      "Estratégia em redes sociais (Facebook, Instagram, TikTok)",
      "Anúncios pagos (Meta Ads, Google Ads)",
      "SEO e marketing de conteúdo",
      "Email marketing e funis de venda",
      "Análise de métricas e KPIs",
    ],
    pdfs: defaultPdfs("2", 10),
  },
  {
    id: "3",
    title: "Design Gráfico",
    description: "Crie designs profissionais usando ferramentas modernas. Do conceito à execução de projetos visuais.",
    duration: "10 semanas",
    modules: 15,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    category: "Design",
    price: 55000,
    monthlyFee: 18000,
    months: 3,
    objectives: [
      "Dominar princípios fundamentais de design",
      "Utilizar ferramentas profissionais (Photoshop, Illustrator)",
      "Criar identidades visuais completas",
      "Desenvolver portefólio profissional",
    ],
    audience: [
      "Aspirantes a designers gráficos",
      "Profissionais de comunicação e marketing",
      "Empreendedores que querem criar a sua própria identidade visual",
    ],
    syllabus: [
      "Teoria das cores e tipografia",
      "Composição e hierarquia visual",
      "Photoshop essencial",
      "Illustrator e desenho vetorial",
      "Branding e identidade visual",
      "Design para redes sociais",
      "Projeto de portefólio",
    ],
    pdfs: defaultPdfs("3", 15),
  },
  {
    id: "4",
    title: "Gestão de Projectos",
    description: "Metodologias ágeis e tradicionais para gerenciar projetos com eficiência e alcançar resultados.",
    duration: "5 semanas",
    modules: 8,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    category: "Negócios",
    price: 35000,
    monthlyFee: 12000,
    months: 2,
    objectives: [
      "Planear e executar projetos com sucesso",
      "Aplicar metodologias ágeis (Scrum, Kanban)",
      "Gerir equipas, prazos e orçamentos",
      "Mitigar riscos e resolver conflitos",
    ],
    audience: [
      "Gestores e líderes de equipa",
      "Profissionais que queiram migrar para gestão",
      "Empreendedores e coordenadores",
    ],
    syllabus: [
      "Fundamentos da gestão de projectos",
      "Metodologias tradicionais (PMBOK)",
      "Metodologias ágeis (Scrum, Kanban)",
      "Gestão de equipas e comunicação",
      "Gestão de risco e qualidade",
      "Ferramentas (Trello, Jira, MS Project)",
    ],
    pdfs: defaultPdfs("4", 8),
  },
  {
    id: "5",
    title: "Excel Avançado",
    description: "Fórmulas avançadas, tabelas dinâmicas, macros e automação para dominar o Excel profissionalmente.",
    duration: "4 semanas",
    modules: 8,
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&h=250&fit=crop",
    category: "Tecnologia",
    price: 28000,
    monthlyFee: 14000,
    months: 2,
    objectives: [
      "Dominar fórmulas e funções avançadas",
      "Construir dashboards profissionais",
      "Automatizar tarefas com macros e VBA",
      "Analisar grandes volumes de dados",
    ],
    audience: [
      "Profissionais que usam Excel no dia a dia",
      "Analistas, contabilistas e administrativos",
      "Estudantes universitários e gestores",
    ],
    syllabus: [
      "Fórmulas avançadas (PROCV, ÍNDICE/CORRESP, SE)",
      "Tabelas e gráficos dinâmicos",
      "Power Query e Power Pivot",
      "Dashboards interativos",
      "Introdução a macros e VBA",
      "Boas práticas e produtividade",
    ],
    pdfs: defaultPdfs("5", 8),
  },
  {
    id: "6",
    title: "Inglês para Negócios",
    description: "Comunicação profissional em inglês para reuniões, apresentações e correspondência empresarial.",
    duration: "12 semanas",
    modules: 20,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    category: "Idiomas",
    price: 60000,
    monthlyFee: 15000,
    months: 4,
    objectives: [
      "Comunicar com fluência em ambientes profissionais",
      "Conduzir reuniões e apresentações em inglês",
      "Redigir emails e relatórios empresariais",
      "Negociar e participar em videoconferências",
    ],
    audience: [
      "Profissionais que trabalham com clientes internacionais",
      "Executivos e gestores",
      "Estudantes que se preparam para o mercado global",
    ],
    syllabus: [
      "Vocabulário empresarial essencial",
      "Reuniões e apresentações",
      "Email writing e correspondência formal",
      "Negociação em inglês",
      "Telefonemas e videoconferências",
      "Cultura de negócios internacional",
      "Preparação para certificações",
    ],
    pdfs: defaultPdfs("6", 20),
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
