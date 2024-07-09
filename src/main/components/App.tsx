import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import { useRef } from "react";

interface IDocumentSize {
  Width: number;
  Height: number;
}

function isTouchScreen() {
  return window.matchMedia("(pointer: coarse)").matches;
}

export function App() {
  const routes = [
    [
      {
        path: '/',
        element: <FrontPage MarqueeTexts={MarqueeTexts} Features={FrontPageFeatures} MenuItems={MenuItems}/>
      },
      {
        path: '/portal',
        element: <PortalPage/>
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
    }))
  ].flat();

  const router = createBrowserRouter(routes);

  const appRef = useRef<HTMLDivElement>(null);

  return (
    <div className="div__app-wrapper">
      <div ref={appRef} className="div__app">
        <RouterProvider router={router}/>
      </div>
      <NekoOverlay IsTouchScreen={isTouchScreen()}/>
    </div>
  );
};
