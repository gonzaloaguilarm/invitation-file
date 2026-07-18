import { useState } from 'react';
import { Send } from 'lucide-react';
import type { EventConfig, RsvpSubmission } from '../../types';
import { submitRsvp } from '../../utils/api';
import { CalendarButton } from '../CalendarButton/CalendarButton';

export const RSVP = ({ event }: { event: EventConfig }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    guestName: '',
    attendance: 'yes',
    dietaryRestrictions: '',
    message: ''
  });

  const isFormComplete =
    formValues.guestName.trim().length > 0 &&
    formValues.attendance.trim().length > 0 &&
    formValues.dietaryRestrictions.trim().length > 0;
  const submitDisabled = !isFormComplete || hasSubmitted;

  const updateField = (field: keyof typeof formValues) => (
    inputEvent: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: inputEvent.target.value
    }));
  };

  const onSubmit = async (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    if (submitDisabled) return;

    setHasSubmitted(true);
    setStatus('submitting');

    const formData = new FormData(submitEvent.currentTarget);
    const payload: RsvpSubmission = {
      guestName: String(formData.get('guestName') ?? ''),
      email: String(formData.get('email') ?? ''),
      attendance: String(formData.get('attendance') ?? 'yes') as RsvpSubmission['attendance'],
      dietaryRestrictions: String(formData.get('dietaryRestrictions') ?? '') as RsvpSubmission['dietaryRestrictions'],
      message: String(formData.get('message') ?? '')
    };

    try {
      await submitRsvp(payload, event.rsvp.organizerEmail, event.name);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="rsvp" className="section rsvp">
      <h2>Confirmar asistencia</h2>
      <form onSubmit={onSubmit}>
        <input
          name="guestName"
          placeholder="Nombre y apellido"
          required
          maxLength={120}
          value={formValues.guestName}
          onChange={updateField('guestName')}
        />
        <select name="attendance" value={formValues.attendance} onChange={updateField('attendance')} required>
          <option value="yes">Asisto</option>
          <option value="no">No asisto</option>
        </select>
        <select
          name="dietaryRestrictions"
          value={formValues.dietaryRestrictions}
          onChange={updateField('dietaryRestrictions')}
          required
        >
          <option value="" disabled>Menú</option>
          <option value="adulto carne">Menú adulto carne</option>
          <option value="adulto veggie">Menú adulto veggie</option>
          <option value="adolescente">Menú adolescente</option>
          <option value="celiaco">Menú celíaco</option>
        </select>
        <textarea
          name="message"
          placeholder="Aclaraciones"
          maxLength={500}
          value={formValues.message}
          onChange={updateField('message')}
        />
        <button className="button" type="submit" disabled={submitDisabled}>
          <Send size={18} /> {status === 'submitting' ? 'Enviando' : 'Enviar Reserva'}
        </button>
      </form>
      <div className="actionRow">
        <CalendarButton event={event} />
      </div>
      {status === 'sent' && <p className="formState">Confirmación enviada.</p>}
      {status === 'error' && <p className="formState">No se pudo enviar. Intenta nuevamente.</p>}
    </section>
  );
};
