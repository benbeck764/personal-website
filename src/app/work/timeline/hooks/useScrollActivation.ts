import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import type { MilestoneKey, TimelineExperience } from "../types";
import { milestoneKey } from "../types";
import type { MilestonePosition } from "./useMilestonePositions";

type UseScrollActivationResult = {
  activeCompanyIndex: number;
  activeRoleIndex: Record<number, number>;
  setActiveCompanyIndex: Dispatch<SetStateAction<number>>;
  setActiveRoleIndex: Dispatch<SetStateAction<Record<number, number>>>;
  lastActiveMilestone: {
    key: MilestoneKey;
    companyIndex: number;
    roleIndex: number;
  } | null;
};

export const useScrollActivation = (
  experiences: TimelineExperience[],
  milestonePositions: Map<MilestoneKey, MilestonePosition>,
  milestoneRefs: RefObject<Map<MilestoneKey, HTMLButtonElement | null>>,
): UseScrollActivationResult => {
  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0);
  const [activeRoleIndex, setActiveRoleIndex] = useState<
    Record<number, number>
  >(
    { 0: 0 }, // Start with latest role of latest company
  );

  const prevMilestoneRef = useRef({ companyIndex: 0, roleIndex: 0 });
  const [lastActiveMilestone, setLastActiveMilestone] = useState<{
    key: MilestoneKey;
    companyIndex: number;
    roleIndex: number;
  } | null>(null);

  // Scroll-based activation: Find nearest milestone to viewport center
  useEffect(() => {
    if (!milestonePositions.size) return;

    const handleScrollActivation = () => {
      // If at the very top of the page, keep the default state (latest role of latest company)
      if (window.scrollY === 0) {
        setActiveCompanyIndex(0);
        setActiveRoleIndex((prev) => ({ ...prev, 0: 0 }));
        return;
      }

      const viewportCenter = window.innerHeight / 2;

      // Find the milestone closest to viewport center
      let closestMilestone: {
        companyIndex: number;
        roleIndex: number;
        distance: number;
      } | null = null;

      experiences.forEach((experience, companyIndex) => {
        const lastRoleIndex = experience.roles.length - 1;

        // Check company milestone (always at last role position)
        const companyKey = milestoneKey.company(companyIndex);
        const companyMilestone = milestoneRefs.current.get(companyKey);
        if (companyMilestone) {
          const rect = companyMilestone.getBoundingClientRect();
          const milestoneCenter = rect.top + rect.height / 2;
          const distance = Math.abs(milestoneCenter - viewportCenter);

          if (!closestMilestone || distance < closestMilestone.distance) {
            closestMilestone = {
              companyIndex,
              roleIndex: lastRoleIndex,
              distance,
            };
          }
        }

        // Check role sub-milestones (all roles except last)
        if (experience.roles.length > 1) {
          experience.roles.slice(0, -1).forEach((_, roleIndex) => {
            const roleKey = milestoneKey.role(companyIndex, roleIndex);
            const roleMilestone = milestoneRefs.current.get(roleKey);
            if (roleMilestone) {
              const rect = roleMilestone.getBoundingClientRect();
              const milestoneCenter = rect.top + rect.height / 2;
              const distance = Math.abs(milestoneCenter - viewportCenter);

              if (!closestMilestone || distance < closestMilestone.distance) {
                closestMilestone = {
                  companyIndex,
                  roleIndex,
                  distance,
                };
              }
            }
          });
        }
      });

      // Activate the closest milestone and trigger callback if changed
      if (closestMilestone) {
        const { companyIndex, roleIndex } = closestMilestone;

        // Check if milestone changed
        const hasChanged =
          prevMilestoneRef.current.companyIndex !== companyIndex ||
          prevMilestoneRef.current.roleIndex !== roleIndex;

        if (hasChanged) {
          setActiveCompanyIndex(companyIndex);
          setActiveRoleIndex((prev) => ({
            ...prev,
            [companyIndex]: roleIndex,
          }));

          // Store the last active milestone for ember burst spawning
          const lastRoleIndex = experiences[companyIndex].roles.length - 1;
          const activeMilestoneKey =
            roleIndex === lastRoleIndex
              ? milestoneKey.company(companyIndex)
              : milestoneKey.role(companyIndex, roleIndex);
          setLastActiveMilestone({
            key: activeMilestoneKey,
            companyIndex,
            roleIndex,
          });

          // Update previous milestone
          prevMilestoneRef.current = { companyIndex, roleIndex };
        }
      }
    };

    // Run on scroll only (scroll is always at top on mount due to Timeline component)
    window.addEventListener("scroll", handleScrollActivation, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScrollActivation);
    };
  }, [milestonePositions, experiences, milestoneRefs]);

  return {
    activeCompanyIndex,
    activeRoleIndex,
    setActiveCompanyIndex,
    setActiveRoleIndex,
    lastActiveMilestone,
  };
};
