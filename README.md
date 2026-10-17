# AI Resume Analyzer 🚀

An AI-powered resume analysis web application built with **Python, Django, and Google Gemini API**. Upload a resume in PDF or DOCX format to evaluate its quality, review key skills, identify strengths and weaknesses, and receive actionable suggestions to improve resume content and ATS compatibility.

## 🌐 Live Demo

- **Live Application:** `https://ai-resume-analyzer-x0o4.onrender.com/`
- **GitHub Repository:** https://github.com/Mathan495/AI-Resume-Analyzer

## 📌 Project Overview

AI Resume Analyzer helps job seekers understand how effectively their resumes communicate their qualifications. It extracts resume text, processes it using Google's Gemini AI, and presents structured feedback through an interactive dashboard.

The application is designed to help users identify improvement areas and better align their resumes with job application expectations.

## ✨ Features

- **Resume Upload:** Upload resumes in PDF and DOCX formats.
- **AI-Powered Analysis:** Use Google Gemini API to analyze extracted resume content.
- **Resume Scoring:** Display an overall resume score.
- **ATS Compatibility Score:** Provide an indicative ATS-readiness score.
- **Skills Analysis:** Identify technical and soft skills.
- **Strengths and Weaknesses:** Highlight positive aspects and areas that need improvement.
- **Role Recommendations:** Suggest potential job roles based on resume content.
- **Improvement Suggestions:** Provide actionable recommendations for improving resume quality.
- **Interactive Dashboard:** Display analysis results in a structured, user-friendly interface.
- **Responsive UI:** Provide a modern interface for different screen sizes.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Django | Web framework and application logic |
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| JavaScript | Client-side interactions and dynamic results |
| Google Gemini API | AI-powered resume analysis |
| PyPDF | PDF text extraction |
| python-docx | DOCX text extraction |
| SQLite | Local development database |
| Git and GitHub | Version control and source code hosting |
| Render | Application deployment |

## 🏗️ Application Workflow

1. The user uploads a resume in PDF or DOCX format.
2. Django validates the uploaded file and its size.
3. The resume parser extracts text from the document.
4. The extracted content is sent to the Gemini API for analysis.
5. The AI-generated response is processed into structured results.
6. JavaScript displays the scores, skills, strengths, weaknesses, role suggestions, and improvement recommendations.

## 📂 Project Structure

```text
AI-Resume-Analyzer/
├── analyzer_setting/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
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
│   ├── gemini_service.py
│   ├── models.py
│   ├── resume_parser.py
│   ├── urls.py
│   └── views.py
├── .gitignore
├── manage.py
├── requirements.txt
├── runtime.txt
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- Python 3.12 or another version compatible with the dependencies
- Git
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the repository

```bash
git clone https://github.com/Mathan495/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

### 2. Create and activate a virtual environment

**Windows PowerShell:**

```powershell
python -m venv env
.\env\Scripts\Activate.ps1
```

If PowerShell blocks activation, you can run the environment's Python executable directly or follow the appropriate Windows execution-policy guidance.

### 3. Install dependencies

```bash
python -m pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the same directory as `manage.py`:

```dotenv
GEMINI_API_KEY=your_gemini_api_key
```

Keep the actual API key private. Do not commit `.env` to GitHub.

Ensure `settings.py` loads environment variables and that `gemini_service.py` reads `GEMINI_API_KEY` from the environment.

### 5. Apply database migrations

```bash
python manage.py migrate
```

### 6. Start the development server

```bash
python manage.py runserver
```

Open the application at:

http://127.0.0.1:8000/

## 🔐 Security

- Store API keys and Django secret keys in environment variables.
- Keep `.env` excluded through `.gitignore`.
- Never expose API keys in JavaScript, HTML, screenshots, or public repositories.
- Set `DEBUG=False` in production.
- Configure `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` for the deployed domain.
- Validate uploaded file types and file sizes.
- Avoid logging sensitive resume contents or API credentials.

## 🚀 Deployment

The application can be deployed to Render as a Django web service.

Typical configuration:

**Build command**

```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
```

**Start command**

```bash
gunicorn analyzer_setting.wsgi:application
```

Configure the required environment variables in the Render dashboard, including `DJANGO_SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, and `GEMINI_API_KEY`, according to your Django settings.

For production static files, configure WhiteNoise and Django's static-file settings. Review the [Render Django deployment guide](https://render.com/docs/deploy-django) before deploying.

## ⚠️ Limitations

- Analysis quality depends on the clarity and completeness of the uploaded resume.
- AI-generated recommendations may be incomplete or inaccurate and should be reviewed by the user.
- The resume score and ATS score are indicative assessments, not guarantees of recruiter selection or compatibility with every ATS platform.
- Gemini API usage is subject to the account's model availability, rate limits, and quota.
- PDF files containing scanned images may require OCR support if they do not contain extractable text.
- The current version is intended for resume analysis and improvement, not automated hiring decisions.

## 🔮 Future Enhancements

- Job description matching and keyword gap analysis.
- Resume-to-job compatibility reports.
- Downloadable PDF analysis reports.
- Resume improvement and rewriting suggestions.
- OCR support for scanned resumes.
- User authentication and saved analysis history.
- Additional resume templates and export options.
- More detailed section-wise resume scoring.

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

- Django application development and URL routing.
- File uploads and document text extraction.
- Integration of a generative AI API.
- Processing structured AI responses.
- Frontend and backend integration.
- Environment variable management and API-key security.
- Version control with Git and GitHub.
- Preparing a Python web application for cloud deployment.

## 👨‍💻 Author

**Mathan Kumar G**

Computer Science and Engineering Student | Python Developer | Full Stack Developer

- GitHub: https://github.com/Mathan495

## 📄 License

This project is available for learning and demonstration. Add a `LICENSE` file if you want to specify formal permissions for reuse, modification, and distribution.

---

⭐ If you find this project useful, consider giving the repository a star.
