"""
Convert instruction2.md to professional PDF
"""

import markdown
import os

def convert_instruction2_to_pdf():
    """Convert instruction2.md to styled HTML ready for PDF conversion"""
    
    # Check if input file exists
    if not os.path.exists('instruction2.md'):
        print("ERROR: instruction2.md not found")
        return False
    
    # Read the markdown file
    with open('instruction2.md', 'r', encoding='utf-8') as file:
        md_content = file.read()
    
    # Convert markdown to HTML
    md = markdown.Markdown(extensions=['tables', 'fenced_code', 'codehilite'])
    html_body = md.convert(md_content)
    
    # Create professional CSS styling for academic document
    css_styles = """
    <style>
        @page {
            size: A4;
            margin: 0.75in;
        }
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
            h1, h2, h3 { page-break-after: avoid; }
            table { page-break-inside: avoid; }
            .cover-page { page-break-after: always; }
        }
        body {
            font-family: 'Calibri', 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000;
            max-width: 100%;
            margin: 0;
            padding: 15px;
        }
        h1 {
            font-size: 16pt;
            font-weight: bold;
            text-align: center;
            margin: 15px 0;
            color: #2E86C1;
        }
        h2 {
            font-size: 14pt;
            font-weight: bold;
            margin: 12px 0 8px 0;
            color: #2874A6;
            border-bottom: 2px solid #E8F6F3;
            padding-bottom: 4px;
        }
        h3 {
            font-size: 13pt;
            font-weight: bold;
            margin: 10px 0 6px 0;
            color: #1B4F72;
        }
        h4 {
            font-size: 12pt;
            font-weight: bold;
            margin: 8px 0 4px 0;
            color: #154360;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            font-size: 10pt;
        }
        th, td {
            border: 1px solid #BDC3C7;
            padding: 6px;
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
            padding: 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 9pt;
        }
        pre {
            padding: 10px;
            overflow-x: auto;
            border-left: 4px solid #3498DB;
        }
        ul, ol {
            margin: 8px 0;
            padding-left: 20px;
        }
        li {
            margin: 4px 0;
        }
        strong {
            color: #1B4F72;
        }
        .center {
            text-align: center;
        }
        div[align="center"] {
            text-align: center;
            margin: 10px 0;
        }
    </style>
    """
    
    # Complete HTML document
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Weather Dashboard - Project Instructions</title>
        {css_styles}
    </head>
    <body>
        {html_body}
    </body>
    </html>
    """
    
    # Write HTML file
    with open('instruction2.html', 'w', encoding='utf-8') as file:
        file.write(html_content)
    
    print("🚀 CPAN 213 - instruction2.md to PDF Converter")
    print("=" * 50)
    print("✅ HTML file created: instruction2.html")
    print("📌 Open this file in your browser and use 'Print to PDF' (Ctrl+P)")
    print("📄 Set margins to 'More settings' → 'Margins: Minimum'")
    print("📐 This should fit comfortably within 3 pages")
    print("=" * 50)
    print("✨ Conversion completed!")
    
    return True

if __name__ == "__main__":
    convert_instruction2_to_pdf()