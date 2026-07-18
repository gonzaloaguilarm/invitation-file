import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const AUTOPLAY_INTERVAL_MS = 4200;

export const Gallery = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const active = images[index];

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + images.length) % images.length);
  };

  useEffect(() => {
    const next = images[index + 1] ?? images[0];
    if (next) {
      const image = new Image();
      image.src = next;
    }
  }, [index, images]);

  const thumbnails = useMemo(() => images.slice(0, 6), [images]);

  useEffect(() => {
    if (images.length < 2 || lightbox) return;

    const timeoutId = window.setTimeout(() => {
      setIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearTimeout(timeoutId);
  }, [images.length, index, lightbox]);

  if (!images.length) return null;

  return (
    <section className="section gallerySection">
      <h2>Galería</h2>
      <div className="carousel" aria-label="Fotos destacadas">
        <button className="carouselNav left" type="button" onClick={() => goTo(index - 1)} aria-label="Foto anterior">
          <ChevronLeft size={24} />
        </button>
        <button className="carouselImage" type="button" onClick={() => setLightbox(true)} aria-label="Ampliar foto">
          <img key={active} src={active} alt="Foto destacada de la cumpleañera" />
          <span><Maximize2 size={18} /> Ver grande</span>
        </button>
        <button className="carouselNav right" type="button" onClick={() => goTo(index + 1)} aria-label="Foto siguiente">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="carouselDots">
        {thumbnails.map((image, thumbnailIndex) => (
          <button
            key={image}
            type="button"
            className={thumbnailIndex === index ? 'active' : ''}
            onClick={() => goTo(thumbnailIndex)}
            aria-label={`Ver foto ${thumbnailIndex + 1}`}
          >
            <img src={image} loading="lazy" alt="" />
          </button>
        ))}
      </div>
      {lightbox && (
        <button className="lightbox" onClick={() => setLightbox(false)} aria-label="Cerrar imagen">
          <img src={active} alt="Vista ampliada" />
        </button>
      )}
    </section>
  );
};
