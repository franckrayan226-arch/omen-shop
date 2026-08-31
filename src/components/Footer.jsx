import { Link } from 'react-router-dom';
import { SECTIONS } from '../data/products';
import Logo from './Logo';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Logo size="small" />
            <p className="mt-3 font-body text-sm text-ink-muted max-w-[240px]">
              Mode, soin & tech — sélection pièce par pièce. Commande par WhatsApp, livraison 24–48h.
            </p>
          </div>

          {/* Sections */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-ink mb-4">
              Sections
            </h3>
            <ul className="space-y-2.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/boutique/${s.id}`}
                    className="font-body text-sm text-ink/70 hover:text-ink transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/boutique"
                  className="font-body text-sm text-ink/70 hover:text-ink transition-colors"
                >
                  Tout voir
                </Link>
              </li>
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-ink mb-4">
              Boutique
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/favoris" className="font-body text-sm text-ink/70 hover:text-ink transition-colors">
                  Favoris
                </Link>
              </li>
              <li>
                <Link to="/compte" className="font-body text-sm text-ink/70 hover:text-ink transition-colors">
                  Compte
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-ink mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://wa.me/22663213029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-ink/70 hover:text-ink transition-colors"
                >
                  WhatsApp : +226 63 21 30 29
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/omenshopbf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-ink/70 hover:text-ink transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@omenshopburkina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-ink/70 hover:text-ink transition-colors"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-label-xs text-ink-muted">
            © {year} OMEN SHOP — TOUS DROITS RÉSERVÉS
          </p>
          <p className="font-mono text-label-xs text-ink-muted">
            OUAGADOUGOU, BURKINA FASO
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
