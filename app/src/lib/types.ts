export enum SubmissionType {
    ASSIGNMENT = "assignment",
    REPORT = "report"
}

export interface SubmissionParams {
    submission_type: SubmissionType;
    subject_name: string;
    subject_code: string;
    semester_number: number;
    branch: string;
    topic_name: string;
    submitters: { [key: string]: string };
    faculty_name_with_title: string;
    designation: string;
    from_ay: number;
    to_ay: number;
}