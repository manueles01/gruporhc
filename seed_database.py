"""
seed_database.py — Seeds the RHC product SQLite database with real product data.
This is the shared data source for both the MCP server and Streamlit app.
"""

import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "rhc_catalog.db")


def create_tables(conn):
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sku TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            category TEXT NOT NULL CHECK(category IN ('automotriz', 'agricola', 'industrial', 'exploracion')),
            subcategory TEXT,
            inner_diameter_mm REAL,
            outer_diameter_mm REAL,
            pressure_rating_psi REAL,
            temperature_min_c REAL,
            temperature_max_c REAL,
            material TEXT,
            reinforcement TEXT,
            standard TEXT,
            applications TEXT,  -- JSON array
            compatible_vehicles TEXT,  -- JSON array (for automotive)
            description TEXT,
            image_url TEXT
        );

        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            icon TEXT
        );
    """)


def seed_categories(conn):
    categories = [
        ("automotriz", "RHC Auto", "Mangueras de refrigerante, aire, gasolina, agua, calefacción, hidráulicas, radiador y tubos en silicona", "🚗"),
        ("agricola", "RHC Agro", "Soluciones de conducción de fluidos para el sector agrícola. Mangueras de succión y descarga", "🌾"),
        ("industrial", "RHC Industria", "Transferencia de fluidos para agua, químicos, vapor, aire, dragado, arena y cemento", "🏭"),
        ("exploracion", "RHC Exploración", "Soluciones de conducción para petróleo e industria minera. Alto rendimiento y presión", "⛏️"),
    ]
    conn.executemany(
        "INSERT OR IGNORE INTO categories (slug, name, description, icon) VALUES (?, ?, ?, ?)",
        categories,
    )


def seed_products(conn):
    products = [
        # ── AUTOMOTRIZ ──────────────────────────────────────────
        {
            "sku": "RHC-AUTO-RAD-001",
            "name": "Manguera Radiador Superior — Chevrolet Spark GT",
            "category": "automotriz",
            "subcategory": "radiador",
            "inner_diameter_mm": 32.0,
            "outer_diameter_mm": 42.0,
            "pressure_rating_psi": 30,
            "temperature_min_c": -40,
            "temperature_max_c": 125,
            "material": "EPDM",
            "reinforcement": "Poliéster trenzado",
            "standard": "SAE J20",
            "applications": json.dumps(["Sistema de refrigeración", "Radiador superior"]),
            "compatible_vehicles": json.dumps(["Chevrolet Spark GT", "Chevrolet Spark Cronos"]),
            "description": "Manguera moldeada de caucho EPDM para radiador superior. Resistente a refrigerantes y altas temperaturas. Referencia OEM compatible con Chevrolet Spark GT.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto2.jpg",
        },
        {
            "sku": "RHC-AUTO-RAD-002",
            "name": "Manguera Radiador Inferior — Renault Logan",
            "category": "automotriz",
            "subcategory": "radiador",
            "inner_diameter_mm": 35.0,
            "outer_diameter_mm": 45.0,
            "pressure_rating_psi": 30,
            "temperature_min_c": -40,
            "temperature_max_c": 125,
            "material": "EPDM",
            "reinforcement": "Poliéster trenzado",
            "standard": "SAE J20",
            "applications": json.dumps(["Sistema de refrigeración", "Radiador inferior"]),
            "compatible_vehicles": json.dumps(["Renault Logan", "Renault Sandero", "Renault Symbol"]),
            "description": "Manguera moldeada inferior para radiador. Compuesto EPDM de alta durabilidad. Compatible con línea Renault Colombia.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto2.jpg",
        },
        {
            "sku": "RHC-AUTO-CAL-003",
            "name": "Manguera Calefacción — Hyundai Accent",
            "category": "automotriz",
            "subcategory": "calefaccion",
            "inner_diameter_mm": 16.0,
            "outer_diameter_mm": 24.0,
            "pressure_rating_psi": 25,
            "temperature_min_c": -40,
            "temperature_max_c": 150,
            "material": "EPDM",
            "reinforcement": "Fibra de vidrio",
            "standard": "SAE J20",
            "applications": json.dumps(["Sistema de calefacción", "Conducción de refrigerante"]),
            "compatible_vehicles": json.dumps(["Hyundai Accent", "Hyundai Getz", "Hyundai i10"]),
            "description": "Manguera para sistema de calefacción. Resistente a glicol y altas temperaturas. Referencia OEM Hyundai.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto2.jpg",
        },
        {
            "sku": "RHC-AUTO-SIL-004",
            "name": "Tubo Silicona Turbo — Mazda BT-50",
            "category": "automotriz",
            "subcategory": "silicona",
            "inner_diameter_mm": 50.0,
            "outer_diameter_mm": 62.0,
            "pressure_rating_psi": 55,
            "temperature_min_c": -55,
            "temperature_max_c": 200,
            "material": "Silicona reforzada",
            "reinforcement": "Aramida 4 capas",
            "standard": "SAE J20 / DIN 73411",
            "applications": json.dumps(["Turbo intercooler", "Admisión de aire forzado"]),
            "compatible_vehicles": json.dumps(["Mazda BT-50", "Ford Ranger 3.2"]),
            "description": "Tubo de silicona de alto rendimiento para turbo intercooler. 4 capas de refuerzo en aramida. Extrema resistencia a temperatura y presión.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto2.jpg",
        },
        {
            "sku": "RHC-AUTO-HID-005",
            "name": "Manguera Hidráulica Dirección — Nissan Frontier",
            "category": "automotriz",
            "subcategory": "hidraulica",
            "inner_diameter_mm": 10.0,
            "outer_diameter_mm": 18.0,
            "pressure_rating_psi": 1500,
            "temperature_min_c": -40,
            "temperature_max_c": 120,
            "material": "Caucho sintético NBR",
            "reinforcement": "Malla de acero",
            "standard": "SAE J188",
            "applications": json.dumps(["Dirección hidráulica", "Power steering"]),
            "compatible_vehicles": json.dumps(["Nissan Frontier", "Nissan D21", "Nissan Pathfinder"]),
            "description": "Manguera de alta presión para dirección hidráulica. Caucho NBR con refuerzo de malla de acero. Compatible con línea Nissan.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto2.jpg",
        },

        # ── AGRÍCOLA ────────────────────────────────────────────
        {
            "sku": "RHC-AGRO-SUC-001",
            "name": "Manguera Succión Lisa 2\" — Riego Agrícola",
            "category": "agricola",
            "subcategory": "succion",
            "inner_diameter_mm": 50.8,
            "outer_diameter_mm": 62.0,
            "pressure_rating_psi": 75,
            "temperature_min_c": -10,
            "temperature_max_c": 60,
            "material": "PVC reforzado",
            "reinforcement": "Espiral rígido PVC",
            "standard": "NTC 2346",
            "applications": json.dumps(["Succión de agua", "Riego por aspersión", "Trasvase de líquidos"]),
            "compatible_vehicles": json.dumps([]),
            "description": "Manguera de succión con cubierta lisa, pionera en Colombia. Fácil manejo en campo, alta durabilidad. Ideal para riego agrícola y trasvase.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto1.jpg",
        },
        {
            "sku": "RHC-AGRO-DES-002",
            "name": "Manguera Descarga Plana 3\" — Fumigación",
            "category": "agricola",
            "subcategory": "descarga",
            "inner_diameter_mm": 76.2,
            "outer_diameter_mm": 80.0,
            "pressure_rating_psi": 100,
            "temperature_min_c": -5,
            "temperature_max_c": 55,
            "material": "PVC flexible",
            "reinforcement": "Tejido poliéster",
            "standard": "NTC 2346",
            "applications": json.dumps(["Descarga de agua", "Fumigación", "Bombeo agrícola"]),
            "compatible_vehicles": json.dumps([]),
            "description": "Manguera plana para descarga de agua en aplicaciones agrícolas. Ligera y fácil de enrollar. Resistente a productos fitosanitarios.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto1.jpg",
        },

        # ── INDUSTRIAL ──────────────────────────────────────────
        {
            "sku": "RHC-IND-AIR-001",
            "name": "Manguera Aire Comprimido 300 PSI",
            "category": "industrial",
            "subcategory": "aire",
            "inner_diameter_mm": 19.0,
            "outer_diameter_mm": 30.0,
            "pressure_rating_psi": 300,
            "temperature_min_c": -30,
            "temperature_max_c": 80,
            "material": "Caucho SBR/NR",
            "reinforcement": "Textile trenzado 2 capas",
            "standard": "DIN 20018",
            "applications": json.dumps(["Aire comprimido", "Herramientas neumáticas", "Líneas de planta"]),
            "compatible_vehicles": json.dumps([]),
            "description": "Manguera industrial para conducción de aire comprimido. Alta presión de trabajo, flexible y resistente a aceites. Uso en planta industrial.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto4.jpg",
        },
        {
            "sku": "RHC-IND-CHEM-002",
            "name": "Manguera Química Multiuso — UHMWPE",
            "category": "industrial",
            "subcategory": "quimicos",
            "inner_diameter_mm": 25.4,
            "outer_diameter_mm": 38.0,
            "pressure_rating_psi": 250,
            "temperature_min_c": -30,
            "temperature_max_c": 100,
            "material": "UHMWPE liner + EPDM cubierta",
            "reinforcement": "Textile espiral",
            "standard": "DIN EN 12115",
            "applications": json.dumps(["Ácidos", "Solventes", "Productos químicos", "Transferencia industrial"]),
            "compatible_vehicles": json.dumps([]),
            "description": "Manguera con liner de polietileno de ultra alto peso molecular. Resistente a amplia gama de químicos. Cubierta EPDM antiabrasión.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto4.jpg",
        },
        {
            "sku": "RHC-IND-DRAG-003",
            "name": "Manguera Dragado 8\" — Heavy Duty",
            "category": "industrial",
            "subcategory": "dragado",
            "inner_diameter_mm": 203.2,
            "outer_diameter_mm": 235.0,
            "pressure_rating_psi": 150,
            "temperature_min_c": -20,
            "temperature_max_c": 70,
            "material": "NR/SBR alta abrasión",
            "reinforcement": "Espiral acero + textile",
            "standard": "Custom RHC",
            "applications": json.dumps(["Dragado", "Transferencia de lodos", "Arena", "Cemento"]),
            "compatible_vehicles": json.dumps([]),
            "description": "Manguera de gran diámetro para dragado y manejo de materiales abrasivos. Diseño a medida con espiral de acero. Máxima resistencia a abrasión.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto4.jpg",
        },

        # ── EXPLORACIÓN ─────────────────────────────────────────
        {
            "sku": "RHC-EXP-PET-001",
            "name": "Manguera Petrolera Alta Presión 4\"",
            "category": "exploracion",
            "subcategory": "petroleo",
            "inner_diameter_mm": 101.6,
            "outer_diameter_mm": 125.0,
            "pressure_rating_psi": 500,
            "temperature_min_c": -30,
            "temperature_max_c": 120,
            "material": "NBR / Neopreno",
            "reinforcement": "Malla acero + espiral",
            "standard": "API 7K",
            "applications": json.dumps(["Perforación", "Conducción de crudo", "Lodo de perforación"]),
            "compatible_vehicles": json.dumps([]),
            "description": "Manguera de alto rendimiento para operaciones petroleras. Resistente a crudo, H2S y presiones extremas. Fabricada bajo norma API 7K. 100% colombiana.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto3.jpg",
        },
        {
            "sku": "RHC-EXP-MIN-002",
            "name": "Manguera Minería Succión/Descarga 6\"",
            "category": "exploracion",
            "subcategory": "mineria",
            "inner_diameter_mm": 152.4,
            "outer_diameter_mm": 178.0,
            "pressure_rating_psi": 200,
            "temperature_min_c": -20,
            "temperature_max_c": 80,
            "material": "NR/SBR abrasion resistant",
            "reinforcement": "Espiral acero helicoidal",
            "standard": "DIN 20023",
            "applications": json.dumps(["Succión de lodos mineros", "Descarga de relaves", "Transferencia de pulpa"]),
            "compatible_vehicles": json.dumps([]),
            "description": "Manguera para operaciones mineras. Diseño succión/descarga con espiral de acero. Resistencia extrema a abrasión y condiciones de campo.",
            "image_url": "https://www.gruporhc.com/themes/imagina2018/img/Producto3.jpg",
        },
    ]

    for p in products:
        conn.execute("""
            INSERT OR IGNORE INTO products 
            (sku, name, category, subcategory, inner_diameter_mm, outer_diameter_mm,
             pressure_rating_psi, temperature_min_c, temperature_max_c, material,
             reinforcement, standard, applications, compatible_vehicles, description, image_url)
            VALUES (:sku, :name, :category, :subcategory, :inner_diameter_mm, :outer_diameter_mm,
                    :pressure_rating_psi, :temperature_min_c, :temperature_max_c, :material,
                    :reinforcement, :standard, :applications, :compatible_vehicles, :description, :image_url)
        """, p)


def main():
    conn = sqlite3.connect(DB_PATH)
    create_tables(conn)
    seed_categories(conn)
    seed_products(conn)
    conn.commit()

    # Verify
    count = conn.execute("SELECT COUNT(*) FROM products").fetchone()[0]
    cats = conn.execute("SELECT COUNT(*) FROM categories").fetchone()[0]
    print(f"✅ Database seeded: {count} products, {cats} categories")
    print(f"📁 Location: {DB_PATH}")

    # Quick sample
    rows = conn.execute("SELECT sku, name, category FROM products LIMIT 5").fetchall()
    for r in rows:
        print(f"   {r[0]} | {r[1]} | {r[2]}")

    conn.close()


if __name__ == "__main__":
    main()
