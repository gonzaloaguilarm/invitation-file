export type EventConfig = {
  name: string;
  location: {
    name: string;
    place: string;
    address: string;
    latitude: string;
    longitude: string;
    googleMapsUrl: string;
  };
  playlist: {
    spotifyUrl: string;
  };
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  typography: {
    heading: string;
  };
  dressCode: {
    title: string;
    value: string;
    description: string;
  }
  gifts: string[];
  mercadoPago?: {
    alias: string;
  };
  quote: string;
  map: { enabled: boolean; zoom: number };
  rsvp: {
    organizerEmail: string;
  };
  countdown: {
    enabled: boolean;
    targetDate: string;
    finalMessage: string;
  };
  calendar: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  };
};

export type MenuOption = 'adulto carne' | 'adulto veggie' | 'adolescente' | 'celiaco';

export type RsvpSubmission = {
  guestName: string;
  email?: string;
  menus: MenuOption[];
  message?: string;
};
