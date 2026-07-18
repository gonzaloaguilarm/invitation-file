import type { EventConfig } from '../../types';

export const ThemeProvider = ({
  config,
  children
}: {
  config: EventConfig;
  children: React.ReactNode;
}) => (
  <div
    style={
      {
        '--color-primary': config.colors.primary,
        '--color-secondary': config.colors.secondary,
        '--color-background': config.colors.background,
        '--color-text': config.colors.text,
        '--font-heading': config.typography.heading
      } as React.CSSProperties
    }
  >
    {children}
  </div>
);
