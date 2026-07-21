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

const AliasButton = ({ label, alias }: { label: string; alias: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(alias);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="button mercadoPagoButton" type="button" onClick={handleCopy}>
      {copied ? <Check size={18} /> : <Copy size={18} />}
      {copied ? 'Alias copiado' : `${label}: ${alias}`}
    </button>
  );
};

export const GiftSection = ({ gifts, mercadoPago }: { gifts: string[]; mercadoPago?: EventConfig['mercadoPago'] }) => {
  return (
    <section className="section compact">
      <h2>Regalos</h2>
      {gifts.map((gift) => <p key={gift}>{gift}</p>)}
      {mercadoPago && <AliasButton label="Pesos" alias={mercadoPago.alias} />}
      {mercadoPago?.aliasUsd && <AliasButton label="Dólares" alias={mercadoPago.aliasUsd} />}
    </section>
  );
};
