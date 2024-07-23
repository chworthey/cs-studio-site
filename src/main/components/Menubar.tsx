import { Link } from "react-router-dom";
// import studioLogo from "/cairns.gif";
import { ToggleSwitch } from "./ToggleSwitch";
import { IMenuItem } from "../types/IMenuItem";
import { useLayoutEffect, useState } from "react";

interface IMenuBarProps {
  IsPartyModeOn: boolean;
  OnPartyModeSet(on: boolean): void;
  Items: IMenuItem[];
}

function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return width;
};

export function Menubar(props: IMenuBarProps) {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  const width = useWindowWidth();

  const burgerShown = width < 1200;

  let linkClass = 'a__navbar__page';
  if (props.IsPartyModeOn) {
    linkClass += ' a__navbar__page--party-mode';
  }

  return (
    <header>
      <nav className="nav__navbar">
        <div className="div__menu-top-items" role="presentation">
          <Link className={props.IsPartyModeOn ? 
            "a__logo-title a__logo-title--party-mode" : "a__logo-title"} to="/">
            Worthey Studios
            {/* <img className="img__logo" src={studioLogo} alt="An animation depicting stones falling onto a stack."></img> */}
          </Link>
          <button aria-pressed={burgerMenuActive} tabIndex={burgerShown ? undefined : -1} className="div__burger-menu" onClick={() => setBurgerMenuActive(!burgerMenuActive)} aria-label="Show or hide menu">
            <div className="div__burger-menu-line" role="presentation"/>
            <div className="div__burger-menu-line" role="presentation"/>
            <div className="div__burger-menu-line" role="presentation"/>
          </button>
        </div>
        <div className={burgerMenuActive ? "div__menu-items" : "div__menu-items div__menu-items--hidden"} role="presentation">
          <div className="div__menu-item-links" role="presentation">
            {props.Items.map((i, index) => <Link key={index} className={linkClass} to={i.LinkTo} onFocus={() => { setBurgerMenuActive(true); }}>{i.LinkText}</Link>)}
          </div>
          <ToggleSwitch IdPrefix="menu-party-mode" LabelText="Party Mode Toggle" On={props.IsPartyModeOn} OnClick={props.OnPartyModeSet}/>
        </div>
      </nav>
    </header>
  );
}