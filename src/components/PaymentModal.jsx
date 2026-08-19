import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { payments, composeUssd, telUri, WHATSAPP_NUMBER } from '../data/payments';
import { placeOrder } from '../lib/api';

const ink = '#0A0A0A';
const gray = '#8C8C8C';
const border = '#E2E2E2';
const accent = '#FF3B1F';

const SectionLabel = ({ section }) =>
  section === 'mode' ? 'pointure' : section === 'bienetre' ? 'format' : 'version';

const PaymentModal = ({ open, onClose, product, section, size }) => {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState(null);
  const [proof, setProof] = useState(null);
  const [copied, setCopied] = useState(false);
  const [orderState, setOrderState] = useState('idle');

  if (!open || !product) return null;

  const amount = (product.price || '').replace(/[^\d]/g, '');
  const ussd = method && method.hasUssd ? composeUssd(method, amount) : '';
  const label = SectionLabel({ section });

  const confirmOrder = async () => {
    if (!product.id) return;
    setOrderState('sending');
    try {
      await placeOrder({ productId: product.id, size, qty: 1, method: method?.id });
      setOrderState('done');
    } catch {
      setOrderState('error');
    }
  };

  const close = () => {
    setStep(0);
    setMethod(null);
    setProof(null);
    setCopied(false);
    setOrderState('idle');
    onClose();
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const onPickFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProof(reader.result);
    reader.readAsDataURL(file);
  };

  const waMessage = encodeURIComponent(
    `Bonjour OMEN SHOP,\nJe viens d'effectuer le paiement :\n\n` +
      `• Produit : ${product.name} (${product.brand})\n` +
      `• Montant : ${product.price}\n` +
      `• ${label} : ${size ?? 'non précisé'}\n` +
      `• Moyen : ${method?.name}\n` +
      `• Compte crédité : ${method?.account}\n\n` +
      `Voici la capture du paiement :`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
      style={{ backgroundColor: 'rgba(10,10,10,0.55)' }}
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="choose"
            className="w-full max-w-md"
            style={{ backgroundColor: '#FAFAFA', border: `1px solid ${border}` }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-2">
              <p className="font-mono text-label uppercase" style={{ color: accent }}>
                Paiement sécurisé
              </p>
              <h2 className="font-anton text-3xl mt-1" style={{ color: ink }}>
                Choisissez votre moyen
              </h2>
              <p className="font-manrope text-body mt-2" style={{ color: gray }}>
                {product.name} — {product.price}
              </p>
            </div>

            <div className="mt-2 pb-6">
              {payments.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setMethod(p);
                    setStep(1);
                  }}
                  className="w-full flex items-center gap-4 px-6 py-4 text-left"
                  style={{ borderTop: `1px solid ${border}`, minHeight: 60 }}
                >
                  <span
                    className="flex-none flex items-center justify-center"
                    style={{ width: 44, height: 32, backgroundColor: '#FFFFFF', border: `1px solid ${border}` }}
                  >
                    <img src={p.logo} alt={`Logo ${p.name}`} style={{ maxHeight: 20, maxWidth: 40 }} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-manrope text-sm font-semibold" style={{ color: ink }}>
                      {p.name}
                    </span>
                    <span className="block font-mono text-data-sm" style={{ color: gray }}>
                      {p.account}
                    </span>
                  </span>
                  <span className="font-mono text-data" style={{ color: gray }}>
                    →
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="pay"
            className="w-full max-w-md"
            style={{ backgroundColor: '#FAFAFA', border: `1px solid ${border}` }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="flex-none flex items-center justify-center"
                    style={{ width: 44, height: 32, backgroundColor: '#FFFFFF', border: `1px solid ${border}` }}
                  >
                    <img src={method.logo} alt={`Logo ${method.name}`} style={{ maxHeight: 20, maxWidth: 40 }} />
                  </span>
                  <span className="font-manrope text-sm font-semibold" style={{ color: ink }}>
                    {method.name}
                  </span>
                </div>
                <button
                  onClick={() => setStep(0)}
                  className="font-manrope text-label uppercase"
                  style={{ color: gray, minHeight: 44 }}
                >
                  ← Changer
                </button>
              </div>

              <div className="mt-5" style={{ border: `1px solid ${border}` }}>
                <div className="px-4 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${border}` }}>
                  <span className="font-manrope text-label uppercase" style={{ color: gray }}>
                    Montant à payer
                  </span>
                  <span className="font-mono text-data" style={{ color: ink }}>
                    {product.price}
                  </span>
                </div>
                <div className="px-4 py-4 flex items-center justify-between">
                  <div>
                    <span className="block font-manrope text-label uppercase" style={{ color: gray }}>
                      Créditez ce numéro
                    </span>
                    <span className="block font-mono text-data-lg mt-1" style={{ color: ink }}>
                      {method.account}
                    </span>
                  </div>
                  <button
                    onClick={() => copy(method.account)}
                    className="font-manrope text-label uppercase"
                    style={{ color: accent, minHeight: 44 }}
                  >
                    {copied ? 'Copié ✓' : 'Copier'}
                  </button>
                </div>
              </div>

              {method.hasUssd ? (
                <>
                  <div className="mt-4" style={{ border: `1px solid ${border}`, backgroundColor: '#FFFFFF' }}>
                    <div className="px-4 py-3 flex items-center justify-between gap-3">
                      <span
                        className="font-mono text-data-sm"
                        style={{ color: ink, wordBreak: 'break-all' }}
                      >
                        {ussd}
                      </span>
                      <button
                        onClick={() => copy(ussd)}
                        className="flex-none font-manrope text-label uppercase"
                        style={{ color: accent, minHeight: 44 }}
                      >
                        {copied ? 'Copié ✓' : 'Copier'}
                      </button>
                    </div>
                    <a
                      href={telUri(ussd)}
                      className="block w-full py-4 text-center font-manrope text-sm font-semibold"
                      style={{
                        backgroundColor: accent,
                        color: '#FFFFFF',
                        minHeight: 52,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {method.appLabel}
                    </a>
                  </div>
                  <p className="font-manrope text-body mt-3" style={{ color: gray }}>
                    {method.hint}
                  </p>
                </>
              ) : (
                <>
                  <div className="mt-4" style={{ border: `1px solid ${border}`, backgroundColor: '#FFFFFF' }}>
                    <div className="px-4 py-3">
                      <span className="font-manrope text-label uppercase" style={{ color: gray }}>
                        Numéro à créditer
                      </span>
                      <span className="block font-mono text-data-lg mt-1" style={{ color: ink }}>
                        {method.account}
                      </span>
                    </div>
                    <a
                      href={method.appLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-4 text-center font-manrope text-sm font-semibold"
                      style={{
                        backgroundColor: method.color,
                        color: '#FFFFFF',
                        minHeight: 52,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {method.appLabel}
                    </a>
                  </div>
                  <p className="font-manrope text-body mt-3" style={{ color: gray }}>
                    {method.hint}
                  </p>
                </>
              )}

              <button
                onClick={() => setStep(2)}
                className="block w-full mt-5 py-4 text-center font-manrope text-sm font-semibold"
                style={{
                  border: `1px solid ${ink}`,
                  backgroundColor: '#FFFFFF',
                  color: ink,
                  minHeight: 52
                }}
              >
                J'ai effectué le paiement →
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="proof"
            className="w-full max-w-md"
            style={{ backgroundColor: '#FAFAFA', border: `1px solid ${border}` }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-6">
              <p className="font-mono text-label uppercase" style={{ color: accent }}>
                Dernière étape
              </p>
              <h2 className="font-anton text-3xl mt-1" style={{ color: ink }}>
                Preuve de paiement
              </h2>
              <p className="font-manrope text-body mt-2" style={{ color: gray }}>
                Capturez votre écran de confirmation et envoyez-la. Nous validons votre commande
                dans les plus brefs délais.
              </p>

              <label
                className="mt-5 flex items-center justify-center border-2 border-dashed py-8"
                style={{ borderColor: '#C9C9C9', cursor: 'pointer' }}
              >
                <input type="file" accept="image/*" onChange={onPickFile} className="hidden" />
                {proof ? (
                  <img
                    src={proof}
                    alt="Aperçu de la capture"
                    className="max-h-56 object-contain"
                  />
                ) : (
                  <span className="font-manrope text-label uppercase text-center" style={{ color: gray }}>
                    + Ajouter la capture
                    <span className="block font-manrope text-body mt-2 normal-case" style={{ color: gray }}>
                      Photo ou capture d'écran du reçu
                    </span>
                  </span>
                )}
              </label>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-5 py-4 text-center font-manrope text-sm font-semibold"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  minHeight: 52,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                Envoyer la preuve sur WhatsApp
              </a>
              <p className="font-manrope text-body mt-3 text-center" style={{ color: gray }}>
                Une fois WhatsApp ouvert, joignez la capture à la pièce jointe avant d'envoyer.
              </p>

              {orderState === 'done' ? (
                <p className="font-manrope text-body mt-4 text-center font-semibold" style={{ color: '#7A8B5C' }}>
                  Commande confirmée ✓ Le stock a été mis à jour.
                </p>
              ) : (
                <button
                  onClick={confirmOrder}
                  disabled={orderState === 'sending'}
                  className="block w-full mt-3 py-4 text-center font-manrope text-sm font-semibold"
                  style={{
                    border: `1px solid ${ink}`,
                    backgroundColor: '#FFFFFF',
                    color: ink,
                    minHeight: 52,
                    opacity: orderState === 'sending' ? 0.6 : 1
                  }}
                >
                  {orderState === 'sending'
                    ? 'Confirmation en cours…'
                    : orderState === 'error'
                      ? 'Réessayer la confirmation'
                      : "J'ai payé — Confirmer ma commande"}
                </button>
              )}

              <button
                onClick={close}
                className="block w-full mt-2 py-3 text-center font-manrope text-label uppercase"
                style={{ color: gray, minHeight: 44 }}
              >
                Fermer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentModal;