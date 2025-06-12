export interface SubmissionParams {
    submission_type: string;
    subject_name: string;
    subject_code: string;
    semester_number: number;
    student_branch: string;
    faculty_branch: string;
    topic_name: string;
    submitters: { [key: string]: string };
    faculty_name_with_title: string;
    designation: string;
    from_ay: number;
    to_ay: number;
}

export interface Faculty {
  name: string;
  prefix: string;
  designation: string;
  branch: string;
}