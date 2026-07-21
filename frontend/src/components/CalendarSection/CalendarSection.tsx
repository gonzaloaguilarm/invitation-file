import type { EventConfig } from '../../types';
import { CalendarButton } from '../CalendarButton/CalendarButton';

export const CalendarSection = ({ event }: { event: EventConfig }) => {
  return (
    <section className="section compact">
      <h2>Agenda la fecha</h2>
      <p className="calendarNote">28 de Agosto de 2026, 21:00hs puntual</p>
      <CalendarButton event={event} className="mercadoPagoButton" />
    </section>
  );
};
