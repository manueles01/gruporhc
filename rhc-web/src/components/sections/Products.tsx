import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Tag } from '../ui/Tag';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { ProductCard } from '../ui/ProductCard';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import inventory from '../../data/inventory.json';
import type { Product } from '../../types/product';

const products = inventory as Product[];
const featuredProducts = products.slice(0, 6);

export function Products() {
  return (
    <section id="productos" className="py-28">
      <Container>
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Tag>Catálogo</Tag>
          <SectionTitle className="mx-auto">Productos Destacados</SectionTitle>
          <p className="text-[1.05rem] text-muted leading-relaxed max-w-[560px] mx-auto">
            Explore nuestra selección de mangueras y sistemas de conducción de fluidos para aplicaciones automotrices, agrícolas e industriales.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.rhc_code} variants={fadeInUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Button variant="outline" href="#">Ver Catálogo Completo</Button>
        </motion.div>
      </Container>
    </section>
  );
}
