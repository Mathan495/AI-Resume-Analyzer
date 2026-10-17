document.addEventListener("DOMContentLoaded", function () {

    const resumeInput = document.getElementById("resumeInput");
    const uploadArea = document.getElementById("uploadArea");
    const browseBtn = document.getElementById("browseBtn");

    const filePreview = document.getElementById("filePreview");
    const fileName = document.getElementById("fileName");
    const fileSize = document.getElementById("fileSize");

    const removeFile = document.getElementById("removeFile");
    const analyzeBtn = document.getElementById("analyzeBtn");

    const resumeForm = document.getElementById("resumeForm");

    const errorMessage = document.getElementById("errorMessage");
    const resultMessage = document.getElementById("resultMessage");
    const resultText = document.getElementById("resultText");

    const buttonText = document.getElementById("buttonText");
    const loadingText = document.getElementById("loadingText");

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");


    // ================= FILE UPLOAD =================

    browseBtn.addEventListener("click", function () {
        resumeInput.click();
    });


    uploadArea.addEventListener("click", function (event) {

        if (event.target.closest("#browseBtn")) {
            return;
        }

        resumeInput.click();
    });


    resumeInput.addEventListener("change", function () {

        if (this.files.length > 0) {
            handleFile(this.files[0]);
        }

    });


    // ================= DRAG & DROP =================

    uploadArea.addEventListener("dragover", function (event) {

        event.preventDefault();

        uploadArea.classList.add("dragover");

    });


    uploadArea.addEventListener("dragleave", function () {

        uploadArea.classList.remove("dragover");

    });


    uploadArea.addEventListener("drop", function (event) {

        event.preventDefault();

        uploadArea.classList.remove("dragover");

        const files = event.dataTransfer.files;

        if (files.length > 0) {
            handleFile(files[0]);
        }

    });


    // ================= HANDLE FILE =================

    function handleFile(file) {

        hideError();

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        const maxSize = 5 * 1024 * 1024;


        if (!allowedTypes.includes(file.type)) {

            showError("Please upload only PDF or DOCX files.");

            resetFile();

            return;
        }


        if (file.size > maxSize) {

            showError("File size must be less than 5 MB.");

            resetFile();

            return;
        }


        fileName.textContent = file.name;

        fileSize.textContent = formatFileSize(file.size);

        filePreview.classList.remove("d-none");

        analyzeBtn.disabled = false;

    }


    // ================= REMOVE FILE =================

    removeFile.addEventListener("click", function () {

        resetFile();

        hideError();

    });


    function resetFile() {

        resumeInput.value = "";

        filePreview.classList.add("d-none");

        analyzeBtn.disabled = true;

    }


    // ================= FORM SUBMIT =================

    resumeForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!resumeInput.files.length) {

            showError("Please select a resume first.");

            return;
        }


        const formData = new FormData();

        formData.append(
            "resume",
            resumeInput.files[0]
        );


        const csrfToken = document.querySelector(
            "[name=csrfmiddlewaretoken]"
        ).value;


        setLoading(true);


        try {

            const response = await fetch("/analyze/", {

                method: "POST",

                headers: {
                    "X-CSRFToken": csrfToken
                },

                body: formData

            });


            const data = await response.json();


            if (data.success) {

                showResult(
                    `AI analysis completed for ${data.filename}.`
                );

                console.log(
                    "AI Resume Analysis:",
                    data.analysis
                );

                console.log(
                    "Resume Score:",
                    data.analysis.resume_score
                );

                console.log(
                    "ATS Score:",
                    data.analysis.ats_score
                );

                console.log(
                    "Technical Skills:",
                    data.analysis.technical_skills
                );

                console.log(
                    "Soft Skills:",
                    data.analysis.soft_skills
                );

                console.log(
                    "Strengths:",
                    data.analysis.strengths
                );

                console.log(
                    "Weaknesses:",
                    data.analysis.weaknesses
                );

                console.log(
                    "Missing Skills:",
                    data.analysis.missing_skills
                );

                console.log(
                    "Recommended Roles:",
                    data.analysis.recommended_roles
                );

                console.log(
                    "ATS Suggestions:",
                    data.analysis.ats_suggestions
                );

                console.log(
                    "Improvement Suggestions:",
                    data.analysis.improvement_suggestions
                );

                // Display AI analysis on webpage
                displayAnalysis(data.analysis);

            } else {

                showError(
                    data.message || "Resume analysis failed."
                );

            }

        } catch (error) {

            console.error(error);

            showError(
                "Unable to connect to the server. Please try again."
            );

        } finally {

            setLoading(false);

        }

    });


    // ================= LOADING =================

    function setLoading(isLoading) {

        if (isLoading) {

            analyzeBtn.disabled = true;

            buttonText.classList.add("d-none");

            loadingText.classList.remove("d-none");

        } else {

            analyzeBtn.disabled = false;

            buttonText.classList.remove("d-none");

            loadingText.classList.add("d-none");

        }

    }


    // ================= ERROR =================

    function showError(message) {

        errorMessage.querySelector("span").textContent = message;

        errorMessage.classList.remove("d-none");

    }


    function hideError() {

        errorMessage.classList.add("d-none");

    }


    // ================= RESULT =================

    function showResult(message) {

        resultText.textContent = message;

        resultMessage.classList.remove("d-none");

        resultMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    // ================= FILE SIZE =================

    function formatFileSize(bytes) {

        if (bytes < 1024) {
            return bytes + " Bytes";
        }

        if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(1) + " KB";
        }

        return (bytes / (1024 * 1024)).toFixed(2) + " MB";

    }


    // ================= THEME =================

    const savedTheme = localStorage.getItem("resumeAITheme");

    if (savedTheme === "dark") {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        themeIcon.className = "bi bi-sun-fill";

    }


    themeToggle.addEventListener("click", function () {

        const currentTheme =
            document.documentElement.getAttribute("data-theme");


        if (currentTheme === "dark") {

            document.documentElement.removeAttribute(
                "data-theme"
            );

            localStorage.setItem(
                "resumeAITheme",
                "light"
            );

            themeIcon.className =
                "bi bi-moon-fill";

        } else {

            document.documentElement.setAttribute(
                "data-theme",
                "dark"
            );

            localStorage.setItem(
                "resumeAITheme",
                "dark"
            );

            themeIcon.className =
                "bi bi-sun-fill";

        }

    });

});

/* =====================================================
   DISPLAY AI RESUME ANALYSIS
===================================================== */

function displayAnalysis(analysis) {

    // Show results section
    const analysisResults =
        document.getElementById("analysisResults");

    if (!analysisResults) {
        console.error(
            "Analysis results section not found."
        );

        return;
    }

    analysisResults.classList.remove("d-none");


    /* =================================================
       SCORE
    ================================================= */

    document.getElementById("resumeScore").textContent =
        analysis.resume_score ?? 0;

    document.getElementById("atsScore").textContent =
        analysis.ats_score ?? 0;


    /* =================================================
       PROFESSIONAL SUMMARY
    ================================================= */

    document.getElementById(
        "professionalSummary"
    ).textContent =
        analysis.professional_summary || "No summary available.";


    /* =================================================
       TECHNICAL SKILLS
    ================================================= */

    renderTags(
        "technicalSkills",
        analysis.technical_skills
    );


    /* =================================================
       SOFT SKILLS
    ================================================= */

    renderTags(
        "softSkills",
        analysis.soft_skills
    );


    /* =================================================
       MISSING SKILLS
    ================================================= */

    renderTags(
        "missingSkills",
        analysis.missing_skills
    );


    /* =================================================
       RECOMMENDED ROLES
    ================================================= */

    renderTags(
        "recommendedRoles",
        analysis.recommended_roles
    );


    /* =================================================
       STRENGTHS
    ================================================= */

    renderList(
        "strengthsList",
        analysis.strengths
    );


    /* =================================================
       WEAKNESSES
    ================================================= */

    renderList(
        "weaknessesList",
        analysis.weaknesses
    );


    /* =================================================
       ATS SUGGESTIONS
    ================================================= */

    renderList(
        "atsSuggestions",
        analysis.ats_suggestions
    );


    /* =================================================
       IMPROVEMENT SUGGESTIONS
    ================================================= */

    renderList(
        "improvementSuggestions",
        analysis.improvement_suggestions
    );


    /* =================================================
       SCROLL TO RESULTS
    ================================================= */

    setTimeout(() => {

        analysisResults.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 300);

}


/* =====================================================
   RENDER TAGS
===================================================== */

function renderTags(elementId, items) {

    const container =
        document.getElementById(elementId);

    if (!container) {
        return;
    }

    container.innerHTML = "";


    if (!Array.isArray(items) || items.length === 0) {

        container.innerHTML = `
            <span class="skill-tag">
                No data available
            </span>
        `;

        return;
    }


    items.forEach(item => {

        const tag =
            document.createElement("span");

        tag.className = "skill-tag";

        tag.textContent = item;

        container.appendChild(tag);

    });

}


/* =====================================================
   RENDER LIST
===================================================== */

function renderList(elementId, items) {

    const list =
        document.getElementById(elementId);

    if (!list) {
        return;
    }

    list.innerHTML = "";


    if (!Array.isArray(items) || items.length === 0) {

        const li =
            document.createElement("li");

        li.textContent =
            "No information available.";

        list.appendChild(li);

        return;
    }


    items.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        list.appendChild(li);

    });

}