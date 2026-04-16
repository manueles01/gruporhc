interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  showLine?: boolean;
}

export function SectionTitle({ children, className = '', showLine = true }: SectionTitleProps) {
  return (
    <>
      <h2
        className={`text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15] tracking-tight text-white mb-4 ${className}`}
      >
        {children}
      </h2>
      {showLine && <div className="w-12 h-[3px] bg-red mb-6" />}
    </>
  );
}
