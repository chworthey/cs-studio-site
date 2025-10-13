import Markdown from "react-markdown";
import { IMenuItem } from "../types/IMenuItem";
import { PageLayout } from "./PageLayout";
import portfolioPage from '../data/pageMarkdown/portfolio.md?raw';

interface IPortfolioPageProps {
  MenuItems: IMenuItem[];
}

// Thanks to https://www.lundevweb.com/2024/06/creating-3d-image-slider-with-css-only.html for saving me time here.
function imgCarousel3D() {
  return <div className="div__carousel3d" style={{"--quantity": 10} as React.CSSProperties}>
      <div className="div__carousel3d-item" style={{"--position": 0} as React.CSSProperties}><img alt="The cover for Minecraft" src="games/minecraft.jpg"/></div>
      <div className="div__carousel3d-item" style={{"--position": 1} as React.CSSProperties}><img alt="The cover for Minecraft: Dungeons" src="games/dungeons.jpg"/></div>
      <div className="div__carousel3d-item" style={{"--position": 2} as React.CSSProperties}><img alt="The cover for Minecraft: Legends" src="games/legends.jpg"/></div>
      <div className="div__carousel3d-item" style={{"--position": 3} as React.CSSProperties}><img alt="The cover for Age of Empires: Definitive Edition" src="games/aoe.jpg"/></div>
      <div className="div__carousel3d-item" style={{"--position": 4} as React.CSSProperties}><img alt="The cover for Crackdown 3" src="games/crackdown3.jpg"/></div>
      <div className="div__carousel3d-item" style={{"--position": 5} as React.CSSProperties}><img alt="The cover for Forza Motorsport 7" src="games/forza7.jpg"/></div>
      <div className="div__carousel3d-item" style={{"--position": 6} as React.CSSProperties}><img alt="The cover for Forza Horizon 3" src="games/forzah3.jpg"/></div>
      <div className="div__carousel3d-item" style={{"--position": 7} as React.CSSProperties}><img alt="The cover for Forza Horizon 4" src="games/forzah4.jpg"/></div>
      <div className="div__carousel3d-item" style={{"--position": 8} as React.CSSProperties}><img alt="The cover for Forza Street" src="games/street.jpg"/></div>
      <div className="div__carousel3d-item" style={{"--position": 9} as React.CSSProperties}><img alt="The cover for Microsoft Solitaire Collection" src="games/solitaire.jpg"/></div>
    </div>;
}

export function PortfolioPage(props: IPortfolioPageProps) {
  return (
    <PageLayout MenuItems={props.MenuItems}>
      <h1>Charlotte Worthey's Portfolio</h1>
      <div className="div__carousel3d-container">
        {imgCarousel3D()}
      </div>
      <Markdown>{portfolioPage}</Markdown>
    </PageLayout>
  );
}
