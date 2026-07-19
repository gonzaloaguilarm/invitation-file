import { MapPin } from 'lucide-react';
import type { EventConfig } from '../../types';
import { Map } from '../Map/Map';

export const Location = ({ event }: { event: EventConfig }) => (
  <section id="ubicacion" className="section location">
    <div className="location-header">
      <h2>{event.location.name}</h2>
      <h2>{event.location.place}</h2>
    </div>
    <p>{event.location.address}</p>
    <a className="button" href={event.location.googleMapsUrl} target="_blank" rel="noreferrer">
      <MapPin size={18} /> Cómo llegar
    </a>
    {/*  <Map event={event} /> */}
  </section>
);
