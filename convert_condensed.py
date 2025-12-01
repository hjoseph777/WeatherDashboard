"""
Quick converter for instruction2_condensed.md to PDF using PrinceXML
"""

import subprocess
import os
import sys

def convert_condensed_to_pdf():
    """Convert instruction2_condensed.md directly to PDF using PrinceXML"""
    
    # Check if the file exists
    if not os.path.exists('instruction2_condensed.md'):
        print("❌ instruction2_condensed.md not found!")
        return False
    
    # PrinceXML path
    prince_cmd = r'C:\Program Files\Prince\engine\bin\prince.exe'
    
    # Test if PrinceXML works
    try:
        result = subprocess.run([prince_cmd, '--version'], 
                              capture_output=True, text=True, check=True)
        print(f"✅ PrinceXML found: {result.stdout.strip()}")
    except Exception as e:
        print(f"❌ PrinceXML error: {e}")
        return False
    
    # Convert directly to PDF
    pdf_filename = 'instruction2_condensed.pdf'
    
    try:
        cmd = [prince_cmd, 'instruction2_condensed.md', '-o', pdf_filename, '--verbose']
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        
        print("🎉 PDF created successfully!")
        print(f"📄 Output file: {pdf_filename}")
        
        # Check file size
        if os.path.exists(pdf_filename):
            file_size = os.path.getsize(pdf_filename) / 1024  # KB
            print(f"📏 PDF size: {file_size:.1f} KB")
        
        print("✨ Your instruction2_condensed.md is now a professional PDF!")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ PrinceXML conversion failed:")
        print(f"Error: {e.stderr}")
        return False

if __name__ == "__main__":
    print("🚀 Quick PDF Converter for instruction2_condensed.md")
    print("=" * 55)
    convert_condensed_to_pdf()
    print("=" * 55)