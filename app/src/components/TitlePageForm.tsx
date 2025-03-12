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
import { AlertCircle, Download, Loader2, Plus, Trash2, Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

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
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-muted/40">
        <CardHeader className="bg-muted/20 pb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-2 py-1 text-xs font-medium">
              {formData.submission_type}
            </Badge>
            <CardTitle className="text-2xl sm:text-3xl">Generate Title Page</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Fill in the details for your academic submission
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="submission_type" className="text-sm font-medium">
                Submission Type
              </Label>
              <Select
                value={formData.submission_type}
                onValueChange={(value) => handleInputChange("submission_type", value as SubmissionType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select submission type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SubmissionType.ASSIGNMENT}>Assignment</SelectItem>
                  <SelectItem value={SubmissionType.REPORT}>Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject_code" className="text-sm font-medium">
                Subject Code
              </Label>
              <Input
                id="subject_code"
                value={formData.subject_code}
                onChange={(e) => handleInputChange("subject_code", e.target.value)}
                placeholder="e.g. CS101"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject_name" className="text-sm font-medium">
              Subject Name
            </Label>
            <Input
              id="subject_name"
              value={formData.subject_name}
              onChange={(e) => handleInputChange("subject_name", e.target.value)}
              placeholder="e.g. Introduction to Computer Science"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="semester_number" className="text-sm font-medium">
                Semester Number
              </Label>
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
              <Label htmlFor="branch" className="text-sm font-medium">
                Branch
              </Label>
              <Input
                id="branch"
                value={formData.branch}
                onChange={(e) => handleInputChange("branch", e.target.value)}
                placeholder="e.g. Computer Science Engineering"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic_name" className="text-sm font-medium">
              Topic Name
            </Label>
            <Input
              id="topic_name"
              value={formData.topic_name}
              onChange={(e) => handleInputChange("topic_name", e.target.value)}
              placeholder="e.g. Analysis of Sorting Algorithms"
              required
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Submitters</Label>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-xs">
                      {submitters.length}/7 submitters
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Maximum 7 submitters allowed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <ScrollArea className="h-[200px] rounded-md border">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
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
                          placeholder="USN"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSubmitter(index)}
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
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

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="faculty_name_with_title" className="text-sm font-medium">
              Faculty Name with Title
            </Label>
            <Input
              id="faculty_name_with_title"
              placeholder="e.g. Mr. Gustavo Fring"
              value={formData.faculty_name_with_title}
              onChange={(e) => handleInputChange("faculty_name_with_title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation" className="text-sm font-medium">
              Designation
            </Label>
            <Input
              id="designation"
              value={formData.designation}
              placeholder="e.g. Associate Professor"
              onChange={(e) => handleInputChange("designation", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="from_ay" className="text-sm font-medium">
                From Academic Year
              </Label>
              <Input
                type="number"
                id="from_ay"
                value={formData.from_ay}
                onChange={(e) => handleInputChange("from_ay", Number.parseInt(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to_ay" className="text-sm font-medium">
                To Academic Year
              </Label>
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
        <CardFooter className="flex flex-col sm:flex-row gap-3 p-6 bg-muted/10 border-t">
          <Button type="submit" className="w-full sm:w-auto" disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              "Generate Title Page"
            )}
          </Button>
          {downloadUrl && (
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              size="lg"
              onClick={() => window.open(downloadUrl, "_blank")}
            >
              <Download className="mr-2 h-4 w-4" /> Download Title Page
            </Button>
          )}
        </CardFooter>
        {error && (
          <Alert variant="destructive" className="mt-4 mx-6 mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Card>
    </form>
  )
}

export default TitlePageForm