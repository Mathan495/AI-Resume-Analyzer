from pypdf import PdfReader
from docx import Document


def extract_pdf_text(file):
    """Extract text from a PDF file."""

    reader = PdfReader(file)

    text = []

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text.append(page_text)

    return "\n".join(text).strip()


def extract_docx_text(file):
    """Extract text from a DOCX file."""

    document = Document(file)

    text = []

    for paragraph in document.paragraphs:
        if paragraph.text.strip():
            text.append(paragraph.text.strip())

    return "\n".join(text).strip()


def extract_resume_text(file):
    """Extract text from PDF or DOCX resume."""

    file_name = file.name.lower()

    if file_name.endswith(".pdf"):
        return extract_pdf_text(file)

    elif file_name.endswith(".docx"):
        return extract_docx_text(file)

    else:
        raise ValueError(
            "Only PDF and DOCX files are supported."
        )