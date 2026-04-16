import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle, XCircle } from "lucide-react";
import { examResults } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/results")({
  component: ResultsPage,
});

function ResultsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">Histórico de Provas</h1>
      <p className="mt-1 text-sm text-muted-foreground">Veja os resultados das suas provas realizadas.</p>

      <div className="mt-6 space-y-3">
        {examResults.map((r) => (
          <div key={r.examId} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                r.passed ? "bg-success/10" : "bg-destructive/10"
              }`}
            >
              {r.passed ? (
                <CheckCircle className="h-5 w-5 text-success" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-card-foreground truncate">{r.examTitle}</p>
              <p className="text-xs text-muted-foreground">{r.date}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-foreground">
                {Math.round((r.score / r.total) * 100)}%
              </p>
              <p className={`text-xs font-medium ${r.passed ? "text-success" : "text-destructive"}`}>
                {r.passed ? "Aprovado" : "Reprovado"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
