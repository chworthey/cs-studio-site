import { useState } from "react";
import { PartyModeWrapper } from "./PartyModeWrapper";
import { Menubar } from "./Menubar";
import { Marquee } from "./Marquee";
import { Banner } from "./Banner";
import { Link } from "react-router-dom";
import { IMenuItem } from "../types/IMenuItem";
import { IFeature } from "../types/IFeature";

interface IFrontPageProps {
  MarqueeTexts: string[];
  MenuItems: IMenuItem[];
  Features: IFeature[];
}

export function FrontPage(props: IFrontPageProps) {
  const [partyMode, setPartyMode] = useState(false);

  return (
    <PartyModeWrapper IsPartyModeOn={partyMode}>
        <Menubar IsPartyModeOn={partyMode} OnPartyModeSet={setPartyMode} Items={props.MenuItems}/>
        <Marquee MarqueeTexts={props.MarqueeTexts}/>
        <div className="div__layout-main-wrapper" role="presentation">
          <main>
            <div className="div__layout-main" role="presentation">
              <Banner/>
              <section>
                <div className="div__features-divider" role="presentation">
                  <div className="div__features-label-container" role="presentation">
                    <h2 className="h2__features-label-text">
                      <span aria-hidden={true}>&#x2015;</span><span>features</span><span aria-hidden={true}>&#x2015;</span>
                    </h2>
                  </div>
                </div>
                <div className="div__features" role="presentation">
                  {props.Features.map((f, i) => <section className="section__feature" key={i}>
                    <div className="div__feature" role="presentation">
                      <div role="presentation">
                        <h3 className="h3__feature-title">{f.Title}</h3>
                        <p className="p__feature-body">{f.BodyText}</p>
                      </div>
                      <div role="presentation">
                        <Link className="a__feature-button" to={f.LinkTo}>{f.LinkText}<span aria-hidden={true}> &#8811;</span></Link>
                      </div>
                    </div>
                  </section>)}
                </div>
              </section>
            </div>
          </main>
      </div>
    </PartyModeWrapper>
  );
};
