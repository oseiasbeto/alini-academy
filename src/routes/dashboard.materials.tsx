import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/materials")({
  component: MaterialsPage,
});

function MaterialsPage() {
  const materials = courses.slice(0, 3).flatMap((c) => [
    { id: `${c.id}-intro`, courseTitle: c.title, title: `Módulo 1 - Introdução`, pages: 24 },
    { id: `${c.id}-avanc`, courseTitle: c.title, title: `Módulo 2 - Conceitos Básicos`, pages: 36 },
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">Materiais PDF</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manuais e documentos de estudo dos seus cursos.</p>

      <div className="mt-6 space-y-3">
        {materials.map((m) => (
          <div key={m.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
              <FileText className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-card-foreground truncate">{m.title}</p>
              <p className="text-xs text-muted-foreground">{m.courseTitle} · {m.pages} páginas</p>
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
