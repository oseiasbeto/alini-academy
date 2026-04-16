import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import { courses } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const enrolled = courses.slice(0, 3);
  const progress = [65, 30, 10];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">Meus Cursos</h1>
      <p className="mt-1 text-sm text-muted-foreground">Bem-vindo de volta! Continue os seus estudos.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-2xl font-bold text-card-foreground">3</p>
          <p className="text-sm text-muted-foreground">Cursos Inscritos</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
            <Clock className="h-5 w-5 text-gold" />
          </div>
          <p className="mt-3 text-2xl font-bold text-card-foreground">35%</p>
          <p className="text-sm text-muted-foreground">Progresso Médio</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <p className="mt-3 text-2xl font-bold text-card-foreground">2</p>
          <p className="text-sm text-muted-foreground">Provas Realizadas</p>
        </div>
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold text-foreground">Cursos em Andamento</h2>
      <div className="mt-4 space-y-4">
        {enrolled.map((course, i) => (
          <div key={course.id} className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
            <img
              src={course.image}
              alt={course.title}
              className="h-20 w-28 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-card-foreground">{course.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{course.modules} módulos · {course.duration}</p>
              <div className="mt-3 flex items-center gap-3">
                <Progress value={progress[i]} className="h-2 flex-1" />
                <span className="text-xs font-medium text-muted-foreground">{progress[i]}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
