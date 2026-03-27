"""
app.py — RHC AI Hose Identifier (Streamlit)
Reads from the same SQLite database that the MCP server exposes to Claude.

Run: streamlit run app.py
"""

import streamlit as st
import sqlite3
import json
import os
import base64

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "rhc_catalog.db")

# ─── Page Config ────────────────────────────────────────────
st.set_page_config(
    page_title="RHC AI Hose Identifier",
    page_icon="🔴",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# ─── Custom CSS (RHC Brand) ─────────────────────────────────
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

    .stApp {
        background-color: #091413;
        color: #E0D9D9;
        font-family: 'Inter', sans-serif;
    }

    .main-header {
        text-align: center;
        padding: 2rem 0 1rem;
    }

    .main-header h1 {
        font-size: 2.5rem;
        font-weight: 800;
        color: #FFFFFF;
        letter-spacing: -0.02em;
        margin-bottom: 0.5rem;
    }

    .main-header h1 span {
        color: #BF092F;
    }

    .main-header p {
        color: #a09898;
        font-size: 1rem;
        max-width: 600px;
        margin: 0 auto;
    }

    .product-card {
        background: #1a2c2b;
        border: 1px solid rgba(224,217,217,0.15);
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition: border-color 0.2s;
    }

    .product-card:hover {
        border-color: rgba(191,9,47,0.4);
    }

    .product-card h3 {
        color: #FFFFFF;
        font-weight: 700;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }

    .product-card .sku {
        color: #BF092F;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
    }

    .product-card .desc {
        color: #a09898;
        font-size: 0.85rem;
        line-height: 1.6;
        margin-bottom: 0.75rem;
    }

    .spec-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
    }

    .spec-item {
        background: rgba(191,9,47,0.08);
        border-radius: 4px;
        padding: 0.5rem;
        text-align: center;
    }

    .spec-item .label {
        color: #a09898;
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .spec-item .value {
        color: #FFFFFF;
        font-weight: 700;
        font-size: 0.9rem;
    }

    .category-badge {
        display: inline-block;
        background: rgba(191,9,47,0.15);
        color: #BF092F;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 0.2rem 0.6rem;
        border-radius: 2px;
        margin-bottom: 0.5rem;
    }

    .search-mode-tabs {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 2rem;
    }

    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}

    .stTabs [data-baseweb="tab-list"] {
        gap: 8px;
        justify-content: center;
    }

    .stTabs [data-baseweb="tab"] {
        background-color: #1a2c2b;
        border-radius: 4px;
        color: #a09898;
        border: 1px solid rgba(224,217,217,0.15);
    }

    .stTabs [aria-selected="true"] {
        background-color: #BF092F !important;
        color: white !important;
    }
</style>
""", unsafe_allow_html=True)


# ─── Database Functions ─────────────────────────────────────
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def search_products(query: str, category: str = None):
    conn = get_db()
    sql = """
        SELECT * FROM products
        WHERE (name LIKE ? OR description LIKE ? OR material LIKE ?
               OR applications LIKE ? OR compatible_vehicles LIKE ?)
    """
    params = [f"%{query}%"] * 5

    if category and category != "Todas":
        sql += " AND category = ?"
        params.append(category.lower())

    rows = conn.execute(sql, params).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_all_products():
    conn = get_db()
    rows = conn.execute("SELECT * FROM products ORDER BY category, name").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def analyze_image_mock(image_bytes):
    """
    Mock AI analysis — in production this would call Claude Vision API.
    Returns a simulated analysis for demo purposes.
    """
    # For the demo, return a realistic-looking analysis
    return {
        "identified_type": "Manguera de Radiador — Moldeada",
        "confidence": 0.92,
        "material_guess": "EPDM (caucho etileno-propileno-dieno)",
        "estimated_diameter": "30-35mm diámetro interno",
        "suggested_category": "automotriz",
        "search_terms": "radiador EPDM moldeada",
        "notes": "La forma curva y las abrazaderas sugieren una manguera moldeada OEM para sistema de refrigeración automotriz."
    }


def render_product_card(product):
    """Render a single product card."""
    apps = json.loads(product.get("applications", "[]"))
    vehicles = json.loads(product.get("compatible_vehicles", "[]"))
    apps_str = ", ".join(apps) if apps else "—"
    vehicles_str = ", ".join(vehicles) if vehicles else "—"

    st.markdown(f"""
    <div class="product-card">
        <div class="category-badge">{product['category']}</div>
        <div class="sku">{product['sku']}</div>
        <h3>{product['name']}</h3>
        <div class="desc">{product['description']}</div>
        <div class="spec-grid">
            <div class="spec-item">
                <div class="label">Diámetro Int.</div>
                <div class="value">{product['inner_diameter_mm']}mm</div>
            </div>
            <div class="spec-item">
                <div class="label">Presión</div>
                <div class="value">{product['pressure_rating_psi']} PSI</div>
            </div>
            <div class="spec-item">
                <div class="label">Material</div>
                <div class="value">{product['material']}</div>
            </div>
            <div class="spec-item">
                <div class="label">Temp. Rango</div>
                <div class="value">{product['temperature_min_c']}° a {product['temperature_max_c']}°C</div>
            </div>
            <div class="spec-item">
                <div class="label">Norma</div>
                <div class="value">{product['standard']}</div>
            </div>
            <div class="spec-item">
                <div class="label">Refuerzo</div>
                <div class="value">{product['reinforcement']}</div>
            </div>
        </div>
        <div style="margin-top: 0.75rem; font-size: 0.8rem;">
            <span style="color: #a09898;">Aplicaciones:</span>
            <span style="color: #E0D9D9;">{apps_str}</span>
        </div>
        {"<div style='margin-top: 0.3rem; font-size: 0.8rem;'><span style=color:#a09898;>Vehículos:</span> <span style=color:#E0D9D9;>" + vehicles_str + "</span></div>" if vehicles_str != "—" else ""}
    </div>
    """, unsafe_allow_html=True)


# ─── Header ─────────────────────────────────────────────────
st.markdown("""
<div class="main-header">
    <h1>🔴 RHC <span>AI</span> Hose Identifier</h1>
    <p>Upload a photo or describe what you need — our AI matches you to the right product from the Grupo RHC catalog.</p>
</div>
""", unsafe_allow_html=True)

# ─── Tabs ───────────────────────────────────────────────────
tab_photo, tab_text, tab_browse = st.tabs(["📷 Photo Identification", "🔍 Text Search", "📋 Browse Catalog"])

# ── Tab 1: Photo Upload ─────────────────────────────────────
with tab_photo:
    st.markdown("#### Upload a hose photo for AI identification")

    uploaded_file = st.file_uploader(
        "Drag and drop or click to upload",
        type=["jpg", "jpeg", "png", "webp"],
        key="photo_upload",
    )

    if uploaded_file is not None:
        col_img, col_result = st.columns([1, 1])

        with col_img:
            st.image(uploaded_file, caption="Uploaded image", use_container_width=True)

        with col_result:
            with st.spinner("🧠 AI analyzing image..."):
                import time
                time.sleep(1.5)  # Simulate API latency
                analysis = analyze_image_mock(uploaded_file.read())

            st.markdown("#### AI Analysis")
            st.markdown(f"""
            <div class="product-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <span style="color: #FFFFFF; font-weight: 700; font-size: 1rem;">{analysis['identified_type']}</span>
                    <span style="background: rgba(191,9,47,0.2); color: #BF092F; padding: 0.2rem 0.6rem; border-radius: 2px; font-size: 0.75rem; font-weight: 700;">
                        {int(analysis['confidence'] * 100)}% confidence
                    </span>
                </div>
                <div class="spec-grid">
                    <div class="spec-item">
                        <div class="label">Material</div>
                        <div class="value" style="font-size: 0.75rem;">{analysis['material_guess']}</div>
                    </div>
                    <div class="spec-item">
                        <div class="label">Diámetro Est.</div>
                        <div class="value" style="font-size: 0.75rem;">{analysis['estimated_diameter']}</div>
                    </div>
                    <div class="spec-item">
                        <div class="label">Categoría</div>
                        <div class="value" style="font-size: 0.75rem;">{analysis['suggested_category']}</div>
                    </div>
                </div>
                <div style="margin-top: 0.75rem; color: #a09898; font-size: 0.82rem; line-height: 1.6;">
                    {analysis['notes']}
                </div>
            </div>
            """, unsafe_allow_html=True)

        # Show matching products
        st.markdown("---")
        st.markdown("#### Matching Products from RHC Catalog")
        matches = search_products(analysis["search_terms"], analysis["suggested_category"])
        if not matches:
            matches = search_products("radiador")

        for p in matches[:4]:
            render_product_card(p)

# ── Tab 2: Text Search ──────────────────────────────────────
with tab_text:
    st.markdown("#### Describe what you need")

    col_search, col_filter = st.columns([3, 1])

    with col_search:
        search_query = st.text_input(
            "Search by name, material, application, or vehicle...",
            placeholder="e.g., radiador Renault Logan, manguera aire 300 PSI, silicona turbo",
            key="text_search",
        )

    with col_filter:
        category_filter = st.selectbox(
            "Category",
            ["Todas", "Automotriz", "Agricola", "Industrial", "Exploracion"],
            key="cat_filter",
        )

    if search_query:
        results = search_products(search_query, category_filter)

        if results:
            st.markdown(f"**{len(results)} product(s) found**")
            for p in results:
                render_product_card(p)
        else:
            st.warning(f"No products found for '{search_query}'. Try broader terms or a different category.")
    else:
        st.info("💡 Try: 'Chevrolet Spark', 'alta presión', 'EPDM radiador', 'dragado', 'petrolera'")

# ── Tab 3: Browse Catalog ───────────────────────────────────
with tab_browse:
    st.markdown("#### Full Product Catalog")

    all_products = get_all_products()
    categories = sorted(set(p["category"] for p in all_products))

    for cat in categories:
        cat_products = [p for p in all_products if p["category"] == cat]
        with st.expander(f"**{cat.upper()}** — {len(cat_products)} products", expanded=False):
            for p in cat_products:
                render_product_card(p)

# ─── Footer ─────────────────────────────────────────────────
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #a09898; font-size: 0.75rem; padding: 1rem 0;">
    <strong>Grupo RHC × MARS TMT</strong> — AI-Powered Hose Identification System<br/>
    Powered by Claude Vision API + ChromaDB + Streamlit<br/>
    <span style="color: #BF092F;">Demo MVP</span> — Production version requires full catalog data
</div>
""", unsafe_allow_html=True)
