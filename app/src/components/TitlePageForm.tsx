"use client";

import type React from "react";
import { useState } from "react";

import { generateTitlePage } from "@/lib/api";
import Link from "next/link";
import { Faculty } from '@/lib/types';
import { FacultyAutocomplete } from '@/components/FacultyAutocomplete';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  FileText,
  BookOpen,
  GraduationCap,
  School,
  Users,
  Plus,
  Trash2,
  Loader2,
  Download,
  AlertCircle,
} from "lucide-react";

const MSRIT_BRANCHES = [
  "Aerospace Engineering",
  "Architecture",
  "Artificial Intelligence and Data Science",
  "Artificial Intelligence and Machine Learning",
  "Biotechnology",
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Computer Science and Engineering",
  "Computer Science and Engineering (Artificial Intelligence)",
  "Computer Science and Engineering (Cyber Security)",
  "Electronics and Communication Engineering",
  "Electronics and Instrumentation Engineering",
  "Electrical and Electronics Engineering",
  "Electronics and Telecommunication Engineering",
  "Humanities",
  "Industrial Engineering and Management",
  "Information Science and Engineering",
  "Mathematics",
  "Master of Computer Applications",
  "Mechanical Engineering",
  "Medical Electronics Engineering",
  "Physics",
];


interface Submitter {
  name: string;
  usn: string;
}

export default function TitlePageForm() {
  const [formData, setFormData] = useState({
    submission_type: "Assignment",
    subject_name: "",
    subject_code: "",
    semester_number: 1,
    submitter_branch: "",
    faculty_branch: "",
    topic_name: "",
    submitters: {},
    faculty_name: "",
    faculty_prefix: "",
    faculty_name_with_title: "",
    designation: "",
    from_ay: new Date().getFullYear(),
    to_ay: new Date().getFullYear() + 1,
  });

  const [submitters, setSubmitters] = useState<Submitter[]>([
    { name: "", usn: "1MS" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showCompatibilityWarning, setShowCompatibilityWarning] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitterChange = (
    index: number,
    field: keyof Submitter,
    value: string,
  ) => {
    setSubmitters((prev) => {
      const updated = [...prev];
      if (field === "usn") {
        updated[index][field] = `1MS${value}`;
      } else {
        updated[index][field] = value;
      }
      return updated;
    });
  };

  const addSubmitter = () => {
    if (submitters.length < 7) {
      setSubmitters((prev) => [...prev, { name: "", usn: "1MS" }]);
    }
  };

  const removeSubmitter = (index: number) => {
    setSubmitters((prev) => prev.filter((_, i) => i !== index));
  };

  const validateSubmitters = (submitters: Submitter[]) => {
    return submitters.every(
      (submitter) => submitter.name.trim() && submitter.usn.trim() !== "1MS",
    );
  };

  const handleFacultySelect = (faculty: Faculty | null) => {
    console.log("Selected faculty:", faculty);
  };

  const handleFacultyNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      faculty_name: name,
      faculty_name_with_title: prev.faculty_prefix ? `${prev.faculty_prefix}. ${name}` : name
    }));
  };

  const handlePrefixChange = (prefix: string) => {
    setFormData(prev => ({
      ...prev,
      faculty_prefix: prefix,
      faculty_name_with_title: prev.faculty_name ? `${prefix}. ${prev.faculty_name}` : prev.faculty_name
    }));
  };

  const handleFacultyBranchChange = (branch: string) => {
    setFormData(prev => ({
      ...prev,
      faculty_branch: branch
    }));
  };

  const handleDesignationChange = (designation: string) => {
    setFormData(prev => ({
      ...prev,
      designation
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSubmitters(submitters)) {
      setError(
        "Please fill in all submitter names and USNs, or remove empty submitter fields.",
      );
      return;
    }
    setIsLoading(true);
    setError(null);
    setShowCompatibilityWarning(false);

    try {
      const submittersDict = submitters.reduce((acc, submitter) => {
        if (submitter.name.trim() && submitter.usn.trim() !== "1MS") {
          acc[submitter.name.trim()] = submitter.usn.trim();
        }
        return acc;
      }, {} as Record<string, string>);

      const submitData = {
        ...formData,
        submitters: submittersDict, // This is the key change
        faculty_name_with_title: formData.faculty_prefix && formData.faculty_name 
          ? `${formData.faculty_prefix}. ${formData.faculty_name}`
          : formData.faculty_name_with_title || formData.faculty_name
      };

      const response = await generateTitlePage(submitData);
      const url = URL.createObjectURL(response);
      setDownloadUrl(url);
      setShowCompatibilityWarning(true);
    } catch (error) {
      console.error("Error generating title page:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="px-4 pt-6 pb-2">
        <h2 className="text-xl flex items-center gap-2 font-semibold">
          <FileText className="h-5 w-5" />
          Generate Title Page
        </h2>
        <p className="text-sm text-muted-foreground">
          Create a professional academic title page for your submission
        </p>
      </div>
      <div className="px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-6 p-4 rounded-lg bg-background">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="submission_type" className="text-sm font-medium">
                    Submission Type
                  </Label>
                </div>
                <Input
                  id="submission_type"
                  value={formData.submission_type}
                  onChange={(e) =>
                    handleInputChange("submission_type", e.target.value)
                  }
                  placeholder="e.g. Assignment, Report, Project, etc."
                  required
                  className="h-10 focus-visible:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="subject_code" className="text-sm font-medium">
                    Subject Code
                  </Label>
                </div>
                <Input
                  id="subject_code"
                  value={formData.subject_code}
                  onChange={(e) =>
                    handleInputChange("subject_code", e.target.value)
                  }
                  placeholder="e.g. IS33"
                  required
                  className="h-10 focus-visible:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="subject_name" className="text-sm font-medium">
                    Subject Name
                  </Label>
                </div>
                <Input
                  id="subject_name"
                  value={formData.subject_name}
                  onChange={(e) =>
                    handleInputChange("subject_name", e.target.value)
                  }
                  placeholder="e.g. Data Structures"
                  required
                  className="h-10 focus-visible:ring-primary/50"
                />
                <p className="text-xs text-muted-foreground">
                  Text will appear exactly as entered in the document
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="semester_number" className="text-sm font-medium">
                    Semester Number
                  </Label>
                </div>
                <Input
                  id="semester_number"
                  type="number"
                  value={formData.semester_number}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === "" || /^\d+$/.test(inputValue)) {
                      handleInputChange(
                        "semester_number",
                        inputValue === "" ? "" : parseInt(inputValue),
                      );
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value);
                    if (isNaN(value) || value < 1) {
                      handleInputChange("semester_number", 1);
                    } else if (value > 8) {
                      handleInputChange("semester_number", 8);
                    }
                  }}
                  required
                  min="1"
                  max="8"
                  className="h-10 focus-visible:ring-primary/50"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <div className="flex items-center">
                  <School className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="branch" className="text-sm font-medium">
                    Branch
                  </Label>
                </div>
                <Select
                  value={formData.submitter_branch}
                  onValueChange={(value) => handleInputChange("submitter_branch", value)}
                  required
                >
                  <SelectTrigger className="h-10 bg-background focus-visible:ring-primary/50">
                    <SelectValue placeholder="Select your branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {MSRIT_BRANCHES.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select your branch from the available options
                </p>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="topic_name" className="text-sm font-medium">
                    Topic Name
                  </Label>
                </div>
                <Input
                  id="topic_name"
                  value={formData.topic_name}
                  onChange={(e) => handleInputChange("topic_name", e.target.value)}
                  placeholder="e.g. 20 Solved Leetcode Problems"
                  required
                  className="h-10 focus-visible:ring-primary/50"
                />
                <p className="text-xs text-muted-foreground">
                  Text will appear exactly as entered in the document
                </p>
              </div>
            </div>
          </div>

          {/* Submitters Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Submitters
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {submitters.length}/7 submitters
                </Badge>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  Maximum 7 submitters allowed
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {submitters.map((submitter, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-3 border rounded-lg">
                  <div className="sm:col-span-5">
                    <Label className="text-xs text-muted-foreground mb-1 block sm:hidden">Name</Label>
                    <Input
                      value={submitter.name}
                      onChange={(e) => handleSubmitterChange(index, "name", e.target.value)}
                      placeholder="Enter full name"
                      required
                      className="h-9 focus-visible:ring-primary/50"
                    />
                  </div>
                  
                  <div className="sm:col-span-5">
                    <Label className="text-xs text-muted-foreground mb-1 block sm:hidden">USN</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm bg-muted border border-r-0 rounded-l-md">
                        1MS
                      </span>
                      <Input
                        value={submitter.usn.replace("1MS", "")}
                        onChange={(e) => {
                          const value = e.target.value;
                          handleSubmitterChange(index, "usn", value);
                        }}
                        placeholder="Enter USN"
                        required
                        className="h-9 focus-visible:ring-primary/50 rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-2 flex justify-end">
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSubmitter(index)}
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {submitters.length < 7 && (
              <Button
                type="button"
                variant="outline"
                onClick={addSubmitter}
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Submitter
              </Button>
            )}
          </div>

          <div className="space-y-4 p-4 rounded-lg bg-background">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Faculty Information</h3>
            </div>
            
            <Alert variant="default" className="bg-background border">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Faculty data is sourced from the MSRIT IRINS website. Some faculty members listed may no longer be employed or newer faculty may not be included.
                Please verify the faculty details before finalizing your title page.
              </AlertDescription>
            </Alert>
            <FacultyAutocomplete
              onFacultySelect={handleFacultySelect}
              facultyName={formData.faculty_name}
              onFacultyNameChange={handleFacultyNameChange}
              prefix={formData.faculty_prefix}
              onPrefixChange={handlePrefixChange}
              designation={formData.designation}
              onDesignationChange={handleDesignationChange}
              branch={formData.faculty_branch}
              onBranchChange={handleFacultyBranchChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from_ay">From Academic Year</Label>
              <Input
                id="from_ay"
                type="number"
                value={formData.from_ay}
                onChange={(e) => handleInputChange("from_ay", Number.parseInt(e.target.value))}
                min="2000"
                max="3000"
                required
                className="h-10 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to_ay">To Academic Year</Label>
              <Input
                id="to_ay"
                type="number"
                value={formData.to_ay}
                onChange={(e) => handleInputChange("to_ay", Number.parseInt(e.target.value))}
                min="2020"
                max="2030"
                required
                className="h-10 focus-visible:ring-primary/50"
              />
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-1 border-t pt-4">
            <p>
              By clicking Generate, you acknowledge that no data is stored and information is processed locally. 
            </p>
            <p>
              Read our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>.
            </p>
          </div>


          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full sm:w-auto h-10"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
            {downloadUrl && (
              <Button
                variant="outline"
                className="w-full sm:w-auto h-10"
                onClick={() => window.open(downloadUrl, "_blank")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="mt-3">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {showCompatibilityWarning && (
            <Alert className="mt-3">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important: Document Compatibility Notice</AlertTitle>
              <AlertDescription>
                For best results on mobile devices, open this document in <strong>Microsoft Word</strong> or <strong>Office 365</strong>. 
                Google Docs may not display the page border correctly and could remove formatting elements from the document.
              </AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
