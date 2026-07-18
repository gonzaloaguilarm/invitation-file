import type { EventConfig } from '../../types';

export const Map = ({ event }: { event: EventConfig }) => {
  if (!event.map.enabled) return null;
  const params = new URLSearchParams({
    q: `${event.location.latitude},${event.location.longitude}`,
    z: String(event.map.zoom),
    output: 'embed'
  });

  return (
    <iframe
      title={`Mapa de ${event.location.name}`}
      src={`https://maps.google.com/maps?${params.toString()}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};
