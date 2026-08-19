import { motion } from 'framer-motion';

const IconInstagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const IconTiktok = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 4v9.6a4 4 0 1 1-4-4" />
    <path d="M14 4c.4 2.3 2 4 4.4 4.3" />
  </svg>
);

const IconWhatsapp = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z" />
    <path d="M9.2 9.4c-.6 2.5 3 6.1 5.5 5.7l.4-1.6-1.9-1.1-.7.8c-1-.4-1.9-1.3-2.3-2.3l.8-.7-1.1-1.9z" />
  </svg>
);

const IconSnapchat = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.5c3.4 0 5.5 2.5 5.5 5.9 0 1.1-.2 2-.4 2.9-.5.8-1.1 1.1-1.8 1.3l.2 2.8-2.7-1.6c-.5.05-1 .07-1.5.07s-1-.02-1.5-.07l-2.7 1.6.2-2.8c-.7-.2-1.3-.5-1.8-1.3-.2-.9-.4-1.8-.4-2.9 0-3.4 2.1-5.9 5.5-5.9z" />
  </svg>
);

const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/omenshopbf', icon: <IconInstagram /> },
  { name: 'TikTok', url: 'https://www.tiktok.com/@omenshopburkina', icon: <IconTiktok /> },
  { name: 'WhatsApp', url: 'https://wa.me/22663213029', icon: <IconWhatsapp /> },
  { name: 'Snapchat', url: 'https://www.snapchat.com/add/omen_shop', icon: <IconSnapchat /> }
];

const SocialLinks = ({ size = 20, color = '#0A0A0A', hoverColor = '#FF3B1F', className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {socials.map((social) => (
      <motion.a
        key={social.name}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
        title={social.name}
        className="flex h-11 w-11 items-center justify-center border"
        style={{ color, borderColor: '#E2E2E2', backgroundColor: '#FFFFFF' }}
        whileHover={{ color: hoverColor, y: -2 }}
        whileTap={{ scale: 0.92 }}
      >
        {social.icon}
      </motion.a>
    ))}
  </div>
);

export default SocialLinks;