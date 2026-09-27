import { createFileRoute, Navigate } from '@tanstack/react-router';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'barberamostre | Corte que respeita o estilo' }, { name: 'description', content: 'Corte, barba e agendamento online na barberamostre.' }, { property: 'og:title', content: 'barberamostre | Corte que respeita o estilo' }, { property: 'og:description', content: 'Corte, barba e agendamento online na barberamostre.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: () => <Navigate to="/home" replace />,
});
