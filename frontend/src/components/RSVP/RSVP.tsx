import { useEffect, useState } from "react";
import { Check, Send } from "lucide-react";
import type { EventConfig, MenuOption, RsvpSubmission } from "../../types";
import { submitRsvp } from "../../utils/api";

const MENU_DESCRIPTIONS: Partial<Record<MenuOption, string>> = {
  "adulto carne": "Bondiola braseada con papas a la crema",
  "adulto veggie": "Mozzarellas rebozadas con ensalada",
  adolescente: "Hamburguesa de carne con papas fritas",
  celiaco: "Milanesa sin TACC con fritas",
};

const RSVP_STORAGE_KEY = "rsvp-submitted";

export const RSVP = ({ event }: { event: EventConfig }) => {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [alreadySubmittedBefore, setAlreadySubmittedBefore] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [menu, setMenu] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem(RSVP_STORAGE_KEY)) {
      setHasSubmitted(true);
      setAlreadySubmittedBefore(true);
      setStatus("sent");
    }
  }, []);

  const isFormComplete = guestName.trim().length > 0 && menu.trim().length > 0;
  const submitDisabled = !isFormComplete || hasSubmitted;

  const onSubmit = async (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    if (submitDisabled) return;

    setHasSubmitted(true);
    setStatus("submitting");

    const payload: RsvpSubmission = {
      guestName,
      menu: menu as MenuOption,
      message,
    };

    try {
      await submitRsvp(payload, event.rsvp.organizerEmail, event.name);
      localStorage.setItem(RSVP_STORAGE_KEY, "true");
      setStatus("sent");
    } catch {
      setStatus("error");
      setHasSubmitted(false);
    }
  };

  return (
    <section id="rsvp" className="section rsvp">
      <h2>Confirmar reserva</h2>
      <form onSubmit={onSubmit}>
        <input
          name="guestName"
          placeholder="Nombre y apellido"
          required
          maxLength={120}
          value={guestName}
          onChange={(inputEvent) => setGuestName(inputEvent.target.value)}
        />
        <div className="menuField">
          <select
            name="menu"
            value={menu}
            onChange={(selectEvent) => setMenu(selectEvent.target.value)}
            required
          >
            <option value="" disabled>
              Menú
            </option>
            <option value="adulto carne">Menú adulto carne</option>
            <option value="adulto veggie">Menú adulto veggie</option>
            <option value="adolescente">Menú adolescente</option>
            <option value="celiaco">Menú celíaco</option>
          </select>
          {MENU_DESCRIPTIONS[menu as MenuOption] && (
            <p className="menuDescription">
              {MENU_DESCRIPTIONS[menu as MenuOption]}
            </p>
          )}
          <p className="menuNote">
            *Menores de 5 años inclusive tienen menú infantil
            <br />
            Mozzarelitas rebozadas con fritas
          </p>
        </div>
        <textarea
          name="message"
          placeholder="Canciones que no pueden faltar..."
          maxLength={500}
          value={message}
          onChange={(textareaEvent) => setMessage(textareaEvent.target.value)}
        />
        <button className="button" type="submit" disabled={submitDisabled}>
          {status === "sent" ? <Check size={18} /> : <Send size={18} />}{" "}
          {status === "submitting"
            ? "Enviando"
            : status === "sent"
              ? "Reserva enviada"
              : "Enviar Reserva"}
        </button>
      </form>

      {status === "error" && (
        <p className="formState">No se pudo enviar. Intenta nuevamente.</p>
      )}
      {alreadySubmittedBefore && (
        <p className="formState">
          Ya enviaste tu confirmación desde este dispositivo.
        </p>
      )}
    </section>
  );
};
