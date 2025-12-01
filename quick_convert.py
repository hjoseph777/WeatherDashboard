"""
Quick Markdown to PDF Converter
Simple script to convert Instruction.md to PDF format
"""

import markdown
import os

def convert_md_to_html_for_pdf():
    """Convert markdown to styled HTML ready for PDF conversion"""
    
    # Check if input file exists
    if not os.path.exists('Instruction.md'):
        print("ERROR: Instruction.md not found")
        return False
    
    # Read the markdown file
    with open('Instruction.md', 'r', encoding='utf-8') as file:
        md_content = file.read()
    
    # Convert markdown to HTML
    md = markdown.Markdown(extensions=['tables', 'fenced_code', 'codehilite'])
    html_body = md.convert(md_content)
    
    # Create professional CSS styling for academic document
    css_styles = """
    <style>
        @page {
            size: A4;
            margin: 1in;
        }
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
        }
        body {
            font-family: 'Times New Roman', 'Times', serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #000;
            max-width: 100%;
            margin: 0;
            padding: 20px;
        }
        h1 {
            font-size: 18pt;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
            text-transform: uppercase;
        }
        h2 {
            font-size: 14pt;
            font-weight: bold;
            margin: 25px 0 15px 0;
            border-bottom: 2px solid #333;
            padding-bottom: 5px;
        }
        h3 {
            font-size: 12pt;
            font-weight: bold;
            margin: 20px 0 10px 0;
        }
        h4 {
            font-size: 11pt;
            font-weight: bold;
            margin: 15px 0 8px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 10pt;
        }
        th, td {
            border: 1px solid #333;
            padding: 8px 12px;
            text-align: left;
            vertical-align: top;
        }
        th {
            background-color: #f0f0f0;
            font-weight: bold;
            text-align: center;
        }
        pre {
            font-family: 'Courier New', 'Courier', monospace;
            font-size: 9pt;
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            padding: 10px;
            margin: 10px 0;
            overflow-x: auto;
        }
        code {
            font-family: 'Courier New', 'Courier', monospace;
            font-size: 9pt;
            background-color: #f0f0f0;
            padding: 2px 4px;
            border-radius: 3px;
        }
        ul, ol {
            margin: 10px 0;
            padding-left: 30px;
        }
        li {
            margin: 8px 0;
        }
        hr {
            border: none;
            height: 2px;
            background-color: #333;
            margin: 25px 0;
        }
        .page-break {
            page-break-before: always;
            margin-top: 50px;
        }
        blockquote {
            border-left: 4px solid #ddd;
            margin: 15px 0;
            padding: 10px 20px;
            background-color: #f9f9f9;
        }
        .no-print {
            background-color: #e3f2fd;
            padding: 15px;
            margin: 20px 0;
            border-left: 5px solid #2196F3;
            border-radius: 5px;
        }
    </style>
    """
    
    # Create complete HTML document
    html_document = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CPAN 213 Group 14 - Weather Dashboard Project Instructions</title>
    {css_styles}
</head>
<body>
    <div class="no-print">
        <strong>📋 PDF Conversion Instructions:</strong><br>
        1. Press <kbd>Ctrl+P</kbd> to open print dialog<br>
        2. Select "Save as PDF" as the destination<br>
        3. Set margins to "Minimum" or "Custom" with 1-inch margins<br>
        4. Enable "Print backgrounds" for proper styling<br>
        5. Save as "Instruction.pdf"
    </div>
    
    {html_body}
</body>
</html>"""
    
    # Save the HTML file
    with open('Instruction.html', 'w', encoding='utf-8') as file:
        file.write(html_document)
    
    print("✅ HTML file created: Instruction.html")
    print("📌 Open this file in your browser and use 'Print to PDF' (Ctrl+P)")
    
    return True

def try_weasyprint_conversion():
    """Attempt PDF conversion using WeasyPrint"""
    try:
        import weasyprint
        
        print("🔄 Attempting WeasyPrint conversion...")
        
        # Convert HTML to PDF using WeasyPrint
        weasyprint.HTML(filename='Instruction.html').write_pdf('Instruction.pdf')
        
        print("✅ PDF created successfully using WeasyPrint!")
        return True
        
    except ImportError:
        print("⚠️  WeasyPrint not installed. Install with: pip install weasyprint")
        return False
    except Exception as e:
        print(f"❌ WeasyPrint conversion failed: {e}")
        return False

def main():
    """Main function to orchestrate the conversion"""
    print("🚀 CPAN 213 - Markdown to PDF Converter")
    print("=" * 45)
    
    # Step 1: Convert MD to HTML
    if not convert_md_to_html_for_pdf():
        return
    
    print()
    
    # Step 2: Try automatic PDF conversion
    if try_weasyprint_conversion():
        if os.path.exists('Instruction.pdf'):
            file_size = os.path.getsize('Instruction.pdf')
            print(f"🎉 SUCCESS! PDF file size: {file_size:,} bytes")
            
            # Open the PDF file
            try:
                os.startfile('Instruction.pdf')  # Windows
            except:
                print("📂 PDF saved as: Instruction.pdf")
    else:
        print("🔧 Automatic PDF conversion not available")
        print("📄 Please open Instruction.html in your browser")
        print("   and use 'Print to PDF' to create the final document")
        
        # Open the HTML file
        try:
            os.startfile('Instruction.html')  # Windows
        except:
            print("📂 HTML saved as: Instruction.html")
    
    print("\n" + "=" * 45)
    print("✨ Conversion completed!")

if __name__ == "__main__":
    main()