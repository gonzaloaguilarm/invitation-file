import { MapPin } from 'lucide-react';
import type { EventConfig } from '../../types';
import { Map } from '../Map/Map';

export const Location = ({ event }: { event: EventConfig }) => (
  <section id="ubicacion" className="section location">
    <div>
      <h2>{event.location.name}</h2>
      <p>{event.location.address}</p>
      <a className="button" href={event.location.googleMapsUrl} target="_blank" rel="noreferrer">
        <MapPin size={18} /> Cómo llegar
      </a>
    </div>
    <Map event={event} />
  </section>
);
