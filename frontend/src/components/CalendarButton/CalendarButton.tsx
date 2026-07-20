import { CalendarPlus } from 'lucide-react';
import { createGoogleCalendarUrl, createIcsBlobUrl } from '../../utils/api';
import type { EventConfig } from '../../types';
import { isIOS, isAndroid } from '../../utils/deepLinks';

export const CalendarButton = ({ event }: { event: EventConfig }) => {
  const add = () => {
    const payload = { ...event.calendar, location: event.location.address };

    // iOS has no Google Calendar app-link scheme; opening an ICS Blob URL in
    // a new tab is what reliably triggers Safari's native "Add to Calendar".
    if (isIOS()) {
      window.open(createIcsBlobUrl(payload), '_blank');
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
