import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from '@tanstack/react-router';
import { useEffect, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { BookingProvider } from '@/lib/booking-context';
import { SiteShell } from '@/components/SiteShell';
import appCss from '../styles.css?url';
import { reportLovableError } from '../lib/lovable-error-reporting';
function NotFoundComponent() { return <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 text-center"><h1 className="text-6xl font-black">404</h1><p className="text-muted-foreground">Página não encontrada.</p><Button asChild><Link to="/home">Voltar ao início</Link></Button></div>; }
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: 'tanstack_root_error_component' }); }, [error]);
  return <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 text-center"><h1 className="text-3xl font-black">Esta página não carregou.</h1><p className="text-muted-foreground">Tente novamente ou volte ao início.</p><Button onClick={() => { router.invalidate(); reset(); }}>Tentar novamente</Button><Button variant="outline" asChild><Link to="/home">Voltar ao início</Link></Button></div>;
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }], links: [{ rel: 'stylesheet', href: appCss }, { rel: 'preconnect', href: 'https://fonts.googleapis.com' }, { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap' }, { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }] }),
  shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) { return <html lang="pt-BR"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><BookingProvider><SiteShell><Outlet /></SiteShell><Toaster richColors position="bottom-center" /></BookingProvider></QueryClientProvider>; }
