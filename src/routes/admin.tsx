import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Users, BookOpen, ClipboardCheck, BarChart3, LogOut, Check, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pendingStudents, courses } from "@/lib/mock-data";
import type { Student } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Painel Admin - Alini Academy" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [tab, setTab] = useState<"students" | "courses" | "stats">("students");
  const [students, setStudents] = useState<Student[]>(pendingStudents);

  const approve = (id: string) =>
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: "approved" as const } : s)));
  const reject = (id: string) =>
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: "rejected" as const } : s)));

  const tabs = [
    { key: "students" as const, label: "Alunos", icon: Users },
    { key: "courses" as const, label: "Cursos", icon: BookOpen },
    { key: "stats" as const, label: "Estatísticas", icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-navy lg:flex">
        <div className="flex h-16 items-center gap-2.5 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold">
            <Shield className="h-4 w-4 text-gold-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-navy-foreground">Admin</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-sidebar-accent text-gold"
                  : "text-navy-foreground/70 hover:bg-sidebar-accent hover:text-navy-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-navy-foreground/10 p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-foreground/70 hover:bg-sidebar-accent hover:text-navy-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        {/* Mobile tab bar */}
        <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
                tab === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "students" && (
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Gestão de Alunos</h1>
            <p className="mt-1 text-sm text-muted-foreground">Aprove ou rejeite alunos com base nos comprovativos.</p>

            <div className="mt-6 space-y-3">
              {students.map((s) => (
                <div key={s.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {s.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-card-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.email} · {s.registeredAt}</p>
                  </div>
                  {s.status === "pending" ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" onClick={() => approve(s.id)}>
                        <Check className="h-3.5 w-3.5" />
                        Aprovar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => reject(s.id)}>
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        s.status === "approved"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {s.status === "approved" ? "Aprovado" : "Rejeitado"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "courses" && (
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Gestão de Cursos</h1>
            <p className="mt-1 text-sm text-muted-foreground">Gerencie os cursos e materiais da plataforma.</p>
            <div className="mt-6 space-y-3">
              {courses.map((c) => (
                <div key={c.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
                  <img src={c.image} alt={c.title} className="h-14 w-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-card-foreground">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.modules} módulos · {c.duration}</p>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "stats" && (
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Estatísticas</h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total de Alunos", value: "127", color: "bg-primary/10 text-primary" },
                { label: "Pendentes", value: "5", color: "bg-gold/10 text-gold" },
                { label: "Provas Realizadas", value: "342", color: "bg-success/10 text-success" },
                { label: "Taxa de Aprovação", value: "78%", color: "bg-chart-5/10 text-chart-5" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`mt-1 text-3xl font-bold ${stat.color.split(" ")[1]}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
