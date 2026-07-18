import { AnimationProvider } from '../../components/AnimationProvider/AnimationProvider';
import { Countdown } from '../../components/Countdown/Countdown';
import { DressCode } from '../../components/DressCode/DressCode';
import { FeaturedMedia } from '../../components/FeaturedMedia/FeaturedMedia';
import { FloatingMusic } from '../../components/FloatingMusic/FloatingMusic';
import { Footer } from '../../components/Footer/Footer';
import { Gallery } from '../../components/Gallery/Gallery';
import { GiftSection } from '../../components/GiftSection/GiftSection';
import { Location } from '../../components/Location/Location';
import { Quote } from '../../components/Quote/Quote';
import { RSVP } from '../../components/RSVP/RSVP';
import { SpotifyPlayer } from '../../components/SpotifyPlayer/SpotifyPlayer';
import { ThemeProvider } from '../../components/ThemeProvider/ThemeProvider';
import { useEventConfig } from '../../context/EventContext';
import imagen2 from '../../assets/events/almi/imagen2.jpg';
import imagen3 from '../../assets/events/almi/imagen3.jpg';
import imagen4 from '../../assets/events/almi/imagen4.jpg';
import backgroundMusic from '../../assets/events/almi/risk.mp3';


const galleryImages = [imagen2, imagen3, imagen4];

export const EventPage = () => {
  const event = useEventConfig();

  return (
    <ThemeProvider config={event}>
      <AnimationProvider>
        <main className="eventPage">
          <FeaturedMedia />
          <Countdown countdown={event.countdown} />
          <Quote text={event.quote} />
          <Gallery images={galleryImages} />
          <Location event={event} />
          <DressCode title={event.dressCode.title} value={event.dressCode.value} description={event.dressCode.description} />
          <GiftSection gifts={event.gifts} mercadoPago={event.mercadoPago} />
          <SpotifyPlayer playlist={event.playlist} />
          <RSVP event={event} />
          <Footer event={event} />
          <FloatingMusic audioUrl={backgroundMusic} />
        </main>
      </AnimationProvider>
    </ThemeProvider>
  );
};
