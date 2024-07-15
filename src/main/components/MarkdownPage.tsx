import Markdown from "react-markdown";
import { PageLayout } from "./PageLayout";
import { IMenuItem } from "../types/IMenuItem";
import { Link } from "react-router-dom";

export interface IWhatToReadNext {
  ID: string;
  Title: string;
};

interface IMarkdownPageProps {
  Title: string;
  MarkdownText: string;
  MenuItems: IMenuItem[];
  WhatToReadNext?: IWhatToReadNext[];
}

export function MarkdownPage(props: IMarkdownPageProps) {
  return (
    <PageLayout MenuItems={props.MenuItems}>
      <h1>{props.Title}</h1>
      <Markdown>{props.MarkdownText}</Markdown>
      {props.WhatToReadNext && <div>
        <h2>What to Read Next</h2>
        <ul>
          {props.WhatToReadNext.map((r, i) => <li key={i}><Link to={`/${r.ID}`}>{r.Title}</Link></li>)}
        </ul>
      </div>}
    </PageLayout>
  );
};
