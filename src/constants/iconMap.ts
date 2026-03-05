// Icon mapping for the application
import cvIcon from '../assets/CVIcon.png';
import projectsIcon from '../assets/ProjectsIcon.png';
import aboutIcon from '../assets/AboutMeIcon.png';
import contactIcon from '../assets/ContactIcon.png';
import trashIcon from '../assets/TrashCanIcon.png';
import moleIcon from '../assets/mole.png';

// System icon is missing, using a placeholder for now
// TODO: Add a proper system icon asset
import systemIcon from '../assets/react.svg';

// Icon mapping object that maps icon keys to their respective assets
export const iconMap = {
  cv: cvIcon,
  projects: projectsIcon,
  about: aboutIcon,
  contact: contactIcon,
  trash: trashIcon,
  system: systemIcon,
  whackamole: moleIcon,
};

// Type for icon keys
export type IconKey = keyof typeof iconMap;