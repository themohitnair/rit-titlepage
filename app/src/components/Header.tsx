"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            ritlepage
          </Link>
        </h1>
        <div className="w-9 h-9"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center py-4">
      <h1 className="text-2xl sm:text-3xl font-bold">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          ritlepage
        </Link>
      </h1>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
