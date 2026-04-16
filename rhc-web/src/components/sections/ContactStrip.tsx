import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Container } from '../layout/Container';
import { staggerContainer, fadeInUp } from '../../animations/variants';

const contactItems = [
  {
    icon: MapPin,
    title: 'Dirección',
    content: (
      <>
        Carrera 127 #15B-40
        <br />
        Bogotá, Colombia
      </>
    ),
  },
  {
    icon: Phone,
    title: 'Teléfonos',
    content: (
      <>
        <a href="tel:+5714184577" className="hover:text-white transition-colors">
          PBX: (571) 418 4577
        </a>
        <br />
        <a href="tel:+573505419736" className="hover:text-white transition-colors">
          (57) 350 541 9736
        </a>
      </>
    ),
  },
  {
    icon: Mail,
    title: 'Correo Electrónico',
    content: (
      <a href="mailto:info@gruporhc.com" className="hover:text-white transition-colors">
        info@gruporhc.com
      </a>
    ),
  },
];

export function ContactStrip() {
  return (
    <section id="contacto" className="bg-dark border-t border-border py-16">
      <Container>
        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {contactItems.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left"
            >
              <div className="shrink-0 w-11 h-11 rounded-lg bg-red/10 border border-red/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-red" strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="text-[0.78rem] font-bold tracking-wide uppercase text-muted mb-1">
                  {item.title}
                </h4>
                <p className="text-[0.9rem] text-light leading-snug">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
