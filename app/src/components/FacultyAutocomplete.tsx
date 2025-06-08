'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Faculty } from '@/lib/types';
import { loadFacultyData, searchFaculty } from '@/lib/faculty-data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FacultyAutocompleteProps {
  onFacultySelect: (faculty: Faculty | null) => void;
  facultyName: string;
  onFacultyNameChange: (name: string) => void;
  prefix: string;
  onPrefixChange: (prefix: string) => void;
  designation: string;
  onDesignationChange: (designation: string) => void;
}

export function FacultyAutocomplete({
  onFacultySelect,
  facultyName,
  onFacultyNameChange,
  prefix,
  onPrefixChange,
  designation,
  onDesignationChange
}: FacultyAutocompleteProps) {
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const [suggestions, setSuggestions] = useState<Faculty[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load faculty data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await loadFacultyData();
      setFacultyData(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Handle faculty name input change
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
    
    // Clear selected faculty if input changes
    if (selectedFaculty && selectedFaculty.name !== value) {
      setSelectedFaculty(null);
      onFacultySelect(null);
    }
  };

  // Handle faculty selection from dropdown - AUTO-FILL AUTOMATICALLY
  const handleFacultySelect = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    onFacultySelect(faculty);
    onFacultyNameChange(faculty.name);
    
    // AUTO-FILL the other fields immediately
    onPrefixChange(faculty.prefix);
    onDesignationChange(faculty.designation);
    
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Handle input blur
  const handleBlur = () => {
    // Delay hiding suggestions to allow click events
    setTimeout(() => setShowSuggestions(false), 150);
  };

  return (
    <div className="space-y-4">
      {/* Faculty Search Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="faculty_name" className="text-sm font-medium">
            Faculty Name
          </Label>
          {selectedFaculty && (
            <span className="text-xs text-green-600 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Auto-filled
            </span>
          )}
        </div>
        
        <div className="relative">
          <Input
            ref={inputRef}
            id="faculty_name"
            value={facultyName}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => facultyName && setSuggestions(searchFaculty(facultyName, facultyData))}
            onBlur={handleBlur}
            placeholder={isLoading ? "Loading faculty data..." : "Start typing faculty name..."}
            disabled={isLoading}
            required
            className="h-10 focus-visible:ring-primary/50"
          />
          
          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto">
              {suggestions.map((faculty, index) => (
                <div
                  key={`${faculty.name}-${index}`}
                  className="px-3 py-2 hover:bg-muted cursor-pointer text-sm border-b last:border-b-0"
                  onClick={() => handleFacultySelect(faculty)}
                >
                  <div className="font-medium">{faculty.prefix}. {faculty.name}</div>
                  <div className="text-xs text-muted-foreground">{faculty.designation}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prefix and Designation - Two Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prefix" className="text-sm font-medium">
            Title/Prefix
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
          <Label htmlFor="designation" className="text-sm font-medium">
            <span>Designation</span>
            {selectedFaculty && (
              <span className="ml-2 text-xs text-muted-foreground">(editable)</span>
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
    </div>
  );
}
