from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import FileResponse
from fill import gen_filled_doc
from models import SubmissionParams
from docx import Document
import os

app = FastAPI()


def delete_file(path: str):
    """Delete the file from the system."""
    if os.path.exists(path):
        os.remove(path)


@app.post("/generate/")
async def generate_submission(
    data: SubmissionParams, background_tasks: BackgroundTasks
):
    doc = Document("template.docx")

    docx_path = gen_filled_doc(data, doc)

    background_tasks.add_task(delete_file, docx_path)

    return FileResponse(
        docx_path,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename="submission.docx",
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app="main:app", host="localhost", port=8000, reload=True)
