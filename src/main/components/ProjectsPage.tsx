import { IMenuItem } from "../types/IMenuItem";
import { PageLayout } from "./PageLayout";

interface IProjectsPageProps {
  MenuItems: IMenuItem[];
}

export function ProjectsPage(props: IProjectsPageProps) {
  return (
    <PageLayout MenuItems={props.MenuItems}>
      <h1>Student Projects</h1>
      <p>
        There are no student projects currently. Check back later once we've ramped this studio up!
      </p>
    </PageLayout>
  );
};
