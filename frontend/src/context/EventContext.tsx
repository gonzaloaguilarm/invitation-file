import { createContext, useContext } from 'react';
import eventConfig from '../event.json';
import type { EventConfig } from '../types';

const config: EventConfig = eventConfig;
const EventContext = createContext<EventConfig>(config);

export const EventProvider = ({ children }: { children: React.ReactNode }) => (
  <EventContext.Provider value={config}>{children}</EventContext.Provider>
);

export const useEventConfig = () => useContext(EventContext);
