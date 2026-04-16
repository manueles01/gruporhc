interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-red border border-red px-3 py-1.5 rounded-sm mb-5 ${className}`}
    >
      {children}
    </span>
  );
}
