import { EventProvider } from './context/EventContext';
import { EventPage } from './pages/EventPage/EventPage';

export const App = () => (
  <EventProvider>
    <EventPage />
  </EventProvider>
);
