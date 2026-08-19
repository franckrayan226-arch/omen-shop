import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';

const universes = [
  { path: '/mode', label: 'MODE', font: 'font-anton' },
  { path: '/bienetre', label: 'BIEN-ÊTRE', font: 'font-fraunces' },
  { path: '/electronique', label: 'ÉLECTRONIQUE', font: 'font-mono' }
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t" style={{ borderColor: '#E2E2E2', backgroundColor: '#FAFAFA' }}>
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-anton text-2xl" style={{ color: '#0A0A0A' }}>OMEN SHOP</p>
            <p className="font-mono text-label mt-2" style={{ color: '#FF3B1F' }}>CURATED GOODS / {year}</p>
            <p className="font-manrope text-body mt-4 max-w-xs" style={{ color: '#8C8C8C' }}>MODE, BIEN-ÊTRE et ÉLECTRONIQUE sélectionnés pièce par pièce, commande par WhatsApp.</p>
          </div>

          <div>
            <p className="font-mono text-label mb-4" style={{ color: '#8C8C8C' }}>UNIVERS</p>
            <ul className="space-y-3">
              {universes.map((universe) => (
                <li key={universe.path}>
                  <Link to={universe.path} className={`${universe.font} text-body uppercase`} style={{ color: '#0A0A0A' }}>{universe.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-label mb-4" style={{ color: '#8C8C8C' }}>BOUTIQUE</p>
            <ul className="space-y-3">
              {[{ path: '/boutique', label: 'Tous les produits' }, { path: '/favoris', label: 'Favoris' }, { path: '/compte', label: 'Compte' }].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="font-manrope text-body uppercase" style={{ color: '#0A0A0A' }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-label mb-4" style={{ color: '#8C8C8C' }}>SUIVEZ-NOUS</p>
            <SocialLinks />
            <p className="font-manrope text-body mt-5" style={{ color: '#8C8C8C' }}>WhatsApp : <span className="font-mono" style={{ color: '#0A0A0A' }}>+226 63 21 30 29</span></p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: '#E2E2E2' }}>
          <p className="font-mono text-label" style={{ color: '#8C8C8C' }}>© {year} OMEN SHOP — TOUS DROITS RÉSERVÉS</p>
          <p className="font-mono text-label" style={{ color: '#8C8C8C' }}>OUAGADOUGOU, BURKINA FASO</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;