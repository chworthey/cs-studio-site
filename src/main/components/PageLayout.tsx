import { PropsWithChildren, useState } from "react";
import { PartyModeWrapper } from "./PartyModeWrapper";
import { Menubar } from "./Menubar";
import { IMenuItem } from "../types/IMenuItem";
import { Footer } from "./Footer";

interface IPageLayoutProps {
  MenuItems: IMenuItem[];
}

export function PageLayout(props: PropsWithChildren<IPageLayoutProps>) {
  const [partyMode, setPartyMode] = useState(false);
  // const [showBackToTop, setShowBackToTop] = useState(false);

  // useEffect(() => {
  //   const onScroll = () => setShowBackToTop(window.scrollY > 20);
  //   window.removeEventListener('scroll', onScroll);
  //   window.addEventListener('scroll', onScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', onScroll);
  // }, []);

  return (
    <PartyModeWrapper IsPartyModeOn={partyMode}>
      <Menubar IsPartyModeOn={partyMode} OnPartyModeSet={setPartyMode} Items={props.MenuItems}/>
      <div className="div__layout-main" role="presentation">
          <div className="div__page-wrapper" role="presentation">
            <div className="div__page" role="presentation">
              <main>
                <article>
                  {props.children}
                </article>
              </main>
            </div>
          </div>
        <footer>
          <Footer/>
        </footer>
      </div>
    </PartyModeWrapper>
  );
}