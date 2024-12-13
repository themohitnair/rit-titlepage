from pydantic import BaseModel
from typing import Dict
from enum import Enum


class SubmissionType(Enum):
    ASSIGNMENT = "assignment"
    REPORT = "report"


class SubmissionParams(BaseModel):
    submission_type: SubmissionType  # Report or Assignment
    subject_name: str  # Name of the Subject in full
    subject_code: str  # Subject Code
    semester_number: int  # Semester number
    branch: str  # Branch name in full
    topic_name: str  # Topic of the Report/Assignment
    submitters: Dict[
        str, str
    ]  # Names and USNs of submitters (team must have more than zero members)
    faculty_name_with_title: str  # Name of the faculty with titles (Dr., Mr., etc)
    designation: str  # Designation of the professor (Associate Professor, Assistant Professor, etc)
    from_ay: int  # Start year of Academic Year term
    to_ay: int  # End year of Academic Year term
