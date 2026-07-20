export const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

export const isAndroid = () => /Android/.test(navigator.userAgent);

/**
 * Attempts to hand off to a native app via a custom URL scheme, falling back
 * to a regular web URL if the app isn't installed (i.e. the page never lost
 * focus within `timeout`ms).
 */
export const openWithAppFallback = (appUrl: string, webUrl: string, timeout = 1500) => {
  let handedOff = false;

  const onVisibilityChange = () => {
    if (document.hidden) handedOff = true;
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  window.location.href = appUrl;

  window.setTimeout(() => {
    document.removeEventListener('visibilitychange', onVisibilityChange);
    if (!handedOff) window.location.href = webUrl;
  }, timeout);
};

export const createGoogleMapsAppUrl = (latitude: string, longitude: string, label: string) => {
  const lat = latitude.trim();
  const lng = longitude.trim();

  if (isIOS()) {
    return `comgooglemaps://?q=${encodeURIComponent(label)}&center=${lat},${lng}&daddr=${lat},${lng}`;
  }
  return `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(label)})`;
};

export const createSpotifyAppUrl = (spotifyUrl: string) => {
  const playlistId = spotifyUrl.match(/playlist\/([a-zA-Z0-9]+)/)?.[1];
  return playlistId ? `spotify:playlist:${playlistId}` : spotifyUrl;
};
