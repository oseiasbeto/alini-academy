import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { courses } from "@/lib/mock-data";
import aliniLogo from "@/assets/alini-logo.png";

const enrollmentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(120, "Nome demasiado longo"),
  email: z
    .string()
    .trim()
    .email("Email inválido")
    .max(255, "Email demasiado longo"),
  nif: z
    .string()
    .trim()
    .min(5, "NIF inválido")
    .max(20, "NIF inválido")
    .regex(/^[A-Za-z0-9]+$/, "NIF deve conter apenas letras e números"),
  courseId: z.string().min(1, "Selecione um curso"),
});

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Inscrever-se - Alini Academy" },
      { name: "description", content: "Inscreva-se num curso da Alini Academy. Após validação do pagamento, receberá as suas credenciais de acesso." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { course?: string } => ({
    course: typeof search.course === "string" ? search.course : undefined,
  }),
  component: EnrollmentPage,
});

function EnrollmentPage() {
  const navigate = useNavigate();
  const { course: preselected } = Route.useSearch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nif, setNif] = useState("");
  const [courseId, setCourseId] = useState(preselected ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = enrollmentSchema.safeParse({ fullName, email, nif, courseId });
    if (!result.success) {
      const map: Record<string, string> = {};
      for (const issue of result.error.issues) {
        map[issue.path[0] as string] = issue.message;
      }
      setErrors(map);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const selectedCourse = courses.find((c) => c.id === courseId);

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-7 w-7 text-success" />
            </div>
            <h1 className="mt-5 font-display text-2xl font-bold text-foreground">
              Inscrição enviada com sucesso!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Olá <strong className="text-foreground">{fullName}</strong>, recebemos a sua
              inscrição{selectedCourse ? ` no curso "${selectedCourse.title}"` : ""}.
            </p>

            <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-5 text-left">
              <p className="font-semibold text-foreground">Próximos passos:</p>
              <ol className="mt-3 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Efectue o pagamento via <strong className="text-foreground">Multicaixa Express</strong> para o número <strong className="text-primary">930 850 071</strong>.</li>
                <li>Envie o comprovativo + o seu NIF (<strong className="text-foreground">{nif}</strong>) para o nosso WhatsApp <strong className="text-primary">940 070 279</strong>.</li>
                <li>Após validação, enviaremos as suas <strong className="text-foreground">credenciais de acesso</strong> (Nº de Aluno e senha) por WhatsApp.</li>
              </ol>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/244940070279?text=${encodeURIComponent(
                  `Olá! Acabei de me inscrever na Alini Academy.\nNome: ${fullName}\nEmail: ${email}\nNIF: ${nif}${selectedCourse ? `\nCurso: ${selectedCourse.title}` : ""}\nEnvio em anexo o comprovativo de pagamento.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="gold" size="lg">
                  <MessageCircle className="h-4 w-4" />
                  Enviar Comprovativo
                </Button>
              </a>
              <Button variant="outline" size="lg" onClick={() => navigate({ to: "/" })}>
                Voltar ao Início
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 p-2">
            <img src={aliniLogo} alt="Alini Academy" className="h-full w-full object-contain" />
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Inscrição em <span className="text-primary">Curso</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Preencha os seus dados para finalizar a inscrição. As credenciais serão enviadas após validação do pagamento.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex: João da Silva"
              maxLength={120}
            />
            {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              maxLength={255}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="nif">NIF</Label>
            <Input
              id="nif"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
              placeholder="Ex: 005732649LA042"
              maxLength={20}
            />
            {errors.nif && <p className="text-xs text-destructive">{errors.nif}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="courseId">Curso</Label>
            <select
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Selecione um curso...</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            {errors.courseId && <p className="text-xs text-destructive">{errors.courseId}</p>}
            {selectedCourse && (
              <div className="mt-2 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Inscrição</p>
                  <p className="font-display text-base font-bold text-primary">{formatKz(selectedCourse.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Mensalidade</p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatKz(selectedCourse.monthlyFee)} × {selectedCourse.months} meses
                  </p>
                </div>
              </div>
            )}
          </div>

          <Button type="submit" variant="gold" size="lg" className="w-full">
            Enviar
            <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="rounded-lg bg-muted/50 p-3 text-center text-xs text-muted-foreground">
            Não criamos contas públicas. As <strong className="text-foreground">credenciais de acesso</strong> são geradas e enviadas por nós após confirmarmos o pagamento.
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Já tem credenciais?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Entrar
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
