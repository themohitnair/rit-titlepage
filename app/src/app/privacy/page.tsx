import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Database, Cookie } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          Privacy Policy
        </h1>
        <Badge variant="secondary" className="text-xs">
          Last updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>

      <Alert className="mb-6">
        <AlertDescription className="flex items-center gap-2">
          <Eye className="h-4 w-4 flex-shrink-0" />
          <span>
            <strong>TL;DR:</strong> We don&apos;t store your data. Everything is processed locally. Google ads may track you for advertising.
          </span>
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Database className="h-5 w-5" />
              Information We Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Our title page generator temporarily processes the following information solely to create your academic document:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Student Information:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Names and University Seat Numbers (USNs)</li>
                  <li>• Academic details (semester, branch)</li>
                  <li>• Assignment/project topics</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Academic Information:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Subject names and codes</li>
                  <li>• Faculty details (names, designations)</li>
                  <li>• Department information</li>
                </ul>
              </div>
            </div>
            
            <Alert>
              <AlertDescription>
                <strong>No data is stored:</strong> All information is processed locally in your browser and discarded immediately after document generation. We have no servers storing your personal information.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Faculty Database Source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Faculty information displayed in our autocomplete feature is sourced from publicly available data from the MSRIT IRINS website.
            </p>
            
            <Alert>
              <AlertDescription>
                <strong>Disclaimer:</strong> This information may not be current, and we are not liable for any inaccuracies. We recommend verifying faculty details before finalizing your document.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              Google AdSense & Cookies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This website uses Google AdSense to display advertisements. Google AdSense uses cookies and similar technologies for:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">What Google Collects:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Your browsing behavior on our site</li>
                  <li>• Previous visits to our website</li>
                  <li>• Visits to other websites in Google&apos;s network</li>
                  <li>• Device and browser information</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Why Google Uses This:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Serve personalized advertisements</li>
                  <li>• Measure ad performance</li>
                  <li>• Provide targeted advertising</li>
                  <li>• Analyze website traffic patterns</li>
                </ul>
              </div>
            </div>
            
            <Separator />
            
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded">
              <p className="text-sm">
                <strong>Opt-out:</strong> You can opt out of personalized advertising by visiting{" "}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline font-medium"
                >
                  Google&apos;s Ads Settings
                </a>.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Since we don&apos;t store any personal data, there&apos;s no stored information to access, modify, or delete. Each use of our service is independent and temporary.
            </p>
            
            <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded border border-green-200">
              <h4 className="font-semibold text-sm text-green-800 dark:text-green-200 mb-2">
                What this means for you:
              </h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1 ml-4">
                <li>• No personal data retention or storage</li>
                <li>• No user accounts or profiles</li>
                <li>• No tracking of individual usage patterns</li>
                <li>• Complete privacy for your academic information</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">
              Apart from Google AdSense, we don&apos;t use any other third-party services that collect personal information. Our service operates entirely in your browser.
            </p>
            
            <Alert>
              <AlertDescription>
                <strong>Note:</strong> Links to external websites (like Google&apos;s opt-out page) are governed by their respective privacy policies.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Contact & Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:your-email@example.com" className="text-primary hover:underline font-medium">
                themohitnair@protonmail.com
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              We typically respond to privacy inquiries within 48 hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}