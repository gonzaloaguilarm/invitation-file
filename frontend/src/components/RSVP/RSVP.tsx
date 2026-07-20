import { useState } from "react";
import { Check, Send } from "lucide-react";
import type { EventConfig, MenuOption, RsvpSubmission } from "../../types";
import { submitRsvp } from "../../utils/api";
import { CalendarButton } from "../CalendarButton/CalendarButton";
import { SpotifyPlayer } from "../SpotifyPlayer/SpotifyPlayer";

const MAX_MEMBERS = 5;

const MENU_DESCRIPTIONS: Partial<Record<MenuOption, string>> = {
  "adulto carne": "Bondiola braseada con papas a la crema",
  "adulto veggie": "Mozzarellas rebozadas con ensalada",
  adolescente: "Hamburguesa de carne con papas fritas",
};

export const RSVP = ({ event }: { event: EventConfig }) => {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [menus, setMenus] = useState<string[]>([""]);

  const isFormComplete =
    guestName.trim().length > 0 &&
    menus.length > 0 &&
    menus.every((menu) => menu.trim().length > 0);
  const submitDisabled = !isFormComplete || hasSubmitted;

  const updateMemberCount = (
    memberCountEvent: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const count = Number(memberCountEvent.target.value);
    setMenus((currentMenus) =>
      Array.from({ length: count }, (_, index) => currentMenus[index] ?? "")
    );
  };

  const updateMenu =
    (index: number) => (menuEvent: React.ChangeEvent<HTMLSelectElement>) => {
      const value = menuEvent.target.value;
      setMenus((currentMenus) =>
        currentMenus.map((menu, menuIndex) =>
          menuIndex === index ? value : menu
        )
      );
    };

  const onSubmit = async (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    if (submitDisabled) return;

    setHasSubmitted(true);
    setStatus("submitting");

    const payload: RsvpSubmission = {
      guestName,
      menus: menus as MenuOption[],
      message,
    };

    try {
      await submitRsvp(payload, event.rsvp.organizerEmail, event.name);
      setStatus("sent");
    } catch {
      setStatus("error");
      setHasSubmitted(false);
    }
  };

  return (
    <section id="rsvp" className="section rsvp">
      <h2>Confirmar asistencia</h2>
      <form onSubmit={onSubmit}>
        <input
          name="guestName"
          placeholder="Nombre y apellido"
          required
          maxLength={120}
          value={guestName}
          onChange={(inputEvent) => setGuestName(inputEvent.target.value)}
        />
        <select
          name="memberCount"
          value={menus.length}
          onChange={updateMemberCount}
          required
        >
          {Array.from({ length: MAX_MEMBERS }, (_, index) => index + 1).map(
            (count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? "invitado" : "invitados"}
              </option>
            )
          )}
        </select>
        {menus.map((menu, index) => (
          <div className="menuField" key={index}>
            <select
              name={`menu-${index}`}
              value={menu}
              onChange={updateMenu(index)}
              required
            >
              <option value="" disabled>
                Menú invitado {index + 1}
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
          </div>
        ))}
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
      <div className="actionRow">
        <SpotifyPlayer />
        <CalendarButton event={event} />
      </div>

      {status === "error" && (
        <p className="formState">No se pudo enviar. Intenta nuevamente.</p>
      )}
    </section>
  );
};
