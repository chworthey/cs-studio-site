import { Link } from "react-router-dom";
import studioLogo from "/cairns.gif";
import { useState } from "react";

interface IMenuBarProps {
  IsPartyModeOn: boolean;
  OnPartyModeSet(on: boolean): void;
}

interface ISwitchProps {
  LabelText: string;
  On: boolean;
  OnClick(on: boolean): void;
}

function Switch(props: ISwitchProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="div__switch-container">
      <div className={hovered ? "div__switch-label div__switch-label--hovered" : "div__switch-label"}>
        {props.LabelText}
      </div>
      <svg className={hovered ? "svg__switch-triangle svg__switch-triangle--hovered" : "svg__switch-triangle"} viewBox="0 0 100 100">
        <polygon points="0,100 0,0 100,50"/>
      </svg>
      <div className="div__switch" onClick={() => {
        props.OnClick(!props.On);
      }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className={hovered ? "div__switch-slider div__switch-slider--hovered" : "div__switch-slider"}>
          <div className={props.On ? "div__switch-handle div__switch-handle--on" : "div__switch-handle"}/>
        </div>
      </div>
    </div>
  );
}

export function Menubar(props: IMenuBarProps) {
  const linkClass = props.IsPartyModeOn ? "a__navbar__page a__navbar__page--party-mode" : "a__navbar__page";

  return (
    <div className="div__nav-container">
      <nav className="nav__navbar">
        <Link className={props.IsPartyModeOn ? 
          "a__logo-title a__logo-title--party-mode" : "a__logo-title"} to="/">
          <span>Worthey Studios</span>
          <img className="img__logo" src={studioLogo} alt="An animation depicting stones falling onto a stack."></img></Link>
        <Link className={linkClass} to="/">Schedule &amp; Events</Link>
        <Link className={linkClass} to="/">Articles</Link>
        <Link className={linkClass} to="/">Register</Link>
        <Link className={linkClass} to="/policies">Policies</Link>
        <Link className={linkClass} to="/">About</Link>
        <Link className={linkClass} to="/portal">Portal</Link>
        
      </nav>
      <Switch LabelText="Party Mode Toggle" On={props.IsPartyModeOn} OnClick={props.OnPartyModeSet}/>
    </div>
  );
}