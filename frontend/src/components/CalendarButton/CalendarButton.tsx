import { CalendarPlus } from 'lucide-react';
import { createGoogleCalendarUrl } from '../../utils/api';
import type { EventConfig } from '../../types';

export const CalendarButton = ({ event }: { event: EventConfig }) => {
  const add = () => {
    const url = createGoogleCalendarUrl({
      ...event.calendar,
      location: event.location.address
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button className="button" type="button" onClick={add}>
      <CalendarPlus size={18} /> Agregar al calendario
    </button>
  );
};
