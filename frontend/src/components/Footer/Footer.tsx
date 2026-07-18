import type { EventConfig } from '../../types';

export const Footer = ({ event }: { event: EventConfig }) => (
  <footer className="footer">
    <p>{event.name}</p>
    {Object.entries(event.social).map(([name, url]) => (
      <a key={name} href={url} target="_blank" rel="noreferrer">{name}</a>
    ))}
  </footer>
);
