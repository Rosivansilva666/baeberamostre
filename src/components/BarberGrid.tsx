import { Button } from '@/components/ui/button';
import { barbers } from '@/lib/barber-data';
import { useBooking } from '@/lib/booking-context';
export function BarberGrid() {
  const { start } = useBooking();
  return <div className="grid gap-5 sm:grid-cols-2">{barbers.map(barber => <article key={barber.id} className="group relative overflow-hidden bg-card"><img src={barber.image} alt={`Retrato de ${barber.name}`} loading="lazy" width={800} height={912} className="aspect-[4/3] w-full object-cover object-[center_28%] transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-background via-background/70 to-transparent p-5 pt-20 sm:p-7"><div><h3 className="text-2xl font-bold">{barber.name}</h3><p className="mt-1 text-sm text-foreground/80">{barber.specialty}</p></div><Button variant="secondary" className="h-11 shrink-0" onClick={() => start(undefined, barber.id)}>Ver agenda</Button></div></article>)}</div>;
}
