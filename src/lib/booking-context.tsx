import { createContext, useContext, useState, type ReactNode } from 'react';

type BookingContextValue = {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialService: string | null;
  initialBarber: string | null;
  start: (service?: string, barber?: string) => void;
};
const BookingContext = createContext<BookingContextValue | null>(null);
export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialService, setInitialService] = useState<string | null>(null);
  const [initialBarber, setInitialBarber] = useState<string | null>(null);
  const start = (service?: string, barber?: string) => {
    setInitialService(service ?? null);
    setInitialBarber(barber ?? null);
    setOpen(true);
  };
  return <BookingContext.Provider value={{ open, setOpen, initialService, initialBarber, start }}>{children}</BookingContext.Provider>;
}
export function useBooking() {
  const value = useContext(BookingContext);
  if (!value) throw new Error('BookingProvider ausente');
  return value;
}
