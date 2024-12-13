from docx import Document
from models import SubmissionType, SubmissionParams


def gen_filled_doc(data: SubmissionParams, doc: Document):
    for paragraph in doc.paragraphs:
        for run in paragraph.runs:
            if "submission_type" in run.text:
                if data.submission_type == SubmissionType.ASSIGNMENT:
                    run.text = run.text.replace("submission_type", "An Assignment")
                elif data.submission_type == SubmissionType.REPORT:
                    run.text = run.text.replace("submission_type", "A Report")

            if "topic_name" in run.text:
                run.text = run.text.replace("topic_name", data.topic_name.title())

            if "subject_name" in run.text:
                run.text = run.text.replace("subject_name", data.subject_name.title())

            if "subject_code" in run.text:
                run.text = run.text.replace("subject_code", data.subject_code.upper())

            if "semester_number" in run.text:
                run.text = run.text.replace(
                    "semester_number", str(data.semester_number)
                )

            if "branch" in run.text:
                run.text = run.text.replace("branch", data.branch.title())

            for i in range(1, 8):
                placeholder = f"submitter{i}"
                if placeholder in run.text:
                    if i <= len(data.submitters):
                        name, usn = list(data.submitters.items())[i - 1]
                        run.text = run.text.replace(
                            placeholder, f"{name.title()} ({usn.upper()})"
                        )
                    else:
                        run.text = run.text.replace(placeholder, "")

            if "faculty_name" in run.text:
                run.text = run.text.replace(
                    "faculty_name", data.faculty_name_with_title.title()
                )

            if "designation" in run.text:
                run.text = run.text.replace("designation", data.designation.title())

            if "from_ay" in run.text:
                run.text = run.text.replace("from_ay", str(data.from_ay))

            if "to_ay" in run.text:
                run.text = run.text.replace("to_ay", str(data.to_ay))

    temp_docx_path = "frontpage.docx"
    doc.save(temp_docx_path)

    return temp_docx_path
