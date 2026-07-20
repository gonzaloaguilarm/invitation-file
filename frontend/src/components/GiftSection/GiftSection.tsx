import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { EventConfig } from '../../types';

const copyToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

export const GiftSection = ({ gifts, mercadoPago }: { gifts: string[]; mercadoPago?: EventConfig['mercadoPago'] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAlias = async () => {
    if (!mercadoPago) return;

    await copyToClipboard(mercadoPago.alias);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section compact">
      <h2>Regalos</h2>
      {gifts.map((gift) => <p key={gift}>{gift}</p>)}
      {mercadoPago && (
        <button className="button mercadoPagoButton" type="button" onClick={handleCopyAlias}>
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? 'Alias copiado' : mercadoPago.alias}
        </button>
      )}
    </section>
  );
};
