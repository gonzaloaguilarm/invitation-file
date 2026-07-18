import { Wallet } from 'lucide-react';
import type { EventConfig } from '../../types';

export const GiftSection = ({ gifts, mercadoPago }: { gifts: string[]; mercadoPago?: EventConfig['mercadoPago'] }) => (
  <section className="section compact">
    <h2>Regalos</h2>
    {gifts.map((gift) => <p key={gift}>{gift}</p>)}
    {mercadoPago && (
      <a className="button mercadoPagoButton" href={mercadoPago.deepLink}>
        <Wallet size={18} /> Transferir por Mercado Pago
      </a>
    )}
  </section>
);
