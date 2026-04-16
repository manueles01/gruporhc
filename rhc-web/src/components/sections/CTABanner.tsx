import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { fadeInUp } from '../../animations/variants';

export function CTABanner() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0e1f1e] to-mid border-y border-border relative overflow-hidden">
      <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(191,9,47,0.1)_0%,transparent_60%)] pointer-events-none" />

      <Container>
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 text-center lg:text-left"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="max-w-[600px] mx-auto lg:mx-0">
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-white tracking-tight mb-3">
              ¿Necesita una solución a la medida?
            </h2>
            <p className="text-[0.95rem] text-muted leading-relaxed">
              Nuestro equipo de ingenieros puede diseñar mangueras y sistemas de conducción personalizados
              para sus necesidades específicas. Contáctenos para una cotización sin compromiso.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end shrink-0">
            <Button href="#contacto">Solicitar Cotización</Button>
            <Button variant="outline" href="tel:+5714184577">Llamar Ahora</Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
