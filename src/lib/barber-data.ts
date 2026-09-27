import hero from '@/assets/barbershop-hero.jpg';
import cut from '@/assets/barber-cut.jpg';
import beard from '@/assets/barber-beard.jpg';
import tools from '@/assets/barber-tools.jpg';
import barberOne from '@/assets/barber-portrait-1.jpg';
import barberTwo from '@/assets/barber-portrait-2.jpg';

export const images = { hero, cut, beard, tools };
export const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const services = [
  { id: 'corte', name: 'Corte clássico', detail: 'Tesoura, máquina e acabamento no detalhe.', duration: 40, price: 50, image: cut },
  { id: 'degrade', name: 'Degradê', detail: 'Transição precisa e finalização alinhada.', duration: 45, price: 60, image: cut },
  { id: 'barba', name: 'Barba na navalha', detail: 'Toalha quente, desenho e navalha.', duration: 30, price: 40, image: beard },
  { id: 'combo', name: 'Corte + barba', detail: 'O cuidado completo em uma visita.', duration: 70, price: 85, image: tools },
  { id: 'pigmentacao', name: 'Pigmentação', detail: 'Correção sutil e acabamento natural.', duration: 35, price: 45, image: beard },
  { id: 'sobrancelha', name: 'Sobrancelha', detail: 'Limpeza e desenho sem exagero.', duration: 15, price: 25, image: tools },
];
export const barbers = [
  { id: 'rafael', name: 'Rafael', specialty: 'Cortes clássicos e degradê', image: barberOne },
  { id: 'andre', name: 'André', specialty: 'Barba e acabamento na navalha', image: barberTwo },
];
export const gallery = [
  { image: cut, title: 'Degradê', category: 'Corte' },
  { image: beard, title: 'Barba na navalha', category: 'Barba' },
  { image: tools, title: 'O ritual', category: 'Bastidores' },
  { image: hero, title: 'Nosso espaço', category: 'Ambiente' },
];
export const whatsappUrl = (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`;
