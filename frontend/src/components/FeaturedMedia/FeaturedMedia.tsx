import almiVideo from '../../assets/events/almi/Almi.mp4';
import imagen1 from '../../assets/events/almi/imagen1.jpg';

export const FeaturedMedia = () => (
  <>
    <section className="section featuredImageSection" aria-label="Foto de Almi">
      <img src={imagen1} alt="Almi" />
    </section>
    <section className="section featuredVideoSection" aria-label="Video de Almi">
      <video
        src={almiVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onEnded={(event) => {
          event.currentTarget.currentTime = 0;
          void event.currentTarget.play();
        }}
      />
    </section>
  </>
);
