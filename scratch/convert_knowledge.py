import PyPDF2
import os

def extract_text_from_pdf(pdf_path, output_path):
    print(f"Scanning {pdf_path}...")
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            full_text = []
            
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                if text:
                    # Clean up common PDF-to-text artifacts if possible
                    # (Simple replacement for now)
                    full_text.append(f"## Page {i+1}\n\n{text}")
                else:
                    print(f"Warning: No text found on page {i+1}")
            
            with open(output_path, 'w', encoding='utf-8') as out_file:
                out_file.write("# Skrypty astrologiczne: Baza wiedzy dla Antigravity\n\n")
                out_file.write("\n\n".join(full_text))
            
            print(f"Scan complete. Knowledge saved to {output_path}")
            return True
    except Exception as e:
        print(f"Error scanning PDF: {e}")
        return False

if __name__ == "__main__":
    pdf_file = r"c:\Users\Dom\Desktop\Wiralowy Chłopiec\astra-engine\Skrypty astrologiczne_ Baza wiedzy dla Antigravity.pdf"
    output_file = r"c:\Users\Dom\Desktop\Wiralowy Chłopiec\astra-engine\skrypty_astrologiczne_baza_wiedzy.md"
    
    if os.path.exists(pdf_file):
        extract_text_from_pdf(pdf_file, output_file)
    else:
        print(f"File not found: {pdf_file}")
