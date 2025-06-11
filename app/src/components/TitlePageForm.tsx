"use client";

import type React from "react";
import { useState } from "react";

import { generateTitlePage } from "@/lib/api";
import { Faculty } from '@/lib/types';
import { FacultyAutocomplete } from '@/components/FacultyAutocomplete';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    branch: "",
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

  // Faculty handlers
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
      // Convert submitters array to object format expected by API
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
                <Input
                  id="branch"
                  value={formData.branch}
                  onChange={(e) => handleInputChange("branch", e.target.value)}
                  placeholder="e.g. Information Science Engineering"
                  required
                  className="h-10 focus-visible:ring-primary/50"
                />
                <p className="text-xs text-muted-foreground">
                  Please enter the full name of your branch (e.g.,
                  &apos;Information Science and Engineering&apos; instead of &apos;ISE&apos;)
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
          <div className="space-y-4 p-4 rounded-lg bg-background">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Submitters</h3>
              </div>
              <Badge variant="outline" className="ml-2 text-xs">
                {submitters.length}/7 submitters
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Maximum 7 submitters allowed
            </p>
            <ScrollArea className="h-[210px] w-full border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-0">
                    <TableHead className="w-1/2 py-2 px-2 text-xs sticky top-0 bg-background z-10">
                      Name
                    </TableHead>
                    <TableHead className="w-1/2 py-2 px-2 text-xs sticky top-0 bg-background z-10">
                      USN
                    </TableHead>
                    <TableHead className="w-[50px] py-2 px-2 sticky top-0 bg-background z-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submitters.map((submitter, index) => (
                    <TableRow key={index} className="border-b-0">
                      <TableCell className="p-1">
                        <Input
                          value={submitter.name}
                          onChange={(e) =>
                            handleSubmitterChange(index, "name", e.target.value)
                          }
                          required
                          className="h-9 focus-visible:ring-primary/50"
                        />
                      </TableCell>
                      <TableCell className="p-1">
                        <div className="flex">
                          <div className="bg-muted px-2 flex items-center rounded-l-md border border-r-0 border-input text-xs">
                            1MS
                          </div>
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
                      </TableCell>
                      <TableCell className="p-1">
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSubmitter(index)}
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            
            {submitters.length < 7 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSubmitter}
                className="mt-2 h-8 text-xs"
              >
                <Plus className="mr-1 h-3 w-3" />
                Add Submitter
              </Button>
            )}
            {submitters.length >= 7 && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Maximum submitters reached</AlertTitle>
                <AlertDescription>
                  You can add a maximum of 7 submitters.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Faculty Information Section */}
          <div className="space-y-4 p-4 rounded-lg bg-background">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Faculty Information</h3>
            </div>
            
            {/* Data Source Note */}
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
            />
          </div>

          {/* Academic Year Section */}
          <div className="space-y-4 p-4 rounded-lg bg-background">
            <div className="flex items-center space-x-2">
              <School className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Academic Year</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from_ay" className="text-sm font-medium">
                  From Academic Year
                </Label>
                <Input
                  id="from_ay"
                  type="number"
                  value={formData.from_ay}
                  onChange={(e) =>
                    handleInputChange("from_ay", Number.parseInt(e.target.value))
                  }
                  required
                  className="h-10 focus-visible:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="to_ay" className="text-sm font-medium">
                  To Academic Year
                </Label>
                <Input
                  id="to_ay"
                  type="number"
                  value={formData.to_ay}
                  onChange={(e) =>
                    handleInputChange("to_ay", Number.parseInt(e.target.value))
                  }
                  required
                  className="h-10 focus-visible:ring-primary/50"
                />
              </div>
            </div>
          </div>

          {/* Submit Section */}
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
