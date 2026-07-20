import type { EventConfig } from "../../types";

export const Footer = ({ event }: { event: EventConfig }) => (
  <footer className="footer">
    <p>{event.name}</p>
  </footer>
);
