import { Link } from "react-router-dom";
import studioLogo from "/cairns.gif";
import { ToggleSwitch } from "./ToggleSwitch";
import { IMenuItem } from "../types/IMenuItem";

interface IMenuBarProps {
  IsPartyModeOn: boolean;
  OnPartyModeSet(on: boolean): void;
  Items: IMenuItem[];
}

export function Menubar(props: IMenuBarProps) {
  const linkClass = props.IsPartyModeOn ? "a__navbar__page a__navbar__page--party-mode" : "a__navbar__page";

  return (
    <div className="div__nav-container">
      <nav className="nav__navbar">
        <Link className={props.IsPartyModeOn ? 
          "a__logo-title a__logo-title--party-mode" : "a__logo-title"} to="/">
          <span>Worthey Studios</span>
          <img className="img__logo" src={studioLogo} alt="An animation depicting stones falling onto a stack."></img>
        </Link>
        {props.Items.map((i, index) => <Link key={index} className={linkClass} to={i.LinkTo}>{i.LinkText}</Link>)}
      </nav>
      <ToggleSwitch LabelText="Party Mode Toggle" On={props.IsPartyModeOn} OnClick={props.OnPartyModeSet}/>
    </div>
  );
}