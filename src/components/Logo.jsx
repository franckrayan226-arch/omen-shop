const Logo = ({ className = '', size = 'default' }) => {
  const isSmall = size === 'small';

  return (
    <a href="/" className={`flex items-baseline gap-0 flex-none ${className}`} aria-label="OMEN SHOP — Accueil">
      {/* OMEN — geometric bold wordmark */}
      <svg
        viewBox="0 0 132 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isSmall ? 'h-6 w-auto' : 'h-8 w-auto'}
        aria-hidden="true"
        style={{ 
          filter: 'drop-shadow(4px 4px 0px rgba(255,59,31,0.3)) drop-shadow(-2px -2px 0px rgba(0,0,0,0.1))',
          transform: 'skewX(-2deg)'
        }}
      >
        {/* O — carré fermé */}
        <path
          d="M3 5h28v26H3z"
          stroke="#0A0A0A"
          strokeWidth="4.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />

        {/* M — deux piliers + pointe */}
        <path
          d="M39 31V5l10 18 10-18v26"
          stroke="#0A0A0A"
          strokeWidth="4.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />

        {/* E — barres horizontales */}
        <path
          d="M73 5v26M73 5h20M73 18h14M73 31h20"
          stroke="#0A0A0A"
          strokeWidth="4.5"
          strokeLinecap="square"
        />

        {/* N — deux piliers + diagonale */}
        <path
          d="M102 31V5l20 26V5"
          stroke="#0A0A0A"
          strokeWidth="4.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

      {/* shop — serif italic, style distinctif */}
      <span
        className={`
          font-display italic font-bold text-accent tracking-wide
          ${isSmall ? 'text-xs ml-1 -mb-0.5' : 'text-sm ml-1.5 -mb-0.5'}
        `}
        style={{ 
          fontFamily: '"Inter Tight", serif',
          textShadow: '3px 3px 0px rgba(255,59,31,0.4) -1px -1px 0px rgba(0,0,0,0.1)',
          transform: 'skewX(-2deg)'
        }}
      >
        shop
      </span>
    </a>
  );
};

export default Logo;
