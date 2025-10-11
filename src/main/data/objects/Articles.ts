import { IArticle } from "../../types/IArticle";
import aboutPage from "../pageMarkdown/about.md?raw";
import careerPage from '../pageMarkdown/career.md?raw';
import policiesPage from "../pageMarkdown/policies.md?raw";
import portfolioPage from '../pageMarkdown/portfolio.md?raw';
import teachingPage from "../pageMarkdown/teaching.md?raw";

export const Articles: IArticle[] = [
  {
    Title: 'About Your Instructor',
    ID: 'about',
    Description: 'Learn about your instructor.',
    MarkdownText: aboutPage,
    WhatToReadNextIds: [
      'career',
      'teaching',
      'policies'
    ],
    ListedPublicly: true
  },
  {
    Title: 'Career Overview',
    ID: 'career',
    Description: 'Learn about opportunities within the software engineering discipline and beyond.',
    MarkdownText: careerPage,
    ListedPublicly: true
  },
  {
    Title: 'Policies',
    ID: 'policies',
    Description: 'Learn about the class policies.',
    MarkdownText: policiesPage,
    ListedPublicly: true
  },
  {
    Title: 'Charlotte Worthey\'s Portfolio',
    ID: 'portfolio',
    Description: 'See my portfolio.',
    MarkdownText: portfolioPage,
    ListedPublicly: false
  },
  {
    Title: 'Teaching Style',
    ID: 'teaching',
    Description: 'Learn about my teaching style!',
    MarkdownText: teachingPage,
    WhatToReadNextIds: [
      'policies'
    ],
    ListedPublicly: true
  }
];
