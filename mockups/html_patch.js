// This script documents the 3 changes to make to the HTML file
// For the demo, Manuel applies these in Claude Code terminal live

const changes = `
=== CHANGE 1: Add nav item ===
In the <nav> element, add before the "Contacto" link:
  <a href="#ai-identifier" style="color: var(--red); font-weight: 700;">🤖 AI Identifier</a>

=== CHANGE 2: Add hero CTA button ===  
In the .hero-actions div, add as the FIRST button:
  <a href="#ai-identifier" class="btn btn-primary">🤖 Identificador AI</a>

And change the existing "Ver Productos" to btn-outline.

=== CHANGE 3: Add AI Identifier section ===
Add this new section BEFORE the cta-banner section:

<section class="ai-identifier" id="ai-identifier" style="padding: 5rem 0; border-top: 1px solid var(--border);">
  <div class="container" style="text-align: center;">
    <span class="tag">Nuevo</span>
    <h2 class="section-title">Identificador AI de Mangueras</h2>
    <div class="red-line" style="margin: 1rem auto 1.5rem;"></div>
    <p class="section-sub" style="margin: 0 auto 2.5rem; max-width: 640px;">
      Sube una foto o describe lo que necesitas — nuestra inteligencia artificial 
      identifica el producto correcto del catálogo RHC en segundos.
    </p>
    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
      <a href="http://localhost:8501" target="_blank" class="btn btn-primary" 
         style="font-size: 1rem; padding: 1rem 2.5rem;">
        🤖 Abrir Identificador AI
      </a>
      <a href="#contacto" class="btn btn-outline">Solicitar Demo</a>
    </div>
    <div style="margin-top: 3rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 700px; margin-left: auto; margin-right: auto;">
      <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📷</div>
        <h4 style="color: var(--white); font-size: 0.9rem; margin-bottom: 0.3rem;">Foto</h4>
        <p style="color: var(--muted); font-size: 0.78rem;">Sube una imagen de la manguera</p>
      </div>
      <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
        <h4 style="color: var(--white); font-size: 0.9rem; margin-bottom: 0.3rem;">Texto</h4>
        <p style="color: var(--muted); font-size: 0.78rem;">Describe la aplicación o vehículo</p>
      </div>
      <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">✅</div>
        <h4 style="color: var(--white); font-size: 0.9rem; margin-bottom: 0.3rem;">Match</h4>
        <p style="color: var(--muted); font-size: 0.78rem;">Producto exacto con especificaciones</p>
      </div>
    </div>
  </div>
</section>
`;

console.log(changes);
