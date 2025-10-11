export interface IArticle {
  Title: string;
  ID: string;
  Description: string;
  MarkdownText: string;
  WhatToReadNextIds?: string[];
  ListedPublicly: boolean;
}
