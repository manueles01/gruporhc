"""
mcp_server.py — FastMCP server exposing the RHC product catalog via SQLite.
Claude connects to this to query products, search by specs, and get catalog info.

Run: mcp dev mcp_server.py
"""

import sqlite3
import json
import os
from mcp.server.fastmcp import FastMCP

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "rhc_catalog.db")

mcp = FastMCP("RHC Catalog")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


@mcp.tool()
def search_products(query: str, category: str = "") -> str:
    """Search RHC products by name, description, material, or application.
    Optionally filter by category: automotriz, agricola, industrial, exploracion."""
    conn = get_db()
    sql = """
        SELECT sku, name, category, subcategory, material,
               inner_diameter_mm, pressure_rating_psi, description
        FROM products
        WHERE (name LIKE ? OR description LIKE ? OR material LIKE ? OR applications LIKE ?)
    """
    params = [f"%{query}%"] * 4

    if category:
        sql += " AND category = ?"
        params.append(category)

    sql += " LIMIT 10"
    rows = conn.execute(sql, params).fetchall()
    conn.close()

    if not rows:
        return f"No products found for '{query}'"

    results = []
    for r in rows:
        results.append({
            "sku": r["sku"],
            "name": r["name"],
            "category": r["category"],
            "subcategory": r["subcategory"],
            "material": r["material"],
            "inner_diameter_mm": r["inner_diameter_mm"],
            "pressure_rating_psi": r["pressure_rating_psi"],
            "description": r["description"],
        })
    return json.dumps(results, indent=2, ensure_ascii=False)


@mcp.tool()
def get_product_details(sku: str) -> str:
    """Get full details for a product by its SKU code (e.g., RHC-AUTO-RAD-001)."""
    conn = get_db()
    row = conn.execute("SELECT * FROM products WHERE sku = ?", (sku,)).fetchone()
    conn.close()

    if not row:
        return f"Product {sku} not found"

    return json.dumps(dict(row), indent=2, ensure_ascii=False)


@mcp.tool()
def list_categories() -> str:
    """List all product categories with descriptions."""
    conn = get_db()
    rows = conn.execute("SELECT * FROM categories").fetchall()
    conn.close()
    return json.dumps([dict(r) for r in rows], indent=2, ensure_ascii=False)


@mcp.tool()
def find_by_specs(
    min_diameter_mm: float = 0,
    max_diameter_mm: float = 999,
    min_pressure_psi: float = 0,
    category: str = "",
) -> str:
    """Find products by technical specifications. Filter by diameter range and minimum pressure rating."""
    conn = get_db()
    sql = """
        SELECT sku, name, category, inner_diameter_mm, pressure_rating_psi, material
        FROM products
        WHERE inner_diameter_mm >= ? AND inner_diameter_mm <= ? AND pressure_rating_psi >= ?
    """
    params = [min_diameter_mm, max_diameter_mm, min_pressure_psi]

    if category:
        sql += " AND category = ?"
        params.append(category)

    sql += " ORDER BY inner_diameter_mm"
    rows = conn.execute(sql, params).fetchall()
    conn.close()

    if not rows:
        return "No products match those specifications"

    return json.dumps([dict(r) for r in rows], indent=2, ensure_ascii=False)


@mcp.tool()
def find_by_vehicle(vehicle: str) -> str:
    """Find compatible hoses for a specific vehicle make/model (e.g., 'Chevrolet Spark', 'Renault Logan')."""
    conn = get_db()
    rows = conn.execute(
        "SELECT sku, name, subcategory, compatible_vehicles, description FROM products WHERE compatible_vehicles LIKE ?",
        (f"%{vehicle}%",),
    ).fetchall()
    conn.close()

    if not rows:
        return f"No products found for vehicle '{vehicle}'"

    return json.dumps([dict(r) for r in rows], indent=2, ensure_ascii=False)


@mcp.tool()
def catalog_stats() -> str:
    """Get summary statistics of the RHC product catalog."""
    conn = get_db()
    total = conn.execute("SELECT COUNT(*) FROM products").fetchone()[0]
    by_cat = conn.execute(
        "SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY count DESC"
    ).fetchall()
    conn.close()

    stats = {
        "total_products": total,
        "by_category": {r[0]: r[1] for r in by_cat},
    }
    return json.dumps(stats, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    mcp.run()
