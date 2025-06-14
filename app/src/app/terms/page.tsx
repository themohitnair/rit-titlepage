import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <Badge variant="secondary" className="text-xs">
          Last updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>

      <Alert className="mb-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> By using this service, you acknowledge these terms and accept full responsibility for verifying all information before academic submission.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Service Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our title page generator is a free tool that creates academic title pages in DOCX format based on your input. The service processes your information locally and generates downloadable documents.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Acceptable Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-600 mb-2">✓ Permitted Uses:</h3>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Creating legitimate academic title pages</li>
                <li>• Educational and academic purposes</li>
                <li>• Generating documents with accurate information</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-red-600 mb-2">✗ Prohibited Uses:</h3>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Input false or misleading academic information</li>
                <li>• Use the service for any fraudulent purposes</li>
                <li>• Attempt to compromise the service&apos;s functionality</li>
                <li>• Submit documents without proper verification</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Critical Disclaimer - Information Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                <strong>Faculty Information:</strong> Faculty data is sourced from publicly available information and may be outdated, incorrect, or incomplete. We are NOT responsible for:
              </AlertDescription>
            </Alert>
            <ul className="space-y-2 text-sm text-muted-foreground ml-4">
              <li>• Accuracy of faculty names, designations, or departments</li>
              <li>• Current employment status of listed faculty members</li>
              <li>• Completeness or currency of the faculty database</li>
              <li>• Faculty members who may have transferred, retired, or changed roles</li>
            </ul>
            
            <Alert>
              <AlertDescription>
                <strong>Student Information:</strong> You are solely responsible for ensuring all student information (names, USNs, academic details) is accurate and current.
              </AlertDescription>
            </Alert>
            
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200">
              <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                ⚠️ YOU MUST VERIFY ALL INFORMATION BEFORE SUBMITTING ACADEMIC WORK
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-xl text-red-800 dark:text-red-200">
              Limitation of Liability - Academic Consequences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>We are NOT liable for any academic, professional, or personal consequences resulting from the use of generated documents.</strong>
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3 text-sm">
              <h4 className="font-semibold">This includes but is not limited to:</h4>
              <ul className="space-y-2 ml-4 text-muted-foreground">
                <li>• <strong>Academic failures</strong> or poor grades due to incorrect information</li>
                <li>• <strong>Rejection of submissions</strong> by college faculty or administration</li>
                <li>• <strong>Disciplinary action</strong> for submitting documents with wrong faculty details</li>
                <li>• <strong>Delays in academic progress</strong> due to resubmission requirements</li>
                <li>• <strong>Loss of marks</strong> for formatting or information errors</li>
                <li>• <strong>Administrative penalties</strong> from your educational institution</li>
                <li>• <strong>Faculty complaints</strong> about incorrect attribution or details</li>
              </ul>
            </div>
            
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded border">
              <p className="text-xs font-medium text-red-800 dark:text-red-200">
                <strong>IMPORTANT:</strong> Always double-check faculty names, designations, and student details with your institution before final submission.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Service Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This service is provided &apos;as is&apos; without warranty. We may modify, suspend, or discontinue the service at any time without notice. We do not guarantee uninterrupted access or error-free operation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Document Compatibility & Technical Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Generated documents are optimized for Microsoft Word. We are not responsible for:
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground ml-4">
              <li>• Formatting issues when opening in other applications (Google Docs, LibreOffice, etc.)</li>
              <li>• Loss of design elements in non-Word applications</li>
              <li>• Download failures or corrupted files</li>
              <li>• Browser compatibility issues</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Questions about these Terms? Contact us at{" "}
              <a href="mailto:your-email@example.com" className="text-primary hover:underline">
                themohitnair@protonmail.com
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Note: We cannot provide support for academic issues or disputes arising from document use.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}