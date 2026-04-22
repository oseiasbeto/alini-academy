import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Cursos - Alini Academy" },
      { name: "description", content: "Descubra os nossos cursos profissionais online." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Nossos <span className="text-primary">Cursos</span>
        </h1>
        <p className="mt-2 text-muted-foreground">Escolha o curso ideal para o seu desenvolvimento profissional.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
