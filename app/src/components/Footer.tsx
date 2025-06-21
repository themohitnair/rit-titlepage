import Link from "next/link";
import { Code2, Heart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Left Section */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> by{" "}
            <Link
              href="https://mohitnair.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Mohit Nair
            </Link>
          </div>

          {/* Center Section - Legal Links */}
          <div className="flex items-center justify-center gap-4 text-sm order-last md:order-none">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex justify-center md:justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      href="https://github.com/themohitnair/ritlepage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Code2 className="h-4 w-4" />
                      View Source
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Check out the source code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <Alert className="mt-6 md:mt-8">
          <AlertDescription className="text-xs text-center">
            This tool generates academic documents. Please verify all information before submission.
          </AlertDescription>
        </Alert>
      </div>
    </footer>
  );
}
