import { Wallet } from 'lucide-react';
import type { EventConfig } from '../../types';
import { createAndroidIntentUrl, isAndroid } from '../../utils/deepLinks';

const MERCADO_PAGO_ANDROID_PACKAGE = 'com.mercadopago.wallet';

export const GiftSection = ({ gifts, mercadoPago }: { gifts: string[]; mercadoPago?: EventConfig['mercadoPago'] }) => {
  const handleMercadoPagoClick = (clickEvent: React.MouseEvent<HTMLAnchorElement>) => {
    if (!mercadoPago || !isAndroid()) return;

    clickEvent.preventDefault();
    window.location.href = createAndroidIntentUrl(mercadoPago.deepLink, MERCADO_PAGO_ANDROID_PACKAGE);
  };

  return (
    <section className="section compact">
      <h2>Regalos</h2>
      {gifts.map((gift) => <p key={gift}>{gift}</p>)}
      {mercadoPago && (
        <a className="button mercadoPagoButton" href={mercadoPago.deepLink} onClick={handleMercadoPagoClick}>
          <Wallet size={18} /> Transferir por Mercado Pago
        </a>
      )}
    </section>
  );
};
