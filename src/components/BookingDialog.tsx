import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { barbers, money, services, whatsappUrl } from '@/lib/barber-data';
import { useBooking } from '@/lib/booking-context';

const slots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const dateString = (value: string) => value.split('-').reverse().join('/');
export function BookingDialog() {
  const { open, setOpen, initialService, initialBarber } = useBooking();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [barber, setBarber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (open) { setStep(0); setSelected(initialService ? [initialService] : []); setBarber(initialBarber ?? ''); setDate(''); setTime(''); setName(''); setPhone(''); setSubmitted(false); }
  }, [open, initialService, initialBarber]);
  const chosen = services.filter(item => selected.includes(item.id));
  const total = chosen.reduce((sum, item) => sum + item.price, 0);
  const validPhone = phone.replace(/\D/g, '').length >= 10;
  const valid = [selected.length > 0, Boolean(barber), Boolean(date && time), Boolean(name.trim().length >= 2 && validPhone)][step];
  const toggle = (id: string) => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  const confirm = () => {
    setSubmitted(true);
    if (!valid) return;
    const professional = barbers.find(item => item.id === barber)?.name ?? '';
    const message = `Olá! Quero confirmar um agendamento na barberamostre.\n\nServiços: ${chosen.map(item => item.name).join(', ')}\nProfissional: ${professional}\nData: ${dateString(date)} às ${time}\nValor: ${money(total)}\nNome: ${name.trim()}\nTelefone: ${phone.trim()}`;
    try { window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer'); toast.success('Pedido pronto para enviar no WhatsApp.'); setOpen(false); }
    catch { toast.error('Não foi possível abrir o WhatsApp. Tente novamente.'); }
  };
  const minDate = new Date().toLocaleDateString('en-CA');
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-h-[92dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto border-border bg-background p-5 sm:p-7">
      <DialogHeader className="text-left"><div className="mb-3 text-xs font-bold uppercase text-secondary">Agendamento / 0{step + 1} de 04</div><DialogTitle className="text-2xl font-bold">{['Escolha os serviços', 'Escolha o profissional', 'Data e horário', 'Seus dados'][step]}</DialogTitle><DialogDescription>Selecione os detalhes para preparar sua mensagem.</DialogDescription></DialogHeader>
      <div className="my-2 flex gap-1.5" aria-label={`Passo ${step + 1} de 4`}>{[0,1,2,3].map(index => <div key={index} className={`h-1 flex-1 ${index <= step ? 'bg-secondary' : 'bg-muted'}`} />)}</div>
      {step === 0 && <div className="max-h-[45dvh] space-y-2 overflow-y-auto pr-1">{services.map(item => <label key={item.id} className={`flex cursor-pointer items-center gap-4 border p-3 transition-colors ${selected.includes(item.id) ? 'border-secondary bg-secondary/10' : 'border-border hover:border-foreground/50'}`}><input type="checkbox" className="size-5 accent-secondary" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} /><span className="min-w-0 flex-1"><strong className="block text-sm">{item.name}</strong><small className="text-muted-foreground">{item.duration} min</small></span><strong className="text-sm">{money(item.price)}</strong></label>)}</div>}
      {step === 1 && <div className="grid gap-3 sm:grid-cols-2">{barbers.map(item => <Button key={item.id} variant="outline" onClick={() => setBarber(item.id)} className={`h-auto min-h-36 flex-col items-start overflow-hidden p-0 text-left ${barber === item.id ? 'border-secondary ring-1 ring-secondary' : ''}`}><img src={item.image} alt={item.name} className="h-32 w-full object-cover object-top" width={800} height={912} loading="lazy" /><span className="flex w-full items-center gap-2 p-3"><span className="flex-1"><strong className="block">{item.name}</strong><small className="whitespace-normal text-muted-foreground">{item.specialty}</small></span>{barber === item.id && <Check className="text-secondary" />}</span></Button>)}</div>}
      {step === 2 && <div className="space-y-5"><label className="block text-sm font-semibold" htmlFor="booking-date">Escolha a data</label><Input id="booking-date" type="date" min={minDate} value={date} onChange={event => { setDate(event.target.value); setTime(''); }} className="h-12 [color-scheme:dark]" /><div><p className="mb-3 text-sm font-semibold">Horários disponíveis para consulta</p><div className="grid grid-cols-4 gap-2">{slots.map(slot => <Button key={slot} disabled={!date} variant={time === slot ? 'secondary' : 'outline'} className="h-12 px-1" onClick={() => setTime(slot)}>{slot}</Button>)}</div><p className="mt-3 text-xs text-muted-foreground">Horário sujeito à confirmação pelo WhatsApp.</p></div></div>}
      {step === 3 && <div className="space-y-4"><div><label htmlFor="booking-name" className="mb-2 block text-sm font-semibold">Nome</label><Input id="booking-name" value={name} onChange={event => setName(event.target.value)} autoComplete="name" className="h-12" placeholder="Seu nome" />{(submitted || name.length > 0) && name.trim().length < 2 && <p className="mt-1 text-xs text-destructive">Digite pelo menos 2 caracteres.</p>}</div><div><label htmlFor="booking-phone" className="mb-2 block text-sm font-semibold">WhatsApp</label><Input id="booking-phone" value={phone} onChange={event => setPhone(event.target.value)} type="tel" autoComplete="tel" className="h-12" placeholder="(11) 99999-9999" />{(submitted || phone.length > 0) && !validPhone && <p className="mt-1 text-xs text-destructive">Digite um telefone com DDD.</p>}</div><div className="border-t border-border pt-4 text-sm"><p className="mb-2 font-bold">Resumo do pedido</p><p className="text-muted-foreground">{chosen.map(item => item.name).join(', ')} · {barbers.find(item => item.id === barber)?.name}</p><p className="text-muted-foreground">{dateString(date)} às {time}</p><p className="mt-2 text-lg font-bold">{money(total)}</p></div></div>}
      {submitted && !valid && step < 3 && <p className="text-sm text-destructive" role="alert">Faça uma seleção para continuar.</p>}
      <div className="mt-2 flex gap-2 border-t border-border pt-5">{step > 0 && <Button variant="outline" className="h-12 px-4" onClick={() => { setSubmitted(false); setStep(step - 1); }}><ArrowLeft /> Voltar</Button>}<Button className="h-12 flex-1" onClick={() => { setSubmitted(true); if (valid) { setSubmitted(false); if (step < 3) setStep(step + 1); else confirm(); } }} >{step === 3 ? <><MessageCircle /> Confirmar agendamento no WhatsApp</> : <>Continuar <ArrowRight /></>}</Button></div>
    </DialogContent>
  </Dialog>;
}
