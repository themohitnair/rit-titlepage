from docx import Document
from models import SubmissionParams


def gen_filled_doc(data: SubmissionParams, doc: Document):
    def replace_text(run, placeholder, replacement):
        if placeholder in run.text:
            run.text = run.text.replace(placeholder, replacement)

    for paragraph in doc.paragraphs:
        for run in paragraph.runs:
            replace_text(run, "submission_type", data.submission_type)
            replace_text(run, "topic_name", data.topic_name.title())
            replace_text(run, "subject_name", data.subject_name.title())
            replace_text(run, "subject_code", data.subject_code.upper())
            replace_text(run, "semester_number", str(data.semester_number))
            replace_text(run, "branch", data.branch.title())

            # Handle submitters separately as they require special logic
            process_submitters(run, data.submitters)

            replace_text(run, "faculty_name", data.faculty_name_with_title.title())
            replace_text(run, "designation", data.designation.title())
            replace_text(run, "from_ay", str(data.from_ay))
            replace_text(run, "to_ay", str(data.to_ay))

    temp_docx_path = "frontpage.docx"
    doc.save(temp_docx_path)
    return temp_docx_path


def process_submitters(run, submitters):
    """Process submitter placeholders in the document."""
    for i in range(1, 8):
        placeholder = f"submitter{i}"
        if placeholder in run.text:
            if i <= len(submitters):
                name, usn = list(submitters.items())[i - 1]
                run.text = run.text.replace(
                    placeholder, f"{name.title()} ({usn.upper()})"
                )
            else:
                run.text = run.text.replace(placeholder, "")
