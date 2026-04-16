import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Registar - Acaj Academy" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 gradient-hero items-center justify-center lg:flex">
        <div className="max-w-md px-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold">
            <GraduationCap className="h-8 w-8 text-gold-foreground" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold text-primary-foreground">
            Junte-se à Acaj Academy
          </h2>
          <p className="mt-3 text-primary-foreground/70">
            Crie a sua conta e comece a aprender hoje mesmo.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">Acaj Academy</span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground">Criar Conta</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Preencha os dados abaixo para se registar.
          </p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" placeholder="O seu nome" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" type="tel" placeholder="9XX XXX XXX" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input id="password" type={showPw ? "text" : "password"} placeholder="Mínimo 6 caracteres" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button variant="gold" size="lg" className="mt-2 w-full" type="submit">
              Registar
            </Button>
          </form>

          <p className="mt-4 rounded-lg bg-gold/10 p-3 text-center text-xs text-muted-foreground">
            Após o registo, efectue o pagamento via Multicaixa Express para{" "}
            <strong className="text-foreground">930 850 071</strong> e envie o comprovativo por WhatsApp.
          </p>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
