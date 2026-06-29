import type { VSCodeFile } from "@/types";
import { about } from "./about";
import { projects } from "./projects";
import { skillCategories } from "./skills";
import { experiences } from "./experience";

export const vscodeFiles: VSCodeFile[] = [
  {
    name: "about.ts",
    language: "typescript",
    content: `// about.ts — Developer Profile
export const developer = {
  name: "${about.name}",
  titles: ${JSON.stringify(about.titles, null, 2).replace(/\n/g, "\n  ")},
  location: "${about.location}",
  email: "${about.email}",
  github: "${about.github}",
  linkedin: "${about.linkedin}",
};

export const bio = \`${about.intro.slice(0, 200)}...\`;

export default developer;`,
  },
  {
    name: "skills.ts",
    language: "typescript",
    content: `// skills.ts — Technical Skills
export const skillCategories = ${JSON.stringify(skillCategories, null, 2)};

export const getAllSkills = (): string[] =>
  skillCategories.flatMap((cat) => cat.skills);

export const totalSkills = getAllSkills().length;

export default skillCategories;`,
  },
  {
    name: "projects.ts",
    language: "typescript",
    content: `// projects.ts — Portfolio Projects
export interface Project {
  id: string;
  title: string;
  status: string;
  techStack: string[];
}

export const projects: Project[] = ${JSON.stringify(
      projects.map((p) => ({
        id: p.id,
        title: p.title,
        status: p.status,
        techStack: p.techStack,
      })),
      null,
      2
    )};

export const completedProjects = projects.filter(
  (p) => p.status === "Completed"
);

export default projects;`,
  },
  {
    name: "experience.ts",
    language: "typescript",
    content: `// experience.ts — Work Experience
export const experience = ${JSON.stringify(experiences, null, 2)};

export const currentRole = experience[0];

export const totalYears = experience.length;

export default experience;`,
  },
  {
    name: "contact.ts",
    language: "typescript",
    content: `// contact.ts — Contact Information
export const contact = {
  name: "${about.name}",
  email: "${about.email}",
  location: "${about.location}",
  github: "${about.github}",
  linkedin: "${about.linkedin}",
  leetcode: "${about.leetcode}",
};

export const socialLinks = [
  { platform: "GitHub", url: contact.github },
  { platform: "LinkedIn", url: contact.linkedin },
  { platform: "LeetCode", url: contact.leetcode },
];

export default contact;`,
  },
  {
    name: "resume.ts",
    language: "typescript",
    content: `// resume.ts — Resume Data
import { developer } from "./about";
import { projects } from "./projects";
import { experience } from "./experience";
import { skillCategories } from "./skills";

export const resume = {
  profile: developer,
  experience,
  projects: projects.slice(0, 5),
  skills: skillCategories,
  education: {
    degree: "B.Tech — Engineering",
    institution: "University",
    year: "2020",
  },
};

export default resume;`,
  },
];
