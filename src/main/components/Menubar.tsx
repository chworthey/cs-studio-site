import { Link } from "react-router-dom";
import studioLogo from "/cairns.gif";
import { ToggleSwitch } from "./ToggleSwitch";
import { IMenuItem } from "../types/IMenuItem";
import { useState } from "react";

interface IMenuBarProps {
  IsPartyModeOn: boolean;
  OnPartyModeSet(on: boolean): void;
  Items: IMenuItem[];
}

export function Menubar(props: IMenuBarProps) {
  const linkClass = props.IsPartyModeOn ? "a__navbar__page a__navbar__page--party-mode" : "a__navbar__page";

  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  return (
    <nav className="nav__navbar">
      <div className="div__menu-top-items">
        <Link className={props.IsPartyModeOn ? 
          "a__logo-title a__logo-title--party-mode" : "a__logo-title"} to="/">
          Worthey Studios
          {/* <img className="img__logo" src={studioLogo} alt="An animation depicting stones falling onto a stack."></img> */}
        </Link>
        <div className="div__burger-menu" onClick={() => setBurgerMenuActive(!burgerMenuActive)}>
          <div className="div__burger-menu-line"/>
          <div className="div__burger-menu-line"/>
          <div className="div__burger-menu-line"/>
        </div>
      </div>
      <div className={burgerMenuActive ? "div__menu-items" : "div__menu-items div__menu-items--hidden"}>
        {props.Items.map((i, index) => <Link key={index} className={linkClass} to={i.LinkTo}>{i.LinkText}</Link>)}
        <ToggleSwitch LabelText="Party Mode Toggle" On={props.IsPartyModeOn} OnClick={props.OnPartyModeSet}/>
      </div>
    </nav>
  );
}