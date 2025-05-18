"use client";

import type React from "react";
import { useState } from "react";

import { generateTitlePage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Download,
  Loader2,
  Plus,
  Trash2,
  Users,
  BookOpen,
  School,
  GraduationCap,
  FileText,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Badge } from "@/components/ui/badge";

const TitlePageForm: React.FC = () => {
  const [formData, setFormData] = useState({
    submission_type: "Assignment",
    subject_name: "",
    subject_code: "",
    semester_number: 1,
    branch: "",
    topic_name: "",
    submitters: {},
    faculty_name_with_title: "",
    designation: "",
    from_ay: new Date().getFullYear(),
    to_ay: new Date().getFullYear() + 1,
  });

  const [submitters, setSubmitters] = useState<{ name: string; usn: string }[]>(
    [{ name: "", usn: "" }],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitterChange = (
    index: number,
    field: "name" | "usn",
    value: string,
  ) => {
    const newSubmitters = submitters.map((submitter, i) => {
      if (i === index) {
        if (field === "usn" && !value.startsWith("1MS") && value !== "") {
          return { ...submitter, [field]: `1MS${value}` };
        }
        return { ...submitter, [field]: value };
      }
      return submitter;
    });

    setSubmitters(newSubmitters);
    const submittersObject = newSubmitters.reduce(
      (acc, submitter) => {
        if (submitter.name && submitter.usn) {
          acc[submitter.name] = submitter.usn;
        }
        return acc;
      },
      {} as { [key: string]: string },
    );
    setFormData((prev) => ({ ...prev, submitters: submittersObject }));
  };

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSubmitter = () => {
    if (submitters.length < 7) {
      const newSubmitters = [...submitters, { name: "", usn: "" }];
      setSubmitters(newSubmitters);
      const submittersObject = newSubmitters.reduce(
        (acc, submitter) => {
          if (submitter.name && submitter.usn) {
            acc[submitter.name] = submitter.usn;
          }
          return acc;
        },
        {} as { [key: string]: string },
      );
      setFormData((prev) => ({ ...prev, submitters: submittersObject }));
    }
  };

  const removeSubmitter = (index: number) => {
    const newSubmitters = submitters.filter((_, i) => i !== index);
    setSubmitters(newSubmitters);
    const submittersObject = newSubmitters.reduce(
      (acc, submitter) => {
        if (submitter.name && submitter.usn) {
          acc[submitter.name] = submitter.usn;
        }
        return acc;
      },
      {} as { [key: string]: string },
    );
    setFormData((prev) => ({ ...prev, submitters: submittersObject }));
  };

  const validateSubmitters = (
    submitters: { name: string; usn: string }[],
  ): boolean => {
    return submitters.every(
      (submitter) =>
        submitter.name.trim() !== "" && submitter.usn.trim() !== "",
    );
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
    try {
      const response = await generateTitlePage(formData);
      const url = URL.createObjectURL(response);
      setDownloadUrl(url);
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
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="submission_type" className="text-sm">
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
                className="h-9 focus-visible:ring-primary/50"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="subject_code" className="text-sm">
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
                className="h-9 focus-visible:ring-primary/50"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="subject_name" className="text-sm">
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
                className="h-9 focus-visible:ring-primary/50"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="semester_number" className="text-sm">
                  Semester Number
                </Label>
              </div>
              <Input
                id="semester_number"
                type="number"
                value={formData.semester_number}
                onChange={(e) => {
                  let value = Number.parseInt(e.target.value);
                  if (value > 8) {
                    value = 1;
                  } else if (value < 1 || isNaN(value)) {
                    value = 1;
                  }
                  handleInputChange("semester_number", value);
                }}
                onBlur={(e) => {
                  const value = Number.parseInt(e.target.value);
                  if (value > 8 || value < 1 || isNaN(value)) {
                    handleInputChange("semester_number", 1);
                  }
                }}
                required
                min="1"
                max="8"
                className="h-9 focus-visible:ring-primary/50"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <div className="flex items-center">
                <School className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="branch" className="text-sm">
                  Branch
                </Label>
              </div>
              <Input
                id="branch"
                value={formData.branch}
                onChange={(e) => handleInputChange("branch", e.target.value)}
                placeholder="e.g. Information Science Engineering"
                required
                className="h-9 focus-visible:ring-primary/50"
              />
              <p className="text-xs text-muted-foreground">
                Please enter the full name of your branch (e.g.,
                &lsquo;Information Science and Engineering&lsquo; instead of
                &lsquo;ISE&lsquo;)
              </p>
            </div>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              <Label htmlFor="topic_name" className="text-sm">
                Topic Name
              </Label>
            </div>
            <Input
              id="topic_name"
              value={formData.topic_name}
              onChange={(e) => handleInputChange("topic_name", e.target.value)}
              placeholder="e.g. 20 Solved Leetcode Problems"
              required
              className="h-9 focus-visible:ring-primary/50"
            />
          </div>

          <Separator className="my-2" />

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Submitters</Label>
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

          <Separator className="my-2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="faculty_name_with_title" className="text-sm">
                  Faculty Name with Title
                </Label>
              </div>
              <Input
                id="faculty_name_with_title"
                value={formData.faculty_name_with_title}
                onChange={(e) =>
                  handleInputChange("faculty_name_with_title", e.target.value)
                }
                placeholder="eg. Mr. Walter White"
                required
                className="h-9 focus-visible:ring-primary/50"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="designation" className="text-sm">
                  Designation
                </Label>
              </div>
              <Input
                id="designation"
                placeholder="e.g. Associate Professor"
                value={formData.designation}
                onChange={(e) =>
                  handleInputChange("designation", e.target.value)
                }
                required
                className="h-9 focus-visible:ring-primary/50"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center">
                <School className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="from_ay" className="text-sm">
                  From Academic Year
                </Label>
              </div>
              <Input
                id="from_ay"
                type="number"
                value={formData.from_ay}
                onChange={(e) =>
                  handleInputChange("from_ay", Number.parseInt(e.target.value))
                }
                required
                className="h-9 focus-visible:ring-primary/50"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center">
                <School className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="to_ay" className="text-sm">
                  To Academic Year
                </Label>
              </div>
              <Input
                id="to_ay"
                type="number"
                value={formData.to_ay}
                onChange={(e) =>
                  handleInputChange("to_ay", Number.parseInt(e.target.value))
                }
                required
                className="h-9 focus-visible:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full sm:w-auto h-9"
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
                className="w-full sm:w-auto h-9"
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
        </form>
      </div>
    </div>
  );
};

export default TitlePageForm;
