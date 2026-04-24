import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Clock, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/mock-data";
import { formatKz } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/payments")({
  component: PaymentsPage,
});

type PaymentStatus = "paid" | "pending" | "upcoming";

interface MonthlyInstallment {
  id: string;
  courseId: string;
  courseTitle: string;
  monthIndex: number;
  totalMonths: number;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
}

function buildInstallments(): MonthlyInstallment[] {
  // Aluno inscrito nos 3 primeiros cursos (mock)
  const enrolled = courses.slice(0, 3);
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1); // começou há ~1 mês

  const installments: MonthlyInstallment[] = [];
  enrolled.forEach((c) => {
    for (let m = 1; m <= c.months; m++) {
      const due = new Date(startDate);
      due.setMonth(startDate.getMonth() + (m - 1));
      let status: PaymentStatus = "upcoming";
      if (m === 1) status = "paid";
      else if (m === 2) status = "pending";
      installments.push({
        id: `${c.id}-m${m}`,
        courseId: c.id,
        courseTitle: c.title,
        monthIndex: m,
        totalMonths: c.months,
        amount: c.monthlyFee,
        dueDate: due.toISOString().slice(0, 10),
        status,
      });
    }
  });
  return installments;
}

const statusConfig: Record<PaymentStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  paid: { label: "Pago", className: "bg-success/10 text-success", icon: CheckCircle2 },
  pending: { label: "Em atraso", className: "bg-destructive/10 text-destructive", icon: AlertCircle },
  upcoming: { label: "A vencer", className: "bg-muted text-muted-foreground", icon: Clock },
};

function PaymentsPage() {
  const installments = buildInstallments();
  const totalDue = installments
    .filter((i) => i.status === "pending")
    .reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = installments
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">Mensalidades</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Acompanhe e pague as mensalidades dos seus cursos.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <CheckCircle2 className="h-5 w-5 text-success" />
          </div>
          <p className="mt-3 text-2xl font-bold text-card-foreground">{formatKz(totalPaid)}</p>
          <p className="text-sm text-muted-foreground">Total Pago</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
            <AlertCircle className="h-5 w-5 text-destructive" />
          </div>
          <p className="mt-3 text-2xl font-bold text-card-foreground">{formatKz(totalDue)}</p>
          <p className="text-sm text-muted-foreground">Em Atraso</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-2xl font-bold text-card-foreground">{installments.length}</p>
          <p className="text-sm text-muted-foreground">Total de Mensalidades</p>
        </div>
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold text-foreground">
        Próximas Mensalidades
      </h2>
      <div className="mt-4 space-y-3">
        {installments.map((inst) => {
          const cfg = statusConfig[inst.status];
          const Icon = cfg.icon;
          return (
            <div
              key={inst.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${cfg.className}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-card-foreground">
                  {inst.courseTitle}
                </p>
                <p className="text-xs text-muted-foreground">
                  Mês {inst.monthIndex} de {inst.totalMonths} · Vencimento: {inst.dueDate}
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-right">
                  <p className="font-bold text-card-foreground">{formatKz(inst.amount)}</p>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${cfg.className}`}>
                    {cfg.label}
                  </span>
                </div>
                {inst.status === "pending" && (
                  <a
                    href={`https://wa.me/244940070279?text=${encodeURIComponent(
                      `Olá! Acabei de pagar a mensalidade do mês ${inst.monthIndex} do curso "${inst.courseTitle}" (${formatKz(inst.amount)}). Envio o comprovativo em anexo.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="gold" size="sm">
                      <MessageCircle className="h-3.5 w-3.5" />
                      Pagar
                    </Button>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-gold/30 bg-gold/5 p-5">
        <p className="font-semibold text-foreground">Como pagar a mensalidade?</p>
        <ol className="mt-3 space-y-1 text-sm text-muted-foreground list-decimal list-inside">
          <li>Efectue o pagamento via <strong className="text-foreground">Multicaixa Express</strong> para <strong className="text-primary">930 850 071</strong>.</li>
          <li>Envie o comprovativo via WhatsApp para <strong className="text-primary">940 070 279</strong>.</li>
          <li>O estado será actualizado após validação.</li>
        </ol>
        <Link to="/dashboard" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
          ← Voltar aos meus cursos
        </Link>
      </div>
    </div>
  );
}
