import { Clock3, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services, money } from '@/lib/barber-data';
import { useBooking } from '@/lib/booking-context';
export function ServiceGrid({ limit }: { limit?: number }) {
  const { start } = useBooking();
  return <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{services.slice(0, limit).map((service, index) => <article key={service.id} className="group flex min-h-60 flex-col bg-background p-6 transition-colors hover:bg-card sm:p-8"><div className="mb-8 flex items-start justify-between"><span className="text-xs font-bold text-secondary">0{index + 1} / SERVIÇO</span><ArrowUpRight className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-secondary" size={20} /></div><h3 className="text-2xl font-bold">{service.name}</h3><p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.detail}</p><div className="mt-7 flex items-end justify-between gap-3"><div><span className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 size={14} /> {service.duration} min</span><strong className="text-xl">{money(service.price)}</strong></div><Button variant="outline" className="h-11 border-foreground/30 px-5 hover:border-secondary hover:text-secondary" onClick={() => start(service.id)}>Agendar</Button></div></article>)}</div>;
}
