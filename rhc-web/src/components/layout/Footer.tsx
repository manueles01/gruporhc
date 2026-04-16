import { Container } from './Container';

const footerLinks = {
  empresa: [
    { label: 'Nosotros', href: '#' },
    { label: 'Historia', href: '#' },
    { label: 'Sostenibilidad', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Trabaja con Nosotros', href: '#' },
  ],
  productos: [
    { label: 'Automotriz', href: '#' },
    { label: 'Agrícola', href: '#' },
    { label: 'Industrial', href: '#' },
    { label: 'Exploración', href: '#' },
    { label: 'Outlet', href: '#' },
  ],
  soporte: [
    { label: 'Contacto', href: '#' },
    { label: 'Portal Distribuidores', href: '#' },
    { label: 'Tienda Virtual', href: '#' },
    { label: 'Ficha Técnica', href: '#' },
    { label: 'WhatsApp', href: '#' },
  ],
};

const socialLinks = ['f', 'in', 'ig', 'yt'];

export function Footer() {
  return (
    <footer className="bg-footer-bg border-t border-border pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-red rounded flex items-center justify-center text-[1.1rem] font-black text-white tracking-tight">
                RHC
              </div>
              <span className="text-[1.2rem] font-extrabold text-white tracking-tight">
                Grupo <span className="text-red">RHC</span>
              </span>
            </a>
            <p className="text-[0.85rem] text-muted leading-relaxed mt-4 max-w-[280px]">
              Más de 50 años fabricando mangueras y sistemas de conducción de fluidos para la industria colombiana y latinoamericana.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 border border-border rounded-md flex items-center justify-center text-muted text-[0.8rem] font-bold hover:border-light hover:text-white transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[0.75rem] font-bold tracking-widest uppercase text-light mb-5">
              Empresa
            </h5>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[0.85rem] text-muted hover:text-light transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[0.75rem] font-bold tracking-widest uppercase text-light mb-5">
              Productos
            </h5>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.productos.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[0.85rem] text-muted hover:text-light transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[0.75rem] font-bold tracking-widest uppercase text-light mb-5">
              Soporte
            </h5>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.soporte.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[0.85rem] text-muted hover:text-light transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[0.78rem] text-muted">
            © 2026 Grupo RHC. Todos los derechos reservados. Bogotá, Colombia.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[0.78rem] text-muted hover:text-light transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-[0.78rem] text-muted hover:text-light transition-colors">
              Términos de Uso
            </a>
            <a href="#" className="text-[0.78rem] text-muted hover:text-light transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
