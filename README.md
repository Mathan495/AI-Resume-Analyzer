# 🤖 AI Resume Analyzer

An AI-powered Resume Analyzer built using **Python, Django, Google Gemini API, HTML, CSS, and JavaScript**. The application analyzes uploaded resumes, evaluates resume quality and ATS readiness, identifies skills, highlights strengths and weaknesses, and provides AI-generated recommendations to help job seekers improve their resumes.

---

## 📌 Project Overview

AI Resume Analyzer is a full-stack web application designed to help job seekers understand and improve their resumes through artificial intelligence.

Users can upload a resume in PDF or DOCX format. The application extracts the text, processes it using Google's Gemini API, and displays structured feedback through an interactive dashboard.

The project demonstrates the integration of AI services with Django web development, document processing, and dynamic frontend rendering.

---

## 🚀 Features

### 📄 Resume Upload and Processing

- Upload resumes in PDF and DOCX formats.
- Validate supported file formats.
- Restrict uploaded file size.
- Extract readable text from uploaded documents.
- Process extracted content for AI analysis.

### 🤖 AI-Powered Resume Analysis

- Analyze resume content using Google Gemini API.
- Generate an overall resume score.
- Provide an indicative ATS-readiness score.
- Identify technical and soft skills.
- Highlight resume strengths and weaknesses.
- Recommend relevant job roles based on resume content.
- Generate actionable resume improvement suggestions.

### 📊 Analysis Dashboard

- Display resume and ATS scores.
- Present an AI-generated resume summary.
- Show identified skills and qualifications.
- Display strengths and areas for improvement.
- Present recommended job roles.
- Show suggestions in a structured dashboard.

### 🎨 User Interface

- Modern dark-themed interface.
- Responsive page layout.
- Interactive JavaScript components.
- Dynamic display of analysis results.
- Clear presentation of resume insights.

### 🔐 Configuration and Security

- Store API credentials in environment variables.
- Keep secret configuration out of public repositories.
- Validate uploaded documents on the backend.
- Configure Django for local development and production deployment.

---

## 🔄 Application Workflow

```text
        User
         |
         v
  Upload Resume
   (PDF / DOCX)
         |
         v
  Django Backend
         |
         v
  File Validation
         |
         v
  Resume Text Extraction
   (PyPDF / python-docx)
         |
         v
   Google Gemini API
         |
         v
  AI Resume Evaluation
         |
         v
  Structured Analysis
         |
         v
 Interactive Dashboard
         |
         v
 Scores, Skills, Strengths,
 Weaknesses, Role Suggestions
 and Improvement Tips
```

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Python
- Django

### Artificial Intelligence

- Google Gemini API
- `google-genai` Python SDK

### Document Processing

- PyPDF
- python-docx

### Database

- SQLite

### Environment Configuration

- python-dotenv

### Deployment

- Render
- Gunicorn
- WhiteNoise

### Version Control

- Git
- GitHub

---

## 📂 Project Structure

```text
AI-Resume-Analyzer/
│
├── analyzer_setting/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── resume_analyze/
│   ├── migrations/
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── script.js
│   ├── templates/
│   │   └── index.html
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   ├── gemini_service.py
│   └── resume_parser.py
│
├── .gitignore
├── manage.py
├── requirements.txt
├── runtime.txt
├── README.md
└── .env  (local only; do not upload)
```

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Mathan495/AI-Resume-Analyzer.git
```

### 2. Navigate to the Project Directory

```bash
cd AI-Resume-Analyzer
```

### 3. Create a Virtual Environment

**Windows:**

```bash
python -m venv env
```

### 4. Activate the Virtual Environment

**Windows PowerShell:**

```powershell
.\env\Scripts\Activate.ps1
```

### 5. Install Dependencies

```bash
python -m pip install -r requirements.txt
```

### 6. Configure Environment Variables

Create a `.env` file in the same directory as `manage.py`.

Add your Gemini API key:

```dotenv
GEMINI_API_KEY=your_gemini_api_key
```

Get your API key from [Google AI Studio](https://aistudio.google.com/).

**Important:** Replace the placeholder with your own key. Never upload the actual `.env` file or API key to GitHub.

Ensure the Django application loads the environment variables and that the Gemini service reads `GEMINI_API_KEY` from the environment.

### 7. Apply Database Migrations

```bash
python manage.py migrate
```

### 8. Run the Development Server

```bash
python manage.py runserver
```

### 9. Open the Application

Visit the following address in your browser:

http://127.0.0.1:8000/

---

## 🧠 AI Analysis Results

The application is designed to display the following information after a successful resume analysis:

| Result | Description |
|---|---|
| Resume Score | Indicative assessment of overall resume quality |
| ATS Score | Indicative assessment of ATS readiness |
| Resume Summary | AI-generated summary of the candidate's profile |
| Technical Skills | Technical skills identified in the resume |
| Soft Skills | Communication, teamwork, and other interpersonal skills identified in the resume |
| Strengths | Positive aspects of the resume |
| Weaknesses | Areas that may need improvement |
| Recommended Roles | Potential job roles aligned with the resume content |
| Improvement Suggestions | Actionable recommendations for improving resume presentation |

Scores and recommendations are AI-generated estimates, not guarantees of ATS acceptance, interview shortlisting, or job selection.

---

## 🔐 Security Best Practices

- Store API keys and Django secret keys in environment variables.
- Add `.env` to `.gitignore`.
- Never expose credentials in source code, frontend files, screenshots, or public repositories.
- Set `DEBUG=False` in production.
- Configure `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` correctly.
- Validate file types and file sizes on the server.
- Avoid logging sensitive resume content or API credentials.
- Rotate any credentials accidentally exposed in a public repository.

---

## 🚀 Deployment on Render

The application can be deployed as a Django web service on Render.

### Build Command

```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
```

### Start Command

```bash
gunicorn analyzer_setting.wsgi:application
```

Configure the following environment variables in the Render dashboard, ensuring their names match those used by your Django settings:

- `DJANGO_SECRET_KEY`
- `DEBUG=False`
- `ALLOWED_HOSTS`
- `CSRF_TRUSTED_ORIGINS`
- `GEMINI_API_KEY`

Configure WhiteNoise and Django static-file settings before deployment.

**Live Application:** Add your deployed Render URL here.

---

## ⚠️ Limitations

- Analysis depends on the quality and readability of the uploaded resume.
- Scanned PDFs may require OCR if they do not contain extractable text.
- AI-generated feedback can be inaccurate and should be reviewed.
- ATS scores are estimates and may not match the scoring systems used by individual employers.
- Gemini API availability, quotas, and rate limits depend on the configured account and model.
- Resume analysis does not guarantee job offers or interview shortlisting.

---

## 🔮 Future Enhancements

- Job description and resume matching.
- Keyword gap analysis.
- Section-wise resume scoring.
- Downloadable PDF analysis reports.
- AI-assisted resume rewriting.
- OCR support for scanned resumes.
- User authentication and saved analysis history.
- Resume comparison against specific job descriptions.
- Additional reporting and visualization features.

---

## 🎯 Learning Outcomes

- Django web application development.
- Backend request handling and URL routing.
- File uploads and document text extraction.
- Integration with a generative AI API.
- Structured AI response processing.
- Frontend and backend integration.
- JavaScript-based dynamic dashboard updates.
- Environment variable and API-key management.
- Git and GitHub version control.
- Preparation of a Django application for cloud deployment.

---

## 👨‍💻 Author

**Mathan Kumar G**

Computer Science and Engineering Student | Python Developer | Full Stack Developer

- **GitHub:** https://github.com/Mathan495
- **Project Repository:** https://github.com/Mathan495/AI-Resume-Analyzer

---

## 📄 License

This project is developed for educational purposes and portfolio demonstration. Add a suitable `LICENSE` file if you intend to define permissions for reuse and redistribution.

---

## ⭐ Support

If you find this project useful, consider giving the repository a star on GitHub.
