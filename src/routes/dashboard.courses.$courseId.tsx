import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FileText, Download, ArrowLeft, BookOpen, Clock, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/courses/$courseId")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.id === params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  component: DashboardCoursePage,
  notFoundComponent: () => (
    <div>
      <h1 className="font-display text-2xl font-bold">Curso não encontrado</h1>
      <Link to="/dashboard" className="mt-4 inline-block text-sm text-primary hover:underline">
        ← Voltar aos meus cursos
      </Link>
    </div>
  ),
});

function DashboardCoursePage() {
  const { course } = Route.useLoaderData();

  return (
    <div>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Meus cursos
      </Link>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="aspect-[21/9] overflow-hidden">
          <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
        </div>
        <div className="p-5 sm:p-6">
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {course.category}
          </span>
          <h1 className="mt-2 font-display text-2xl font-bold text-card-foreground sm:text-3xl">
            {course.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {course.modules} módulos
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Materiais PDF</h2>
          <p className="text-sm text-muted-foreground">
            Documentos de estudo disponíveis para download.
          </p>
        </div>
        <Link to="/dashboard/exams">
          <Button variant="outline" size="sm">
            <ClipboardCheck className="h-3.5 w-3.5" />
            Provas
          </Button>
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {course.pdfs.map((pdf) => (
          <div
            key={pdf.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
              <FileText className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-card-foreground truncate">{pdf.title}</p>
              <p className="text-xs text-muted-foreground">
                Módulo {pdf.module} · {pdf.pages} páginas
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" />
              PDF
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
