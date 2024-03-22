import { relationship } from '@keystone-6/core/fields';
import Slideshow from '../slideshow';

const slideshow = Slideshow();
export { slideshow as Slideshow };

export { default as About } from './lists/about';
export { default as Person } from './lists/person';
export { default as Home } from './lists/home';
export { default as Event } from './lists/event';
export { default as Award } from './lists/award';
export { default as Slide } from '../slide';
export { default as GallerySlide } from './lists/gallerySlide';
