import os
import json
import time

from google import genai


def analyze_resume_with_gemini(resume_text):

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError(
            "GEMINI_API_KEY is not configured."
        )

    client = genai.Client(
        api_key=api_key
    )

    prompt = f"""
You are an expert technical recruiter and professional resume reviewer.

Analyze the following resume carefully.

Return ONLY valid JSON.
Do not use Markdown.
Do not add ```json.
Do not add any explanation outside the JSON.

The JSON must follow exactly this structure:

{{
    "resume_score": 0,
    "ats_score": 0,
    "professional_summary": "",
    "technical_skills": [],
    "soft_skills": [],
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "recommended_roles": [],
    "ats_suggestions": [],
    "improvement_suggestions": []
}}

Rules:

- resume_score must be a number from 0 to 100.
- ats_score must be a number from 0 to 100.
- technical_skills must contain technical skills found in the resume.
- soft_skills must contain soft skills found in the resume.
- strengths must contain important strengths from the resume.
- weaknesses must contain realistic areas that can be improved.
- missing_skills should contain useful skills that are missing or insufficient.
- recommended_roles should contain suitable job roles.
- ats_suggestions should contain practical ATS optimization suggestions.
- improvement_suggestions should contain practical resume improvement suggestions.
- Do not invent qualifications, experience, companies, projects, or skills.

Resume:

{resume_text}
"""

    max_retries = 3

    for attempt in range(max_retries):

        try:

            response = client.models.generate_content(
                model="gemini-3.8-flash",
                contents=prompt,
                config={
                    "response_mime_type": "application/json"
                }
            )

            result = response.text.strip()

            return json.loads(result)

        except Exception as e:

            error_message = str(e)

            # Retry temporary 503 errors
            if "503" in error_message or "UNAVAILABLE" in error_message:

                if attempt < max_retries - 1:

                    wait_time = 2 ** attempt

                    print(
                        f"Gemini temporarily unavailable. "
                        f"Retrying in {wait_time} seconds..."
                    )

                    time.sleep(wait_time)

                else:

                    raise ValueError(
                        "Gemini AI is temporarily busy. "
                        "Please try again in a few minutes."
                    )

            else:

                raise