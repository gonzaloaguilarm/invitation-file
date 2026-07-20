import { ListMusic } from "lucide-react";
import { createSpotifyUrl } from '../../utils/api';
import { createSpotifyAppUrl, isIOS, isAndroid, openWithAppFallback } from '../../utils/deepLinks';

export const SpotifyPlayer = () => {
  const add = () => {
    const url = createSpotifyUrl();

    if (isIOS() || isAndroid()) {
      openWithAppFallback(createSpotifyAppUrl(url), url);
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button className="button" type="button" onClick={add}>
      <ListMusic size={18} /> Agregar a Spotify playlist
    </button>
  );
}
