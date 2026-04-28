import json
import re
import os
import glob

def parse_sabians(md_path):
    with open(md_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    symbols = []
    current_symbol = None
    
    # Updated regex: dot is optional to catch "142 Text"
    pattern = re.compile(r'^(\d+)\.?\s+(.*)')
    sign_header = re.compile(r'^[A-Z][a-zśłąźżćńó]+\s+\(\d+o-\d+o\)')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if sign_header.match(line):
            continue
            
        match = pattern.match(line)
        if match:
            if current_symbol:
                current_symbol["interpretation"] = current_symbol["interpretation"].strip()
                symbols.append(current_symbol)
            
            num = int(match.group(1))
            text = match.group(2).strip()
            current_symbol = {
                "id": num,
                "symbol": text,
                "interpretation": ""
            }
        elif current_symbol:
            cleaned_line = sign_header.sub('', line).strip()
            if cleaned_line:
                if current_symbol["interpretation"]:
                    current_symbol["interpretation"] += " " + cleaned_line
                else:
                    current_symbol["interpretation"] = cleaned_line
                
    if current_symbol:
        current_symbol["interpretation"] = current_symbol["interpretation"].strip()
        symbols.append(current_symbol)
        
    return symbols

search_pattern = r"c:\Users\Dom\Desktop\Wiralowy Chłopiec\astra-engine\*628279060*.md"
found_files = glob.glob(search_pattern)
if not found_files: exit(1)

md_file = found_files[0]
json_output = r"c:\Users\Dom\Desktop\Wiralowy Chłopiec\astra-engine\src\data\sabianSymbols.json"

symbols_data = parse_sabians(md_file)

if symbols_data:
    last = symbols_data[-1]
    noise = ["(tłum.", "Tłumaczenie copyright", "Ewa Seydlitz", "Kopiowanie"]
    for n in noise:
        if n in last["interpretation"]:
            last["interpretation"] = last["interpretation"].split(n)[0].strip()

ids = [s["id"] for s in symbols_data]
missing = [i for i in range(1, 361) if i not in ids]
print(f"Total symbols found: {len(symbols_data)}")
if missing:
    print(f"Missing IDs: {missing}")

os.makedirs(os.path.dirname(json_output), exist_ok=True)
with open(json_output, "w", encoding="utf-8") as f:
    json.dump(symbols_data, f, ensure_ascii=False, indent=2)
print(f"Updated JSON saved to {json_output}")
