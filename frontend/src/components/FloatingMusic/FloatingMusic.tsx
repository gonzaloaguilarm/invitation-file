import { useEffect, useRef } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';
import { useMusicStore } from '../../context/musicStore';

type FloatingMusicProps = {
  audioUrl: string;
};

export const FloatingMusic = ({ audioUrl }: FloatingMusicProps) => {
  const { enabled, volume, setEnabled, setVolume } = useMusicStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldPlay = enabled && volume > 0;

  // Mantiene el volumen sincronizado
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  // Play / pause según el estado
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (shouldPlay) {
      void audio.play().catch(() => undefined);
    } else {
      audio.pause();
    }
  }, [shouldPlay]);

  // Autoplay real: los navegadores bloquean el audio con sonido antes
  // de una interacción del usuario. Disparamos play() en el primer click
  // en cualquier parte de la página.
  useEffect(() => {
    if (!shouldPlay) return;

    const tryPlay = () => {
      void audioRef.current?.play().catch(() => undefined);
      document.removeEventListener('click', tryPlay);
    };

    document.addEventListener('click', tryPlay);
    return () => document.removeEventListener('click', tryPlay);
  }, [shouldPlay]);

  return (
    <div className="floatingMusic" aria-label="Control de música">
      <audio ref={audioRef} className="floatingMusicAudio" src={audioUrl} loop preload="auto" />
      <button type="button" onClick={() => setEnabled(!enabled)} aria-label={enabled ? 'Pausar' : 'Reproducir'}>
        {enabled ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <Volume2 size={16} />
      <input
        aria-label="Volumen"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={(event) => setVolume(Number(event.target.value))}
      />
    </div>
  );
};