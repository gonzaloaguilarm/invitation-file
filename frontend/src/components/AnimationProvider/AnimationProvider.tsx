import { MotionConfig } from 'framer-motion';

export const AnimationProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>{children}</MotionConfig>
);
