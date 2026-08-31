const AnnouncementBar = () => {
  const text = "TOUTES LES COMMANDES SONT ACTUELLEMENT TRAITÉES SOUS 3 À 7 JOURS OUVRABLES";

  return (
    <div className="bg-ink overflow-hidden h-9 flex items-center">
      <div className="animate-marquee whitespace-nowrap flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="mx-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/90 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent flex-none" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
