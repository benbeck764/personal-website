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
