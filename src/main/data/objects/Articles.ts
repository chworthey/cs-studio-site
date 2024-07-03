import { IArticle } from "../../types/IArticle";
import aboutPage from "../pageMarkdown/about.md?raw";
import careerPage from '../pageMarkdown/career.md?raw';
import policiesPage from "../pageMarkdown/policies.md?raw";

export const Articles: IArticle[] = [
  {
    Title: 'About Your Instructor',
    ID: 'about',
    Description: 'Learn about your instructor.',
    MarkdownText: aboutPage
  },
  {
    Title: 'Career Overview',
    ID: 'career',
    Description: 'Learn about opportunities within the software engineering discipline and beyond.',
    MarkdownText: careerPage
  },
  {
    Title: 'Policies',
    ID: 'policies',
    Description: 'Learn about the class policies.',
    MarkdownText: policiesPage
  }
];
