import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { Container } from '../layout/Container';
import { Tag } from '../ui/Tag';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { fadeInUp, slideInLeft, slideInRight } from '../../animations/variants';

const features = [
  'Más de 50 años de experiencia en la industria de mangueras y conducción de fluidos.',
  'Certificación ISO 9001:2015 que garantiza procesos de calidad controlados.',
  'Presencia internacional con oficinas en USA, Panamá, Ecuador y Bolivia.',
  'Amplio catálogo con más de 1,000 referencias de productos especializados.',
];

export function About() {
  return (
    <section id="nosotros" className="py-20 md:py-28">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-mid to-[#0d2322] rounded-lg border border-border flex items-center justify-center overflow-hidden">
              <Building2 className="w-16 h-16 stroke-border" strokeWidth={1} />
            </div>
            <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-red text-white p-5 sm:p-6 rounded-lg text-center min-w-[110px] sm:min-w-[130px]">
              <strong className="block text-[2rem] sm:text-[2.5rem] font-black tracking-tight leading-none">50</strong>
              <small className="text-[0.68rem] sm:text-[0.72rem] font-semibold tracking-wide uppercase opacity-85">
                Años en el<br />mercado
              </small>
            </div>
          </motion.div>

          <motion.div
            className="lg:pl-4 text-center lg:text-left"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Tag>Quiénes Somos</Tag>
            <SectionTitle>
              Expertos en fabricación de mangueras y conducción de fluidos
            </SectionTitle>
            <p className="text-[1.05rem] text-muted leading-relaxed max-w-[560px] mx-auto lg:mx-0">
              Grupo RHC es una empresa colombiana con más de 50 años de trayectoria en la fabricación
              de mangueras de caucho y plástico para diversas aplicaciones industriales. Nuestros
              procesos de producción controlados garantizan el más alto estándar de calidad.
            </p>

            <ul className="mt-8 flex flex-col gap-3 text-left">
              {features.map((feature) => (
                <motion.li
                  key={feature}
                  className="flex items-start gap-3 text-[0.9rem] text-muted leading-relaxed"
                  variants={fadeInUp}
                >
                  <span className="shrink-0 mt-0.5 w-[18px] h-[18px] bg-red/15 rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-red rounded-full" />
                  </span>
                  {feature}
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex justify-center lg:justify-start">
              <Button href="#nosotros">Conocer Nuestra Historia</Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
