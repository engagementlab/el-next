import { relationship } from '@keystone-6/core/fields';
import Slideshow from '../slideshow';

const slideshow = Slideshow({
  semesterSlides: relationship({
    ref: 'Semester.slides',
    many: true,
    ui: {
      createView: {
        fieldMode: 'hidden',
      },
      itemView: {
        fieldMode: 'hidden',
      },
    },
  }),
});

export { slideshow as Slideshow };
export { default as About } from './lists/about';
export { default as Filter } from './lists/filter';
export { default as Event } from './lists/event';
export { default as Graduate } from './lists/graduate';
export { default as Initiative } from './lists/initiative';
export { default as InitiativesLanding } from './lists/initiativesLanding';
export { default as LearningPartners } from './lists/learningPartners';
export { default as NewsItem } from './lists/newsItem';
export { default as ResearchProject } from './lists/researchProject';
export { default as Publication } from './lists/publication';
export { default as StudioProject } from './lists/studioProject';
export { default as Slide } from './lists/slide';
export { default as Studio } from './lists/studio';
export { default as Semester } from './lists/semester';
export { default as Partner } from './lists/partners';
export { default as Person } from './lists/person';
export { default as Undergraduate } from './lists/undergraduate';
