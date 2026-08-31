import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { payments, composeUssd, telUri, WHATSAPP_NUMBER } from '../data/payments';
import { placeOrder, uploadProof } from '../lib/api';

const SectionLabel = ({ section }) =>
  section === 'mode' ? 'pointure' : section === 'bienetre' ? 'format' : 'version';

const PaymentModal = ({ open, onClose, product, section, size }) => {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState(null);
  const [proof, setProof] = useState(null);
  const [proofUrl, setProofUrl] = useState('');
  const [proofState, setProofState] = useState('idle');
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
    setProofUrl('');
    setProofState('idle');
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
    reader.onload = async () => {
      setProof(reader.result);
      setProofState('uploading');
      setProofUrl('');
      try {
        const url = await uploadProof(reader.result, file.name);
        setProofUrl(url);
        setProofState('done');
      } catch {
        setProofState('error');
      }
    };
    reader.readAsDataURL(file);
  };

  const waMessage = encodeURIComponent(
    `Bonjour OMEN SHOP,\nJe viens d'effectuer le paiement :\n\n` +
      `• Produit : ${product.name} (${product.brand})\n` +
      `• Montant : ${product.price}\n` +
      `• ${label} : ${size ?? 'non précisé'}\n` +
      `• Moyen : ${method?.name}\n` +
      `• Compte crédité : ${method?.account}\n` +
      (proofUrl ? `• Preuve (lien) : ${proofUrl}\n\n` : `\n`) +
      `Voici la capture du paiement :`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center bg-ink/55"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="choose"
            className="w-full max-w-md bg-bg border border-border"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-2">
              <p className="font-mono text-label uppercase text-accent">
                Paiement sécurisé
              </p>
              <h2 className="font-display text-display-md font-bold text-ink mt-1">
                Choisissez votre moyen
              </h2>
              <p className="font-body text-sm text-ink-muted mt-2">
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
                  className="w-full flex items-center gap-4 px-6 py-4 text-left border-t border-border hover:bg-sidebar/50 transition-colors"
                  style={{ minHeight: 60 }}
                >
                  <span
                    className="flex-none flex items-center justify-center bg-white border border-border"
                    style={{ width: 44, height: 32 }}
                  >
                    {p.logo ? (
                      <img src={p.logo} alt={`Logo ${p.name}`} style={{ maxHeight: 20, maxWidth: 40 }} />
                    ) : (
                      <span className="font-mono text-sm font-semibold" style={{ color: p.color }}>
                        {p.name.charAt(0)}
                      </span>
                    )}
                  </span>
                  <span className="flex-1">
                    <span className="block font-body text-sm font-semibold text-ink">
                      {p.name}
                    </span>
                    <span className="block font-mono text-xs text-ink-muted">
                      {p.account}
                    </span>
                  </span>
                  <span className="font-mono text-sm text-ink-muted">→</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="pay"
            className="w-full max-w-md bg-bg border border-border"
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
                    className="flex-none flex items-center justify-center bg-white border border-border"
                    style={{ width: 44, height: 32 }}
                  >
                    {method.logo ? (
                      <img src={method.logo} alt={`Logo ${method.name}`} style={{ maxHeight: 20, maxWidth: 40 }} />
                    ) : (
                      <span className="font-mono text-sm font-semibold" style={{ color: method.color }}>
                        {method.name.charAt(0)}
                      </span>
                    )}
                  </span>
                  <span className="font-body text-sm font-semibold text-ink">
                    {method.name}
                  </span>
                </div>
                <button
                  onClick={() => setStep(0)}
                  className="font-body text-xs font-medium text-ink-muted hover:text-ink transition-colors"
                  style={{ minHeight: 44 }}
                >
                  ← Changer
                </button>
              </div>

              <div className="mt-5 border border-border">
                <div className="px-4 py-4 flex items-center justify-between border-b border-border">
                  <span className="font-body text-xs font-medium uppercase tracking-wider text-ink-muted">
                    Montant à payer
                  </span>
                  <span className="font-mono text-sm font-medium text-ink" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {product.price}
                  </span>
                </div>
                <div className="px-4 py-4 flex items-center justify-between">
                  <div>
                    <span className="block font-body text-xs font-medium uppercase tracking-wider text-ink-muted">
                      {method.accountLabel || 'Créditez ce numéro'}
                    </span>
                    <span className="block font-mono text-lg font-medium text-ink mt-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {method.account}
                    </span>
                  </div>
                  <button
                    onClick={() => copy(method.account)}
                    className="font-body text-xs font-medium text-accent hover:underline"
                    style={{ minHeight: 44 }}
                  >
                    {copied ? 'Copié ✓' : 'Copier'}
                  </button>
                </div>
              </div>

              {method.hasUssd ? (
                <>
                  <div className="mt-4 border border-border bg-white">
                    <div className="px-4 py-3 flex items-center justify-between gap-3">
                      <span className="font-mono text-sm text-ink break-all">
                        {ussd}
                      </span>
                      <button
                        onClick={() => copy(ussd)}
                        className="flex-none font-body text-xs font-medium text-accent hover:underline"
                        style={{ minHeight: 44 }}
                      >
                        {copied ? 'Copié ✓' : 'Copier'}
                      </button>
                    </div>
                    <a
                      href={telUri(ussd)}
                      className="block w-full py-4 text-center font-body text-sm font-semibold bg-accent text-white"
                      style={{ minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {method.appLabel}
                    </a>
                  </div>
                  <p className="font-body text-sm text-ink-muted mt-3">
                    {method.hint}
                  </p>
                </>
              ) : (
                <>
                  <div className="mt-4 border border-border bg-white">
                    <div className="px-4 py-3">
                      <span className="font-body text-xs font-medium uppercase tracking-wider text-ink-muted">
                        {method.accountLabel || 'Numéro à créditer'}
                      </span>
                      <span className="block font-mono text-lg font-medium text-ink mt-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {method.account}
                      </span>
                      {method.details && method.details.length > 0 && (
                        <div className="mt-2 flex flex-col gap-1">
                          {method.details.map((line, i) => (
                            <span key={i} className="font-mono text-xs text-ink-muted">
                              {line}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {method.appLink && (
                      <a
                        href={method.appLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-4 text-center font-body text-sm font-semibold text-white"
                        style={{ backgroundColor: method.color, minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {method.appLabel}
                      </a>
                    )}
                  </div>
                  <p className="font-body text-sm text-ink-muted mt-3">
                    {method.hint}
                  </p>
                </>
              )}

              <button
                onClick={() => setStep(2)}
                className="block w-full mt-5 py-4 text-center font-body text-sm font-semibold border border-ink text-ink hover:bg-ink hover:text-white transition-colors"
                style={{ minHeight: 52 }}
              >
                J'ai effectué le paiement →
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="proof"
            className="w-full max-w-md bg-bg border border-border"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-6">
              <p className="font-mono text-label uppercase text-accent">
                Dernière étape
              </p>
              <h2 className="font-display text-display-md font-bold text-ink mt-1">
                Preuve de paiement
              </h2>
              <p className="font-body text-sm text-ink-muted mt-2">
                Capturez votre écran de confirmation et envoyez-la. Nous validons votre commande
                dans les plus brefs délais.
              </p>

              <label className="mt-5 flex items-center justify-center border-2 border-dashed border-ink-muted/30 rounded py-8 cursor-pointer hover:border-ink-muted/50 transition-colors">
                <input type="file" accept="image/*" onChange={onPickFile} className="hidden" />
                {proof ? (
                  <img src={proof} alt="Aperçu de la capture" className="max-h-56 object-contain" />
                ) : (
                  <span className="font-body text-sm text-ink-muted text-center">
                    + Ajouter la capture
                    <span className="block text-xs mt-1 text-ink-muted/70">
                      Photo ou capture d'écran du reçu
                    </span>
                  </span>
                )}
              </label>

              {proofState === 'uploading' && (
                <p className="font-body text-sm text-ink-muted mt-3 text-center">
                  Préparation de la capture…
                </p>
              )}
              {proofState === 'error' && (
                <p className="font-body text-sm text-accent mt-3 text-center">
                  Impossible d'envoyer la capture automatiquement — joignez-la à la main dans WhatsApp.
                </p>
              )}

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-5 py-4 text-center font-body text-sm font-semibold bg-[#25D366] text-white"
                style={{ minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Envoyer la preuve sur WhatsApp
              </a>
              <p className="font-body text-sm text-ink-muted mt-3 text-center">
                {proofUrl
                  ? 'La capture est incluse dans le message sous forme de lien.'
                  : "Le lien WhatsApp n'attache pas les images : si la capture n'est pas incluse, joignez-la à la pièce jointe avant d'envoyer."}
              </p>

              {orderState === 'done' ? (
                <p className="font-body text-sm font-semibold text-[#4C5B3C] mt-4 text-center">
                  Commande confirmée ✓ Le stock a été mis à jour.
                </p>
              ) : (
                <button
                  onClick={confirmOrder}
                  disabled={orderState === 'sending'}
                  className="block w-full mt-3 py-4 text-center font-body text-sm font-semibold border border-ink text-ink hover:bg-ink hover:text-white transition-colors disabled:opacity-50"
                  style={{ minHeight: 52 }}
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
                className="block w-full mt-2 py-3 text-center font-body text-xs font-medium uppercase tracking-wider text-ink-muted hover:text-ink transition-colors"
                style={{ minHeight: 44 }}
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
