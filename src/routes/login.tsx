import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import aliniLogo from "@/assets/alini-logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar - Alini Academy" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 gradient-hero items-center justify-center lg:flex">
        <div className="max-w-md px-12 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-3">
            <img src={aliniLogo} alt="Alini Academy" className="h-full w-full object-contain" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold text-primary-foreground">
            Bem-vindo de volta
          </h2>
          <p className="mt-3 text-primary-foreground/70">
            Acesse os seus cursos, materiais e provas na Alini Academy.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <img src={aliniLogo} alt="Alini Academy" className="h-9 w-auto" />
            <span className="font-display text-lg font-bold">Alini Academy</span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground">Entrar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Introduza o seu Nº de Aluno e a senha enviadas por nós após a validação do pagamento.
          </p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label htmlFor="studentId">Nº de Aluno</Label>
              <Input id="studentId" type="text" placeholder="Ex: ALN-2026-0001" autoComplete="username" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Link to="/dashboard">
              <Button variant="default" size="lg" className="mt-2 w-full">
                Entrar
              </Button>
            </Link>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não está inscrito?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Inscrever-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
