"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  label: string;
  children: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  defaultTab?: number;
  className?: string;
};

export const Tabs = ({ tabs, defaultTab = 0, className }: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Labels */}
      <div className="mb-6 flex flex-wrap gap-2 border-border border-b pb-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActiveTab(index)}
            className={cn(
              "rounded-md px-4 py-2 font-medium text-sm transition-all",
              activeTab === index
                ? "bg-accent text-white shadow-md"
                : "bg-background text-foreground/70 hover:bg-muted hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">{tabs[activeTab]?.children}</div>
    </div>
  );
};
