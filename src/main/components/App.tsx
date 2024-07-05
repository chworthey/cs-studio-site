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
import { useEffect, useRef, useState } from "react";

interface IDocumentSize {
  Width: number;
  Height: number;
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
  const [documentSize, setDocumentSize] = useState<IDocumentSize>({
    Width: document.documentElement.clientWidth,
    Height: document.documentElement.clientHeight
  });

  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (appRef.current) {
        console.log('setting size')
        setDocumentSize({
          Width: appRef.current.scrollWidth,
          Height: appRef.current.scrollHeight
        });
      }
    };

    let observer: ResizeObserver | undefined = undefined;

    if (appRef.current) {
      observer = new ResizeObserver(handleResize);
      observer.observe(appRef.current);
    }

    return () => {
      if (observer && appRef.current) {
        observer.unobserve(appRef.current);
      }
    }
  }, [appRef.current])

  return (
    <>
      <div ref={appRef} className="div__app">
        <RouterProvider router={router}/>
      </div>
      <NekoOverlay Width={documentSize.Width} Height={documentSize.Height}/>
    </>
  );
};
