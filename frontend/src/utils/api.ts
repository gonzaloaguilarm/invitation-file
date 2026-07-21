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

const getClientIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip as string;
  } catch {
    return 'desconocida';
  }
};

export const submitRsvp = async (payload: RsvpSubmission, organizerEmail: string, eventName: string) => {
  const formData = new FormData();
  formData.append('_subject', `Confirmacion para ${eventName}`);
  formData.append('Evento', eventName);
  formData.append('Nombre', payload.guestName);
  formData.append('Menu', payload.menu);
  formData.append('Mensaje', payload.message ?? '');
  formData.append('IP', await getClientIp());
  formData.append('Navegador', navigator.userAgent);

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

const escapeIcsText = (text: string) => text.replace(/[\\,;]/g, (char) => `\\${char}`).replace(/\n/g, '\\n');

const buildIcsString = (payload: CalendarPayload) =>
  [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Invitacion//ES',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@invitacion`,
    `DTSTAMP:${formatGoogleCalendarDate(new Date().toISOString())}`,
    `DTSTART:${formatGoogleCalendarDate(payload.startDate)}`,
    `DTEND:${formatGoogleCalendarDate(payload.endDate)}`,
    `SUMMARY:${escapeIcsText(payload.title)}`,
    `DESCRIPTION:${escapeIcsText(payload.description)}`,
    `LOCATION:${escapeIcsText(payload.location)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

// Safari blocks top-level navigation to data: URIs, so a Blob object URL is
// used instead — it's what Safari recognizes and offers to add to Calendar.
export const createIcsBlobUrl = (payload: CalendarPayload) => {
  const blob = new Blob([buildIcsString(payload)], { type: 'text/calendar;charset=utf-8' });
  return URL.createObjectURL(blob);
};