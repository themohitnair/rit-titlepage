import Link from "next/link";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 mx-auto">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Developed by</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link
                    href="https://github.com/themohitnair"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium"
                  >
                    Mohit Nair
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Visit GitHub profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link
                    href="https://github.com/themohitnair/rit-titlepage"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Source code"
                  >
                    <Code2 className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View source code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </footer>
  );
}
