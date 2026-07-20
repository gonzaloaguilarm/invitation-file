import { useEventConfig } from '../../context/EventContext';

type IntroScreenProps = {
  onEnter: (withMusic: boolean) => void;
};

export const IntroScreen = ({ onEnter }: IntroScreenProps) => {
  const event = useEventConfig();

  return (
    <div className="introScreen">
      <h1 className="introScreen__title">{event.name}</h1>
      <div className="introScreen__actions">
        <button type="button" className="button" onClick={() => onEnter(true)}>
          Ingresar con música
        </button>
        <button type="button" className="button buttonOutline" onClick={() => onEnter(false)}>
          Ingresar sin música
        </button>
      </div>
    </div>
  );
};
