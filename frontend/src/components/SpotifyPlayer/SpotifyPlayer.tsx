import { ListMusic } from "lucide-react";
import type { EventConfig } from "../../types";

export const SpotifyPlayer = ({
  playlist,
}: {
  playlist: EventConfig["playlist"];
}) => (
  <section id="musica" className="section">
    <h2>Playlist</h2>
    <iframe
      className="spotify"
      src={playlist.embedUrl}
      title="Spotify playlist"
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
    <a
      className="button"
      href={playlist.spotifyUrl}
      target="_blank"
      rel="noreferrer"
    >
      <ListMusic size={18} /> Agregar a Spotify playlist
    </a>
  </section>
);
