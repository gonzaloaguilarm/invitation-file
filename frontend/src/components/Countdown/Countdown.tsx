import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import type { EventConfig } from '../../types';

export const Countdown = ({ countdown }: { countdown: EventConfig['countdown'] }) => {
  const value = useCountdown(countdown.targetDate);

  if (!countdown.enabled) return null;

  if (value.completed) {
    return <section className="section countdown done"><h2>{countdown.finalMessage}</h2></section>;
  }

  return (
    <section className="section countdown">
      {[
        ['Días', value.days],
        ['Horas', value.hours],
        ['Min', value.minutes],
        ['Seg', value.seconds]
      ].map(([label, amount]) => (
        <motion.div key={label} layout className="countItem">
          <strong>{String(amount).padStart(2, '0')}</strong>
          <span>{label}</span>
        </motion.div>
      ))}
    </section>
  );
};
