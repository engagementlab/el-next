import { HTMLProps } from 'react';
import {
  Project,
  ResearchProject,
  Semester,
  StudioProject,
  Theming,
} from './types';

export const StudioProjectsSort = (projects: Project[]) => {
  return projects.sort((a, b) => {
    // Get year from start year (research) or semester key
    const aYr = a.startYear
      ? [a.startYear]
      : a.semester[0].key.match(/\d{4}/gm);
    const bYr = b.startYear
      ? [b.startYear]
      : b.semester[0].key.match(/\d{4}/gm);

    if (aYr && bYr) {
      // Compare seasons only for studio projects
      if (aYr[0] === bYr[0] && !a.startYear && !b.startYear) {
        // Get season name
        const aSeason = a.semester[0].name.substring(
          0,
          a.semester[0].name.indexOf('-') - 1
        );
        const bSeason = b.semester[0].name.substring(
          0,
          b.semester[0].name.indexOf('-') - 1
        );
        // If years AND season match maintain alphabetic order by name
        if (aSeason === bSeason) return a.name.localeCompare(b.name);
        // otherwise, if just years match, use fall vs spring
        return a.semester[0].name.includes('Fall') ? -1 : 1;
      }

      // Just use year
      return parseInt(bYr[0].toString()) - parseInt(aYr[0].toString());
    }

    // Fallback to name alpha order
    return a.name.localeCompare(b.name);
  });
};

export const SemestersSort = (semesters: Semester[]) => {
  let sortedSemesters = semesters
    .filter((v) => v.type !== 'current')
    .sort((a, b) => {
      // Get year from semester key
      const aYr = a.key.match(/\d{4}/gm);
      const bYr = b.key.match(/\d{4}/gm);

      if (aYr && bYr) {
        // If years match, use fall vs spring
        if (aYr[0] === bYr[0]) return a.key.includes('fall') ? 1 : -1;
        return parseInt(aYr[0]) - parseInt(bYr[0]);
      }
      return 0;
    });

  const current = semesters.filter((v) => v.type === 'current')[0];
  if (current && sortedSemesters) sortedSemesters.push(current);

  return sortedSemesters;
};

export const ClassFilterButton = (
  open: boolean,
  themeKey: string
): HTMLProps<HTMLElement>['className'] => {
  return `flex items-center transition-all text-sm font-bold border-2 rounded-large px-3 py-2 leading-none ${
    !open
      ? `bg-white ${Theming[themeKey].text}`
      : `text-white ${Theming[themeKey].bg}`
  }`;
};
