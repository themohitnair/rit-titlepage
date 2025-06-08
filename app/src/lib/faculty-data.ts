import { Faculty } from './types';

let facultyCache: Faculty[] | null = null;

export async function loadFacultyData(): Promise<Faculty[]> {
  if (facultyCache) {
    return facultyCache;
  }

  try {
    const response = await fetch('/faculty.jsonl');
    const text = await response.text();
    
    const faculty: Faculty[] = text
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));
    
    facultyCache = faculty;
    return faculty;
  } catch (error) {
    console.error('Error loading faculty data:', error);
    return [];
  }
}

export function searchFaculty(query: string, faculty: Faculty[]): Faculty[] {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return faculty.filter(f =>
    f.name.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 10);
}
