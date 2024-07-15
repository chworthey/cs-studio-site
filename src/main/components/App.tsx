import { Navigate, RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import { PortalPage } from "../../portal/main/components/PortalPage";
import { MarkdownPage } from "./MarkdownPage";
import { ArticlesPage } from "./ArticlesPage";
import { FrontPage } from "./FrontPage";
import { MarqueeTexts } from "../data/objects/MarqueeTexts";
import { FrontPageFeatures } from "../data/objects/FrontPageFeatures";
import { MenuItems } from "../data/objects/MenuItems";
import { Articles } from "../data/objects/Articles";
import "../styles/App.css";
import { NekoOverlay } from "../../neko/components/NekoOverlay";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { NotFound } from "./NotFound";
import { SchedulePage } from "./Schedule";
import { ProjectsPage } from "./ProjectsPage";

function isTouchScreen() {
  return window.matchMedia("(pointer: coarse)").matches;
}

interface IRouteProps {
  NekoShown: boolean;
  SetNekoShown(show: boolean): void;
}

function Route(props: PropsWithChildren<IRouteProps>) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/portal') {
      props.SetNekoShown(true);
    }
    else {
      props.SetNekoShown(!isTouchScreen());
    }
  }, [location]);

  return (
    <>
      {props.children}
    </>
  );
}

export function App() {
  const [nekoShown, setNekoShown] = useState(true);

  const routes = [
    [
      {
        path: '/',
        element: <FrontPage MarqueeTexts={MarqueeTexts} Features={FrontPageFeatures} MenuItems={MenuItems}/>
      },
      {
        path: '/portal',
        element: <PortalPage NekoShown={nekoShown} OnShowNekoToggle={show => setNekoShown(show)}/>
      },
      {
        path: '/schedule',
        element: <SchedulePage MenuItems={MenuItems}/>
      },
      {
        path: '/projects',
        element: <ProjectsPage MenuItems={MenuItems}/>
      },
      {
        path: '/articles',
        element: <ArticlesPage MenuItems={MenuItems} Articles={Articles.map(a => ({
            Title: a.Title,
            Description: a.Description,
            ID: a.ID
          }))}/>
      }
    ],
    Articles.map(a => ({
      path: `/${a.ID}`,
      element: <MarkdownPage MenuItems={MenuItems} MarkdownText={a.MarkdownText} Title={a.Title}/>
    })),
    {
      path: '/404',
      element: <NotFound MenuItems={MenuItems}/>
    },
    {
      path: '*',
      element: <Navigate to="/404"/>
    }
  ].flat().map(r => ({
    path: r.path,
    element: <Route NekoShown={nekoShown} SetNekoShown={setNekoShown}>{r.element}</Route>
  }));

  const router = createBrowserRouter(routes);

  const appRef = useRef<HTMLDivElement>(null);

  return (
    <div className="div__app-wrapper">
      <div ref={appRef} className="div__app">
        <RouterProvider router={router}/>
      </div>
      {nekoShown && <NekoOverlay IsTouchScreen={isTouchScreen()}/>}
    </div>
  );
};
