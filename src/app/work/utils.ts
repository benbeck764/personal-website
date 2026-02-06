import { format } from "date-fns";

// Format date as "Mon YYYY" (e.g., "Dec 2023")
export const formatDate = (date: Date): string => {
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

// Format date range as "Mon yyyy - Mon yyyy" or "Mon yyyy - Present"
export const formatDateRange = (startDate: Date, endDate?: Date): string => {
  const start = format(startDate, "MMM yyyy");
  const end = endDate ? format(endDate, "MMM yyyy") : "Present";
  return `${start} - ${end}`;
};
