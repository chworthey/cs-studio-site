import { Link } from "react-router-dom";
import { PageLayout } from "./PageLayout";
import { IMenuItem } from "../types/IMenuItem";

interface IArticleData {
  Title: string;
  Description: string;
  ID: string;
}

interface IArticlesPageProps {
  Articles: IArticleData[];
  MenuItems: IMenuItem[];
}

export function ArticlesPage(props: IArticlesPageProps) {
  return (
    <PageLayout MenuItems={props.MenuItems}>
      <h1>Articles</h1>
      <div className="div__articles" role="presentation">
      {props.Articles.map((a, i) => <section key={i}>
          <div className="div__article-wrapper">
            <Link className="a__article" to={`/${a.ID}`}>{a.Title}</Link>
            <div className="div__article-description">{a.Description}</div>
          </div>
        </section>)}
      </div>
    </PageLayout>
  );
};
