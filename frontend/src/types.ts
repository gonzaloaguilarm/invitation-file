export type EventConfig = {
  name: string;
  location: {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    googleMapsUrl: string;
  };
  playlist: {
    spotifyUrl: string;
    embedUrl: string;
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
    deepLink: string;
  };
  quote: string;
  social: Record<string, string>;
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

export type RsvpSubmission = {
  guestName: string;
  email?: string;
  attendance: 'yes' | 'no';
  dietaryRestrictions?: 'adulto carne' | 'adulto veggie' | 'adolescente' | 'celiaco';
  message?: string;
};
