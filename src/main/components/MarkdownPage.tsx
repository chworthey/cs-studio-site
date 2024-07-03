import Markdown from "react-markdown";
import { PageLayout } from "./PageLayout";
import { IMenuItem } from "../types/IMenuItem";

interface IMarkdownPageProps {
  Title: string;
  MarkdownText: string;
  MenuItems: IMenuItem[];
}

export function MarkdownPage(props: IMarkdownPageProps) {
  return (
    <PageLayout MenuItems={props.MenuItems}>
      <h1>{props.Title}</h1>
      <Markdown>{props.MarkdownText}</Markdown>
    </PageLayout>
  );
};
