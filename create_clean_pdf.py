"""
Clean PDF converter - removes filename from headers
"""

import markdown
import subprocess
import os

def create_clean_pdf():
    """Convert instruction2_condensed.md to clean PDF without filename headers"""
    
    # Read markdown
    if not os.path.exists('Instruction5.md'):
        print("❌ Instruction5.md not found!")
        return False
        
    with open('Instruction5.md', 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert to HTML
    md = markdown.Markdown(extensions=['tables', 'fenced_code', 'codehilite'])
    html_body = md.convert(md_content)
    
    # CSS with clean page setup and page numbers
    css = """
    <style>
        @page {
            size: A4;
            margin: 0.75in;
            /* Clean headers/footers with page numbers */
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: "Page " counter(page); }
            @bottom-right { content: ""; }
        }
        
        /* First page (cover) - no page number */
        @page :first {
            @bottom-center { content: ""; }
        }
        
        /* Force page breaks */
        .page-break {
            page-break-after: always;
        }
        
        body {
            font-family: "Calibri", "Arial", sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000;
        }
        
        h1 {
            font-size: 18pt;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
            color: #2E86C1;
        }
        
        h2 {
            font-size: 14pt;
            font-weight: bold;
            margin: 16px 0 10px 0;
            color: #2874A6;
            border-bottom: 2px solid #E8F6F3;
            padding-bottom: 4px;
        }
        
        h3 {
            font-size: 13pt;
            font-weight: bold;
            margin: 12px 0 8px 0;
            color: #1B4F72;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 12px 0;
            font-size: 10pt;
        }
        
        th, td {
            border: 1px solid #BDC3C7;
            padding: 8px;
            text-align: left;
        }
        
        th {
            background-color: #EBF5FB;
            font-weight: bold;
            color: #1B4F72;
        }
        
        tr:nth-child(even) {
            background-color: #F8F9FA;
        }
        
        pre, code {
            background-color: #F4F6F6;
            padding: 6px;
            border-radius: 3px;
            font-family: "Courier New", monospace;
            font-size: 9pt;
            border-left: 3px solid #3498DB;
        }
        
        pre {
            padding: 10px;
            margin: 10px 0;
        }
        
        ul, ol {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        strong {
            color: #1B4F72;
            font-weight: bold;
        }
        
        .center, div[align="center"] {
            text-align: center;
            margin: 10px 0;
        }
        
        /* Handle page break divs */
        div[style*="page-break-after: always"] {
            page-break-after: always;
        }
    </style>
    """
    
    # Clean HTML
    html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Weather Dashboard Instructions</title>
    {css}
</head>
<body>
    {html_body}
</body>
</html>"""
    
    # Write HTML
    html_file = 'clean_instruction.html'
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"✅ Clean HTML created: {html_file}")
    
    # Convert with PrinceXML
    pdf_file = 'CPAN213_Group14_Phase1_Instructions.pdf'
    prince_path = r'C:\Program Files\Prince\engine\bin\prince.exe'
    
    try:
        cmd = [prince_path, html_file, '-o', pdf_file, '--no-default-style']
        subprocess.run(cmd, check=True, capture_output=True)
        
        if os.path.exists(pdf_file):
            size = os.path.getsize(pdf_file) / 1024
            print(f"🎉 Clean PDF created: {pdf_file} ({size:.1f} KB)")
            print("📄 No filename headers - clean professional format!")
            return True
        else:
            print("❌ PDF not created")
            return False
            
    except Exception as e:
        print(f"❌ Conversion failed: {e}")
        return False

if __name__ == "__main__":
    print("🧹 Clean PDF Generator (No Filename Headers)")
    print("=" * 50)
    create_clean_pdf()
    print("=" * 50)