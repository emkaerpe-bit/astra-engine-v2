import fitz # PyMuPDF
import sys
import os

def pdf_to_md(pdf_path, md_path):
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Converted {pdf_path} to {md_path}")
    except Exception as e:
        print(f"Error converting {pdf_path}: {e}")

# Files
files = [
    ("628279060-Symbole-Sabiańskie-znaczenie.pdf", "628279060-Symbole-Sabianskie-znaczenie.md"),
    ("733745881-Symbole-Sabian-skie.pdf", "733745881-Symbole-Sabianskie.md")
]

base_dir = r"c:\Users\Dom\Desktop\Wiralowy Chłopiec\astra-engine"

for pdf_name, md_name in files:
    pdf_path = os.path.join(base_dir, pdf_name)
    md_path = os.path.join(base_dir, md_name)
    pdf_to_md(pdf_path, md_path)
