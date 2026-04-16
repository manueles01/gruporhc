import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { staggerContainer, fadeInUp } from '../../animations/variants';

const stats = [
  { number: '50', suffix: '+', label: 'Años de Experiencia' },
  { number: '60', suffix: 'K', label: 'Clientes Suscritos' },
  { number: '4', suffix: '', label: 'Sectores Industriales' },
  { number: '1', suffix: 'k+', label: 'Referencias de Producto' },
];

export function Stats() {
  return (
    <div className="bg-mid border-y border-border py-10">
      <Container>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className={`py-3 px-8 text-center ${
                index < stats.length - 1 ? 'border-r border-border' : ''
              } ${index === 1 ? 'max-md:border-r-0' : ''}`}
            >
              <div className="text-[2.5rem] font-black tracking-tight text-white leading-none mb-1">
                {stat.number}
                <span className="text-red">{stat.suffix}</span>
              </div>
              <div className="text-[0.78rem] font-medium text-muted tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
