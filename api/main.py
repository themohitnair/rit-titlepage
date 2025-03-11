from fastapi import FastAPI, BackgroundTasks, Header, HTTPException, Depends
from fastapi.responses import FileResponse
from fill import gen_filled_doc
from models import SubmissionParams
from docx import Document
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
API_KEY = os.getenv("API_KEY")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://rit-titlepage.vercel.app"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def verify_api_key(x_api_key: str = Header(None)):
    """Validate API key from request headers."""
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API key")


def delete_file(path: str):
    """Delete the file from the system."""
    if os.path.exists(path):
        os.remove(path)


@app.post("/generate/")
async def generate_submission(
    data: SubmissionParams,
    background_tasks: BackgroundTasks,
    _: str = Depends(verify_api_key),
):
    template_path = os.path.join(BASE_DIR, "template.docx")
    doc = Document(template_path)

    docx_path = gen_filled_doc(data, doc)

    background_tasks.add_task(delete_file, docx_path)

    return FileResponse(
        docx_path,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename="submission.docx",
    )
