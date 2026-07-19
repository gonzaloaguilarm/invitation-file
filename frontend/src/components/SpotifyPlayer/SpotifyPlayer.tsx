import { ListMusic } from "lucide-react";
import { createSpotifyUrl } from '../../utils/api';

export const SpotifyPlayer = () => {
  const add = () => {
    const url = createSpotifyUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button className="button" type="button" onClick={add}>
      <ListMusic size={18} /> Agregar a Spotify playlist
    </button>
  );
}
