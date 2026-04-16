import { motion } from 'framer-motion';
import { Star, Clock, Monitor } from 'lucide-react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { fadeInUp, slideInRight, staggerContainer } from '../../animations/variants';

const heroCards = [
  {
    icon: Star,
    title: 'Calidad Certificada',
    description: 'Procesos controlados y materiales seleccionados.',
  },
  {
    icon: Clock,
    title: 'Entrega Rápida',
    description: 'Distribución nacional con tiempos optimizados.',
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark to-[#0e2120]">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(191,9,47,0.12) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(rgba(224,217,217,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(224,217,217,0.15) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <Container className="relative z-10 grid lg:grid-cols-2 gap-16 items-center py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.12em] uppercase text-red mb-6"
          >
            <span className="w-6 h-0.5 bg-red" />
            50 Años Creando Calidad
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-[clamp(2.8rem,5.5vw,5rem)] font-black leading-[1.05] tracking-tight text-white mb-6"
          >
            Soluciones en
            <br />
            Conducción de
            <br />
            <em className="not-italic text-red">Fluidos</em>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-[1.05rem] text-muted leading-relaxed mb-10 max-w-[480px] mx-auto lg:mx-0"
          >
            Fabricamos mangueras y sistemas de conducción de fluidos para la industria automotriz,
            agrícola, industrial y de exploración. Calidad certificada, entrega confiable.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap justify-center lg:justify-start">
            <Button href="#identificador-ia">Identificador IA</Button>
            <Button variant="outline" href="#productos">Ver Productos</Button>
            <Button variant="outline" href="#nosotros">Conocer Más</Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden lg:flex flex-col gap-4"
          variants={slideInRight}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-2 gap-4">
            {heroCards.map((card) => (
              <motion.div
                key={card.title}
                className="bg-white/[0.04] border border-border rounded-lg p-6"
                whileHover={{ y: -2, borderColor: 'rgba(191,9,47,0.4)' }}
                transition={{ duration: 0.25 }}
              >
                <div className="w-10 h-10 rounded-md bg-red/15 flex items-center justify-center mb-3">
                  <card.icon className="w-5 h-5 text-red" />
                </div>
                <h4 className="text-[0.85rem] font-bold text-white mb-1">{card.title}</h4>
                <p className="text-[0.78rem] text-muted leading-snug">{card.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-white/[0.04] border border-border rounded-lg p-6 flex items-center gap-6"
            whileHover={{ y: -2, borderColor: 'rgba(191,9,47,0.4)' }}
            transition={{ duration: 0.25 }}
          >
            <div className="w-[52px] h-[52px] rounded-md bg-red/15 flex items-center justify-center shrink-0">
              <Monitor className="w-6 h-6 text-red" />
            </div>
            <div>
              <h4 className="text-[0.85rem] font-bold text-white mb-1">Portal de Mayoristas</h4>
              <p className="text-[0.78rem] text-muted leading-snug">
                Accede a precios especiales, catálogos técnicos y soporte prioritario para distribuidores y grandes compradores.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
