import { HTMLProps } from 'react';
import {
  Project,
  ResearchProject,
  Semester,
  StudioProject,
  Theme,
  Theming,
} from './types';

export const ProjectsSort = (projects: Project[]) => {
  return projects.sort((a, b) => {
    // Pinned projects always come first
    if (a.pin || b.pin) return -1;

    // Get year from start year (research) or semester key
    const aYr = a.startYear
      ? [a.startYear]
      : a.semester[0].key.match(/\d{4}/gm);
    const bYr = b.startYear
      ? [b.startYear]
      : b.semester[0].key.match(/\d{4}/gm);

    if (aYr && bYr) {
      const strAYr = parseInt(aYr[0].toString());
      const strBYr = parseInt(bYr[0].toString());
      if (strAYr === strBYr) {
        // Compare seasons only for studio projects
        if (!a.startYear && !b.startYear) {
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

        // Research projects always show after studio projects
        return -1;
      }

      // Just use year
      return strBYr - strAYr;
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

export const GetThemeFromDBKey = (
  initiatives: string[]
): { theme: Theme; themeKey: string } => {
  let theme = Theme.none;
  let themeKey = 'none';
  if (initiatives && initiatives.length > 0) {
    if (initiatives[0] === 'gunviolence') {
      theme = Theme.gunviolence;
      themeKey = 'tngv';
    } else if (initiatives[0] === 'climate') {
      theme = Theme.climate;
      themeKey = 'tnej';
    }
  }

  return { theme, themeKey };
};
