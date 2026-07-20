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

export const createSpotifyUrl = () => {
  return "https://open.spotify.com/playlist/3jPKPPQqpsbcIqABXZfhgz?si=mYElLZqLQp-SDcqTp7pQ5w&utm_=&nd=1&dlsi=bd079a3d468341be"
};

const escapeIcsText = (text: string) => text.replace(/[\\,;]/g, (char) => `\\${char}`).replace(/\n/g, '\\n');

export const createIcsDataUrl = (payload: CalendarPayload) => {
  const ics = [
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

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
};