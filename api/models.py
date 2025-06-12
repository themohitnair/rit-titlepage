from enum import Enum
from typing import Dict

from pydantic import BaseModel


class SubmissionType(Enum):
    ASSIGNMENT = "assignment"
    REPORT = "report"


class SubmissionParams(BaseModel):
    submission_type: str  # Now accepts any string instead of enum
    subject_name: str  # Name of the Subject in full
    subject_code: str  # Subject Code
    semester_number: int  # Semester number
    student_branch: str  # Branch name of submitter in full
    faculty_branch: str  # Branch name of the faculty in full
    topic_name: str  # Topic of the Report/Assignment
    submitters: Dict[
        str, str
    ]  # Names and USNs of submitters (team must have more than zero members)
    faculty_name_with_title: str  # Name of the faculty with titles (Dr., Mr., etc)
    designation: str  # Designation of the professor (Associate Professor, Assistant Professor, etc)
    from_ay: int  # Start year of Academic Year term
    to_ay: int  # End year of Academic Year term
