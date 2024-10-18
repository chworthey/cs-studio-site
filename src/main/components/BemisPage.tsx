import { IMenuItem } from "../types/IMenuItem";
import { PageLayout } from "./PageLayout";

interface IProjectsPageProps {
  MenuItems: IMenuItem[];
}

export function BemisPage(props: IProjectsPageProps) {
  return (
    <PageLayout MenuItems={props.MenuItems}>
      <h1>Littleton Bemis Public Library</h1>
      <p>
        Hi library people! This is a place for us to touch base regarding the work I am doing for you. This URL is unlisted.
      </p>
      <p>
        I will be dropping links here as the project progresses. Eventually I would like to work the subsequent section into my portfolio.
      </p>
      <h2>The Bemis Public Library Studio Docs Project</h2>
      <div>
        <a href="https://gray-stone-085c4c510.5.azurestaticapps.net/" target="_blank"><img className="project-thumbnail" src="/bemis-studio-docs.webp"/></a>
      </div>
      <div>
        <b>Project Type:</b> Volunteer
      </div>
      <div>
        <p>
          I was asked to document the equipment in <em>The Studio</em>&#8212; A makerspace that is located within the Littleton Bemis Public Library.
        </p>
        <p>
          In my documentation I cover:
        </p>
        <ul>
          <li><b>Software tutorials:</b> Audio recording, Cricut Maker, and more.</li>
          <li><b>Digitization for old things:</b> VCR tapes, Cassette tapes, Vinyl records, old photos, and more.</li>
          <li><b>Equipment usage:</b> Computers, Sewing Machine, Cricut Maker, Digitization Equipment, and more.</li>
        </ul>
        <p>
          To make the documentation organized and presentable, I utilized <em>MKDocs</em>, a Python package. The docs support some awesome things such as <em>Mermaid diagrams</em> and <em>admonitions</em>.
        </p>
        <p>
          I configured the docs with the help of <em>Material for MKDocs</em> and did some custom theming for it.
        </p>
        <p>
          In the end, the contents of this project will be transferred to a library CMS rather than stored in Markdown, but this project was useful because I learned how to make a documentation store that rivals any CMS and begins to match GitBook in terms of its display features.
        </p>
        <p>
          Should another makerspace-related project like this come up in the future, I will be well-prepared.
        </p>
      </div>
      <h3>Project Links</h3>
      <ul>
        <li>
          <a href="https://gray-stone-085c4c510.5.azurestaticapps.net/" target="_blank">Demo Website</a> - A working demo for the documentation
        </li>
        <li>
          <a href="https://github.com/chworthey/bemis-public-library-studio-docs" target="_blank">GitHub Sources</a> - The source files that power the documentation
        </li>
      </ul>
    </PageLayout>
  );
};
