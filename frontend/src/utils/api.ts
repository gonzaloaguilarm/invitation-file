import type { RsvpSubmission } from '../types';

type CalendarPayload = {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
};

const formatGoogleCalendarDate = (date: string) =>
  new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

export const submitRsvp = async (payload: RsvpSubmission, organizerEmail: string, eventName: string) => {
  const formData = new FormData();
  formData.append('_subject', `Confirmacion para ${eventName}`);
  formData.append('Evento', eventName);
  formData.append('Nombre', payload.guestName);
  formData.append('Asistencia', payload.attendance === 'yes' ? 'Asiste' : 'No asiste');
  formData.append('Menu', payload.dietaryRestrictions ?? '');
  formData.append('Mensaje', payload.message ?? '');

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(organizerEmail)}`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) throw new Error('No se pudo enviar la confirmacion');
  return response.json();
};

export const createGoogleCalendarUrl = (payload: CalendarPayload) => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: payload.title,
    details: payload.description,
    location: payload.location,
    dates: `${formatGoogleCalendarDate(payload.startDate)}/${formatGoogleCalendarDate(payload.endDate)}`
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
