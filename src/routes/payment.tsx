import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Como Pagar - Alini Academy" },
      { name: "description", content: "Instruções de pagamento via Multicaixa Express para acesso à Alini Academy." },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  const steps = [
    {
      step: 1,
      title: "Faça o Pagamento",
      description: "Realize o pagamento via Multicaixa Express para o número:",
      highlight: "930 850 071",
      icon: Phone,
    },
    {
      step: 2,
      title: "Envie o Comprovativo",
      description: "Envie uma captura de ecrã do comprovativo de pagamento para o WhatsApp:",
      highlight: "930 850 071",
      icon: MessageCircle,
    },
    {
      step: 3,
      title: "Aguarde Aprovação",
      description: "A nossa equipa irá verificar o pagamento e aprovar a sua conta em até 24 horas.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Como <span className="text-gold">Pagar</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Siga os passos abaixo para activar o seu acesso à plataforma.
        </p>

        <div className="mt-10 space-y-6">
          {steps.map((s) => (
            <div key={s.step} className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-gold font-bold text-gold-foreground">
                {s.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                {s.highlight && (
                  <p className="mt-2 text-xl font-bold text-primary">{s.highlight}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-gold/30 bg-gold/5 p-6 text-center">
          <p className="font-semibold text-foreground">Ainda não se inscreveu?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Escolha um curso e preencha o formulário de inscrição (Nome + NIF). As credenciais serão geradas e enviadas após validarmos o pagamento.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link to="/courses">
              <Button variant="gold">
                Ver Cursos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="https://wa.me/244930850071" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
