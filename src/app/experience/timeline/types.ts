export type Role = {
  title: string;
  accomplishments: string[];
  startDate: Date;
  endDate?: Date;
};

export type TimelineExperience = {
  id: string;
  companyName: string;
  roles: Role[];
  startYear: number;
  endYear: number | null;
  companyUrl: string;
  contractCompany?: string;
  contractCompanyUrl?: string;
  technologies: string[];
  contract?: boolean;
  internship?: boolean;
};

// Type-safe milestone key helpers
export type CompanyMilestoneKey = `company-${number}`;
export type RoleMilestoneKey = `role-${number}-${number}`;
export type MilestoneKey = CompanyMilestoneKey | RoleMilestoneKey;

export const milestoneKey = {
  company: (companyIndex: number): CompanyMilestoneKey =>
    `company-${companyIndex}`,
  role: (companyIndex: number, roleIndex: number): RoleMilestoneKey =>
    `role-${companyIndex}-${roleIndex}`,
} as const;
