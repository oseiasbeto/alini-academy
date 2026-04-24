import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Clock,
  BookOpen,
  CheckCircle2,
  Users,
  ListChecks,
  ArrowRight,
  MessageCircle,
  Phone,
  CalendarDays,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/mock-data";
import { formatKz } from "@/lib/utils";

export const Route = createFileRoute("/courses/$courseId")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.id === params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    const course = loaderData?.course;
    return {
      meta: [
        { title: course ? `${course.title} - Alini Academy` : "Curso - Alini Academy" },
        {
          name: "description",
          content: course?.description ?? "Detalhes do curso na Alini Academy.",
        },
        { property: "og:title", content: course ? `${course.title} - Alini Academy` : "Curso" },
        { property: "og:description", content: course?.description ?? "" },
        ...(course?.image ? [{ property: "og:image", content: course.image }] : []),
      ],
    };
  },
  component: CourseDetailPage,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Curso não encontrado</h1>
        <p className="mt-2 text-muted-foreground">O curso que procura não existe.</p>
        <Link to="/courses" className="mt-6 inline-block">
          <Button variant="gold">Ver todos os cursos</Button>
        </Link>
      </main>
      <Footer />
    </div>
  ),
});

function CourseDetailPage() {
  const { course } = Route.useLoaderData();
  const callCenter = "940 070 279";
  const whatsappNumber = "244940070279";
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no curso "${course.title}" e gostaria de mais informações.`,
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-navy text-navy-foreground">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-gold">
                {course.category}
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
                {course.title}
              </h1>
              <p className="mt-4 text-base text-navy-foreground/80 sm:text-lg">
                {course.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-navy-foreground/80">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-gold" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-gold" />
                  {course.modules} módulos
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-gold" />
                  {course.months} {course.months === 1 ? "mês" : "meses"}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" search={{ course: course.id }}>
                  <Button variant="gold" size="lg">
                    Inscrever-se Agora
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="hero-outline" size="lg">
                    <MessageCircle className="h-4 w-4" />
                    Falar com Consultor
                  </Button>
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-navy-foreground/10 shadow-2xl">
              <img
                src={course.image}
                alt={course.title}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left: details */}
            <div className="space-y-10 lg:col-span-2">
              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  Objectivos do Curso
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {course.objectives.map((obj) => (
                    <li key={obj} className="flex gap-3 text-foreground">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
                  <Users className="h-6 w-6 text-primary" />
                  Destinatários
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {course.audience.map((aud) => (
                    <li key={aud} className="flex gap-3 text-foreground">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
                  <ListChecks className="h-6 w-6 text-primary" />
                  Conteúdos Programáticos
                </h2>
                <ol className="mt-4 space-y-3">
                  {course.syllabus.map((item, i) => (
                    <li
                      key={item}
                      className="flex gap-4 rounded-lg border border-border bg-card p-4 shadow-card"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="font-medium text-card-foreground">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right: sticky CTA */}
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Investimento
                </p>
                <p className="mt-1 font-display text-3xl font-bold text-primary">
                  {formatKz(course.price)}
                </p>
                <p className="text-xs text-muted-foreground">Inscrição inicial</p>

                <div className="mt-4 rounded-lg bg-gold/5 border border-gold/30 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Mensalidade
                  </p>
                  <p className="font-display text-xl font-bold text-foreground">
                    {formatKz(course.monthlyFee)}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      / mês
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Durante {course.months} {course.months === 1 ? "mês" : "meses"} de estudo
                  </p>
                </div>

                <Link
                  to="/register"
                  search={{ course: course.id }}
                  className="mt-5 block"
                >
                  <Button variant="gold" size="lg" className="w-full">
                    Inscrever-se
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-sm font-semibold text-foreground">
                    Precisa de ajuda?
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Fale com o nosso Call Center / WhatsApp
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-2 rounded-lg bg-success/10 p-3 text-success hover:bg-success/15 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <div>
                      <p className="text-xs font-medium">WhatsApp</p>
                      <p className="text-sm font-bold">{callCenter}</p>
                    </div>
                  </a>
                  <a
                    href={`tel:+244940070279`}
                    className="mt-2 flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-primary hover:bg-primary/15 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <div>
                      <p className="text-xs font-medium">Call Center</p>
                      <p className="text-sm font-bold">{callCenter}</p>
                    </div>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
