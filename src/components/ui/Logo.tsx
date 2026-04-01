import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <div className="relative w-12 h-12 bg-primary rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-primary/20">
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-white fill-current">
          <path d="M20 4L36 32H4L20 4ZM20 12L10 28H30L20 12Z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-heading font-black tracking-tighter leading-none group-hover:text-primary transition-colors">
          MAKITEX
        </span>
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] font-body text-muted-foreground">
          TRADING PLC
        </span>
      </div>
    </Link>
  );
}
