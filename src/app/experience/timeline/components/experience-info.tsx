import { ExternalLink } from "lucide-react";
import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TimelineExperience } from "../types";
import { formatDateRange } from "../utils";

type ExperienceInfoProps = {
  experience: TimelineExperience;
  activeRoleIndex?: number;
};

export const ExperienceInfo = memo(({ experience, activeRoleIndex }: ExperienceInfoProps) => {
  const {
    roles,
    companyName,
    companyUrl,
    contractCompany,
    contractCompanyUrl,
    technologies,
    contract = false,
    internship = false,
  } = experience;

  return (
    <Card className="flex flex-col overflow-hidden bg-card pr-2 pl-4">
      {/* Company Header - Fixed */}
      <div className="-m-6 z-10 mb-0 shrink-0 border-border border-b bg-card p-4 py-4 pl-6">
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
            <Badge variant={internship ? "secondary" : "outline"}>{internship ? "Internship" : "Contract"}</Badge>
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

      {/* Scrollable Content */}
      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto pt-6 pr-4">
        {/* Roles */}
        <div className="space-y-6">
          {roles.map((role, index) => {
            const isActive = activeRoleIndex === index;
            return (
              <div
                key={`${role.title}-${role.startDate.getTime()}`}
                className={cn(
                  "border-l-2 pl-4 transition-all duration-300",
                  isActive
                    ? "border-accent border-l-4 shadow-[-5px_0px_5px_-5px_rgba(var(--accent-rgb),0.4)]"
                    : "border-accent/50",
                )}
              >
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-lg">{role.title}</h3>
                  <span className="text-foreground/60 text-sm">{formatDateRange(role.startDate, role.endDate)}</span>
                </div>
                {role.accomplishments.length > 0 && (
                  <ul className="list-inside list-disc space-y-2 text-foreground/80">
                    {role.accomplishments.map((accomplishment, id) => {
                      if (!accomplishment.trim())
                        return (
                          <br
                            key={`spacer-${
                              // biome-ignore lint/suspicious/noArrayIndexKey: <spacer>
                              id
                            }`}
                          />
                        ); // Empty accomplishment is a spacer, render as line break
                      return (
                        <li key={accomplishment} className="leading-relaxed">
                          {accomplishment}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Technologies */}
        <div>
          <h4 className="mb-3 font-semibold text-foreground/70 text-sm uppercase tracking-wider">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
});
