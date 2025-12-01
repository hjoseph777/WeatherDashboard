# Instruction.md to PDF Conversion Guide

## 📋 Available Conversion Methods

### Method 1: Quick Convert (Recommended)
```bash
python quick_convert.py
```
- Creates `Instruction.html` with professional styling
- Use browser's "Print to PDF" function (Ctrl+P)
- Best quality and formatting control

### Method 2: Full Conversion Script
```bash
python convert_to_pdf.py
```
- Tries multiple conversion methods automatically
- Installs dependencies as needed
- Fallback to HTML if PDF conversion fails

### Method 3: Batch File (Windows)
```bash
convert_instruction_to_pdf.bat
```
- Double-click to run
- Automatically opens result file
- User-friendly interface

## 🖨️ Browser Print-to-PDF Instructions

1. **Open `Instruction.html` in your browser**
2. **Press `Ctrl+P` (or Cmd+P on Mac)**
3. **Select "Save as PDF" as destination**
4. **Configure print settings:**
   - Paper size: A4 or Letter
   - Margins: Minimum or Custom (1 inch)
   - Scale: 100%
   - ✅ Enable "Print backgrounds"
   - ✅ Enable "Print graphics"
5. **Save as `Instruction.pdf`**

## 🔧 Dependencies

### Required (Basic):
- Python 3.x
- `markdown` package: `pip install markdown`

### Optional (Automatic PDF):
- `weasyprint`: `pip install weasyprint`
- `pdfkit`: `pip install pdfkit` (requires wkhtmltopdf)
- `pandoc`: External tool for LaTeX-quality PDFs

## 📁 Generated Files

- `Instruction.html` - Styled HTML ready for PDF conversion
- `Instruction.pdf` - Final PDF document (if automatic conversion succeeds)

## ✅ Quality Assurance

The conversion maintains:
- ✅ Professional academic formatting
- ✅ Proper page breaks and margins
- ✅ Table formatting and borders
- ✅ Code block styling
- ✅ Typography (Times New Roman, 11pt)
- ✅ Two-page layout compliance

## 🎯 Quick Start

For immediate conversion:
```bash
python quick_convert.py
```
Then open `Instruction.html` and use `Ctrl+P` → "Save as PDF"

---
**CPAN 213 Group 14 - Weather Dashboard Project**