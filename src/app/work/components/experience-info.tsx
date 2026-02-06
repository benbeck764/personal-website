import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Role = {
  title: string;
  accomplishments: string[];
  startDate: Date;
  endDate?: Date;
};

type ExperienceInfoProps = {
  roles: Role[];
  companyName: string;
  companyUrl: string;
  contractCompany?: string;
  contractCompanyUrl?: string;
  technologies: string[];
  contract?: boolean;
  internship?: boolean;
};

const formatDateRange = (startDate: Date, endDate?: Date): string => {
  const start = format(startDate, "MMM yyyy");
  const end = endDate ? format(endDate, "MMM yyyy") : "Present";
  return `${start} - ${end}`;
};

export const ExperienceInfo = ({
  roles,
  companyName,
  companyUrl,
  contractCompany,
  contractCompanyUrl,
  technologies,
  contract = false,
  internship = false,
}: ExperienceInfoProps) => {
  return (
    <Card className="space-y-6">
      {/* Company Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-2xl text-accent hover:underline"
          >
            {companyName}
            <ExternalLink className="h-5 w-5" />
          </a>
          {(contract || internship) && (
            <Badge variant={internship ? "secondary" : "outline"}>
              {internship ? "Internship" : "Contract"}
            </Badge>
          )}
        </div>
        {contract && contractCompany && contractCompanyUrl && (
          <p className="text-foreground/70 text-sm">
            via{" "}
            <a
              href={contractCompanyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {contractCompany}
            </a>
          </p>
        )}
      </div>

      {/* Roles */}
      <div className="space-y-6">
        {roles.map((role) => (
          <div
            key={`${role.title}-${role.startDate.getTime()}`}
            className="border-accent border-l-2 pl-4"
          >
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-semibold text-lg">{role.title}</h3>
              <span className="text-foreground/60 text-sm">
                {formatDateRange(role.startDate, role.endDate)}
              </span>
            </div>
            {role.accomplishments.length > 0 && (
              <ul className="list-inside list-disc space-y-2 text-foreground/80">
                {role.accomplishments.map((accomplishment) => (
                  <li key={accomplishment} className="leading-relaxed">
                    {accomplishment}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Technologies */}
      <div>
        <h4 className="mb-3 font-semibold text-foreground/70 text-sm uppercase tracking-wider">
          Technologies
        </h4>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};
