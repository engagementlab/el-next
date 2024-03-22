import { StudioProject } from './types';

export const StudioProjectsSort = (projects: StudioProject[]) => {
  return projects.sort((a, b) => {
    // Get year from semester key
    const aYr = a.semester[0].key.match(/\d{4}/gm);
    const bYr = b.semester[0].key.match(/\d{4}/gm);
    // Get season name
    const aSeason = a.semester[0].name.substring(
      0,
      a.semester[0].name.indexOf('-') - 1
    );
    const bSeason = b.semester[0].name.substring(
      0,
      b.semester[0].name.indexOf('-') - 1
    );

    if (aYr && bYr) {
      if (aYr[0] === bYr[0]) {
        // If years AND season match maintain alphabetic order by name
        if (aSeason === bSeason) return a.name.localeCompare(b.name);
        // otherwise, if just years match, use fall vs spring
        return a.semester[0].name.includes('Fall') ? -1 : 1;
      }

      // Just use year
      return parseInt(bYr[0]) - parseInt(aYr[0]);
    }

    // Fallback to name alpha order
    return a.name.localeCompare(b.name);
  });
};
