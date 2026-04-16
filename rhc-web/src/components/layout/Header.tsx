import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Container } from './Container';
import { Button } from '../ui/Button';

const navLinks = [
  { href: '#', label: 'Inicio', active: true },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#industrias', label: 'Industrias' },
  { href: '#productos', label: 'Productos' },
  { href: '#', label: 'Outlet' },
  { href: '#', label: 'Blog' },
  { href: '#identificador-ia', label: 'Identificador IA', highlight: true },
  { href: '#contacto', label: 'Contacto' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-dark border-b border-border">
      <Container className="flex items-center justify-between h-[72px] gap-4 sm:gap-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 bg-red rounded flex items-center justify-center text-[1.1rem] font-black text-white tracking-tight">
            RHC
          </div>
          <span className="text-[1.2rem] font-extrabold text-white tracking-tight">
            Grupo <span className="text-red">RHC</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-3.5 py-2 text-[0.85rem] font-medium rounded transition-colors whitespace-nowrap ${
                link.highlight
                  ? 'text-red font-bold'
                  : link.active
                  ? 'text-white'
                  : 'text-muted hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA + Mobile hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:block">
            <Button href="#contacto">Solicitar Cotización</Button>
          </div>
          <button
            className="lg:hidden p-2 text-muted hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-dark border-b border-border overflow-hidden"
          >
            <Container className="py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2.5 text-[0.9rem] font-medium rounded transition-colors ${
                    link.highlight
                      ? 'text-red font-bold'
                      : link.active
                      ? 'text-white'
                      : 'text-muted hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-1 border-t border-border">
                <Button href="#contacto" className="w-full justify-center">
                  Solicitar Cotización
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
