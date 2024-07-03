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
        <div className="div__layout-main-wrapper">
          <div className="div__layout-main">
            <Banner/>
            <div className="div__features">
            {props.Features.map((f, i) => <div key={i} className="div__feature">
              <div>
                <h2 className="h2__feature-title">{f.Title}</h2>
                <p className="p__feature-body">{f.BodyText}</p>
              </div>
              <div>
                <Link className="a__feature-button" to={f.LinkTo}>{f.LinkText} &#8811;</Link>
              </div>
              </div>)}
          </div>
        </div>
      </div>
    </PartyModeWrapper>
  );
};
