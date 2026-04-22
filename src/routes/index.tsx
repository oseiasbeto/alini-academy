import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, Users, CheckCircle, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alini Academy - Centro de Ensino Online" },
      { name: "description", content: "Formação profissional acessível. Cursos online com certificação, provas e materiais em PDF." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.4_0.12_255/0.3),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">
              <GraduationCap className="h-3.5 w-3.5" />
              Centro de Ensino Online
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Transforme o seu futuro com a{" "}
              <span className="text-gold">Alini Academy</span>
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/80 sm:text-xl">
              Cursos profissionais online com certificação, materiais em PDF, provas e
              acompanhamento personalizado. Aprenda no seu ritmo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/courses">
                <Button variant="gold" size="xl">
                  Inscrever-se num Curso
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/payment">
                <Button variant="hero-outline" size="xl">
                  Como Pagar
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: BookOpen, title: "Materiais em PDF", description: "Manuais completos para estudo offline" },
    { icon: Award, title: "Certificação", description: "Certificado após conclusão e aprovação" },
    { icon: Users, title: "Suporte", description: "Acompanhamento via WhatsApp" },
    { icon: CheckCircle, title: "Provas Online", description: "Avaliações com correção automática" },
  ];

  return (
    <section className="border-b border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Nossos <span className="text-primary">Cursos</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Formação profissional nas áreas mais procuradas do mercado
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/courses">
            <Button variant="outline" size="lg">
              Ver Todos os Cursos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Inscreva-se", description: "Escolha o curso e envie o seu nome e NIF" },
    { number: "02", title: "Pague", description: "Faça o pagamento via Multicaixa Express para 930 850 071" },
    { number: "03", title: "Envie Comprovativo", description: "Envie o comprovativo + NIF para o WhatsApp 930 850 071" },
    { number: "04", title: "Receba Credenciais", description: "Após validação, enviamos as suas credenciais de acesso" },
  ];

  return (
    <section className="border-y border-border bg-secondary/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Como <span className="text-gold">Funciona</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-gold font-display text-xl font-bold text-gold-foreground">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="gradient-hero py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
          Pronto para começar?
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80">
          Junte-se a centenas de alunos e invista no seu futuro profissional.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/courses">
            <Button variant="gold" size="xl">
              Inscrever-se Agora
            </Button>
          </Link>
          <a href="https://wa.me/244930850071" target="_blank" rel="noopener noreferrer">
            <Button variant="hero-outline" size="xl">
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
