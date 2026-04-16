import { motion } from 'framer-motion';
import { Car, Sprout, Factory, Globe, Building, Server, ChevronRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { Tag } from '../ui/Tag';
import { SectionTitle } from '../ui/SectionTitle';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import { industries } from '../../data/industries';

import automotrizImg from '../../assets/images/sectors/automotriz.jpg';
import agriculturaImg from '../../assets/images/sectors/agricultura.jpg';
import industrialImg from '../../assets/images/sectors/industrial.jpg';
import oilImg from '../../assets/images/sectors/oil-mining.jpg';
import infraImg from '../../assets/images/sectors/infrastructure.jpg';
import datacenterImg from '../../assets/images/sectors/datacenter.jpg';

const imageMap: Record<string, string> = {
  automotriz: automotrizImg,
  agricola: agriculturaImg,
  industrial: industrialImg,
  exploracion: oilImg,
  infraestructura: infraImg,
  datacenters: datacenterImg,
};

const iconMap: Record<string, typeof Car> = {
  car: Car,
  sprout: Sprout,
  factory: Factory,
  globe: Globe,
  building: Building,
  server: Server,
};

export function Industries() {
  return (
    <section id="industrias" className="py-20 md:py-28 bg-mid">
      <Container>
        <motion.div
          className="flex flex-col items-center text-center mb-12 md:mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Tag>Sectores</Tag>
          <SectionTitle showLine={false} className="mx-auto">
            Industrias que Servimos
          </SectionTitle>
          <p className="text-[1.05rem] text-muted leading-relaxed max-w-[480px] mx-auto">
            Soluciones especializadas para cada sector industrial, con productos diseñados para las condiciones más exigentes.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {industries.map((industry) => {
            const Icon = iconMap[industry.icon] || Factory;
            const image = imageMap[industry.id];
            return (
              <motion.div
                key={industry.id}
                variants={fadeInUp}
                className="relative bg-dark border border-border rounded-xl overflow-hidden group"
                whileHover={{ y: -4, borderColor: 'rgba(191,9,47,0.35)' }}
                transition={{ duration: 0.25 }}
              >
                {/* Image */}
                {image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={image}
                      alt={industry.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 w-10 h-10 bg-dark/70 backdrop-blur-sm border border-border rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-red" strokeWidth={1.8} />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-[1rem] font-bold text-white mb-2">{industry.name}</h3>
                  <p className="text-[0.83rem] text-muted leading-relaxed">{industry.description}</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 mt-4 text-[0.78rem] font-semibold text-red tracking-wide uppercase group-hover:gap-2.5 transition-all"
                  >
                    Ver soluciones
                    <ChevronRight size={14} />
                  </a>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-red scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
