const Chips = ({ options, active, onChange }) => {
  return (
    <div className="no-scrollbar overflow-x-auto -mx-6 px-6">
      <div className="flex gap-2">
        {options.map((option) => {
          const isActive = active === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className="flex-none flex items-center border px-4"
              style={{
                borderColor: isActive ? '#0A0A0A' : '#E2E2E2',
                backgroundColor: isActive ? '#0A0A0A' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#0A0A0A',
                fontFamily: '"Manrope", sans-serif',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                minHeight: 44
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Chips;