import { Container } from './Container';

export function TopBar() {
  return (
    <div className="bg-mid border-b border-border py-2 text-[0.78rem] text-muted">
      <Container className="flex justify-between items-center gap-4 flex-wrap">
        <div className="hidden md:flex gap-6 items-center">
          <a href="tel:+5714184577" className="hover:text-light transition-colors">
            PBX: (571) 418 4577
          </a>
          <div className="w-px h-3.5 bg-border" />
          <a href="mailto:info@gruporhc.com" className="hover:text-light transition-colors">
            info@gruporhc.com
          </a>
        </div>
        <div className="flex gap-6 items-center mx-auto md:mx-0">
          <a href="#" className="hover:text-light transition-colors">Portal Distribuidores</a>
          <div className="w-px h-3.5 bg-border" />
          <a href="#" className="hover:text-light transition-colors">Tienda Virtual</a>
          <div className="w-px h-3.5 bg-border" />
          <a href="#" className="hover:text-light transition-colors">ES</a>
        </div>
      </Container>
    </div>
  );
}
