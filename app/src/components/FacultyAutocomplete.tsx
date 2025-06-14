'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Faculty } from '@/lib/types';
import { loadFacultyData, searchFaculty } from '@/lib/faculty-data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FacultyAutocompleteProps {
  onFacultySelect: (faculty: Faculty | null) => void;
  facultyName: string;
  onFacultyNameChange: (name: string) => void;
  prefix: string;
  onPrefixChange: (prefix: string) => void;
  designation: string;
  onDesignationChange: (designation: string) => void;
  branch: string;
  onBranchChange: (branch: string) => void;
}

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

export function FacultyAutocomplete({
  onFacultySelect,
  facultyName,
  onFacultyNameChange,
  prefix,
  onPrefixChange,
  designation,
  onDesignationChange,
  branch,
  onBranchChange
}: FacultyAutocompleteProps) {
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const [suggestions, setSuggestions] = useState<Faculty[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await loadFacultyData();
      setFacultyData(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleInputChange = (value: string) => {
    onFacultyNameChange(value);
    
    if (value.length > 0) {
      const results = searchFaculty(value, facultyData);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    
    if (selectedFaculty && selectedFaculty.name !== value) {
      setSelectedFaculty(null);
      onFacultySelect(null);
    }
  };

  const handleFacultySelect = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    onFacultySelect(faculty);
    onFacultyNameChange(faculty.name);
    
    onPrefixChange(faculty.prefix);
    onDesignationChange(faculty.designation);
    onBranchChange(faculty.branch);
    
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150);
  };

  return (
    <div className="space-y-4">
      {/* Faculty Search Input */}
      <div className="space-y-2">
        <Label htmlFor="faculty-name" className="text-sm font-medium flex items-center gap-2">
          Faculty Name
          {selectedFaculty && (
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
              Auto-filled
            </Badge>
          )}
        </Label>
        <div className="relative">
          <Input
            id="faculty-name"
            ref={inputRef}
            value={facultyName}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => facultyName && setSuggestions(searchFaculty(facultyName, facultyData))}
            onBlur={handleBlur}
            placeholder={isLoading ? "Loading faculty data..." : "Start typing faculty name..."}
            disabled={isLoading}
            required
            className="h-10 focus-visible:ring-primary/50"
          />

          {/* Theme-aware Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
              {suggestions.map((faculty, index) => (
                <div
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground border-b border-border/50 last:border-b-0 transition-colors"
                  onClick={() => handleFacultySelect(faculty)}
                >
                  <div className="font-medium text-sm text-foreground">
                    {faculty.prefix}. {faculty.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {faculty.designation} • {faculty.branch}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Responsive Grid for Prefix and Designation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prefix" className="text-sm font-medium flex items-center gap-2">
            Prefix
            {selectedFaculty && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                (editable)
              </Badge>
            )}
          </Label>
          <Input
            id="prefix"
            value={prefix}
            onChange={(e) => onPrefixChange(e.target.value)}
            placeholder="DR/MR/MRS/MS/PROF"
            required
            className="h-10 focus-visible:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="designation" className="text-sm font-medium flex items-center gap-2">
            Designation
            {selectedFaculty && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                (editable)
              </Badge>
            )}
          </Label>
          <Input
            id="designation"
            value={designation}
            onChange={(e) => onDesignationChange(e.target.value)}
            placeholder="e.g. Assistant Professor"
            required
            className="h-10 focus-visible:ring-primary/50"
          />
        </div>
      </div>

      {/* Branch Field - Full Width */}
      <div className="space-y-2">
        <Label htmlFor="branch" className="text-sm font-medium flex items-center gap-2">
          Branch/Department
          {selectedFaculty && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
              (editable)
            </Badge>
          )}
        </Label>
        <Select value={branch} onValueChange={onBranchChange} required>
          <SelectTrigger className="h-10 focus-visible:ring-primary/50">
            <SelectValue placeholder="Select branch/department" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {MSRIT_BRANCHES.map((branchOption) => (
              <SelectItem key={branchOption} value={branchOption}>
                {branchOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}