import { MapPin } from 'lucide-react';
import type { EventConfig } from '../../types';
import { Map } from '../Map/Map';
import { createGoogleMapsAppUrl, isIOS, isAndroid, openWithAppFallback } from '../../utils/deepLinks';

export const Location = ({ event }: { event: EventConfig }) => {
  const handleClick = (clickEvent: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isIOS() && !isAndroid()) return;

    clickEvent.preventDefault();
    const appUrl = createGoogleMapsAppUrl(event.location.latitude, event.location.longitude, event.location.name);
    openWithAppFallback(appUrl, event.location.googleMapsUrl);
  };

  return (
    <section id="ubicacion" className="section location">
      <div className="location-header">
        <h2>{event.location.name}</h2>
        <h2>{event.location.place}</h2>
      </div>
      <p>{event.location.address}</p>
      <a className="button" href={event.location.googleMapsUrl} target="_blank" rel="noreferrer" onClick={handleClick}>
        <MapPin size={18} /> Cómo llegar
      </a>
      {/*  <Map event={event} /> */}
    </section>
  );
};
