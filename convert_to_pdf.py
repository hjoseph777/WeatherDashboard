#!/usr/bin/env python3
"""
Markdown to PDF Converter Script
Converts Instruction.md to Instruction.pdf with proper formatting
Supports multiple conversion methods for reliability
"""

import os
import sys
import subprocess
from pathlib import Path

def check_dependencies():
    """Check and install required dependencies"""
    required_packages = [
        'markdown',
        'pdfkit', 
        'weasyprint',
        'markdown-pdf'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"✓ {package} is available")
        except ImportError:
            missing_packages.append(package)
            print(f"✗ {package} is missing")
    
    if missing_packages:
        print(f"\nInstalling missing packages: {', '.join(missing_packages)}")
        for package in missing_packages:
            try:
                subprocess.check_call([sys.executable, "-m", "pip", "install", package])
                print(f"✓ Installed {package}")
            except subprocess.CalledProcessError:
                print(f"✗ Failed to install {package}")
                if package == 'weasyprint':
                    print("Note: WeasyPrint may require additional system dependencies")

def convert_with_weasyprint():
    """Convert using WeasyPrint (best quality)"""
    try:
        import markdown
        from weasyprint import HTML, CSS
        from weasyprint.text.fonts import FontConfiguration
        
        print("📄 Converting with WeasyPrint...")
        
        # Read markdown file
        with open('Instruction.md', 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Convert markdown to HTML
        md = markdown.Markdown(extensions=['tables', 'fenced_code'])
        html_content = md.convert(md_content)
        
        # Add professional CSS styling
        css_styles = """
        @page {
            size: A4;
            margin: 1in;
        }
        body {
            font-family: 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #333;
            max-width: 100%;
        }
        h1 {
            font-size: 16pt;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
            page-break-before: auto;
        }
        h2 {
            font-size: 14pt;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        h3 {
            font-size: 12pt;
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 8px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        pre, code {
            font-family: 'Courier New', monospace;
            font-size: 10pt;
            background-color: #f5f5f5;
            padding: 5px;
            border: 1px solid #ddd;
        }
        ul, ol {
            margin: 10px 0;
            padding-left: 25px;
        }
        li {
            margin: 5px 0;
        }
        hr {
            border: none;
            height: 1px;
            background-color: #ddd;
            margin: 15px 0;
        }
        .page-break {
            page-break-before: always;
        }
        """
        
        # Create complete HTML document
        full_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>CPAN 213 - Group 14 Project Instructions</title>
            <style>{css_styles}</style>
        </head>
        <body>
            {html_content}
        </body>
        </html>
        """
        
        # Convert to PDF
        font_config = FontConfiguration()
        html_doc = HTML(string=full_html)
        css_doc = CSS(string=css_styles, font_config=font_config)
        
        html_doc.write_pdf('Instruction.pdf', stylesheets=[css_doc], font_config=font_config)
        print("✅ PDF created successfully with WeasyPrint!")
        return True
        
    except Exception as e:
        print(f"❌ WeasyPrint conversion failed: {e}")
        return False

def convert_with_pdfkit():
    """Convert using pdfkit (requires wkhtmltopdf)"""
    try:
        import markdown
        import pdfkit
        
        print("📄 Converting with pdfkit...")
        
        # Read markdown file
        with open('Instruction.md', 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Convert markdown to HTML
        md = markdown.Markdown(extensions=['tables', 'fenced_code'])
        html_content = md.convert(md_content)
        
        # Add CSS styling
        styled_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.5; margin: 1in; }}
                h1 {{ font-size: 16pt; text-align: center; }}
                h2 {{ font-size: 14pt; margin-top: 20px; }}
                h3 {{ font-size: 12pt; margin-top: 15px; }}
                table {{ width: 100%; border-collapse: collapse; margin: 10px 0; }}
                th, td {{ border: 1px solid #ddd; padding: 8px; }}
                th {{ background-color: #f2f2f2; }}
                pre, code {{ font-family: 'Courier New', monospace; background-color: #f5f5f5; padding: 5px; }}
            </style>
        </head>
        <body>
            {html_content}
        </body>
        </html>
        """
        
        # PDF options
        options = {
            'page-size': 'A4',
            'margin-top': '1in',
            'margin-right': '1in',
            'margin-bottom': '1in',
            'margin-left': '1in',
            'encoding': "UTF-8",
            'no-outline': None,
            'enable-local-file-access': None
        }
        
        pdfkit.from_string(styled_html, 'Instruction.pdf', options=options)
        print("✅ PDF created successfully with pdfkit!")
        return True
        
    except Exception as e:
        print(f"❌ pdfkit conversion failed: {e}")
        print("Note: pdfkit requires wkhtmltopdf to be installed separately")
        return False

def convert_with_pandoc():
    """Convert using Pandoc (if available)"""
    try:
        print("📄 Attempting conversion with Pandoc...")
        
        # Check if pandoc is available
        subprocess.check_call(['pandoc', '--version'], stdout=subprocess.DEVNULL)
        
        # Convert with pandoc
        subprocess.check_call([
            'pandoc', 
            'Instruction.md', 
            '-o', 'Instruction.pdf',
            '--pdf-engine=xelatex',
            '-V', 'geometry:margin=1in',
            '-V', 'fontsize=11pt'
        ])
        
        print("✅ PDF created successfully with Pandoc!")
        return True
        
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Pandoc not available or conversion failed")
        return False

def fallback_html_conversion():
    """Fallback: Create HTML version for manual conversion"""
    try:
        import markdown
        
        print("📄 Creating HTML fallback...")
        
        # Read markdown file
        with open('Instruction.md', 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Convert to HTML
        md = markdown.Markdown(extensions=['tables', 'fenced_code'])
        html_content = md.convert(md_content)
        
        # Create styled HTML
        styled_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>CPAN 213 - Group 14 Project Instructions</title>
            <style>
                @media print {{
                    body {{ margin: 1in; }}
                    .no-print {{ display: none; }}
                }}
                body {{
                    font-family: 'Times New Roman', serif;
                    font-size: 11pt;
                    line-height: 1.5;
                    max-width: 8.5in;
                    margin: 0 auto;
                    padding: 1in;
                }}
                h1 {{ font-size: 16pt; text-align: center; margin-bottom: 20px; }}
                h2 {{ font-size: 14pt; margin-top: 20px; margin-bottom: 10px; }}
                h3 {{ font-size: 12pt; margin-top: 15px; margin-bottom: 8px; }}
                table {{
                    width: 100%;
                    border-collapse: collapse;
                    margin: 10px 0;
                }}
                th, td {{
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }}
                th {{ background-color: #f2f2f2; font-weight: bold; }}
                pre, code {{
                    font-family: 'Courier New', monospace;
                    font-size: 10pt;
                    background-color: #f5f5f5;
                    padding: 5px;
                    border: 1px solid #ddd;
                }}
                .no-print {{
                    background-color: #e7f3ff;
                    padding: 15px;
                    margin: 20px 0;
                    border-left: 4px solid #2196F3;
                }}
            </style>
        </head>
        <body>
            <div class="no-print">
                <strong>📋 Instructions:</strong> Use your browser's "Print to PDF" function (Ctrl+P) to save this as a PDF file.
                <br><strong>💡 Tip:</strong> Set margins to "Minimum" and enable "Print backgrounds" for best results.
            </div>
            {html_content}
        </body>
        </html>
        """
        
        with open('Instruction.html', 'w', encoding='utf-8') as f:
            f.write(styled_html)
        
        print("✅ HTML file created: Instruction.html")
        print("📌 Open this file in your browser and use 'Print to PDF' (Ctrl+P)")
        return True
        
    except Exception as e:
        print(f"❌ HTML fallback failed: {e}")
        return False

def main():
    """Main conversion function"""
    print("🚀 Starting Markdown to PDF Conversion")
    print("=" * 50)
    
    # Check if input file exists
    if not os.path.exists('Instruction.md'):
        print("❌ Error: Instruction.md not found in current directory")
        return
    
    # Check dependencies
    print("🔍 Checking dependencies...")
    check_dependencies()
    print()
    
    # Try conversion methods in order of preference
    conversion_methods = [
        ("WeasyPrint", convert_with_weasyprint),
        ("Pandoc", convert_with_pandoc),
        ("pdfkit", convert_with_pdfkit),
        ("HTML Fallback", fallback_html_conversion)
    ]
    
    success = False
    for method_name, method_func in conversion_methods:
        print(f"🔄 Trying {method_name}...")
        if method_func():
            success = True
            break
        print()
    
    if success:
        if os.path.exists('Instruction.pdf'):
            file_size = os.path.getsize('Instruction.pdf')
            print(f"\n🎉 SUCCESS! PDF created: Instruction.pdf ({file_size:,} bytes)")
        else:
            print(f"\n📄 Conversion completed - check output files")
    else:
        print("\n❌ All conversion methods failed")
        print("💡 Suggestion: Install pandoc or wkhtmltopdf for better PDF conversion")
    
    print("\n" + "=" * 50)
    print("✨ Conversion process completed")

if __name__ == "__main__":
    main()