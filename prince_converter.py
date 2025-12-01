"""
PrinceXML PDF Converter for instruction2.md
Professional PDF generation with PrinceXML
"""

import subprocess
import os
import sys

def convert_with_prince():
    """Convert instruction2.md to PDF using PrinceXML"""
    
    # Check if PrinceXML is installed - try common paths
    prince_paths = [
        'prince',  # If in PATH
        r'C:\Program Files\Prince\engine\bin\prince.exe',  # Common installation
        r'C:\Program Files (x86)\Prince\engine\bin\prince.exe'  # 32-bit installation
    ]
    
    prince_cmd = None
    for path in prince_paths:
        try:
            result = subprocess.run([path, '--version'], 
                                  capture_output=True, text=True, check=True)
            print(f"✅ PrinceXML found: {result.stdout.strip()}")
            prince_cmd = path
            break
        except (subprocess.CalledProcessError, FileNotFoundError):
            continue
    
    if not prince_cmd:
        print("❌ PrinceXML not found!")
        print("📥 Please download and install from: https://www.princexml.com/download/")
        return False
    
    # Check if markdown file exists
    if not os.path.exists('instruction2.md'):
        print("❌ instruction2.md not found!")
        return False
    
    # First convert markdown to HTML (we can use our existing converter)
    print("🔄 Converting markdown to HTML...")
    
    import markdown
    
    # Read the markdown file
    with open('instruction2.md', 'r', encoding='utf-8') as file:
        md_content = file.read()
    
    # Convert markdown to HTML
    md = markdown.Markdown(extensions=['tables', 'fenced_code', 'codehilite'])
    html_body = md.convert(md_content)
    
    # Create CSS specifically optimized for PrinceXML
    css_styles = """
    <style>
        @page {
            size: A4;
            margin: 0.75in;
            @bottom-center {
                content: "Page " counter(page) " of " counter(pages);
                font-size: 10pt;
                color: #666;
            }
        }
        
        /* Page breaks */
        h1 { page-break-before: auto; }
        h2 { page-break-after: avoid; }
        table { page-break-inside: avoid; }
        .cover-page { page-break-after: always; }
        
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
        
        li {
            margin: 4px 0;
        }
        
        strong {
            color: #1B4F72;
            font-weight: bold;
        }
        
        .center, div[align="center"] {
            text-align: center;
            margin: 10px 0;
        }
        
        /* Emoji support */
        .emoji {
            font-size: 1.2em;
        }
    </style>
    """
    
    # Complete HTML document
    html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Weather Dashboard - Project Instructions</title>
    {css_styles}
</head>
<body>
    {html_body}
</body>
</html>"""
    
    # Write HTML file
    html_filename = 'instruction2_prince.html'
    with open(html_filename, 'w', encoding='utf-8') as file:
        file.write(html_content)
    
    print(f"✅ HTML file created: {html_filename}")
    
    # Convert to PDF using PrinceXML
    pdf_filename = 'Weather_Dashboard_Instructions.pdf'
    
    try:
        cmd = [prince_cmd, html_filename, '-o', pdf_filename, '--verbose']
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        
        print("🎉 PDF created successfully!")
        print(f"📄 Output file: {pdf_filename}")
        print(f"📊 PrinceXML output:\n{result.stderr}")
        
        # Check file size
        if os.path.exists(pdf_filename):
            file_size = os.path.getsize(pdf_filename) / 1024  # KB
            print(f"📏 PDF size: {file_size:.1f} KB")
        
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ PrinceXML conversion failed:")
        print(f"Error output: {e.stderr}")
        return False

def main():
    print("🚀 PrinceXML PDF Converter for CPAN 213")
    print("=" * 50)
    
    if convert_with_prince():
        print("=" * 50)
        print("✨ Conversion completed successfully!")
        print("📋 Your professional PDF is ready for submission")
    else:
        print("=" * 50)
        print("❌ Conversion failed - check error messages above")

if __name__ == "__main__":
    main()