import { CalendarPlus } from 'lucide-react';
import { createGoogleCalendarUrl, createIcsDataUrl } from '../../utils/api';
import type { EventConfig } from '../../types';
import { isIOS, isAndroid } from '../../utils/deepLinks';

export const CalendarButton = ({ event }: { event: EventConfig }) => {
  const add = () => {
    const payload = { ...event.calendar, location: event.location.address };

    // iOS has no Google Calendar app-link scheme; a data: ICS URI is the
    // reliable way to hand off to the native Calendar app instead of Safari.
    if (isIOS()) {
      window.location.href = createIcsDataUrl(payload);
      return;
    }

    const url = createGoogleCalendarUrl(payload);
    if (isAndroid()) {
      // Same-tab navigation lets Android treat this as a real App Link, so
      // the Google Calendar app opens instead of Chrome.
      window.location.href = url;
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button className="button" type="button" onClick={add}>
      <CalendarPlus size={18} /> Agregar al calendario
    </button>
  );
};
