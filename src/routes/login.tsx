import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar - Acaj Academy" },
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold">
            <GraduationCap className="h-8 w-8 text-gold-foreground" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold text-primary-foreground">
            Bem-vindo de volta
          </h2>
          <p className="mt-3 text-primary-foreground/70">
            Acesse os seus cursos, materiais e provas na Acaj Academy.
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

          <h1 className="font-display text-2xl font-bold text-foreground">Entrar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Introduza as suas credenciais para aceder à plataforma.
          </p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••" />
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
            Não tem conta?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Registar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
