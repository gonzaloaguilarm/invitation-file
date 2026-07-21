import { useRef, useState } from 'react';
import { AnimationProvider } from '../../components/AnimationProvider/AnimationProvider';
import { CalendarSection } from '../../components/CalendarSection/CalendarSection';
import { Countdown } from '../../components/Countdown/Countdown';
import { DressCode } from '../../components/DressCode/DressCode';
import { FeaturedMedia } from '../../components/FeaturedMedia/FeaturedMedia';
import { Footer } from '../../components/Footer/Footer';
import { Gallery } from '../../components/Gallery/Gallery';
import { GiftSection } from '../../components/GiftSection/GiftSection';
import { IntroScreen } from '../../components/IntroScreen/IntroScreen';
import { Location } from '../../components/Location/Location';
import { Quote } from '../../components/Quote/Quote';
import { RSVP } from '../../components/RSVP/RSVP';
import { ThemeProvider } from '../../components/ThemeProvider/ThemeProvider';
import { useEventConfig } from '../../context/EventContext';
import imagen2 from '../../assets/events/almi/imagen2.jpg';
import imagen3 from '../../assets/events/almi/imagen3.jpg';
import imagen4 from '../../assets/events/almi/imagen4.jpg';
import backgroundMusic from '../../assets/events/almi/risk.mp3';


const galleryImages = [imagen2, imagen3, imagen4];

export const EventPage = () => {
  const event = useEventConfig();
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleEnter = (withMusic: boolean) => {
    if (withMusic && audioRef.current) {
      audioRef.current.volume = 1;
      void audioRef.current.play().catch(() => undefined);
    }
    setEntered(true);
  };

  return (
    <ThemeProvider config={event}>
      <AnimationProvider>
        <audio ref={audioRef} className="hiddenAudio" src={backgroundMusic} loop preload="auto" />
        {entered ? (
          <main className="eventPage">
            <FeaturedMedia />
            <Countdown countdown={event.countdown} />
            <Quote/>
            <Gallery images={galleryImages} />
            <Location event={event} />
            <DressCode title={event.dressCode.title} value={event.dressCode.value} description={event.dressCode.description} />
            <GiftSection gifts={event.gifts} mercadoPago={event.mercadoPago} />
            <CalendarSection event={event} />
            <RSVP event={event} />
            <Footer event={event} />
          </main>
        ) : (
          <IntroScreen onEnter={handleEnter} />
        )}
      </AnimationProvider>
    </ThemeProvider>
  );
};
