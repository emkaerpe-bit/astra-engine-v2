import asyncio
import os
import re
from playwright.async_api import async_playwright

# Configuration
INPUT_HTML = "luxury_glyphs_proposal_v4.html"
OUTPUT_DIR = os.path.join("assets", "glyphs")
VIEWPORT = {'width': 1024, 'height': 1024}

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def render_glyphs():
    print("--- Ad Astra Glyph Renderer V1.2 (Safe Encoding) ---")
    
    if not os.path.exists(INPUT_HTML):
        print(f"Error: {INPUT_HTML} not found!")
        return

    with open(INPUT_HTML, "r", encoding="utf-8") as f:
        content = f.read()

    pattern = re.compile(r'<div class(?:Name)?="glyph-card">.*?<div class(?:Name)?="glyph-container">(.*?)</div>.*?<div class(?:Name)?="glyph-name">(.*?)</div>', re.DOTALL)
    matches = pattern.findall(content)

    if not matches:
        print("Error: No glyphs found in HTML!")
        return

    print(f"Found {len(matches)} glyphs to render.")

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport=VIEWPORT, device_scale_factor=2)
        page = await context.new_page()

        for svg_content, name in matches:
            clean_name = name.strip().lower()
            output_path = os.path.join(OUTPUT_DIR, f"{clean_name}.png")
            
            temp_html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        width: 100vw;
                        background: transparent;
                    }}
                    svg {{
                        width: 700px;
                        height: 700px;
                        fill: none;
                        stroke: #D4AF37;
                        stroke-width: 1.5;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.7));
                    }}
                </style>
            </head>
            <body>
                {svg_content.strip()}
            </body>
            </html>
            """
            
            temp_file = f"temp_{clean_name}.html"
            with open(temp_file, "w", encoding="utf-8") as tf:
                tf.write(temp_html_content)

            abs_temp_path = 'file:///' + os.path.abspath(temp_file).replace('\\', '/')
            await page.goto(abs_temp_path)
            
            await asyncio.sleep(1)

            await page.screenshot(path=output_path, omit_background=True)
            # Use ASCII only for console to avoid Windows encoding issues
            print(f"[OK] Rendered: {clean_name}.png")
            
            if os.path.exists(temp_file):
                os.remove(temp_file)

        await browser.close()
    
    print("\n--- Ad Astra: 12 Premium Glyphs Rendered Successfully ---")

if __name__ == "__main__":
    asyncio.run(render_glyphs())
