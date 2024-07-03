import { PropsWithChildren, useEffect, useState } from "react";
import { PartyModeWrapper } from "./PartyModeWrapper";
import { Menubar } from "./Menubar";
import { IMenuItem } from "../types/IMenuItem";

interface IPageLayoutProps {
  MenuItems: IMenuItem[];
}

export function PageLayout(props: PropsWithChildren<IPageLayoutProps>) {
  const [partyMode, setPartyMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 20);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <PartyModeWrapper IsPartyModeOn={partyMode}>
      <Menubar IsPartyModeOn={partyMode} OnPartyModeSet={setPartyMode} Items={props.MenuItems}/>
      <div className="div__layout-main">
        <div className="div__page-wrapper">
          <div className="div__page">
              <section>
                {props.children}
              </section>
          </div>
        </div>
        <div className="div__page-bottom">
          <button disabled={!showBackToTop} className={showBackToTop ? "button__back-to-top" : "button__back-to-top button__back-to-top--hidden"} onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          }}>
            &#x25B4;
            <br/>
            Back to Top
          </button>
        </div>
      </div>
    </PartyModeWrapper>
  );
}