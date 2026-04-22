import { Link } from "@tanstack/react-router";
import aliniLogo from "@/assets/alini-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1">
                <img src={aliniLogo} alt="Alini Academy" className="h-full w-full object-contain" />
              </div>
              <span className="font-display text-lg font-bold">Alini Academy</span>
            </div>
            <p className="mt-3 text-sm text-navy-foreground/70">
              Centro de ensino online de excelência. Formação profissional acessível para todos.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gold">Links Rápidos</h4>
            <ul className="mt-3 space-y-2 text-sm text-navy-foreground/70">
              <li><Link to="/courses" className="hover:text-navy-foreground">Cursos</Link></li>
              <li><Link to="/payment" className="hover:text-navy-foreground">Como Pagar</Link></li>
              <li><Link to="/register" className="hover:text-navy-foreground">Registar</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gold">Contacto</h4>
            <ul className="mt-3 space-y-2 text-sm text-navy-foreground/70">
              <li>WhatsApp: 930 850 071</li>
              <li>Email: info@aliniacademy.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gold">Pagamento</h4>
            <p className="mt-3 text-sm text-navy-foreground/70">
              Multicaixa Express: 930 850 071
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-navy-foreground/10 pt-6 text-center text-xs text-navy-foreground/50">
          © {new Date().getFullYear()} Alini Academy. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
