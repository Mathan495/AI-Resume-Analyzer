from django.shortcuts import render
from django.http import JsonResponse
# from .gemini_service import test_gemini_connection
from .gemini_service import analyze_resume_with_gemini
from .resume_parser import extract_resume_text

def home(request):
    return render(request, "index.html")

def analyze_resume(request):

    if request.method != "POST":
        return JsonResponse({
            "success": False,
            "message": "Only POST requests are allowed."
        }, status=405)

    if "resume" not in request.FILES:
        return JsonResponse({
            "success": False,
            "message": "No resume file was uploaded."
        }, status=400)

    resume = request.FILES["resume"]

    # Allowed file types
    allowed_extensions = [".pdf", ".docx"]

    file_name = resume.name.lower()

    if not any(file_name.endswith(ext) for ext in allowed_extensions):
        return JsonResponse({
            "success": False,
            "message": "Only PDF and DOCX files are allowed."
        }, status=400)

    # Maximum file size: 5 MB
    max_size = 5 * 1024 * 1024

    if resume.size > max_size:
        return JsonResponse({
            "success": False,
            "message": "File size must be less than 5 MB."
        }, status=400)

    try:

        # Extract resume text
        resume_text = extract_resume_text(resume)

        if not resume_text:
            return JsonResponse({
                "success": False,
                "message": "Could not extract text from the resume."
            }, status=400)

        # Send extracted resume text to Gemini
        ai_analysis = analyze_resume_with_gemini(resume_text)

        return JsonResponse({
            "success": True,
            "message": "Resume analyzed successfully.",
            "filename": resume.name,
            "text_length": len(resume_text),
            "analysis": ai_analysis 
        })

    except Exception as e:

        return JsonResponse({
            "success": False,
            "message": f"Error processing resume: {str(e)}"
        }, status=500)

# def test_ai(request):

#     try:
#         result = test_gemini_connection()

#         return JsonResponse({
#             "success": True,
#             "message": result
#         })

#     except Exception as e:

#         return JsonResponse({
#             "success": False,
#             "message": str(e)
#         }, status=500)