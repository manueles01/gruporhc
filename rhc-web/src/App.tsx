import { TopBar, Header, Footer } from './components/layout';
import { Hero, Stats, About, Industries, Products, CTABanner, ContactStrip } from './components/sections';
import { AIIdentifier } from './components/ai';

function App() {
  return (
    <>
      <TopBar />
      <Header />
      <main className ="flex flex-col items-center w-full">
        <Hero />
        <Stats />
        <About />
        <Industries />
        <Products />
        <AIIdentifier />
        <CTABanner />
        <ContactStrip />
      </main>
      <Footer />
    </>
  );
}

export default App;
