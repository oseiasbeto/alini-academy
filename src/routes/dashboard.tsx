import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { BookOpen, FileText, ClipboardCheck, BarChart3, LogOut } from "lucide-react";
import aliniLogo from "@/assets/alini-logo.png";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const navItems = [
  { to: "/dashboard", label: "Meus Cursos", icon: BookOpen, exact: true },
  { to: "/dashboard/materials", label: "Materiais PDF", icon: FileText },
  { to: "/dashboard/exams", label: "Provas", icon: ClipboardCheck },
  { to: "/dashboard/results", label: "Resultados", icon: BarChart3 },
];

function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-navy lg:flex">
        <div className="flex h-16 items-center gap-2.5 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1">
            <img src={aliniLogo} alt="Alini Academy" className="h-full w-full object-contain" />
          </div>
          <span className="font-display text-lg font-bold text-navy-foreground">Alini Academy</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-gold"
                    : "text-navy-foreground/70 hover:bg-sidebar-accent hover:text-navy-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-navy-foreground/10 p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-foreground/70 hover:bg-sidebar-accent hover:text-navy-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-4 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <img src={aliniLogo} alt="Alini Academy" className="h-8 w-auto" />
            <span className="font-display text-sm font-bold">Alini Academy</span>
          </Link>
        </header>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-card lg:hidden">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 overflow-auto p-4 pb-20 sm:p-6 lg:p-8 lg:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
