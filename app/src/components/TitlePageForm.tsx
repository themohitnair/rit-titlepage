"use client"

import type React from "react"
import { useState } from "react"
import { SubmissionType, type SubmissionParams } from "@/lib/types"
import { generateTitlePage } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Download, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const TitlePageForm: React.FC = () => {
  const [formData, setFormData] = useState<SubmissionParams>({
    submission_type: SubmissionType.ASSIGNMENT,
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
  })

  const [submitters, setSubmitters] = useState<{ name: string; usn: string }[]>([{ name: "", usn: "" }])

  const [isLoading, setIsLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmitterChange = (index: number, field: "name" | "usn", value: string) => {
    const newSubmitters = submitters.map((submitter, i) => {
      if (i === index) {
        if (field === "usn" && !value.startsWith("1MS") && value !== "") {
          return { ...submitter, [field]: `1MS${value}` }
        }
        return { ...submitter, [field]: value }
      }
      return submitter
    })
    setSubmitters(newSubmitters)

    const submittersObject = newSubmitters.reduce(
      (acc, submitter) => {
        if (submitter.name && submitter.usn) {
          acc[submitter.name] = submitter.usn
        }
        return acc
      },
      {} as { [key: string]: string },
    )

    setFormData((prev) => ({ ...prev, submitters: submittersObject }))
  }

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addSubmitter = () => {
    if (submitters.length < 7) {
      const newSubmitters = [...submitters, { name: "", usn: "" }]
      setSubmitters(newSubmitters)

      const submittersObject = newSubmitters.reduce(
        (acc, submitter) => {
          if (submitter.name && submitter.usn) {
            acc[submitter.name] = submitter.usn
          }
          return acc
        },
        {} as { [key: string]: string },
      )

      setFormData((prev) => ({ ...prev, submitters: submittersObject }))
    }
  }

  const removeSubmitter = (index: number) => {
    const newSubmitters = submitters.filter((_, i) => i !== index)
    setSubmitters(newSubmitters)

    const submittersObject = newSubmitters.reduce(
      (acc, submitter) => {
        if (submitter.name && submitter.usn) {
          acc[submitter.name] = submitter.usn
        }
        return acc
      },
      {} as { [key: string]: string },
    )

    setFormData((prev) => ({ ...prev, submitters: submittersObject }))
  }

  const validateSubmitters = (submitters: { name: string; usn: string }[]): boolean => {
    return submitters.every((submitter) => submitter.name.trim() !== "" && submitter.usn.trim() !== "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSubmitters(submitters)) {
      setError("Please fill in all submitter names and USNs, or remove empty submitter fields.")
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const response = await generateTitlePage(formData)
      const url = URL.createObjectURL(response)
      setDownloadUrl(url)
    } catch (error) {
      console.error("Error generating title page:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Generate Title Page</CardTitle>
          <CardDescription>Fill in the details for your assignment or report</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="submission_type">Submission Type</Label>
            <Select
              value={formData.submission_type}
              onValueChange={(value) => handleInputChange("submission_type", value as SubmissionType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select submission type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SubmissionType.ASSIGNMENT}>Assignment</SelectItem>
                <SelectItem value={SubmissionType.REPORT}>Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject_name">Subject Name</Label>
            <Input
              id="subject_name"
              value={formData.subject_name}
              onChange={(e) => handleInputChange("subject_name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject_code">Subject Code</Label>
            <Input
              id="subject_code"
              value={formData.subject_code}
              onChange={(e) => handleInputChange("subject_code", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester_number">Semester Number</Label>
            <Input
              type="number"
              id="semester_number"
              value={formData.semester_number}
              onChange={(e) => handleInputChange("semester_number", Number.parseInt(e.target.value))}
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              value={formData.branch}
              onChange={(e) => handleInputChange("branch", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic_name">Topic Name</Label>
            <Input
              id="topic_name"
              value={formData.topic_name}
              onChange={(e) => handleInputChange("topic_name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Submitters</Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Name</TableHead>
                  <TableHead className="w-[40%]">USN</TableHead>
                  <TableHead className="w-[10%]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submitters.map((submitter, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        placeholder="e.g. John Doe"
                        value={submitter.name}
                        onChange={(e) => handleSubmitterChange(index, "name", e.target.value)}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={submitter.usn.startsWith("1MS") ? submitter.usn : `1MS${submitter.usn}`}
                        onChange={(e) => handleSubmitterChange(index, "usn", e.target.value)}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      {index > 0 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeSubmitter(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {submitters.length < 7 && (
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addSubmitter}>
                <Plus className="mr-2 h-4 w-4" /> Add Submitter
              </Button>
            )}
            {submitters.length >= 7 && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Maximum submitters reached</AlertTitle>
                <AlertDescription>You can add a maximum of 7 submitters.</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="faculty_name_with_title">Faculty Name with Title</Label>
            <Input
              id="faculty_name_with_title"
              placeholder="e.g. Mr. Gustavo Fring"
              value={formData.faculty_name_with_title}
              onChange={(e) => handleInputChange("faculty_name_with_title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              value={formData.designation}
              placeholder="e.g. Associate Professor"
              onChange={(e) => handleInputChange("designation", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from_ay">From Academic Year</Label>
              <Input
                type="number"
                id="from_ay"
                value={formData.from_ay}
                onChange={(e) => handleInputChange("from_ay", Number.parseInt(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to_ay">To Academic Year</Label>
              <Input
                type="number"
                id="to_ay"
                value={formData.to_ay}
                onChange={(e) => handleInputChange("to_ay", Number.parseInt(e.target.value))}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Title Page"}
          </Button>
          {downloadUrl && (
            <Button
              type="button"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold"
              onClick={() => window.open(downloadUrl, "_blank")}
            >
              <Download className="mr-2 h-4 w-4" /> Download Title Page
            </Button>
          )}
        </CardFooter>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Card>
    </form>
  )
}

export default TitlePageForm;