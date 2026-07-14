export interface SystemProfile {
  name: string;
  version: string;
  missionStatement: string;
  primaryFunctions: string[];
  currentFocus: string;
  technicalInterests: string[];
}

export interface ProjectDependency {
  id: string;
  name: string;
  type: 'core' | 'service' | 'module' | 'library';
}

export interface Project {
  id: string;
  name: string;
  overview: string;
  problemStatement: string;
  solution: string;
  technologies: string[];
  responsibilities: string[];
  impact: string[];
  githubLink?: string;
  liveDemo?: string;
  dependencies: ProjectDependency[];
}

export interface Skill {
  name: string;
  status: 'Operational' | 'Active' | 'Learning' | 'Optimized';
  category: 'Languages' | 'Web Technologies' | 'Core CS' | 'Tools & Platforms';
  value: number; // For loading progress bar animation
}

export interface LogEntry {
  id: string;
  role: string;
  organization: string;
  location: string;
  timeline: string;
  type: 'Internship' | 'Leadership' | 'Organization' | 'Affiliation' | 'Contribution';
  status: 'Deployed' | 'Active' | 'Archived';
  description: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  status: 'Verified' | 'In Progress';
  verificationId?: string;
  skillsUnlocked: string[];
}

export interface Milestone {
  version: string;
  title: string;
  date: string;
  description: string;
  status: 'released' | 'active' | 'scheduled';
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  leetcode: string;
}
