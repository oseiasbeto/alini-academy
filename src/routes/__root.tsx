import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Alini Academy - Centro de Ensino Online" },
      { name: "description", content: "Plataforma de ensino online com cursos profissionais. Aprenda no seu ritmo com a Alini Academy." },
      { property: "og:title", content: "Alini Academy - Centro de Ensino Online" },
      { property: "og:description", content: "Plataforma de ensino online com cursos profissionais. Aprenda no seu ritmo com a Alini Academy." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Alini Academy - Centro de Ensino Online" },
      { name: "twitter:description", content: "Plataforma de ensino online com cursos profissionais. Aprenda no seu ritmo com a Alini Academy." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/95c674f3-b9d4-4301-9763-e03152cb4f99/id-preview-5a1c7077--3a3a7154-181c-47da-974a-b5f76caaa745.lovable.app-1776854223791.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/95c674f3-b9d4-4301-9763-e03152cb4f99/id-preview-5a1c7077--3a3a7154-181c-47da-974a-b5f76caaa745.lovable.app-1776854223791.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
