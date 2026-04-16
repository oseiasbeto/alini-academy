import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClipboardCheck, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleExam } from "@/lib/mock-data";
import type { Question } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/exams")({
  component: ExamsPage,
});

function ExamsPage() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(sampleExam.questions.length).fill(null)
  );
  const [finished, setFinished] = useState(false);

  const exam = sampleExam;
  const question = exam.questions[currentQ];

  if (!started) {
    return (
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Provas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Realize as provas dos seus cursos.</p>
        <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ClipboardCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">{exam.title}</h3>
              <p className="text-xs text-muted-foreground">
                {exam.questions.length} questões · Nota mínima: {exam.passingScore}%
              </p>
            </div>
          </div>
          <Button className="mt-4" onClick={() => setStarted(true)}>
            Iniciar Prova
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (finished) {
    const correct = answers.reduce<number>(
      (acc, a, i) => acc + (a === exam.questions[i].correctIndex ? 1 : 0),
      0
    );
    const percentage = Math.round((correct / exam.questions.length) * 100);
    const passed = percentage >= exam.passingScore;

    return (
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Resultado</h1>
        <div className="mt-6 rounded-xl border border-border bg-card p-8 text-center shadow-card">
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
              passed ? "bg-success/10" : "bg-destructive/10"
            }`}
          >
            {passed ? (
              <CheckCircle className="h-10 w-10 text-success" />
            ) : (
              <XCircle className="h-10 w-10 text-destructive" />
            )}
          </div>
          <h2 className="mt-4 text-4xl font-bold text-foreground">{percentage}%</h2>
          <p className="mt-1 text-muted-foreground">
            {correct} de {exam.questions.length} respostas correctas
          </p>
          <p
            className={`mt-2 text-lg font-semibold ${passed ? "text-success" : "text-destructive"}`}
          >
            {passed ? "Aprovado!" : "Reprovado"}
          </p>

          {/* Review answers */}
          <div className="mt-8 space-y-4 text-left">
            {exam.questions.map((q, i) => {
              const isCorrect = answers[i] === q.correctIndex;
              return (
                <div key={q.id} className="rounded-lg border border-border p-4">
                  <p className="text-sm font-medium text-card-foreground">
                    {i + 1}. {q.text}
                  </p>
                  <p className={`mt-1 text-sm ${isCorrect ? "text-success" : "text-destructive"}`}>
                    Sua resposta: {answers[i] !== null ? q.options[answers[i]!] : "Sem resposta"}
                    {!isCorrect && (
                      <span className="ml-2 text-success">
                        (Correcta: {q.options[q.correctIndex]})
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          <Button
            className="mt-6"
            onClick={() => {
              setStarted(false);
              setFinished(false);
              setCurrentQ(0);
              setAnswers(Array(exam.questions.length).fill(null));
            }}
          >
            Voltar às Provas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-lg font-bold text-foreground">{exam.title}</h1>
        <span className="text-sm text-muted-foreground">
          {currentQ + 1} / {exam.questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-primary transition-all"
          style={{ width: `${((currentQ + 1) / exam.questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
        <p className="text-lg font-medium text-card-foreground">{question.text}</p>
        <div className="mt-4 space-y-2">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                const copy = [...answers];
                copy[currentQ] = i;
                setAnswers(copy);
              }}
              className={`w-full rounded-lg border p-3 text-left text-sm font-medium transition-colors ${
                answers[currentQ] === i
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-card-foreground hover:bg-accent"
              }`}
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <Button
          variant="outline"
          disabled={currentQ === 0}
          onClick={() => setCurrentQ(currentQ - 1)}
        >
          Anterior
        </Button>
        {currentQ === exam.questions.length - 1 ? (
          <Button
            variant="gold"
            onClick={() => setFinished(true)}
            disabled={answers.includes(null)}
          >
            Finalizar Prova
          </Button>
        ) : (
          <Button onClick={() => setCurrentQ(currentQ + 1)}>Próxima</Button>
        )}
      </div>
    </div>
  );
}
